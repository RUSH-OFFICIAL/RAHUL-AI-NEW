const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('💖');
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'Africa/Accra'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Africa/Accra'
        });

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

        const menuText = `
╔═════≼ 🌟 *${botOwner.toUpperCase()}* 🌟≽═════╗
║ 👤 *User Info:* \`${user}\`
║ 👑 *Founder:* \`${Founder}\`
║ ⚡ *Prefix:* [ \`${prefix}\` ]
║ 📅 *Date:* ${date}
║ ⏰ *Time:* ${time}
╚═════════════════════════╝

╭━━━✦ *✨ ɢᴇɴᴇʀᴀʟ ᴄᴏᴍᴍᴀɴᴅs* ✦━━━╮
┃ 𖣔 ${prefix}alive  ┃ 𖣔 ${prefix}ping
┃ 𖣔 ${prefix}uptime ┃ 𖣔 ${prefix}owner
┃ 𖣔 ${prefix}guide  ┃ 𖣔 ${prefix}menu2
╰━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ* ✦━━━╮
┃ 𖣔 ${prefix}tiktok / ${prefix}tt
┃ 𖣔 ${prefix}ytmp3
┃ 𖣔 ${prefix}ig
╰━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ᴛᴏᴏʟꜱ* ✦━━━╮
┃ 𖣔 ${prefix}sticker ┃ 𖣔 ${prefix}ocr
┃ 𖣔 ${prefix}tts     ┃ 𖣔 ${prefix}poll
┃ 𖣔 ${prefix}shazam  ┃ 𖣔 ${prefix}textpro
┃ 𖣔 ${prefix}chid
╰━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ᴀʀᴛɪꜰɪᴄɪᴀʟ ɪɴᴛᴇʟʟɪɢᴇɴᴄᴇ* ✦━━━╮
┃ 𖣔 ${prefix}ai       ┃ 𖣔 ${prefix}ai-search
┃ 𖣔 ${prefix}aiv     ┃ 𖣔 ${prefix}gen
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ꜰᴜɴ & ɴᴇᴡ* ✦━━━╮
┃ 𖣔 ${prefix}blue          ┃ 𖣔 ${prefix}flag
┃ 𖣔 ${prefix}hide          ┃ 𖣔 ${prefix}guessgender
┃ 𖣔 ${prefix}agecalculator ┃ 𖣔 ${prefix}style
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ꜱᴇᴀʀᴄʜ & ᴀɴɪᴍᴇ* ✦━━━╮
┃ 𖣔 ${prefix}weather
┃ 𖣔 ${prefix}waifu \vert{}${prefix}neko
┃ 𖣔 ${prefix}kitsune \vert{}${prefix}husbando
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ɢʀᴏᴜᴘ & ᴀᴅᴍɪɴ* ✦━━━╮
┃ 𖣔 ${prefix}tagall \vert{}${prefix}tagme
┃ 𖣔 ${prefix}couplepp
┃ 𖣔 ${prefix}group \vert{}${prefix}ginfo
┃ 𖣔 ${prefix}antigst
┃ 𖣔 ${prefix}kick \vert{}${prefix}promote
┃ 𖣔 ${prefix}demote
╰━━━━━━━━━━━━━━━━━━━╯

╭━━━✦ *✨ ꜱᴛᴀᴛᴜꜱ & ᴄʜᴀɴɴᴇʟ* ✦━━━╮
┃ 𖣔 ${prefix}gstatus
┃ 𖣔 ${prefix}channelid
╰━━━━━━━━━━━━━━━━━━━━━━━╯

┌─────────────────────────┐
│  ✨ *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ* ✨  │
└─────────────────────────┘
`.trim();

        try {
            const imageUrl = global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg';
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
