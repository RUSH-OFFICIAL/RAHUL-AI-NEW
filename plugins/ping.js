const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency', 'p'],
    description: 'Check bot response speed and system latency',

    async execute(sock, m, args) {
        const startTime = Date.now();
        
        // Initial reaction and message
        await m.react('⚡');
        const sentMsg = await m.reply('*Pinging system...*');
        
        const responseTime = Date.now() - startTime;
        
        // Optional: Get server uptime if available
        const uptimeSeconds = process.uptime();
        const hours = Math.floor(uptimeSeconds / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);
        const uptimeFormatted = `${hours}h ${minutes}m ${seconds}s`;

        const pingText = `
╭━━━〔 **RAHUL-AI STATUS** 〕━━━⬣
┃ 🚀 *Response Speed:* \`${responseTime} ms\`
┃ ⏱️ *Uptime:* \`${uptimeFormatted}\`
┃ 🟢 *Status:* \`Online & Stable\`
╰━━━━━━━━━━━━━━━━━━━━━━⬣`.trim();

        try {
            await sock.sendMessage(m.from, {
                text: pingText,
                edit: sentMsg.key
            });
        } catch (err) {
            console.error('Ping edit error:', err);
            // Fallback if message editing fails
            await sock.sendMessage(m.from, {
                text: `*RAHUL-AI Latency:* ${responseTime} ms`
            });
        }
    }
};
