module.exports = {
    name: 'menu',
    description: 'Safe Text Menu',
    aliases: ['help', 'cmdlist', 'commands', 'menu2'],
    tags: ['main'],
    command: /^(menu|help|cmdlist|commands|menu2)$/i,

    async execute(sock, m) {
        try {
            await m.react('⚡');

            const menuText = `
╭━━━〔 *RAHUL - AI* 〕━━━
┃ 👤 User   : ${m.pushName || 'User'}
┃ 🔑 Prefix : [ . ]
╰━━━━━━━━━━━━━━━━━━

⚡ *SYSTEM CORE*
  │ • .alive
  │ • .ping
  │ • .uptime
  │ • .owner
  │ • .guide

📥 *DOWNLOAD HUB*
  │ • .tiktok
  │ • .ytmp3
  │ • .ig

🛠️ *UTILITY TOOLS*
  │ • .sticker
  │ • .ocr
  │ • .tts
  │ • .poll
  │ • .shazam
  │ • .chid

🧠 *AI INTELLIGENCE*
  │ • .ai
  │ • .ai-search
  │ • .aiv
  │ • .gen

🎭 *ENTERTAINMENT*
  │ • .blue
  │ • .flag
  │ • .guessgender
  │ • .agecalculator
  │ • .style

🌸 *ANIME ARCHIVE*
  │ • .weather
  │ • .waifu
  │ • .neko
  │ • .kitsune
  │ • .husbando

🛡️ *GROUP SUITE*
  │ • .tagall
  │ • .tagme
  │ • .couplepp
  │ • .group
  │ • .ginfo
  │ • .kick
  │ • .promote
  │ • .demote

───────────────────
> _POWERED BY RAHUL MASTER_
`.trim();

            await sock.sendMessage(m.from, { text: menuText }, { quoted: m });

        } catch (err) {
            console.error('❌ Menu plugin error:', err);
        }
    },
};
