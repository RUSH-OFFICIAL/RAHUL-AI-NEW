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
            
            // Send initial text message
            const sentMsg = await sock.sendMessage(m.from, {
                text: '```🔄 Initializing RAHUL-AI Latency Test...```'
            }, { quoted: m });

            const latency = Date.now() - start;

            // Stylish modern dashboard design including the image link aesthetic
            const pingText = 
                `╭────────────────────────╮\n` +
                `│   🚀 **RAHUL-AI STATUS**   │\n` +
                `├────────────────────────┤\n` +
                `│ ⚡ **Speed:** ${latency} ms\n` +
                `│ 🟢 **Status:** Online\n` +
                `│ 🛡️ **System:** Active\n` +
                `╰────────────────────────╯\n` +
                `🖼️ *Media:* https://sam-cdn.zone.id/files/xQer9GrIVT.jpg`;

            // Seamlessly edit the text message without any crash
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
