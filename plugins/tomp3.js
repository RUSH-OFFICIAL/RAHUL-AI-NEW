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

        // Check karo ki message khud video hai, ya kisi video ko reply kiya gaya hai
        const quotedMessage = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const isDirectVideo = m.mtype === 'videoMessage' || m.msg?.mimetype?.startsWith('video');
        const isQuotedVideo = quotedMessage && (quotedMessage.videoMessage || quotedMessage.documentMessage);

        if (!isDirectVideo && !isQuotedVideo) {
            return m.reply("Kripya ya toh koi video bhejte waqt caption mein `.tomp3` likhein, ya kisi video ko reply karke `.tomp3` bhejein!");
        }

        try {
            await sock.sendMessage(chatId, { react: { text: '🎵', key: m.key } });

            // Target message decide karna (direct ya quoted)
            let targetMsg = m;
            if (isQuotedVideo) {
                targetMsg = {
                    key: {
                        remoteJid: chatId,
                        id: m.message.extendedTextMessage.contextInfo.stanzaId,
                        participant: m.message.extendedTextMessage.contextInfo.participant
                    },
                    message: quotedMessage
                };
            }

            // Media download karein
            const buffer = await downloadMediaMessage(
                targetMsg,
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

            // Convert hone ke baad audio send karein (mimetype corrected)
            await sock.sendMessage(chatId, {
                audio: { url: outputPath },
                mimetype: 'audio/mpeg',
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
