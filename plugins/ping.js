const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed with a sleek image layout',

    async execute(sock, m, args) {
        try {
            // Safe reaction
            if (m && typeof m.react === 'function') {
                await m.react('🚀').catch(() => {});
            }

            const start = Date.now();
            const chatId = m.from || m.chat || (m.key && m.key.remoteJid);

            // Send initial image with loading text
            const sentMsg = await sock.sendMessage(chatId, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: '```🔄 Measuring RAHUL-AI speed...```'
            }, { quoted: m });

            const latency = Date.now() - start;

            const finalCaption = 
                `╭────────────────────────╮\n` +
                `│   ⚡ **RAHUL-AI LATENCY**  │\n` +
                `├────────────────────────┤\n` +
                `│ 🚀 Response : ${latency} ms\n` +
                `│ 🛡️ Status   : Active\n` +
                `╰────────────────────────╯`;

            // Edit the image caption smoothly
            if (sentMsg && sentMsg.key) {
                await sock.sendMessage(chatId, {
                    text: finalCaption,
                    edit: sentMsg.key
                });
            } else {
                // Fallback if key is missing
                await sock.sendMessage(chatId, {
                    image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                    caption: finalCaption
                }, { quoted: m });
            }

        } catch (err) {
            console.error('Ping error:', err);
            const chatId = m.from || m.chat;
            await sock.sendMessage(chatId, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: `> 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸: Online`
            }, { quoted: m });
        }
    }
};
