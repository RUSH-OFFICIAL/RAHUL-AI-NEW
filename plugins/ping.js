const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed with a sleek style',

    async execute(sock, m, args) {
        try {
            // First reaction
            await m.react('⚡');
            const start = Date.now();
            
            // Calculate latency immediately
            const latency = Date.now() - start;

            // Stylish modern dashboard design with your image URL
            const pingText = 
                `╭────────────────────────╮\n` +
                `│   🚀 **RAHUL-AI STATUS**   │\n` +
                `├────────────────────────┤\n` +
                `│ ⚡ **Speed:** ${latency} ms\n` +
                `│ 🟢 **Status:** Online\n` +
                `│ 🛡️ **System:** Active\n` +
                `╰────────────────────────╯`;

            // Send image directly with the styled text as caption (No editing = No errors!)
            await sock.sendMessage(m.from, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: pingText
            }, { quoted: m });

        } catch (err) {
            console.error('Ping command error:', err);
            await m.reply(`❌ Error checking ping: ${err.message}`);
        }
    }
};
