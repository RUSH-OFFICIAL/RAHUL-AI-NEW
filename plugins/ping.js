const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Ultra stable clean ping command',

    async execute(sock, m, args) {
        try {
            const start = Date.now();
            
            // Basic chat destination resolver for all types of bot structures
            const remoteJid = m.from || m.chat || (m.key && m.key.remoteJid) || (m.sender);

            const latency = Date.now() - start;

            await sock.sendMessage(remoteJid, {
                text: `> RAHUL-AI Speed: ${latency}ms`
            }, { quoted: m });

        } catch (err) {
            console.error('Ping command critical error:', err);
            if (typeof m.reply === 'function') {
                await m.reply(`Error: ${err.message}`);
            }
        }
    }
};
