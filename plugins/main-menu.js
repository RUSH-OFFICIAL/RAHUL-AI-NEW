module.exports = {
    name: 'menu',
    description: 'Safe Minimalist Wave Text Menu',
    aliases: ['help', 'cmdlist', 'commands', 'menu2'],
    tags: ['main'],
    command: /^(menu|help|cmdlist|commands|menu2)$/i,

    async execute(sock, m) {
        try {
            await m.react('⚡');

            const prefix = global.BOT_PREFIX || '.';
            const user = m.pushName || 'User';

            const menuText = `
🌊 ~~~~~~~~~~~~~~~~~~~~~~~ 🌊
       ⚡ RAHUL - AI ⚡
🌊 ~~~~~~~~~~~~~~~~~~~~~~~ 🌊
👤 User   : ${user}
🔑 Prefix : [ ${prefix} ]
───────────────────────────

✦ *SYSTEM CORE*
  🔸 ${prefix}alive
  🔸 ${prefix}ping
  🔸 ${prefix}uptime
  🔸 ${prefix}owner
  🔸 ${prefix}guide

✦ *DOWNLOAD HUB*
  🔸 ${prefix}tiktok
  🔸 ${prefix}ytmp3
  🔸 ${prefix}ig

✦ *UTILITY TOOLS*
  🔸 ${prefix}sticker
  🔸 ${prefix}ocr
  🔸 ${prefix}tts
  🔸 ${prefix}poll
  🔸 ${prefix}shazam
  🔸 ${prefix}chid

✦ *AI INTELLIGENCE*
  🔸 ${prefix}ai
  🔸 ${prefix}ai-search
  🔸 ${prefix}aiv
  🔸 ${prefix}gen

✦ *ENTERTAINMENT*
  🔸 ${prefix}blue
  🔸 ${prefix}flag
  🔸 ${prefix}guessgender
  🔸 ${prefix}agecalculator
  🔸 ${prefix}style

✦ *ANIME ARCHIVE*
  🔸 ${prefix}weather
  🔸 ${prefix}waifu
  🔸 ${prefix}neko
  🔸 ${prefix}kitsune
  🔸 ${prefix}husbando

✦ *GROUP SUITE*
  🔸 ${prefix}tagall
  🔸 ${prefix}tagme
  🔸 ${prefix}couplepp
  🔸 ${prefix}group
  🔸 ${prefix}ginfo
  🔸 ${prefix}kick
  🔸 ${prefix}promote
  🔸 ${prefix}demote

───────────────────────────
> _POWERED BY RAHUL MASTER_
`.trim();

            await sock.sendMessage(m.from, { text: menuText }, { quoted: m });

        } catch (err) {
            console.error('❌ Menu plugin error:', err);
        }
    },
};
