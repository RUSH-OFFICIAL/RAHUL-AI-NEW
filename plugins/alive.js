const axios = require('axios');

module.exports = {
    name: 'alive',
    description: 'Check if the bot is online',
    aliases: ['botstatus', 'status'],

    async execute(sock, m) {
        await m.react('🟢');

        const prefix = global.BOT_PREFIX || '.';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        // Uptime Calculation
        const uptimeSeconds = process.uptime();
        const days = Math.floor(uptimeSeconds / (3600 * 24));
        const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = Math.floor(uptimeSeconds % 60);

        const aliveText = `
👋 Hi *${user}*!

🟢 *RAHUL-AI IS ALIVE*

• *Status:* Online & Active
• *Prefix:* [ *${prefix}* ]
• *Uptime:* ${days}d ${hours}h ${minutes}m ${seconds}s

> Powered by RAHUL-AI
`.trim();

        try {
            const imageUrl = global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg';
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await sock.sendMessage(m.chat, {
                image: imageBuffer,
                caption: aliveText
            }, { quoted: m });

        } catch (err) {
            console.error('Alive error:', err);
            await sock.sendMessage(m.chat, { text: aliveText }, { quoted: m });
        }
    }
};
