const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed with a sleek style',

    async execute(sock, m, args) {
        try {
            // First reaction and initial message
            await m.react('⚡');
            const start = Date.now();
            
            // Send initial message with image and caption
            const sentMsg = await sock.sendMessage(m.from, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: '```🔄 Calculating RAHUL-AI Latency...```'
            }, { quoted: m });

            const latency = Date.now() - start;

            // Stylish modern dashboard design
            const pingText = 
                `╭────────────────────────╮\n` +
                `│   🚀 **RAHUL-AI STATUS**   │\n` +
                `├────────────────────────┤\n` +
                `│ ⚡ **Speed:** ${latency} ms\n` +
                `│ 🟢 **Status:** Online\n` +
                `│ 🛡️ **System:** Active\n` +
                `╰────────────────────────╯`;

            // Edit the caption of the sent image message
            await sock.sendMessage(m.from, {
                text: pingText,
                edit: sentMsg.key
            });

        } catch (err) {
            console.error('Ping command error:', err);
            await m.reply(`❌ Error checking ping: ${err.message}`);
        }
    }
};
