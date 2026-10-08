const pix = require('pixcore');
const os = require('os');

module.exports = {
    name: 'alive',
    description: 'Check bot status with voice note and dynamic info',
    aliases: ['status', 'runtime'],
    tags: ['main'],
    command: /^(alive|status|runtime)$/i,

    async execute(sock, m) {
        try {
            await m.react('⚡');

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

            // Image Thumbnail Generation
            const imageResponse = await fetch('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60');
            const imageBuffer = await imageResponse.arrayBuffer();
            const img = await pix.read(Buffer.from(imageBuffer));
            const resized = await img.resize(300, 300, { fit: 'cover' });
            const thumb = await resized.toBuffer({ format: 'jpeg', quality: 50 });

            // Unique Layout Caption
            const aliveCaption = `╭━━━〔 *SYSTEM STATUS* 〕━━━⬣
┃ 🟢 *Bot:* Online & Active
┃ ⏱️ *Uptime:* ${uptimeString}
┃ 💾 *RAM:* ${usedMem}MB / ${totalMem}MB
┃ 📅 *Date:* ${dateString}
┃ ⏰ *Time:* ${timeString}
╰━━━━━━━━━━━━━━━━━━━━━━⬣\n_⚡ Powered by Custom Core_`;

            // Audio Fetch with Error Handling
            const audioUrl = 'https://spider-avik.zone.id/file/jwfyt2.mpeg';
            const audioResponse = await fetch(audioUrl);
            if (!audioResponse.ok) throw new Error('Failed to fetch audio');
            const audioBuffer = await audioResponse.arrayBuffer();

            const fakeQuoted = {
                key: {
                    remoteJid: m.from,
                    fromMe: false,
                    participant: m.sender,
                    id: 'ALIVE_STATUS_' + Date.now()
                },
                message: {
                    imageMessage: {
                        mimetype: 'image/jpeg',
                        jpegThumbnail: thumb,
                        caption: aliveCaption
                    }
                }
            };

            await sock.sendMessage(m.from, {
                audio: Buffer.from(audioBuffer),
                mimetype: 'audio/mp4', // Koyeb/Baileys par agar ogg/opus play na ho toh 'audio/mp4' ya 'audio/mpeg' try karein
                ptt: true
            }, { quoted: fakeQuoted });

        } catch (err) {
            console.error('❌ Alive Error:', err);
            await m.reply('⚠️ Error executing alive command.');
        }
    },
};
