module.exports = {
    name: 'alive',
    description: 'Check if the bot is alive with image and audio',
    aliases: ['status', 'botstatus'],
    tags: ['main'],
    command: /^(alive|status)$/i,

    async execute(sock, m) {
        try {
            // React with lightning to acknowledge command receipt
            await m.react('⚡');
            
            // 1. Fetch and Send Image using Buffer
            const imageRes = await fetch('https://sam-cdn.zone.id/files/C0SGPFVlH3.jpg');
            const imageBuffer = await imageRes.arrayBuffer();

            await sock.sendMessage(m.from, {
                image: Buffer.from(imageBuffer),
                caption: '✨ System Status: ONLINE & Active!'
            }, { quoted: m });

            // 2. Fetch and Send Audio / Voice Note using Buffer
            const audioRes = await fetch('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
            const audioBuffer = await audioRes.arrayBuffer();

            await sock.sendMessage(m.from, {
                audio: Buffer.from(audioBuffer),
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: m });

        } catch (err) {
            console.error('❌ Alive plugin error:', err);
            await sock.sendMessage(m.from, { text: 'Error running command.' }, { quoted: m });
        }
    },
};
