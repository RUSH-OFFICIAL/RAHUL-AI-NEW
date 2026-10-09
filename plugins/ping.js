module.exports = {
    name: 'ping',
    aliases: ['speed', 'p'],
    description: 'Check bot speed with high-tech radar animation',

    async execute(sock, m, args) {
        const start = Date.now();
        
        try {
            await m.react('🛰️');
            
            // High-tech Radar & Pulse Animation frames
            const frames = [
                '```[■□□□□□□□□□] 📡 Initializing Radar...```',
                '```[■■■■□□□□□□] ⚡ Scanning Signal Frequency...```',
                '```[■■■■■■■■□□] 🌐 Calibrating Quantum Core...```',
                '```[■■■■■■■■■■] 🔥 Connection Established!```'
            ];

            const sentMsg = await m.reply(frames[0]);

            // Smooth sequential animation loop
            for (let i = 1; i < frames.length; i++) {
                await new Promise(resolve => setTimeout(resolve, 220));
                await sock.sendMessage(m.from, { text: frames[i], edit: sentMsg.key });
            }

            const latency = Date.now() - start;
            const uptime = process.uptime();
            const h = Math.floor(uptime / 3600);
            const min = Math.floor((uptime % 3600) / 60);
            const sec = Math.floor(uptime % 60);

            // Dynamic Signal Indicator
            let signalIcon = '🟢';
            let speedTag = 'ULTRA FAST ⚡';
            if (latency > 300 && latency <= 600) {
                signalIcon = '🟡';
                speedTag = 'STABLE 🚀';
            } else if (latency > 600) {
                signalIcon = '🔴';
                speedTag = 'DELAYED 🐢';
            }

            // Sleek Minimalist Terminal Box Style
            const pingText = 
`╭───[ *RAHUL-AI * ]───╮
│
│  🛰️  *Ping Latency* : \`${latency} ms\`
│  📊  *Signal Core*  : ${signalIcon} \`${speedTag}\`
│  ⏱️  *Core Uptime*  : \`${h}h ${min}m ${sec}s\`
│
╰──────────────────────────╯
> *⚡ Secured via RAHUL-AI Protocol*`;

            await sock.sendMessage(m.from, { text: pingText, edit: sentMsg.key });

        } catch (err) {
            console.error('Ping error:', err);
            await m.reply(`> *⚡ RAHUL-AI Latency:* \`${Date.now() - start} ms\``);
        }
    }
};
