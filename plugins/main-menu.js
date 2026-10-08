const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Normal & Clean Auto-Changing Menu with Dynamic RAHUL-AI Logo',
    aliases: ['help', 'cmdlist', 'commands', 'menu16'],

    async execute(sock, m) {
        try { 
            await m.react('📜'); 
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

        // 1. **Automatically Generated RAHUL-AI Logo** (Dynamic 3D Banners)
        const autoLogos = [
            `https://www6.flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=runner-logo&text=RAHUL-AI&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=70&fontName=futura`,
            `https://sam-cdn.zone.id/files/gZ4hyfNQN4.jpg`,
            `https://sam-cdn.zone.id/files/xQer9GrIVT.jpg` // Tuza default logo
        ];
        const selectedLogo = autoLogos[Math.floor(Math.random() * autoLogos.length)];

        // 2. **Normal & Clean Menu Styles** (Simple, readable layouts)
        const menuStyles = [
            // Theme 1: Simple Bullet List Style
            `
👋 Hello *${user}*,
Here is the command list for *RAHUL-AI*.

📌 *BOT INFO*
• Bot Owner : ${botOwner}
• Prefix : [ ${prefix} ]
• Date : ${date}
• Time : ${time}

⚡ *1. MAIN & SYSTEM*
• ${prefix}alive
• ${prefix}ping
• ${prefix}uptime
• ${prefix}owner

📥 *2. DOWNLOAD COMMANDS*
• ${prefix}tiktok <url>
• ${prefix}ytmp3 <url>
• ${prefix}ig <url>

🤖 *3. AI & TOOLS*
• ${prefix}ai <query>
• ${prefix}sticker
• ${prefix}ocr

🛡️ *4. GROUP ADMIN*
• ${prefix}tagall
• ${prefix}kick @user
• ${prefix}promote @user

> *Powered by RAHUL-MASTER*`.trim(),

            // Theme 2: Minimalist Clean Style
            `
╭━━━〔 *RAHUL-AI MENU* 〕━━━
┃ 👤 User : ${user}
┃ 👑 Owner : ${botOwner}
┃ ⚡ Prefix : ${prefix}
┃ ⏰ Time : ${time}
╰━━━━━━━━━━━━━━━━━━━

🛠️ *SYSTEM COMMANDS*
- ${prefix}alive
- ${prefix}ping
- ${prefix}uptime

📥 *DOWNLOADERS*
- ${prefix}tiktok
- ${prefix}ytmp3
- ${prefix}ig

🧠 *ARTIFICIAL INTELLIGENCE*
- ${prefix}ai
- ${prefix}ai-search
- ${prefix}gen

⚙️ *UTILS & GROUP*
- ${prefix}sticker
- ${prefix}tagall
- ${prefix}kick

> *Powered by RAHUL-MASTER*`.trim()
        ];

        // Randomly pick a normal menu style every time
        const menuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        try {
            const imageBuffer = (await axios.get(selectedLogo, {
                responseType: 'arraybuffer',
                timeout: 7000
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Logo error, fallback to text:', err.message);
            await m.reply(menuText);
        }
    }
};
