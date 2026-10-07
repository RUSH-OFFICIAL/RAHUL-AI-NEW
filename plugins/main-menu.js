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
            day: '2-digit',
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

        const menuText = `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓
│   🚀 *Ｒ𝙰𝙷𝚄𝙻 - 𝙰𝙸  ᴍᴅ* 🚀    │
┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛
  ❖ *User Info*
  ├ 👤 Name   : ${user}
  ├ 👑 Master : ${botOwner}
  ├ ⏰ Time   : ${time}
  ├ 📅 Date   : ${date}
  └ ⚡ Prefix : [ ${prefix} ]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📂 *[ 01 ] GENERAL COMMANDS*
  │ ◈ ${prefix}alive
  │ ◈ ${prefix}ping
  │ ◈ ${prefix}uptime
  └ ◈ ${prefix}owner

  📥 *[ 02 ] MEDIA DOWNLOADS*
  │ ◈ ${prefix}tiktok / ${prefix}tt
  │ ◈ ${prefix}ytmp3
  └ ◈ ${prefix}ig

  🤖 *[ 03 ] RAHUL-AI INTELLIGENCE*
  │ ◈ ${prefix}ai
  │ ◈ ${prefix}ai-search
  │ ◈ ${prefix}aiv
  └ ◈ ${prefix}gen

  🛠️ *[ 04 ] TOOLS & UTILITIES*
  │ ◈ ${prefix}sticker
  │ ◈ ${prefix}style
  │ ◈ ${prefix}ocr
  └ ◈ ${prefix}tts

  🛡️ *[ 05 ] SQUAD & GROUP ADMIN*
  │ ◈ ${prefix}tagall
  │ ◈ ${prefix}kick
  │ ◈ ${prefix}promote
  └ ◈ ${prefix}demote

━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> *✨ Powered by Rahul Master // 2026*
`.trim();

        // Image Set Logic with Backup Protection
        const defaultImage = 'https://files.catbox.moe/1h7p1a.jpg';
        const imageUrl = global.menuImage || defaultImage;

        try {
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu image error:', err);
            await m.reply(menuText);
        }
    }
};
