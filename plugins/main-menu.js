module.exports = {
    name: 'menu',
    description: 'Ultra stable clean whatsapp bot menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        try {
            // Safe reaction trigger
            if (m && m.key) {
                await sock.sendMessage(m.chat, { react: { text: '⚡', key: m.key } }).catch(() => {});
            }

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
            const user = m.pushName || (m.sender ? m.sender.split('@')[0] : 'User');
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

            // Safe message options (Prevents Baileys quoted crash)
            const sendOptions = (m && m.key && m.key.remoteJid) ? { quoted: m } : {};

            await sock.sendMessage(m.chat, { 
                text: menuText 
            }, sendOptions);

        } catch (err) {
            console.error('Menu Execution Error:', err);
            // Fallback send without quoted parameter
            await sock.sendMessage(m.chat, { 
                text: '⚡ Menu load zale ahe, krupaya parat type kara.' 
            }).catch(() => {});
        }
    }
};
