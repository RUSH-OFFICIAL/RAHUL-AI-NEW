const pix = require('pixcore');
const os = require('os');

module.exports = {
    name: 'alive',
    description: 'Check if the bot is alive with dynamic stats',
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

            // Dynamic System RAM Usage
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(2);
            const usedMem = (totalMem - freeMem).toFixed(2);

            // Dynamic Current Date & Time
            const now = new Date();
            const timeString = now.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const dateString = now.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

            const width = 350;
            const height = 350;

            // Fetching a fresh aesthetic image
            const imageResponse = await fetch('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60');
            const imageBuffer = await imageResponse.arrayBuffer();

            const img = await pix.read(Buffer.from(imageBuffer));
            const resized = await img.resize(width, height, { fit: 'cover' });
            const thumb = await resized.toBuffer({ format: 'jpeg', quality: 50 });

            // Unique Dynamic Caption
            const aliveCaption = `╭━━━〔 **SYSTEM ACTIVE** 〕━━━⬣
┃ ✨ **Status:** Online & Stable
┃ ⏱️ **Uptime:** ${uptimeString}
┃ 💾 **RAM Usage:** ${usedMem}MB / ${totalMem}MB
┃ 📅 **Date:** ${dateString}
┃ ⏰ **Time:** ${timeString}
╰━━━━━━━━━━━━━━━━━━━━━━⬣\n_⚡ Powered by Custom Core_`;

            const audioUrl = 'https://tmpfiles.org/dl/wXApgYwfGOZf/file_1791436873351.mp3?filename=notification-sound-7062.mp3';
            const audioResponse = await fetch(audioUrl);
            const audioBuffer = await audioResponse.arrayBuffer();

            const fakeQuoted = {
                key: {
                    remoteJid: m.from,
                    fromMe: false,
                    participant: m.sender,
                    id: 'unique_alive_' + Date.now()
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
                mimetype: 'audio/mp4',
                ptt: true // Voice note format madhe play hoil
            }, { quoted: fakeQuoted });

        } catch (err) {
            console.error('❌ Unique Alive Plugin Error:', err);
            await m.reply('⚠️ Ani error occurred while checking bot status.');
        }
    },
};
