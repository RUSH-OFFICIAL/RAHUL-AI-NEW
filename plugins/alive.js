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

            // Dynamic Uptime
            const uptimeSeconds = process.uptime();
            const d = Math.floor(uptimeSeconds / (3600 * 24));
            const h = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
            const mMin = Math.floor((uptimeSeconds % 3600) / 60);
            const s = Math.floor(uptimeSeconds % 60);
            const uptime = `${d}d ${h}h ${mMin}m ${s}s`;

            // System RAM
            const totalMem = (os.totalmem() / 1024 / 1024).toFixed(0);
            const freeMem = (os.freemem() / 1024 / 1024).toFixed(0);
            const usedMem = totalMem - freeMem;

            // Date & Time
            const dateObj = new Date();
            const time = dateObj.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
            const date = dateObj.toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' });

            // Thumbnail Image Processing
            const imgRes = await fetch('https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60');
            const imgBuffer = await imgRes.arrayBuffer();
            const img = await pix.read(Buffer.from(imgBuffer));
            const resized = await img.resize(300, 300, { fit: 'cover' });
            const thumb = await resized.toBuffer({ format: 'jpeg', quality: 50 });

            // Stylish Text Layout
            const caption = `┏━━⟪ *BOT STATUS* ⟫━━┓
┃ 🟢 *State:* Active & Running
┃ ⏱️ *Uptime:* ${uptime}
┃ 💾 *Memory:* ${usedMem}MB / ${totalMem}MB
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┗━━━━━━━━━━━━━━━┛\n_✨ Designed for Elite Performance_`;

            // Stable Audio URL (GitHub raw or direct CDN link use kara jo download support karto)
            // Me ithe ek reliable direct audio link takli ahe, tumhi tumcha audio pan ya format madhe taku shakta.
            const audioUrl = 'https://raw.githubusercontent.com/Khushalsoni08/Database/main/audio/alive.mp3'; 
            
            // Jari tumhala tunch audio use karaycha asel, tar to GitHub raw link var upload karun ithe taka, mhanje error येणार nahi.
            let audioBuffer;
            try {
                const audioRes = await fetch(audioUrl);
                audioBuffer = await audioRes.arrayBuffer();
            } catch (e) {
                // Fallback direct audio stream jar fetch fail zali tar
                audioBuffer = null;
            }

            const fakeQuoted = {
                key: {
                    remoteJid: m.from,
                    fromMe: false,
                    participant: m.sender,
                    id: 'ALIVE_' + Math.floor(Math.random() * 1000000)
                },
                message: {
                    imageMessage: {
                        mimetype: 'image/jpeg',
                        jpegThumbnail: thumb,
                        caption: caption
                    }
                }
            };

            if (audioBuffer) {
                await sock.sendMessage(m.from, {
                    audio: Buffer.from(audioBuffer),
                    mimetype: 'audio/mp4',
                    ptt: true // Voice note sathi true thevla ahe
                }, { quoted: fakeQuoted });
            } else {
                await sock.sendMessage(m.from, { text: caption }, { quoted: fakeQuoted });
            }

        } catch (err) {
            console.error('❌ Alive Error:', err);
            await m.reply('❌ Error executing alive command.');
        }
    },
};
