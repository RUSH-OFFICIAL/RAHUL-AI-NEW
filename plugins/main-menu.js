const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('💎');
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Africa/Accra'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Africa/Accra'
        });

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        
        // Custom menu image set
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        const menuText = `
┏━━━✦ 𝑹𝑨𝑯𝑼𝑳-𝑨𝑰 𝑴𝑼𝑳𝑻𝑰𝑫𝑬𝑽𝑰𝑪𝑬 ✦━━━┓
┃ 👑 𝐹𝑜𝑢𝑛𝒅𝑒𝑟 : ${Founder}
┃ ⚡ 𝑂𝑤𝑛𝑒𝑟   : ${botOwner}
┃ 👤 𝑈𝑠𝑒𝑟    : ${user}
┃ 📅 𝐷𝑎𝑡𝑒    : ${date}
┃ ⏰ 𝑇𝑖𝑚𝑒    : ${time}
┃ ⚙️ 𝑃𝑟𝑒𝑓𝑖𝑥  : ${prefix}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌───❖ *⚡ 𝐆𝐄𝐍𝐄𝐑𝐀𝐋*
│ ➣ ${prefix}alive
│ ➣ ${prefix}ping
│ ➣ ${prefix}uptime
│ ➣ ${prefix}owner
│ ➣ ${prefix}guide
│ ➣ ${prefix}menu2
└───────────────◆

┌───❖ *📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑𝐒*
│ ➣ ${prefix}tiktok / ${prefix}tt
│ ➣ ${prefix}ytmp3
│ ➣ ${prefix}ig
└───────────────◆

┌───❖ *🛠️ 𝐓𝐎𝐎𝐋𝐒*
│ ➣ ${prefix}sticker
│ ➣ ${prefix}ocr
│ ➣ ${prefix}tts
│ ➣ ${prefix}poll
│ ➣ ${prefix}shazam
│ ➣ ${prefix}textpro
│ ➣ ${prefix}chid
└───────────────◆

┌───❖ *🤖 𝐀𝐈 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
│ ➣ ${prefix}ai
│ ➣ ${prefix}ai-search
│ ➣ ${prefix}aiv
│ ➣ ${prefix}gen
└───────────────◆

┌───❖ *🎮 𝐅𝐔𝐍*
│ ➣ ${prefix}blue
│ ➣ ${prefix}flag
└───────────────◆

┌───❖ *✨ 𝐍𝐄𝐖 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
│ ➣ ${prefix}hide
│ ➣ ${prefix}guessgender
│ ➣ ${prefix}agecalculator
│ ➣ ${prefix}style
└───────────────◆

┌───❖ *🔍 𝐒𝐄𝐀𝐑𝐂𝐇*
│ ➣ ${prefix}weather
└───────────────◆

┌───❖ *🌸 𝐀𝐍𝐈𝐌𝐄*
│ ➣ ${prefix}waifu
│ ➣ ${prefix}neko
│ ➣ ${prefix}kitsune
│ ➣ ${prefix}husbando
└───────────────◆

┌───❖ *👥 𝐆𝐑𝐎𝐔𝐏*
│ ➣ ${prefix}tagall
│ ➣ ${prefix}tagall1
│ ➣ ${prefix}tagme
│ ➣ ${prefix}couplepp
│ ➣ ${prefix}group
│ ➣ ${prefix}ginfo
│ ➣ ${prefix}antigst
└───────────────◆

┌───❖ *📊 𝐒𝐓𝐀𝐓𝐔𝐒*
│ ➣ ${prefix}gstatus
└───────────────◆

┌───❖ *📢 𝐂𝐇𝐀𝐍𝐍ᴇʟ*
│ ➣ ${prefix}channelid
└───────────────◆

┌───❖ *🛡️ 𝐀𝐃𝐌𝐈𝐍*
│ ➣ ${prefix}kick
│ ➣ ${prefix}promote
│ ➣ ${prefix}demote
└───────────────◆

> ❖ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ ❖
`.trim();

        try {
            const imageBuffer = (await axios.get(menuImageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(menuText);
        }
    }
};
