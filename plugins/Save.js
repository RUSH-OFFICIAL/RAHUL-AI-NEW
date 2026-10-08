let handler = async (m, { conn, text }) => {
    if (!m.quoted) return m.reply('Kripya kisi status par reply karke yeh command dein!');
    
    let q = m.quoted ? m.quoted : m;
    
    // Status bhejne wale ka original real name nikalne ke liye
    let senderName = q.sender ? (await conn.getName(q.sender) || q.pushName || "Unknown") : (m.pushName || "Unknown");
    let originalCaption = q.text || q.caption || text || '';
    
    // Custom caption with status sender & powered by Rahul Master
    let customCaption = `📌 *Status Sender:* ${senderName}\n` +
                        `💬 *Caption:* ${originalCaption}\n\n` +
                        `⚡ *Powered by Rahul Master*`;

    try {
        // Media download karne ka sahi tareeqa
        let media = await q.download();
        let mime = q.mimetype || q.mediaType || '';
        
        if (/image/.test(mime)) {
            await conn.sendMessage(m.chat, { image: media, caption: customCaption }, { quoted: m });
        } else if (/video/.test(mime)) {
            await conn.sendMessage(m.chat, { video: media, caption: customCaption }, { quoted: m });
        } else if (/audio/.test(mime)) {
            await conn.sendMessage(m.chat, { audio: media, mimetype: mime, ptt: q.ptt || false }, { quoted: m });
            // Agar audio ke sath text bhejna ho toh alag se bhej sakte hain
            await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
        } else {
            // Agar sirf text status ho
            await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
        }
    } catch (e) {
        // Fallback agar direct download fail ho jaye toh quoted message forward/send karein
        console.log(e);
        await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
    }
}

// Bina prefix ke in words par chalane ke liye:
handler.customPrefix = /^(sent|sentme|send|bhejo|do)$/i;
handler.command = new RegExp;

module.exports = handler;
