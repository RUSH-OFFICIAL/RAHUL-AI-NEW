const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Advanced RPG/Neon Style Auto-Changing Menu with Rotating Logos',
    aliases: ['help', 'cmdlist', 'commands', 'menu3'],

    async execute(sock, m) {
        try { 
            await m.react('🔥'); 
        } catch (e) {}
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
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

        // 1. **Automatically Rotating Logos** (Tuza main link + extra HD options)
        const logoUrls = [
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg', // Tuza dillela main logo
            'https://images.unsplash.com/photo-1579546929518-9e396f3cc809', // Neon Gradient Theme
            'https://images.unsplash.com/photo-1550684848-fac1c5b4e853', // Cyber Orange Neon
            'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f'  // Abstract Tech Art
        ];
        const selectedImage = logoUrls[Math.floor(Math.random() * logoUrls.length)];

        // 2. **Automatically Changing Styles/Themes** (Prati vela navin layout disnar)
        const menuStyles = [
            // Theme 1: Neon RPG Box Style
            `
┏━━━━━━━━━━━━━━━━━━━━━━━━━━━┓
┃   ⚡ **RAHUL-AI ULTIMATE** ⚡  ┃
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛
 ❖ User    : ${user}
 ❖ Owner   : ${botOwner}
 ❖ Founder : ${Founder}
 ❖ Time    : ${time} (${date})
 ❖ Prefix  : ${prefix}

🔮 *[ 01 ] SYSTEM CORE*
  ├── ${prefix}alive
  ├── ${prefix}ping
  ├── ${prefix}uptime
  └── ${prefix}owner

🎬 *[ 02 ] MEDIA & DOWNLOADS*
  ├── ${prefix}tiktok / ${prefix}tt
  ├── ${prefix}ytmp3
  └── ${prefix}ig

🤖 *[ 03 ] NEURAL AI & TOOLS*
  ├── ${prefix}ai | ${prefix}ai-search
  ├── ${prefix}sticker | ${prefix}ocr
  └── ${prefix}tts | ${prefix}style

🛡️ *[ 04 ] GROUP & ADMIN*
  ├── ${prefix}tagall
  ├── ${prefix}kick
  ├── ${prefix}promote
  └── ${prefix}demote

> *「 SYSTEM STATUS: ONLINE 」*`.trim(),

            // Theme 2: Futuristic Game Dashboard Style
            `
╔═══════════════════════════╗
║   🎮 **RAHUL-AI HUD v5** 🎮   ║
╚═══════════════════════════╝
 👤 PPLAYER : ${user}
 👑 CREATOR : ${botOwner}
 ⚡ PREFIX  : ${prefix}

┌─── 🚀 **MAIN COMMANDS** ───┐
│ • ${prefix}alive   • ${prefix}ping
│ • ${prefix}menu    • ${prefix}owner
└───────────────────────────┘

┌─── 📥 **MEDIA DOWNLOADS** ───┐
│ • ${prefix}tiktok  • ${prefix}ytmp3
│ • ${prefix}ig      • ${prefix}tt
└───────────────────────────┘

┌─── 🧠 **AI & UTILITIES** ───┐
│ • ${prefix}ai      • ${prefix}ai-search
│ • ${prefix}sticker • ${prefix}ocr
└───────────────────────────┘

┌─── ⚡ **ADMIN & TOOLS** ───┐
│ • ${prefix}tagall  • ${prefix}kick
│ • ${prefix}promote • ${prefix}demote
└───────────────────────────┘

> *Powered by RAHUL-MASTER Engine*`.trim()
        ];

        // Randomly pick one style every time command is executed
        const menuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        try {
            // Fast image fetch with timeout
            const imageBuffer = (await axios.get(selectedImage, {
                responseType: 'arraybuffer',
                timeout: 5000
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu error, fallback to text:', err.message);
            await m.reply(menuText);
        }
    }
};
