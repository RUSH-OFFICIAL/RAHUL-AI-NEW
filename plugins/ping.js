const axios = require('axios');

module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed with audio response',

    async execute(sock, m, args) {
        try {
            // Reaction sathi safe check
            if (m && typeof m.react === 'function') {
                await m.react('🎵').catch(() => {});
            }

            const startTime = Date.now();
            const chatId = m.from || m.chat || (m.key && m.key.remoteJid);
            const latency = Date.now() - startTime;

            // Text info sobat (optional)
            await sock.sendMessage(chatId, {
                text: `> 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 Ping: ${latency}ms`
            }, { quoted: m });

            // Audio pathvnyasathi khali URL kinva local file path taku shaktoS
            // Jar local file asel tar: { url: './path/to/audio.mp3' }
            await sock.sendMessage(chatId, {
                audio: { url: 'https://spider-avik.zone.id/file/jwfyt2.mpeg';'}, // Yethe tuza audio URL kinva path tak
                mimetype: 'audio/mp4',
                ptt: true // true kelyavar voice note sarakhi disel, false kelyavar normal audio file
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
