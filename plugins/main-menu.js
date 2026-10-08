const axios = require('axios');

if (!global.botStartTime) {
    global.botStartTime = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Ultra-compact menu with live pulsing quantum wave animation',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        const now = new Date();
        
        // 1. Live Pulsing Wave Animation for Icons
        const quantumWaves = ['⚡ ⠋', '💎 ⠙', '🔥 ⠹', '🌟 ⠸', '💫 ⠼', '🚀 ⠴', '🔮 ⠦', '✨ ⠧'];
        const activeWave = quantumWaves[now.getSeconds() % quantumWaves.length];

        await m.react('⚡');
        
        const prefix = global.BOT_PREFIX || '.';
        const user = m.pushName || 'User';
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // 2. Dynamic Time & Greeting System
        const hour = now.getHours();
        let greeting = 'Night 🌙';
        if (hour >= 5 && hour < 12) greeting = 'Morning 🌅';
        else if (hour >= 12 && hour < 17) greeting = 'Afternoon ☀️';
        else if (hour >= 17 && hour < 21) greeting = 'Evening 🌆';

        // 3. Auto-Rotating Neural Status Engine
        const neuralStatus = [
            "⚡ Quantum Core: Fully Synced",
            "🚀 Rahul Master Hub: Active",
            "🛡️ Secure Gateway Online",
            "💎 Blazing Fast Response Rate"
        ];
        const activeStatus = neuralStatus[Math.floor(now.getTime() / 2000) % neuralStatus.length];

        // 4. Dynamic Live Bullet Stream
        const bullets = ['◈', '◇', '▪', '▫', '✦', '✧'];
        const bullet = bullets[now.getSeconds() % bullets.length];

        // Uptime Calculation
        const uptimeSec = Math.floor((Date.now() - global.botStartTime) / 1000);
        const uptime = `${Math.floor(uptimeSec / 3600)}h ${Math.floor((uptimeSec % 3600) / 60)}m`;

        const menuText = `
${activeWave} *ＲＡＨＵＬ - ＭＡＳＴＥＲ* ${activeWave}
> *${greeting}, ${user}!*

┌ *QUANTUM METRICS*
├ ⏱️ Uptime : ${uptime}
├ ⚙️ Prefix : ${prefix}
└ 🔮 Status : ${activeStatus}

${bullet} *General:*
\`${prefix}alive \vert{}${prefix}ping | ${prefix}uptime \vert{}${prefix}owner\`

${bullet} *Downloads:*
\`${prefix}tiktok | ${prefix}ytmp3 \vert{}${prefix}ig\`

${bullet} *Tools & AI:*
\`${prefix}sticker | ${prefix}ocr \vert{}${prefix}tts | ${prefix}ai \vert{}${prefix}gen\`

${bullet} *Fun & Misc:*
\`${prefix}blue \vert{}${prefix}flag | ${prefix}guessgender \vert{}${prefix}style\`

${bullet} *Search & Anime:*
\`${prefix}weather \vert{}${prefix}waifu | ${prefix}neko \vert{}${prefix}husbando\`

${bullet} *Admin & Group:*
\`${prefix}tagall \vert{}${prefix}tagme | ${prefix}group \vert{}${prefix}kick\`

> *🔥 Powered by Rahul Master*`.trim();

        try {
            const imageBuffer = (await axios.get(menuImageUrl, {
                responseType: 'arraybuffer'
            })).data;
            await m.reply(imageBuffer, { caption: menuText });
        } catch (err) {
            await m.reply(menuText);
        }
    }
};
