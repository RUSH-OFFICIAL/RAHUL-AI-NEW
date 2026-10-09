let handler = async (m, { conn, text }) => {
    // Check karein ki status reply kiya gaya hai ya nahi
    if (!m.quoted) return m.reply('Kripya kisi status par reply karke yeh command dein!');
    
    let q = m.quoted ? m.quoted : m;
    
    // Status sender ka JID nikalne ke liye (Group/Status broadcast handling)
    let senderJid = q.participant || q.key?.participant || q.sender || m.sender;
    
    // Sender ka naam fetch karne ki koshish (PushName ya fir number fallback)
    let senderName = "Unknown";
    try {
        if (senderJid) {
            let contact = await conn.getName(senderJid);
            senderName = contact || senderJid.split('@')[0];
        }
    } catch (e) {
        senderName = senderJid ? senderJid.split('@')[0] : "Unknown";
    }

    let originalCaption = q.text || q.caption || text || '';
    
    // Status sender, original caption aur powered by add karne ka format
    let customCaption = `📌 *Status Sender:* ${senderName}\n` +
                        `💬 *Caption:* ${originalCaption}\n\n` +
                        `⚡ *Powered by Rahul Master*`;

    let media = await q.download?.();
    if (media) {
        // Agar media (Image/Video) hai toh uske sath bhejega
        let mtype = Object.keys(q.message || q)[0] || q.mtype;
        let cleanType = mtype ? mtype.replace(/message/i, '').toLowerCase() : 'image';
        
        await conn.sendMessage(m.chat, { 
            [cleanType]: media, 
            caption: customCaption 
        }, { quoted: m });
    } else {
        // Agar sirf text status hai
        await conn.sendMessage(m.chat, { text: customCaption }, { quoted: m });
    }
}

// Bina prefix ke in words par chalane ke liye:
handler.customPrefix = /^(sent|sentme|send|bhejo|do)$/i;
handler.command = new RegExp;

module.exports = handler;
