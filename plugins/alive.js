const pix = require('pixcore');
const os = require('os');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Helper function to convert any audio buffer to WhatsApp PTT (OGG/Opus) format
async function convertToPtt(buffer) {
    return new Promise((resolve, reject) => {
        const tmpDir = os.tmpdir();
        const inputPath = path.join(tmpDir, `input_${Date.now()}.mp3`);
        const outputPath = path.join(tmpDir, `output_${Date.now()}.ogg`);

        fs.writeFileSync(inputPath, buffer);

        ffmpeg(inputPath)
            .audioCodec('libopus')
            .format('ogg')
            .audioChannels(1)
            .audioFrequency(48000)
            .on('error', (err) => {
                try { fs.unlinkSync(inputPath); } catch {}
                try { fs.unlinkSync(outputPath); } catch {}
                reject(err);
            })
            .on('end', () => {
                try {
                    const outputBuffer = fs.readFileSync(outputPath);
                    fs.unlinkSync(inputPath);
                    fs.unlinkSync(outputPath);
                    resolve(outputBuffer);
                } catch (e) {
                    reject(e);
                }
            })
            .save(outputPath);
    });
}

module.exports = {
    name: 'alive',
    description: 'Check bot status with full image and voice note',
    aliases: ['status', 'runtime'],
    tags: ['main'],
    command: /^(alive|status|runtime)$/i,

    async execute(sock, m) {
        try {
            await m.react('🔥');

            // Dynamic Uptime Calculation
            const uptimeSeconds = process.uptime();
            const days = Math.floor(uptimeSeconds / (3600 * 24));
            const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = Math.floor(uptimeSeconds % 60);
            const uptimeString = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // System Memory RAM
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
            const usedMem = totalMem - freeMem;
            const ramPercentage = ((usedMem / totalMem) * 100).toFixed(1);

            // Current Time & Date (Asia/Kolkata)
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const dateString = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Fetch Full Image Buffer
            const imageResponse = await fetch('https://sam-cdn.zone.id/files/rkDfPAPiha.jpg');
            const imageBuffer = await imageResponse.arrayBuffer();
            const fullImageBuffer = Buffer.from(imageBuffer);

            // Stylish Caption Layout
            const aliveCaption = `┏━━━━━━━━━━━━━━━━━━━━┓
┃     ⚡ *SYSTEM STATUS* ⚡     
┗━━━━━━━━━━━━━━━━━━━━┛
  │
  ├ 👤 *User:* @${m.sender.split('@')[0]}
  ├ 🟢 *Status:* Online & Stable
  ├ ⏱️ *Uptime:* ${uptimeString}
  ├ 💾 *Memory:* ${usedMem}MB / ${totalMem}MB (${ramPercentage}%)
  ├ 💻 *Platform:* ${os.type()} (${os.arch()})
  ├ 📅 *Date:* ${dateString}
  ├ ⏰ *Time:* ${timeString}
  │
  └───────────────────⭔
  _✨ Powered by Custom Core_`;

            // 1. Send Full Image with Caption first
            await sock.sendMessage(m.from, {
                image: fullImageBuffer,
                caption: aliveCaption,
                mentions: [m.sender]
            }, { quoted: m });

            // 2. Fetch Audio & Convert to PTT (Voice Note)
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
            const audioResponse = await fetch(audioUrl);
            if (!audioResponse.ok) throw new Error('Failed to fetch audio url');
            const rawAudioBuffer = await audioResponse.arrayBuffer();

            const pttBuffer = await convertToPtt(Buffer.from(rawAudioBuffer));

            // Send Voice Note right after the image
            await sock.sendMessage(m.from, {
                audio: pttBuffer,
                mimetype: 'audio/ogg; codecs=opus',
                ptt: true
            }, { quoted: m });

        } catch (err) {
            console.error('❌ Alive Error:', err);
            await m.reply('⚠️ Error executing alive command.');
        }
    },
};
