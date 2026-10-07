const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show stylized ultra-fancy bot commands menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('👑');

        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

        // High-Tech Neon Frame Design
        const fancyMenu = `
╔═══════════════════════════╗
   ⚡ 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝙼𝚄𝙻𝚃𝙸-𝙳𝙴𝚅𝙸𝙲𝙴 ⚡
╚═══════════════════════════╝

┌───〔 *SYSTEM INFO* 〕───
│ 👤 *User:* ${user}
│ 👑 *Owner:* ${botOwner}
│ 🏛️ *Founder:* ${founder}
│ 📅 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ 🔑 *Prefix:* [ ${prefix} ]
└─────────────────────────

✦──────────〔 *MENU COMMANDS* 〕──────────✦

┌─── ◈ *GENERAL*
│ ᪣ ${prefix}alive
│ ᪣ ${prefix}ping
│ ᪣ ${prefix}uptime
│ ᪣ ${prefix}owner
│ ᪣ ${prefix}guide
│ ᪣ ${prefix}menu2
└───

┌─── ◈ *DOWNLOADERS*
│ ᪣ ${prefix}tiktok / ${prefix}tt
│ ᪣ ${prefix}ytmp3
│ ᪣ ${prefix}ig
└───

┌─── ◈ *TOOLS*
│ ᪣ ${prefix}sticker
│ ᪣ ${prefix}ocr
│ ᪣ ${prefix}tts
│ ᪣ ${prefix}poll
│ ᪣ ${prefix}shazam
│ ᪣ ${prefix}textpro
│ ᪣ ${prefix}chid
└───

┌─── ◈ *ARTIFICIAL INTELLIGENCE*
│ ᪣ ${prefix}ai
│ ᪣ ${prefix}ai-search
│ ᪣ ${prefix}aiv
│ ᪣ ${prefix}gen
└───

┌─── ◈ *FUN & ENTERTAINMENT*
│ ᪣ ${prefix}blue
│ ᪣ ${prefix}flag
│ ᪣ ${prefix}hide
│ ᪣ ${prefix}guessgender
│ ᪣ ${prefix}agecalculator
│ ᪣ ${prefix}style
└───

┌─── ◈ *SEARCH & ANIME*
│ ᪣ ${prefix}weather
│ ᪣ ${prefix}waifu
│ ᪣ ${prefix}neko
│ ᪣ ${prefix}kitsune
│ ᪣ ${prefix}husbando
└───

┌─── ◈ *GROUP & ADMIN*
│ ᪣ ${prefix}tagall
│ ᪣ ${prefix}tagme
│ ᪣ ${prefix}couplepp
│ ᪣ ${prefix}group
│ ᪣ ${prefix}ginfo
│ ᪣ ${prefix}kick
│ ᪣ ${prefix}promote
│ ᪣ ${prefix}demote
└───

✦────────────────────────────────────────✦
> 「 ⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ 」
`.trim();

        // Direct image URL fallback support
        const defaultImageUrl = 'https://i.imgur.com/8N4X9Zm.jpeg';
        const imageSource = global.menuImage || defaultImageUrl;

        try {
            let imageMessagePayload;

            // Check if menuImage is URL or Direct Buffer
            if (typeof imageSource === 'string' && imageSource.startsWith('http')) {
                const response = await axios.get(imageSource, { responseType: 'arraybuffer' });
                imageMessagePayload = Buffer.from(response.data);
            } else {
                imageMessagePayload = imageSource;
            }

            await sock.sendMessage(m.chat, {
                image: imageMessagePayload,
                caption: fancyMenu
            }, { quoted: m });

        } catch (err) {
            console.error('Fancy Menu Error:', err);
            // Fallback to text message if image fails to load
            await sock.sendMessage(m.chat, { text: fancyMenu }, { quoted: m });
        }
    }
};
