const os = require('os');
const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

// Helper function to convert audio to WhatsApp PTT format
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
    description: 'Simple and fast RAHUL-AI alive status with voice note',
    aliases: ['status', 'runtime'],
    tags: ['main'],
    command: /^(alive|status|runtime)$/i,

    async execute(sock, m) {
        try {
            await m.react('✨');

            // Uptime Calculation
            const uptimeSeconds = process.uptime();
            const days = Math.floor(uptimeSeconds / (3600 * 24));
            const hours = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
            const minutes = Math.floor((uptimeSeconds % 3600) / 60);
            const seconds = Math.floor(uptimeSeconds % 60);
            const uptime = `${days}d ${hours}h ${minutes}m ${seconds}s`;

            // RAM Usage
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
            const usedMem = totalMem - freeMem;

            // Date & Time
            const now = new Date();
            const time = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const date = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Simple & Clean Text
            const text = `*RAHUL-AI IS 24×7 ALIVE NOW* 🟢

*Uptime:* ${uptime}
*RAM:* ${usedMem}MB / ${totalMem}MB
*Date:* ${date}
*Time:* ${time}`;

            // Send simple text message
            await sock.sendMessage(m.from, { text: text }, { quoted: m });

            // Audio Voice Note (PTT)
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
            const audioResponse = await fetch(audioUrl);
            if (!audioResponse.ok) throw new Error('Failed to fetch audio');
            const rawAudioBuffer = await audioResponse.arrayBuffer();
            const pttBuffer = await convertToPtt(Buffer.from(rawAudioBuffer));

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
