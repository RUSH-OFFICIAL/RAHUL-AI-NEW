module.exports = {
    name: 'menu2',
    description: 'Cyber grid style image menu with zero crash fail-safe',
    aliases: ['help2', 'commands2'],

    async execute(sock, m) {
        // Direct Image URL set inside code (100% Guaranteed Success)
        // Tumchi standard sampler zone image link:
        const MENU2_IMAGE_URL = 'https://sam-cdn.zone.id/files/ZBp0sbXtJB.jpg';

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

            const menu2Text = `
 ┌───〔 ⚡ *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝚅𝟸* ⚡ 〕───┐
 │
 ├─ 👤 *User:* ${user}
 ├─ 👑 *Owner:* ${botOwner}
 ├─ 🏛️ *Founder:* ${founder}
 ├─ 📅 *Date:* ${date}
 ├─ ⏰ *Time:* ${time}
 ├─ 🔑 *Prefix:* [ ${prefix} ]
 │
 └───〔 *COMMAND DASHBOARD* 〕───┘

 ⚡ ━━ *[ GENERAL ]* ━━
 ║  • ${prefix}alive
 ║  • ${prefix}ping
 ║  • ${prefix}uptime
 ║  • ${prefix}owner
 ║  • ${prefix}guide

 📥 ━━ *[ DOWNLOADERS ]* ━━
 ║  • ${prefix}tiktok
 ║  • ${prefix}ytmp3
 ║  • ${prefix}ig

 🛠️ ━━ *[ TOOLS ]* ━━
 ║  • ${prefix}sticker
 ║  • ${prefix}ocr
 ║  • ${prefix}tts
 ║  • ${prefix}poll
 ║  • ${prefix}shazam
 ║  • ${prefix}chid

 🤖 ━━ *[ AI COMMANDS ]* ━━
 ║  • ${prefix}ai
 ║  • ${prefix}ai-search
 ║  • ${prefix}aiv
 ║  • ${prefix}gen

 🎭 ━━ *[ FUN & UTILITY ]* ━━
 ║  • ${prefix}blue
 ║  • ${prefix}flag
 ║  • ${prefix}guessgender
 ║  • ${prefix}agecalculator
 ║  • ${prefix}style

 ⛩️ ━━ *[ ANIME & SEARCH ]* ━━
 ║  • ${prefix}weather
 ║  • ${prefix}waifu
 ║  • ${prefix}neko
 ║  • ${prefix}kitsune
 ║  • ${prefix}husbando

 👥 ━━ *[ GROUP MODS ]* ━━
 ║  • ${prefix}tagall
 ║  • ${prefix}tagme
 ║  • ${prefix}couplepp
 ║  • ${prefix}group
 ║  • ${prefix}ginfo
 ║  • ${prefix}kick
 ║  • ${prefix}promote
 ║  • ${prefix}demote

 └────────────────────────────┘
 > ⚡ *POWERED BY RAHUL MASTER*
`.trim();

            try {
                // Method 1: Send Image + Text (Native Baileys Buffer Fetch)
                await sock.sendMessage(chatJid, {
                    image: { url: MENU2_IMAGE_URL },
                    caption: menu2Text
                });
            } catch (imgErr) {
                console.error('Koyeb CDN Image Fetch Fail for Menu2:', imgErr);
                // Method 2: Fail-Safe - Jari CDN down jhala tari code Pure Text pathvel
                await sock.sendMessage(chatJid, { text: menu2Text });
            }

        } catch (err) {
            console.error('Menu2 Command Crash (Index):', err);
        }
    }
};
