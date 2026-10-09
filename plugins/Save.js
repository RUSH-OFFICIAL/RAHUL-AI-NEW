let handler = async (m, { conn, text }) => {
    if (!m.quoted) return m.reply('Kripya kisi status par reply karke yeh command dein!');
    
    let q = m.quoted;
    
    // Status sender JID extraction
    let statusSender = q.sender || q.key?.participant || q.participant || m.quoted.key?.remoteJid || '919356730236@s.whatsapp.net';
    
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
    
    let customCaption = `📌 *Status Sender:* ${senderName}\n` +
                        `💬 *Caption:* ${originalCaption}\n\n` +
                        `⚡ *Powered by Rahul Master*`;

    try {
        // Status media download karne ka robust tarika (Baileys stream handler)
        let media = null;
        try {
            media = await q.download();
        } catch (err) {
            // Fallback method for status media decryption if direct download fails
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

handler.customPrefix = /^(sent|sentme|send|bhejo|do)$/i;
handler.command = new RegExp;

module.exports = handler;
