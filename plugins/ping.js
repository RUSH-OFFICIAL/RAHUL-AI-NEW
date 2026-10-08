const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed with a working audio voice note',

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

            // Download audio as buffer first to prevent external URL crashes
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
            const response = await axios.get(audioUrl, { responseType: 'arraybuffer' });
            const audioBuffer = Buffer.from(response.data);

            // Send the buffer audio safely
            await sock.sendMessage(chatId, {
                audio: audioBuffer,
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
