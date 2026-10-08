const pix = require('pixcore');

module.exports = {
    name: 'alive',
    description: 'Check if the bot is alive with a modern style and custom audio',
    aliases: ['status', 'botstatus'],
    tags: ['main'],
    command: /^(alive|status)$/i,

    async execute(sock, m) {
        try {
            // React with lightning to acknowledge command receipt
            await m.react('⚡');
            
            const width = 300;
            const height = 300;

            // Fetching thumbnail image (Updated with your link)
            const imageResponse = await fetch('https://sam-cdn.zone.id/files/C0SGPFVlH3.jpg');
            const imageBuffer = await imageResponse.arrayBuffer();

            const img = await pix.read(Buffer.from(imageBuffer));
            const resized = await img.resize(width, height, { fit: 'cover' });
            const thumb = await resized.toBuffer({ format: 'jpeg', quality: 40 });

            // Updated audio URL for "See You Again"
            const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
            const audioResponse = await fetch(audioUrl);
            const audioBuffer = await audioResponse.arrayBuffer();

            const fakeQuoted = {
                key: {
                    remoteJid: m.from,
                    fromMe: false,
                    participant: m.sender,
                    id: 'ALIVE_V2_ID'
                },
                message: {
                    imageMessage: {
                        mimetype: 'image/jpeg',
                        jpegThumbnail: thumb,
                        caption: '✨ System Status: ONLINE & Active!'
                    }
                }
            };

            // Sending voice note / audio file
            await sock.sendMessage(m.from, {
                audio: Buffer.from(audioBuffer),
                mimetype: 'audio/mp4',
                ptt: true // Set to false if you want it as a regular audio file instead of a voice note
            }, { quoted: fakeQuoted });

        } catch (err) {
            console.error('❌ Alive plugin error:', err);
        }
    },
};
