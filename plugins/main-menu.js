module.exports = {
    name: 'menu',
    description: 'Safe Interactive Slide Menu',
    aliases: ['help', 'cmdlist', 'commands', 'menu2'],
    tags: ['main'],
    command: /^(menu|help|cmdlist|commands|menu2)$/i,

    async execute(sock, m) {
        try {
            await m.react('⚡');

            const targetJid = m.from || m.chat || (m.key && m.key.remoteJid);
            if (!targetJid) return;

            const prefix = global.BOT_PREFIX || '.';
            const user = m.pushName || 'User';

            // Fixed and structured sections for Baileys Interactive List
            const sections = [
                {
                    title: "⚡ SYSTEM CORE & DOWNLOADS",
                    rows: [
                        { title: "Alive Status", rowId: `${prefix}alive`, description: "Check if bot is active" },
                        { title: "Ping & Uptime", rowId: `${prefix}ping`, description: "Check bot speed and uptime" },
                        { title: "TikTok Downloader", rowId: `${prefix}tiktok`, description: "Download TikTok videos" },
                        { title: "YouTube MP3", rowId: `${prefix}ytmp3`, description: "Download YT audio" }
                    ]
                },
                {
                    title: "🛠️ UTILITY & AI TOOLS",
                    rows: [
                        { title: "Sticker Maker", rowId: `${prefix}sticker`, description: "Convert image to sticker" },
                        { title: "AI Assistant", rowId: `${prefix}ai`, description: "Chat with AI model" },
                        { title: "OCR Tool", rowId: `${prefix}ocr`, description: "Extract text from images" },
                        { title: "Weather Info", rowId: `${prefix}weather`, description: "Check live weather" }
                    ]
                }
            ];

            const listMessage = {
                text: `*RAHUL - AI CONTROL HUB*\n\n👋 Hello *${user}*, select an option below from the slide menu list or type commands directly using prefix *[ ${prefix} ]*.\n\n> _POWERED BY RAHUL MASTER_`,
                footer: "Rahul Master Bot Platform",
                title: "🌟 INTERACTIVE MENU",
                buttonText: "Click Here To View Menu",
                sections
            };

            // Safely dispatching interactive list payload to prevent undefined property crashes
            await sock.sendMessage(targetJid, listMessage, { quoted: m });

        } catch (err) {
            console.error('❌ Interactive Menu plugin error:', err);
        }
    },
};
