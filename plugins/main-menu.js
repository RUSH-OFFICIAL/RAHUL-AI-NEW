module.exports = {
    name: 'menu',
    description: 'Geometric line art style image menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        const MENU_IMAGE_URL = 'https://sam-cdn.zone.id/files/ZBp0sbXtJB.jpg';

        try {
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

            const user = m?.pushName || 'User';

            const menuText = `
───❖───✦ *𝚁𝙰𝙷𝚄𝙻 - 𝙰𝙸* ✦───❖───

◆ ───〔 *USER PROFILE* 〕─── ◆
  │ 👤 User   : ${user}
  │ 👑 Master : 𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁
  │ 📅 Date   : ${date}
  │ ⏰ Time   : ${time}
  │ 🔑 Prefix : [ ${prefix} ]
  └───────────────────────

▲ ━━━ *CORE SYSTEM*
  ◈ ${prefix}alive   ◈ ${prefix}ping
  ◈ ${prefix}uptime  ◈ ${prefix}owner
  ◈ ${prefix}guide

▲ ━━━ *DOWNLOAD HUB*
  ◈ ${prefix}tiktok  ◈ ${prefix}ytmp3
  ◈ ${prefix}ig

▲ ━━━ *UTILITIES*
  ◈ ${prefix}sticker ◈ ${prefix}ocr
  ◈ ${prefix}tts     ◈ ${prefix}poll
  ◈ ${prefix}shazam  ◈ ${prefix}chid

▲ ━━━ *AI MODULES*
  ◈ ${prefix}ai      ◈ ${prefix}ai-search
  ◈ ${prefix}aiv     ◈ ${prefix}gen

▲ ━━━ *ENTERTAINMENT*
  ◈ ${prefix}blue    ◈ ${prefix}flag
  ◈ ${prefix}guessgender
  ◈ ${prefix}agecalculator
  ◈ ${prefix}style

▲ ━━━ *ANIME WORLD*
  ◈ ${prefix}weather ◈ ${prefix}waifu
  ◈ ${prefix}neko    ◈ ${prefix}kitsune
  ◈ ${prefix}husbando

▲ ━━━ *GROUP SUITE*
  ◈ ${prefix}tagall  ◈ ${prefix}tagme
  ◈ ${prefix}couplepp◈ ${prefix}group
  ◈ ${prefix}ginfo   ◈ ${prefix}kick
  ◈ ${prefix}promote ◈ ${prefix}demote

───❖───✦ *𝚁𝙰𝙷𝚄𝙻 - 𝙼𝙰𝚂𝚃𝙴𝚁* ✦───❖───
> ⚡ *POWERED BY RAHUL MASTER*
`.trim();

            try {
                await sock.sendMessage(chatJid, {
                    image: { url: MENU_IMAGE_URL },
                    caption: menuText
                });
            } catch (imgErr) {
                console.error('Geometric Image load fail, fallback to text:', imgErr);
                await sock.sendMessage(chatJid, { text: menuText });
            }

        } catch (err) {
            console.error('Geometric Menu Error:', err);
        }
    }
};
