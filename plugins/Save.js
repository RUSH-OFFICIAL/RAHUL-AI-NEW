let handler = async (m, { conn, text }) => {
    // Check karein ki quoted message hai ya nahi
    if (!m.quoted) return m.reply('Kripya kisi status par reply karke yeh command dein!');
    
    let q = m.quoted;
    
    // Status bhejne wale ka JID / Sender nikalne ka correct tarika (Status ke liye special handling)
    let statusSender = q.sender || q.key?.participant || q.participant || m.quoted.key?.remoteJid || '';
    
    let senderName = "Unknown";
    try {
        if (statusSender) {
            let fetchedName = await conn.getName(statusSender);
            senderName = fetchedName || q.pushName || statusSender.split('@')[0];
        } else if (q.pushName) {
            senderName = q.pushName;
        }
    } catch (err) {
        senderName = q.pushName || "Unknown";
    }

    let originalCaption = q.text || q.caption || text || '';
    
    // Custom caption with status sender & powered by Rahul Master
    let customCaption = `📌 *Status Sender:* ${senderName}\n` +
                        `💬 *Caption:* ${originalCaption}\n\n` +
                        `⚡ *Powered by Rahul Master*`;

    try {
        // Media download karne ka secure tarika
        let media = await q.download?.();
        let mime = q.mimetype || q.mediaType || '';
        
        if (media && /image/.test(mime)) {
            await conn.sendMessage(m.chat, { image: media, caption: customCaption }, { quoted: m });
        } else if (media && /video/.test(mime)) {
            await conn.sendMessage(m.chat, { video: media, caption: customCaption }, { quoted: m });
        } else if (media && /audio/.test(mime)) {
            await conn.sendMessage(m.chat, { audio: media, mimetype: mime, ptt: q.ptt || false }, { quoted: m });
            await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
        } else {
            // Agar media download na ho ya sirf text status ho
            await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
        }
    } catch (e) {
        console.log("Error in status saver plugin:", e);
        // Fallback error aane par bhi text/caption bhej dega
        await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
    }
}

// Bina prefix ke in words par chalane ke liye:
handler.customPrefix = /^(sent|sentme|send|bhejo|do)$/i;
handler.command = new RegExp;

module.exports = handler;
