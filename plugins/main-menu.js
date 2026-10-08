const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands with dynamic themes and auto-changing logos',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        try {
            await m.react('✔️');
        } catch (e) {
            // Ignore reaction errors if unsupported
        }
        
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

        // 1. Automatically Rotating Logo URLs (RAHUL-AI Logos including your requested link)
        const logoUrls = [
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg', // Tuza dillela main logo
            'https://i.ibb.co/3r1w7ZJ/rahul-ai-v2.jpg',      // Dynamic logo alternative 1
            'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe' // Dynamic tech style alternative 2
        ];
        const selectedImage = logoUrls[Math.floor(Math.random() * logoUrls.length)];

        // 2. Automatically Changing Menu Styles/Themes (Multiple layouts with your complete command lists)
        const menuStyles = [
            // Theme 1: Clean Frame Style
            `
┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ
│ *ғᴏᴜɴᴅᴇʀ:* ${Founder}
│ *ᴏᴡɴᴇʀ:* ${botOwner}
│ *ᴜsᴇʀ:* ${user}
│ *ᴅᴀᴛᴇ:* ${date}
│ *ᴛɪᴍᴇ:* ${time} (GMT)
│ *ᴘʀᴇғɪx:* ${prefix}
╰──────────────────╯

┌─ム ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅs
│
├─ム *ɢᴇɴᴇʀᴀʟ*
│ ᪣ ${prefix}ᴀʟɪᴠᴇ
│ ᪣ ${prefix}ᴘɪɴɢ
│ ᪣ ${prefix}ᴜᴘᴛɪᴍᴇ
│ ᪣ ${prefix}ᴏᴡɴᴇʀ
│ ᪣ ${prefix}ɢᴜɪᴅᴇ
│ ᪣ ${prefix}ᴍᴇɴᴜ2
│
├─ム *ᴅᴏᴡɴʟᴏᴀᴅᴇʀs*
│ ᪣ ${prefix}ᴛɪᴋᴛᴏᴋ / ${prefix}ᴛᴛ
│ ᪣ ${prefix}ʏᴛᴍᴘ3
│ ᪣ ${prefix}ɪɢ
│
├─ム *ᴛᴏᴏʟs*
│ ᪣ ${prefix}sᴛɪᴄᴋᴇʀ
│ ᪣ ${prefix}ᴏᴄʀ
│ ᪣ ${prefix}ᴛᴛs
│ ᪣ ${prefix}ᴘᴏʟʟ
│ ᪣ ${prefix}sʜᴀᴢᴀᴍ
│ ᪣ ${prefix}ᴛᴇxᴛᴘʀᴏ
│ ᪣ ${prefix}ᴄʜɪᴅ
│
├─ム *ᴀɪ*
│ ᪣ ${prefix}ᴀɪ
│ ᪣ ${prefix}ᴀɪ-sᴇᴀʀᴄʜ
│ ᪣ ${prefix}ᴀɪᴠ
│ ᪣ ${prefix}ɢᴇɴ
│
├─ム *ғᴜɴ*
│ ᪣ ${prefix}ʙʟᴜᴇ
│ ᪣ ${prefix}ғʟᴀɢ
│
├─ム *ɴᴇᴡ*
│ ᪣ ${prefix}ʜɪᴅᴇ
│ ᪣ ${prefix}ɢᴜᴇssɢᴇɴᴅᴇʀ
│ ᪣ ${prefix}ᴀɢᴇᴄᴀʟᴄᴜʟᴀᴛᴏʀ
│ ᪣ ${prefix}sᴛʏʟᴇ
│
├─ム *ꜱᴇᴀʀᴄʜ*
│ ᪣ ${prefix}ᴡᴇᴀᴛʜᴇʀ
│
├─ム *ᴀɴɪᴍᴇ*
│ ᪣ ${prefix}ᴡᴀɪғᴜ
│ ᪣ ${prefix}ɴᴇᴋᴏ
│ ᪣ ${prefix}ᴋɪᴛꜱᴜɴᴇ
│ ᪣ ${prefix}ʜᴜꜱʙᴀɴᴅᴏ
│
├─ム *ɢʀᴏᴜᴘ*
│ ᪣ ${prefix}ᴛᴀɢᴀʟʟ
│ ᪣ ${prefix}ᴛᴀɢᴀʟʟ1
│ ᪣ ${prefix}ᴛᴀɢᴍᴇ
│ ᪣ ${prefix}ᴄᴏᴜᴘʟᴇᴘᴘ
│ ᪣ ${prefix}ɢʀᴏᴜᴘ
│ ᪣ ${prefix}ɢɪɴғᴏ
│ ᪣ ${prefix}ᴀɴᴛɪɢsᴛ
│
├─ム *sᴛᴀᴛᴜs*
│ ᪣ ${prefix}ɢsᴛᴀᴛᴜs
│
├─ム *ᴄʜᴀɴɴᴇʟ*
│ ᪣ ${prefix}ᴄʜᴀɴɴᴇʟɪᴅ
│
├─ム *ᴀᴅᴍɪɴ*
│ ᪣ ${prefix}ᴋɪᴄᴋ
│ ᪣ ${prefix}ᴘʀᴏᴍᴏᴛᴇ
│ ᪣ ${prefix}ᴅᴇᴍᴏᴛᴇ
│
╰─────────◆────────╯

> 「 ᴩᴏᴡᴇʀᴇᴅ - ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ 」`.trim(),

            // Theme 2: Minimalist Box Style
            `
╭─────────────────────────╮
│   ⚡ *RAHUL-AI V2* ⚡     │
╰─────────────────────────╯
 👤 User   : ${user}
 👑 Owner  : ${botOwner}
 🏛️ Founder: ${Founder}
 ⏰ Time   : ${time}
 ⚙️ Prefix : ${prefix}

📂 *CATEGORIES & COMMANDS:*
• *General:* ${prefix}alive, ${prefix}ping, ${prefix}uptime, ${prefix}owner, ${prefix}guide
• *Downloads:* ${prefix}tiktok, ${prefix}ytmp3, ${prefix}ig
• *Tools:* ${prefix}sticker, ${prefix}ocr, ${prefix}tts, ${prefix}poll, ${prefix}shazam
• *AI:* ${prefix}ai, ${prefix}ai-search, ${prefix}aiv, ${prefix}gen
• *Fun & New:* ${prefix}blue, ${prefix}flag, ${prefix}hide, ${prefix}guessgender, ${prefix}style
• *Anime:* ${prefix}waifu, ${prefix}neko, ${prefix}kitsune, ${prefix}husbando
• *Group & Admin:* ${prefix}tagall, ${prefix}kick, ${prefix}promote, ${prefix}demote, ${prefix}group

> *Powered by RAHUL-AI Engine*`.trim()
        ];

        // Randomly pick one of the menu styles automatically
        const menuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        try {
            // Check global.menuImage or fallback to our automatically rotating logos
            const imageUrl = global.menuImage || selectedImage;
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer',
                timeout: 8000
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu image error, sending text menu:', err.message);
            await m.reply(menuText);
        }
    }
};
