module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Royal HUD style latency checker',

    async execute(sock, m, args) {
        try {
            const startTimer = Date.now();
            const recipient = m.from || m.chat || m.sender;
            const latencyTime = Date.now() - startTimer;

            const hudText = 
                `╭────────────────────────╮\n` +
                `│   👑 *RAHUL-AI.0*       │\n` +
                `├────────────────────────┤\n` +
                `│ 🔹 *Core Engine* : Active\n` +
                `│ ⚡ *Response*    : ${latencyTime}ms\n` +
                `│ 🌐 *Network*     : Stable\n` +
                `│ 👤 *Owner*       : Rahul Hiran\n` +
                `╰────────────────────────╯\n` +
                `> _⚡ Powered by RAHUL-AI Systems_`;

            await sock.sendMessage(recipient, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: hudText
            }, { quoted: m });

        } catch (err) {
            console.error('Ping Error:', err);
        }
    }
};

