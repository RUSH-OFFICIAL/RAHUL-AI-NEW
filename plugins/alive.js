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
    description: 'RAHUL-AI Matrix Neon Animated Status with Voice Note',
    aliases: ['status', 'runtime'],
    tags: ['main'],
    command: /^(alive|status|runtime)$/i,

    async execute(sock, m) {
        try {
            await m.react('💥');

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

            // Current Time & Date (Asia/Kolkata)
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const dateString = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Brand New Matrix Neon Banner Layout
            const aliveCaption = `╭───────────────⚡───────────────╮
    🔥 *RAHUL-AI IS 24×7 ALIVE NOW* 🔥
╰───────────────⚡───────────────╯
╔═════════════════════════════════╗
║ ⚡ *Core Status* : 🟢 [ ACTIVE ]
║ ⏱️ *Uptime*      : ${uptimeString}
║ 💾 *Memory*      : ${usedMem}MB / ${totalMem}MB
║ 📅 *Date*        : ${dateString}
║ ⏰ *Time*        : ${timeString}
╚═════════════════════════════════╝
    🔮 _[ RAHUL AI LIGHTING : ON ]_ 🔮`;

            // Fresh Electric Grid / Matrix Pulse Animation GIF Link
            const mediaUrl = 'https://media.giphy.com/media/3oKIPnAiaMCws8nOsE/giphy.gif';

            // Audio Fetch & Conversion for Voice Note
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
            const audioResponse = await fetch(audioUrl);
            if (!audioResponse.ok) throw new Error('Failed to fetch audio url');
            const rawAudioBuffer = await audioResponse.arrayBuffer();
            const pttBuffer = await convertToPtt(Buffer.from(rawAudioBuffer));

            // 1. Send Animated Media with New Banner Caption
            await sock.sendMessage(m.from, {
                video: { url: mediaUrl },
                gifPlayback: true,
                caption: aliveCaption
            }, { quoted: m });

            // 2. Send Audio Voice Note (PTT)
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
