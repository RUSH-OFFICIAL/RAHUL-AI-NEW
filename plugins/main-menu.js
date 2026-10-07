const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in a long fancy layout',
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
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
 █▀█ █▀█ █ █ █ █ ▄▀█ █▀█
 █▀▄ █▄█ █▀█ █ █ █▀█ █▀▄
      [ █ ▄▀█ █ ]
▰▰▰▰▰ [ *ʀ𝙰𝙷𝚄𝙻-𝙰𝙸* ] ▰▰▰▰▰

┏ ⚙️ *SYSTEM INFORMATION*
┃ 👤 *USER:* \`${user}\`
┃ 👑 *FOUNDER:* \`${Founder}\`
┃ ⚡ *OWNER:* \`${botOwner}\`
┃ 📌 *PREFIX:* [ \`${prefix}\` ]
┃ 📅 *DATE:* ${date}
┃ 🕒 *TIME:* ${time}
┗━━━━━━━━━━━━━━━━━━━◢

╔══════════════════════╗
║ ⚡ *RAHUL-AI COMMANDS* ⚡
╚══════════════════════╝

┌───❖ *【 01. GENERAL COMMANDS 】* ❖───┐
│ ✦ ${prefix}alive
│ ✦ ${prefix}ping
│ ✦ ${prefix}uptime
│ ✦ ${prefix}owner
│ ✦ ${prefix}guide
│ ✦ ${prefix}menu2
└──────────────────────────┘

┌───❖ *【 02. DOWNLOADERS 】* ❖───┐
│ 📥 ${prefix}tiktok / ${prefix}tt
│ 📥 ${prefix}ytmp3
│ 📥 ${prefix}ig
└──────────────────────────┘

┌───❖ *【 03. TOOLS & UTILITIES 】* ❖───┐
│ 🛠️ ${prefix}sticker
│ 🛠️ ${prefix}ocr
│ 🛠️ ${prefix}tts
│ 🛠️ ${prefix}poll
│ 🛠️ ${prefix}shazam
│ 🛠️ ${prefix}textpro
│ 🛠️ ${prefix}chid
└──────────────────────────┘

┌───❖ *【 04. ARTIFICIAL INTELLIGENCE 】* ❖───┐
│ 🤖 ${prefix}ai
│ 🤖 ${prefix}ai-search
│ 🤖 ${prefix}aiv
│ 🤖 ${prefix}gen
└──────────────────────────┘

┌───❖ *【 05. FUN & GAMES 】* ❖───┐
│ 🎮 ${prefix}blue
│ 🎮 ${prefix}flag
└──────────────────────────┘

┌───❖ *【 06. NEW COMMANDS 】* ❖───┐
│ ✨ ${prefix}hide
│ ✨ ${prefix}guessgender
│ ✨ ${prefix}agecalculator
│ ✨ ${prefix}style
└──────────────────────────┘

┌───❖ *【 07. SEARCH & ANIME 】* ❖───┐
│ 🔍 ${prefix}weather
│ 🎌 ${prefix}waifu
│ 🎌 ${prefix}neko
│ 🎌 ${prefix}kitsune
│ 🎌 ${prefix}husbando
└──────────────────────────┘

┌───❖ *【 08. GROUP MANAGEMENT 】* ❖───┐
│ 👥 ${prefix}tagall
│ 👥 ${prefix}tagall1
│ 👥 ${prefix}tagme
│ 👥 ${prefix}couplepp
│ 👥 ${prefix}group
│ 👥 ${prefix}ginfo
│ 👥 ${prefix}antigst
└──────────────────────────┘

┌───❖ *【 09. STATUS & CHANNEL 】* ❖───┐
│ 📢 ${prefix}gstatus
│ 📢 ${prefix}channelid
└──────────────────────────┘

┌───❖ *【 10. ADMIN CONTROLS 】* ❖───┐
│ 🛡️ ${prefix}kick
│ 🛡️ ${prefix}promote
│ 🛡️ ${prefix}demote
└──────────────────────────┘

▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
 ⚡ *POWERED BY RAHUL-AI* ⚡
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
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
