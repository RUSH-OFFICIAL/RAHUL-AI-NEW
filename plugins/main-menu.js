module.exports = {
    name: 'menu',
    command: 'menu',
    aliases: ['help', 'cmdlist', 'commands', 'menu2'],
    description: 'Safe Minimalist Wave Text Menu',

    async execute(sock, m) {
        try {
            // Safe JID extraction for all Baileys versions
            const chatJid = m.chat || (m.key && m.key.remoteJid) || m.from;
            if (!chatJid) {
                console.log("Menu Error: chatJid not found for message:", m);
                return;
            }

            const prefix = global.BOT_PREFIX || '.';
            const user = m.pushName || 'User';

            const menuText = `
🌊 ~~~~~~~~~~~~~~~~~~~~~~~ 🌊
       ⚡ RAHUL - AI ⚡
🌊 ~~~~~~~~~~~~~~~~~~~~~~~ 🌊
👤 User   : Rahul
🔑 Prefix : [ . ]
───────────────────────────

✦ *SYSTEM CORE*
  🔸 .alive
  🔸 .ping
  🔸 .uptime
  🔸 .owner
  🔸 .guide

✦ *DOWNLOAD HUB*
  🔸 .tiktok
  🔸 .ytmp3
  🔸 .ig

✦ *UTILITY TOOLS*
  🔸 .sticker
  🔸 .ocr
  🔸 .tts
  🔸 .poll
  🔸 .shazam
  🔸 .chid

✦ *AI INTELLIGENCE*
  🔸 .ai
  🔸 .ai-search
  🔸 .aiv
  🔸 .gen

✦ *ENTERTAINMENT*
  🔸 .blue
  🔸 .flag
  🔸 .guessgender
  🔸 .agecalculator
  🔸 .style

✦ *ANIME ARCHIVE*
  🔸 .weather
  🔸 .waifu
  🔸 .neko
  🔸 .kitsune
  🔸 .husbando

✦ *GROUP SUITE*
  🔸 .tagall
  🔸 .tagme
  🔸 .couplepp
  🔸 .group
  🔸 .ginfo
  🔸 .kick
  🔸 .promote
  🔸 .demote

───────────────────────────
> _POWERED BY RAHUL MASTER_
`.trim();
