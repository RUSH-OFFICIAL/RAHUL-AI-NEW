module.exports = {
    name: 'menu',
    description: 'Ultra stable image menu with zero crash fail-safe',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        // Direct image link set in code (tumhi dileli link)
        const MENU_IMAGE_URL = 'https://sam-cdn.zone.id/files/ZBp0sbXtJB.jpg';

        try {
            // Safe JID fallback
            const chatJid = m?.chat || m?.key?.remoteJid || m?.from;
            if (!chatJid) return;

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
                hour12: true,
                timeZone: 'Asia/Kolkata'
            });

            const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
            const user = m?.pushName || 'User';
            const founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

            const menuText = `
╔═══════════════════════════╗
   ⚡ *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝙼𝚄𝙻𝚃𝙸-𝙳𝙴𝚅𝙸𝙲𝙴* ⚡
╚═══════════════════════════╝

┌───〔 *SYSTEM INFO* 〕───
│ 👤 *User:* ${user}
│ 👑 *Owner:* ${botOwner}
│ 🏛️ *Founder:* ${founder}
│ 📅 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ 🔑 *Prefix:* [ ${prefix} ]
└─────────────────────────

┌─── ◈ *GENERAL*
│ ᪣ ${prefix}alive
│ ᪣ ${prefix}ping
│ ᪣ ${prefix}uptime
│ ᪣ ${prefix}owner
│ ᪣ ${prefix}guide
└───

┌─── ◈ *DOWNLOADERS*
│ ᪣ ${prefix}tiktok
│ ᪣ ${prefix}ytmp3
│ ᪣ ${prefix}ig
└───

┌─── ◈ *TOOLS*
│ ᪣ ${prefix}sticker
│ ᪣ ${prefix}ocr
│ ᪣ ${prefix}tts
│ ᪣ ${prefix}poll
│ ᪣ ${prefix}shazam
│ ᪣ ${prefix}chid
└───

┌─── ◈ *AI COMMANDS*
│ ᪣ ${prefix}ai
│ ᪣ ${prefix}ai-search
│ ᪣ ${prefix}aiv
│ ᪣ ${prefix}gen
└───

┌─── ◈ *FUN & UTILITY*
│ ᪣ ${prefix}blue
│ ᪣ ${prefix}flag
│ ᪣ ${prefix}guessgender
│ ᪣ ${prefix}agecalculator
│ ᪣ ${prefix}style
└───

┌─── ◈ *ANIME & SEARCH*
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

> 「 ⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ 」
`.trim();

            try {
                // Method 1: Send Image + Text (Native Baileys Buffer Fetch)
                await sock.sendMessage(chatJid, {
                    image: { url: MENU_IMAGE_URL },
                    caption: menuText
                });
            } catch (imgErr) {
                console.error('Koyeb CDN Image Fetch Fail:', imgErr);
                // Method 2: Fail-Safe - Jari CDN down jhala tari code Pure Text pathvel
                await sock.sendMessage(chatJid, { text: menuText });
            }

        } catch (err) {
            console.error('Menu Command Crash (Index):', err);
        }
    }
};
