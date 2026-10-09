const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys'); // Ya aapka jo bhi media download method ho
const ffmpeg = require('fluent-ffmpeg');

module.exports = {
    name: 'tomp3',
    description: 'Convert any video file or video message to MP3 audio',
    aliases: ['toaudio', 'mp3'],
    command: /^.?(tomp3|toaudio|mp3)/i,

    async execute(sock, m, args) {
        await m.react('🔄');
        const chatId = m.key.remoteJid;

        // Check karo ki user ne kisi video message ko reply/quote kiya hai ya nahi
        const quoted = m.msg?.contextInfo?.quotedMessage;
        const isVideo = m.msg?.mimetype?.startsWith('video') || quoted?.videoMessage;

        if (!isVideo) {
            return m.reply("Kripya kisi video file ko reply karke ye command dein: `.tomp3`");
        }

        try {
            await sock.sendMessage(chatId, { react: { text: '🎵', key: m.key } });

            // Video message message object nikalein
            const targetMessage = quoted ? { key: { remoteJid: chatId, id: m.msg.contextInfo.stanzaId, fromMe: false }, message: quoted } : m;

            // Media download karein
            const buffer = await downloadMediaMessage(
                targetMessage,
                'buffer',
                {},
                { logger: console }
            );

            const inputPath = path.join(__dirname, `../../temp_${Date.now()}.mp4`);
            const outputPath = path.join(__dirname, `../../output_${Date.now()}.mp3`);

            // Temporary file save karein
            fs.writeFileSync(inputPath, buffer);

            // FFmpeg se Video ko MP3 me convert karein
            await new Promise((resolve, reject) => {
                ffmpeg(inputPath)
                    .audioCodec('libmp3lame')
                    .toFormat('mp3')
                    .on('end', resolve)
                    .on('error', reject)
                    .save(outputPath);
            });

            // Convert hone ke baad audio send karein
            await sock.sendMessage(chatId, {
                audio: { url: outputPath },
                mimetype: 'audio/mp4',
                ptt: false // false matlab normal audio song ki tarah jayegi
            }, { quoted: m });

            // Temporary files delete kar dein taaki storage na bhare
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            
            await m.react('✅');

        } catch (err) {
            console.error('Video to MP3 conversion error:', err);
            m.reply('Video ko MP3 me convert karne me fail ho gaya. Make sure aapke system me ffmpeg installed hai.');
        }
    }
};
