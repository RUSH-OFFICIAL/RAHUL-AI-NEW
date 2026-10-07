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

            await sock.sendMessage(chatJid, { text: menuText }, { quoted: m });
            console.log("Menu sent successfully to:", chatJid);

        } catch (err) {
            console.error('Menu Execution Error:', err);
        }
    }
};
