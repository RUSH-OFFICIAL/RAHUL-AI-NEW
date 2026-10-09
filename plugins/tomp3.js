const fs = require('fs');
const path = require('path');
const { downloadMediaMessage } = require('@whiskeysockets/baileys');
const ffmpeg = require('fluent-ffmpeg');

module.exports = {
    name: 'tomp3',
    description: 'Convert any video file or video message to MP3 audio',
    aliases: ['toaudio', 'mp3'],
    command: /^.?(tomp3|toaudio|mp3)/i,

    async execute(sock, m, args) {
        await m.react('🔄');
        const chatId = m.key.remoteJid;

        let targetMsg = null;
        let isVideoFound = false;

        // 1. Check karo ki kya user ne kisi video ko reply kiya hai
        const quoted = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        if (quoted && (quoted.videoMessage || quoted.documentMessage)) {
            const quotedContext = m.message.extendedTextMessage.contextInfo;
            targetMsg = {
                key: {
                    remoteJid: chatId,
                    id: quotedContext.stanzaId,
                    participant: quotedContext.participant,
                    fromMe: false
                },
                message: quoted
            };
            isVideoFound = true;
        } 
        // 2. Check karo ki kya current message hi khud ek video message hai
        else if (m.message?.videoMessage || m.msg?.mimetype?.startsWith('video')) {
            targetMsg = m;
            isVideoFound = true;
        }

        if (!isVideoFound) {
            return m.reply("Kripya kisi video ko reply karke `.tomp3` likhein!");
        }

        try {
            await sock.sendMessage(chatId, { react: { text: '🎵', key: m.key } });

            // Media download karein
            const buffer = await downloadMediaMessage(
                targetMsg,
                'buffer',
                {},
                { logger: console }
            );

            const inputPath = path.join(__dirname, `../../temp_${Date.now()}.mp4`);
            const outputPath = path.join(__dirname, `../../output_${Date.now()}.mp3`);

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

            // Audio send karein
            await sock.sendMessage(chatId, {
                audio: { url: outputPath },
                mimetype: 'audio/mp4',
                ptt: false 
            }, { quoted: m });

            // Temporary files delete kar dein
            if (fs.existsSync(inputPath)) fs.unlinkSync(inputPath);
            if (fs.existsSync(outputPath)) fs.unlinkSync(outputPath);
            
            await m.react('✅');

        } catch (err) {
            console.error('Video to MP3 conversion error:', err);
            m.reply('Video ko MP3 me convert karne mein fail ho gaya. Make sure FFmpeg installed hai.');
        }
    }
};
