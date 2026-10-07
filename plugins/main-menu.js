const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('🔥');
        
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
╭━━━❮ *🌐 ${botOwner.toUpperCase()} 🌐* ❯━━━╮
┃ 👤 *User:* ${user}
┃ 👑 *Founder:* ${Founder}
┃ ⚡ *Prefix:* [ ${prefix} ]
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
╰━━━━━━━━━━━━━━━━━━━╯

> ┏──❑ *🚀 GENERAL COMMANDS*
> ┃ ◈ ${prefix}alive
> ┃ ◈ ${prefix}ping
> ┃ ◈ ${prefix}uptime
> ┃ ◈ ${prefix}owner
> ┃ ◈ ${prefix}guide
> ┃ ◈ ${prefix}menu2
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *📥 DOWNLOADERS*
> ┃ ◈ ${prefix}tiktok / ${prefix}tt
> ┃ ◈ ${prefix}ytmp3
> ┃ ◈ ${prefix}ig
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *🛠️ TOOLS*
> ┃ ◈ ${prefix}sticker | ${prefix}s
> ┃ ◈ ${prefix}ocr
> ┃ ◈ ${prefix}tts
> ┃ ◈ ${prefix}poll
> ┃ ◈ ${prefix}shazam
> ┃ ◈ ${prefix}textpro
> ┃ ◈ ${prefix}chid
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *🤖 ARTIFICIAL INTELLIGENCE*
> ┃ ◈ ${prefix}ai
> ┃ ◈ ${prefix}ai-search
> ┃ ◈ ${prefix}aiv
> ┃ ◈ ${prefix}gen
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *🎉 FUN & GAMES*
> ┃ ◈ ${prefix}blue
> ┃ ◈ ${prefix}flag
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *✨ NEW COMMANDS*
> ┃ ◈ ${prefix}hide
> ┃ ◈ ${prefix}guessgender
> ┃ ◈ ${prefix}agecalculator
> ┃ ◈ ${prefix}style
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *🔍 SEARCH & ANIME*
> ┃ ◈ ${prefix}weather
> ┃ ◈ ${prefix}waifu | ${prefix}neko
> ┃ ◈ ${prefix}kitsune | ${prefix}husbando
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *👥 GROUP & ADMIN*
> ┃ ◈ ${prefix}tagall | ${prefix}tagme
> ┃ ◈ ${prefix}couplepp
> ┃ ◈ ${prefix}group | ${prefix}ginfo
> ┃ ◈ ${prefix}antigst
> ┃ ◈ ${prefix}kick | ${prefix}promote
> ┃ ◈ ${prefix}demote
> ┗━━━━━━━━━━━━━━━━━━━

> ┏──❑ *📢 STATUS & CHANNEL*
> ┃ ◈ ${prefix}gstatus
> ┃ ◈ ${prefix}channelid
> ┗━━━━━━━━━━━━━━━━━━━

╔═════════════════════╗
║ ⚡ *POWERED BY RAHUL* ⚡
╚═════════════════════╝
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
