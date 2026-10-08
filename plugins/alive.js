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
            
            // Send Image with Caption
            await sock.sendMessage(m.from, {
                image: { url: 'https://sam-cdn.zone.id/files/C0SGPFVlH3.jpg' },
                caption: '✨ System Status: ONLINE & Active!'
            }, { quoted: m });

            // Send Audio / Voice Note
            await sock.sendMessage(m.from, {
                audio: { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3' },
                mimetype: 'audio/mp4',
                ptt: true
            }, { quoted: m });

        } catch (err) {
            console.error('❌ Alive plugin error:', err);
            await sock.sendMessage(m.from, { text: '⚠️ An error occurred while executing the alive command.' }, { quoted: m });
        }
    },
};
