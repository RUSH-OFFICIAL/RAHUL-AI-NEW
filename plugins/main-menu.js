const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in a sleek modern layout',
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
╭━━━❮ ⚡ *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸* ⚡ ❯━━━╮
┃ 
┣━━❖ *USER DASHBOARD*
┃ 👤 *User:* \`${user}\`
┃ 👑 *Founder:* \`${Founder}\`
┃ ⚡ *Owner:* \`${botOwner}\`
┃ 📌 *Prefix:* [ \`${prefix}\` ]
┃ 📅 *Date:* ${date}
┃ 🕒 *Time:* ${time}
┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━❮ 📜 *COMMAND MENU* ❯━━━╮

┌──『 🌐 *GENERAL* 』
│ ✦ ${prefix}alive
│ ✦ ${prefix}ping
│ ✦ ${prefix}uptime
│ ✦ ${prefix}owner
│ ✦ ${prefix}guide
│ ✦ ${prefix}menu2
└─────────────────────────

┌──『 📥 *DOWNLOADERS* 』
│ ✦ ${prefix}tiktok / ${prefix}tt
│ ✦ ${prefix}ytmp3
│ ✦ ${prefix}ig
└─────────────────────────

┌──『 🛠️ *TOOLS & UTILS* 』
│ ✦ ${prefix}sticker
│ ✦ ${prefix}ocr
│ ✦ ${prefix}tts
│ ✦ ${prefix}poll
│ ✦ ${prefix}shazam
│ ✦ ${prefix}textpro
│ ✦ ${prefix}chid
└─────────────────────────

┌──『 🤖 *AI FEATURES* 』
│ ✦ ${prefix}ai
│ ✦ ${prefix}ai-search
│ ✦ ${prefix}aiv
│ ✦ ${prefix}gen
└─────────────────────────

┌──『 🎮 *FUN & GAMES* 』
│ ✦ ${prefix}blue
│ ✦ ${prefix}flag
└─────────────────────────

┌──『 ✨ *NEW FEATURES* 』
│ ✦ ${prefix}hide
│ ✦ ${prefix}guessgender
│ ✦ ${prefix}agecalculator
│ ✦ ${prefix}style
└─────────────────────────

┌──『 🎌 *SEARCH & ANIME* 』
│ ✦ ${prefix}weather
│ ✦ ${prefix}waifu
│ ✦ ${prefix}neko
│ ✦ ${prefix}kitsune
│ ✦ ${prefix}husbando
└─────────────────────────

┌──『 👥 *GROUP UTILS* 』
│ ✦ ${prefix}tagall
│ ✦ ${prefix}tagall1
│ ✦ ${prefix}tagme
│ ✦ ${prefix}couplepp
│ ✦ ${prefix}group
│ ✦ ${prefix}ginfo
│ ✦ ${prefix}antigst
└─────────────────────────

┌──『 📢 *STATUS & CHANNEL* 』
│ ✦ ${prefix}gstatus
│ ✦ ${prefix}channelid
└─────────────────────────

┌──『 🛡️ *ADMIN CONTROLS* 』
│ ✦ ${prefix}kick
│ ✦ ${prefix}promote
│ ✦ ${prefix}demote
└─────────────────────────

╰━━━━━━━━━━━━━━━━━━━━━━╯
  ✨ *POWERED BY RAHUL-AI* ✨
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
