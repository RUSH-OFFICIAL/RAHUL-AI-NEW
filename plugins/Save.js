let handler = async (m, { conn, text }) => {
    if (!m.quoted) return m.reply('Kripya kisi status par reply karke yeh command dein!');
    
    let q = m.quoted;
    
    // Status sender JID nikalne ka 100% working tareeqa for WhatsApp Status / Broadcast
    let statusSender = q.key?.participant || q.participant || q.sender || m.quoted?.key?.remoteJid || '';
    
    // Fallback agar JID object ke andar se aati ho
    if (!statusSender && q.key && q.key.remoteJid && q.key.remoteJid.includes('@s.whatsapp.net')) {
        statusSender = q.key.remoteJid;
    }

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
        // Status media download karne ka robust tarika
        let media = null;
        try {
            media = await q.download();
        } catch (err) {
            if (conn.downloadMediaMessage) {
                media = await conn.downloadMediaMessage(q);
            }
        }

        let mime = q.mimetype || q.mediaType || '';
        
        if (media && (/image/.test(mime) || q.type === 'imageMessage')) {
            await conn.sendMessage(m.chat, { image: media, caption: customCaption }, { quoted: m });
        } else if (media && (/video/.test(mime) || q.type === 'videoMessage')) {
            await conn.sendMessage(m.chat, { video: media, caption: customCaption }, { quoted: m });
        } else if (media && (/audio/.test(mime) || q.type === 'audioMessage')) {
            await conn.sendMessage(m.chat, { audio: media, mimetype: mime, ptt: q.ptt || false }, { quoted: m });
            await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
        } else {
            await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
        }
    } catch (e) {
        console.log("Error in status saver download:", e);
        await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
    }
}

// Bina prefix ke in words par chalane ke liye:
handler.customPrefix = /^(sent|sentme|send|bhejo|do)$/i;
handler.command = new RegExp;

module.exports = handler;
