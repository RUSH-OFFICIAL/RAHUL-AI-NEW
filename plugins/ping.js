const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed with audio response',

    async execute(sock, m, args) {
        try {
            if (m && typeof m.react === 'function') {
                await m.react('🎵').catch(() => {});
            }

            const startTime = Date.now();
            const chatId = m.from || m.chat || (m.key && m.key.remoteJid);
            const latency = Date.now() - startTime;

            // Send text info first
            await sock.sendMessage(chatId, {
                text: `> 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 Ping: ${latency}ms`
            }, { quoted: m });

            // Send clean audio message (Syntax error fixed completely)
            await sock.sendMessage(chatId, {
                audio: { url: 'https://spider-avik.zone.id/file/jwfyt2.mpeg' },
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: m });

        } catch (err) {
            console.error('Audio Ping error:', err);
            const chatId = m.from || m.chat;
            await sock.sendMessage(chatId, {
                text: `❌ Error: ${err.message}`
            }, { quoted: m });
        }
    }
};
