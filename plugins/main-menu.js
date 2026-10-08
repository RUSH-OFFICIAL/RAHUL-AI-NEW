const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Cyber-Matrix Nexus Prime Auto-Changing Menu with Dynamic RAHUL-AI Logos',
    aliases: ['help', 'cmdlist', 'commands', 'menu14'],

    async execute(sock, m) {
        try { 
            await m.react('🌟'); 
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

        // 1. **Automatically Generated & Rotating RAHUL-AI Logos** (Dynamic 3D & Cyber Banners)
        const autoLogos = [
            `https://www6.flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=infernal-logo&text=RAHUL-AI&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=70&fontName=futura`,
            `https://www6.flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flux-logo&text=RAHUL-AI&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=70&fontName=futura`,
            `https://www6.flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=crafts-logo&text=RAHUL+AI&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=70`,
            `https://sam-cdn.zone.id/files/xQer9GrIVT.jpg` // Tuza custom default high-tech logo
        ];
        const selectedLogo = autoLogos[Math.floor(Math.random() * autoLogos.length)];

        // 2. **Automatically Changing Menu Styles/Themes** (Prati vela completely different layout)
        const menuStyles = [
            // Theme 1: Nexus Prime HUD Style
            `
╭─────────────────────────────╮
│ 🌟 **[ RAHUL-AI NEXUS PRIME ]** 🌟
╰─────────────────────────────╯
 ◈ *User*    : ${user}
 ◈ *Owner*   : ${botOwner}
 ◈ *Founder* : ${Founder}
 ◈ *Time*    : ${time} | ${date}
 ◈ *Prefix*  : ${prefix}

┌── ⚡ **SYSTEM & CORE** ──────┐
│ • ${prefix}alive   • ${prefix}ping
│ • ${prefix}uptime  • ${prefix}owner
└─────────────────────────────┘

┌── 📥 **MEDIA DOWNLOADS** ───┐
│ • ${prefix}tiktok  • ${prefix}ytmp3
│ • ${prefix}ig      • ${prefix}tt
└─────────────────────────────┘

┌── 🧠 **NEURAL AI SUITE** ───┐
│ • ${prefix}ai      • ${prefix}ai-search
│ • ${prefix}aiv     • ${prefix}gen
└─────────────────────────────┘

┌── 🛠️ **UTILS & TOOLS** ─────┐
│ • ${prefix}sticker • ${prefix}ocr
│ • ${prefix}tts     • ${prefix}style
└─────────────────────────────┘

┌── 🛡️ **GROUP & ADMIN** ────┐
│ • ${prefix}tagall  • ${prefix}kick
│ • ${prefix}promote • ${prefix}demote
└─────────────────────────────┘

> *[NEXUS STATUS: 100% UNSTOPPABLE]*`.trim(),

            // Theme 2: Matrix Hyper-Grid Protocol Style
            `
╔═════════════════════════════╗
║  ⚡ **RAHUL-AI MATRIX V14** ⚡  ║
╚═════════════════════════════╝
 👤 **Operator:** ${user}
 👑 **Master:**   ${botOwner}
 ⚡ **Prefix:**   ${prefix}

┌─── 📂 **COMMAND DIRECTORY** ────┐
│
├─► *Core:* ${prefix}alive | ${prefix}ping | ${prefix}uptime
├─► *Downloads:* ${prefix}tiktok | ${prefix}ytmp3 | ${prefix}ig
├─► *AI Tools:* ${prefix}ai | ${prefix}ai-search | ${prefix}gen
├─► *Utilities:* ${prefix}sticker | ${prefix}ocr | ${prefix}style
├─► *Fun & New:* ${prefix}hide | ${prefix}guessgender | ${prefix}blue
├─► *Anime:* ${prefix}waifu | ${prefix}neko | ${prefix}kitsune
└─► *Admin:* ${prefix}tagall | ${prefix}kick | ${prefix}promote

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
> 「 Powered by RAHUL-MASTER Engine 」`.trim()
        ];

        // Randomly pick a menu style every time command is run
        const menuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        try {
            // Fetch the dynamically generated RAHUL-AI logo/image
            const imageBuffer = (await axios.get(selectedLogo, {
                responseType: 'arraybuffer',
                timeout: 7000
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Dynamic logo generation error, fallback to text:', err.message);
            await m.reply(menuText);
        }
    }
};
