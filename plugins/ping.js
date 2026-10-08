const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed',

    async execute(sock, m, args) {
        try {
            await m.react('🚀');
            const start = Date.now();
            
            // Send initial image message with pinging text
            const sentMsg = await sock.sendMessage(m.from, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: '```Pinging...```'
            }, { quoted: m });

            const latency = Date.now() - start;
            const info = `> 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸: ${latency} ms`;

            // Edit the caption of the image message safely
            await sock.sendMessage(m.from, {
                text: info,
                edit: sentMsg.key
            });

        } catch (err) {
            console.error('Ping error:', err);
            // Fallback just in case editing fails
            const startFallback = Date.now();
            const latencyFallback = Date.now() - startFallback;
            await sock.sendMessage(m.from, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: `> 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸: ${latencyFallback} ms`
            }, { quoted: m });
        }
    }
};
