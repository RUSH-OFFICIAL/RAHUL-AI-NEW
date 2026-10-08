const axios = require('axios');

if (!global.botStartTime) {
    global.botStartTime = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Advanced dynamic rotating menu with futuristic quantum aesthetic',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        const now = new Date();
        await m.react('💎');
        
        const prefix = global.BOT_PREFIX || '.';
        const user = m.pushName || 'User';

        // 1. Dynamic Rotating Menu Themes (Har vela automatic navin look yeil!)
        const menuThemes = [
            {
                borderTop: '╔══════════════════════════╗',
                borderMid: '╠══════════════════════════╣',
                borderBot: '╚══════════════════════════╝',
                accent: '💠',
                name: 'CYBERPUNK NEON'
            },
            {
                borderTop: '┏━━━━━━━━━━━━━━━━━━━━━━━━━━┓',
                borderMid: '┣━━━━━━━━━━━━━━━━━━━━━━━━━━┫',
                borderBot: '┗━━━━━━━━━━━━━━━━━━━━━━━━━━┛',
                accent: '⚡',
                name: 'QUANTUM CORE'
            },
            {
                borderTop: '╔══════════════════════════╗',
                borderMid: '╟──────────────────────────╢',
                borderBot: '╚══════════════════════════╝',
                accent: '🔥',
                name: 'MASTER PRIME'
            }
        ];
        // Automatically theme change honar based on current minute/hour rotation
        const activeTheme = menuThemes[now.getMinutes() % menuThemes.length];

        // 2. Time & Greeting System
        const hour = now.getHours();
        let greeting = 'Good Night 🌙';
        if (hour >= 5 && hour < 12) greeting = 'Good Morning 🌅';
        else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon ☀️';
        else if (hour >= 17 && hour < 21) greeting = 'Good Evening 🌆';

        // 3. Dynamic Live Status Engine
        const systemStatuses = [
            "🟢 Core Status: Optimized & Stable",
            "🚀 Speed: Blazing Fast (0.1ms)",
            "🛡️ Security Gateway: Active",
            "✨ Neural AI Engine: Online"
        ];
        const currentStatus = systemStatuses[Math.floor(now.getTime() / 3000) % systemStatuses.length];

        // Uptime Calculation
        const uptimeSec = Math.floor((Date.now() - global.botStartTime) / 1000);
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        const seconds = uptimeSec % 60;
        const uptime = `${hours}h ${minutes}m ${seconds}s`;

        // Menu Image (Tumhi tumchya pasandichy link taku shakta)
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // 4. Clean & Modern Structured Menu Text
        const menuText = `
${activeTheme.borderTop}
   ${activeTheme.accent} *ＲＡＨＵＬ - ＭＡＳＴＥＲ ＢＯＴ* ${activeTheme.accent}
${activeTheme.borderMid}
> 👋 *Hello, ${user}!*
> 🕒 *Time:* ${now.toLocaleTimeString()}
> 🌐 *Theme:* ${activeTheme.name}

┌ 📊 *SYSTEM METRICS*
├ ⏱️ Uptime : ${uptime}
├ ⚙️ Prefix : ${prefix}
└ 🔮 Status : ${currentStatus}
${activeTheme.borderMid}

📂 *[ 01 ] GENERAL COMMANDS*
• \`${prefix}alive\` - Check bot status
• \`${prefix}ping\` - Check speed latency
• \`${prefix}uptime\` - Check running time
• \`${prefix}owner\` - Contact bot owner

📥 *[ 02 ] DOWNLOAD COMMANDS*
• \`${prefix}tiktok\` - Download TikTok videos
• \`${prefix}ytmp3\` - Download YouTube audio
• \`${prefix}ig\` - Download Instagram reels/posts

🛠️ *[ 03 ] TOOLS & AI*
• \`${prefix}sticker\` - Make sticker from media
• \`${prefix}ocr\` - Extract text from image
• \`${prefix}tts\` - Text to speech generator
• \`${prefix}ai\` - Chat with smart AI
• \`${prefix}gen\` - Generate creative content

🎮 *[ 04 ] FUN & MISC*
• \`${prefix}blue\` - Blue filter effect
• \`${prefix}flag\` - Country flag games
• \`${prefix}guessgender\` - Predict name gender
• \`${prefix}style\` - Fancy text generator

✨ *[ 05 ] SEARCH & ANIME*
• \`${prefix}weather\` - Check live weather
• \`${prefix}waifu\` - Random anime waifu
• \`${prefix}neko\` - Cute neko images
• \`${prefix}husbando\` - Random anime husbando

🛡️ *[ 06 ] ADMIN & GROUP*
• \`${prefix}tagall\` - Tag all members
• \`${prefix}tagme\` - Tag yourself
• \`${prefix}group\` - Open/Close group
• \`${prefix}kick\` - Remove member from group

${activeTheme.borderMid}
> *🔥 Powered by Rahul Master*
${activeTheme.borderBot}`.trim();

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
