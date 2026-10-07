module.exports = {
    name: 'menu',
    description: 'Attractive modern fast menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        // Optimized medium size image URL
        const MENU_IMAGE_URL = 'https://i.ibb.co/5Lq6Fz4/image-0-resized.jpg';

        try {
            const chatJid = m?.chat || m?.key?.remoteJid || m?.from;
            if (!chatJid) return;

            const prefix = global.BOT_PREFIX || '.';
            const user = m?.pushName || 'User';

            const menuText = `
✨ *RAHUL - AI OFFICIAL* ✨
👤 *User:* ${user} | ⚡ *Prefix:* [ ${prefix} ]

╭─── ⚡ *SYSTEM CORE*
│ ➣ ${prefix}alive
│ ➣ ${prefix}ping
│ ➣ ${prefix}uptime
│ ➣ ${prefix}owner
│ ➣ ${prefix}guide
╰───────────────

╭─── 📥 *DOWNLOAD HUB*
│ ➣ ${prefix}tiktok
│ ➣ ${prefix}ytmp3
│ ➣ ${prefix}ig
╰───────────────

╭─── 🛠️ *SMART TOOLS*
│ ➣ ${prefix}sticker
│ ➣ ${prefix}ocr
│ ➣ ${prefix}tts
│ ➣ ${prefix}poll
│ ➣ ${prefix}shazam
│ ➣ ${prefix}chid
╰───────────────

╭─── 🧠 *AI ENGINE*
│ ➣ ${prefix}ai
│ ➣ ${prefix}ai-search
│ ➣ ${prefix}aiv
│ ➣ ${prefix}gen
╰───────────────

╭─── 🎭 *FUN & GAMES*
│ ➣ ${prefix}blue
│ ➣ ${prefix}flag
│ ➣ ${prefix}guessgender
│ ➣ ${prefix}agecalculator
│ ➣ ${prefix}style
╰───────────────

╭─── 🌸 *ANIME ARCHIVE*
│ ➣ ${prefix}weather
│ ➣ ${prefix}waifu
│ ➣ ${prefix}neko
│ ➣ ${prefix}kitsune
│ ➣ ${prefix}husbando
╰───────────────

╭─── 🛡️ *GROUP ADMIN*
│ ➣ ${prefix}tagall
│ ➣ ${prefix}tagme
│ ➣ ${prefix}couplepp
│ ➣ ${prefix}group
│ ➣ ${prefix}ginfo
│ ➣ ${prefix}kick
│ ➣ ${prefix}promote
│ ➣ ${prefix}demote
╰───────────────

> 👑 *POWERED BY RAHUL MASTER*
`.trim();

            await sock.sendMessage(chatJid, {
                image: { url: MENU_IMAGE_URL },
                caption: menuText
            }, { quoted: m }).catch(async () => {
                await sock.sendMessage(chatJid, { text: menuText }, { quoted: m });
            });

        } catch (err) {
            console.error('Attractive Menu Error:', err);
        }
    }
};
