const axios = require('axios');

module.exports = {
    name: 'menu2',
    description: 'Show available bot commands in an ultra-fancy VIP style layout',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('💎');
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

        const menuText = `
◈━━━━━━━━━━━━━━━━━━━━◈
        ❖ 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝚅𝙸𝙿 𝙼𝙴𝙽𝚄 ❖
◈━━━━━━━━━━━━━━━━━━━━◈

┌─[ 👑 ᴜsᴇʀ ᴘʀᴏғɪʟᴇ ]
│ ◈ ᴜsᴇʀ : ${user}
│ ◈ ᴏᴡɴᴇʀ : ${botOwner}
│ ◈ ғᴏᴜɴᴅᴇʀ : ${Founder}
│ ◈ ᴘʀᴇғɪx : [ ${prefix} ]
│ ◈ ᴅᴀᴛᴇ : ${date}
│ ◈ ᴛɪᴍᴇ : ${time}
└───────────────────

┌─[ 🌐 ɢᴇɴᴇʀᴀʟ ]
│ ❖ ${prefix}alive
│ ❖ ${prefix}ping
│ ❖ ${prefix}uptime
│ ❖ ${prefix}owner
│ ❖ ${prefix}guide
│ ❖ ${prefix}menu2
└───────────────────

┌─[ 📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀs ]
│ ❖ ${prefix}tiktok / ${prefix}tt
│ ❖ ${prefix}ytmp3
│ ❖ ${prefix}ig
└───────────────────

┌─[ 🛠️ ᴛᴏᴏʟs & ᴜᴛɪʟs ]
│ ❖ ${prefix}sticker
│ ❖ ${prefix}ocr
│ ❖ ${prefix}tts
│ ❖ ${prefix}poll
│ ❖ ${prefix}shazam
│ ❖ ${prefix}textpro
│ ❖ ${prefix}chid
└───────────────────

┌─[ 🤖 ᴀɪ ғᴇᴀᴛᴜʀᴇs ]
│ ❖ ${prefix}ai
│ ❖ ${prefix}ai-search
│ ❖ ${prefix}aiv
│ ❖ ${prefix}gen
└───────────────────

┌─[ 🎮 ғᴜɴ & ɢᴀᴍᴇs ]
│ ❖ ${prefix}blue
│ ❖ ${prefix}flag
└───────────────────

┌─[ ✨ ɴᴇᴡ ғᴇᴀᴛᴜʀᴇs ]
│ ❖ ${prefix}hide
│ ❖ ${prefix}guessgender
│ ❖ ${prefix}agecalculator
│ ❖ ${prefix}style
└───────────────────

┌─[ 🎌 sᴇᴀʀᴄʜ & ᴀɴɪᴍᴇ ]
│ ❖ ${prefix}weather
│ ❖ ${prefix}waifu
│ ❖ ${prefix}neko
│ ❖ ${prefix}kitsune
│ ❖ ${prefix}husbando
└───────────────────

┌─[ 👥 ɢʀᴏᴜᴘ ᴜᴛɪʟs ]
│ ❖ ${prefix}tagall
│ ❖ ${prefix}tagall1
│ ❖ ${prefix}tagme
│ ❖ ${prefix}couplepp
│ ❖ ${prefix}group
│ ❖ ${prefix}ginfo
│ ❖ ${prefix}antigst
└───────────────────

┌─[ 📢 sᴛᴀᴛᴜs & ᴄʜᴀɴɴᴇʟ ]
│ ❖ ${prefix}gstatus
│ ❖ ${prefix}channelid
└───────────────────

┌─[ 🛡️ ᴀᴅᴍɪɴ ᴄᴏɴᴛʀᴏʟs ]
│ ❖ ${prefix}kick
│ ❖ ${prefix}promote
│ ❖ ${prefix}demote
└───────────────────

◈━━━━━━━━━━━━━━━━━━━━◈
 💎 ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ-ᴀɪ 💎
◈━━━━━━━━━━━━━━━━━━━━◈
`.trim();

        try {
            const imageUrl = global.menuImage || 'https://sam-cdn.zone.id/files/ZBp0sbXtJB.jpg';
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await sock.sendMessage(m.chat, {
                image: imageBuffer,
                caption: menuText
            }, { quoted: m });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(menuText);
        }
    }
};

