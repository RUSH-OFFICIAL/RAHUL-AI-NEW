let handler = async (m, { conn, text }) => {
    if (!m.quoted) {
        return m.reply('❌ Kripya kisi status par reply karke yeh command dein!');
    }
    
    let q = m.quoted;
    let statusSender = q.key?.participant || q.participant || m.sender || '';

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
        let media = null;
        try {
            media = await q.download();
        } catch (err) {
            if (conn.downloadMediaMessage) {
                media = await conn.downloadMediaMessage(q);
            }
        }

        let mime = q.mimetype || q.mediaType || '';
        let targetChat = m.chat;

        if (media && (/image/.test(mime) || q.type === 'imageMessage')) {
            await conn.sendMessage(targetChat, { image: media, caption: customCaption }, { quoted: m });
        } else if (media && (/video/.test(mime) || q.type === 'videoMessage')) {
            await conn.sendMessage(targetChat, { video: media, caption: customCaption }, { quoted: m });
        } else if (media && (/audio/.test(mime) || q.type === 'audioMessage')) {
            await conn.sendMessage(targetChat, { audio: media, mimetype: mime, ptt: q.ptt || false }, { quoted: m });
            await conn.sendMessage(targetChat, { text: customCaption }, { quoted: m });
        } else {
            await conn.sendMessage(targetChat, { text: customCaption }, { quoted: m });
        }
    } catch (e) {
        console.log("Error in status saver:", e);
        await m.reply(customCaption);
    }
}

handler.command = /^(sent|sentme|send|bhejo|do|save)$/i;

module.exports = handler;
