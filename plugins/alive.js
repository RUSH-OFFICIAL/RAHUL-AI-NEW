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
            
            const width = 1080;
            const height = 1080;

            // Fetching thumbnail/full image
            const imageResponse = await fetch('https://sam-cdn.zone.id/files/C0SGPFVlH3.jpg');
            const imageBuffer = await imageResponse.arrayBuffer();

            const img = await pix.read(Buffer.from(imageBuffer));
            const resized = await img.resize(width, height, { fit: 'cover' });
            const thumb = await resized.toBuffer({ format: 'jpeg', quality: 80 });

            // Sending Full Image First
            await sock.sendMessage(m.from, {
                image: thumb,
                caption: '✨ System Status: ONLINE & Active!'
            }, { quoted: m });

            // Updated audio URL for See You Again (Make sure link supports direct audio stream)
            const audioUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // Yethe tuza 25-sec vala direct audio link taku shakto
            const audioResponse = await fetch(audioUrl);
            const audioBuffer = await audioResponse.arrayBuffer();

            // Sending voice note / audio file
            await sock.sendMessage(m.from, {
                audio: Buffer.from(audioBuffer),
                mimetype: 'audio/mp4',
                ptt: true 
            }, { quoted: m });

        } catch (err) {
            console.error('❌ Alive plugin error:', err);
        }
    },
};
