const axios = require('axios');

if (!global.botStartTime) {
    global.botStartTime = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Expanded circle-themed rich bot menu with loading animation',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        const now = new Date();
        await m.react('⭕');

        // 1. Menu yenya aadi loading/completion animation message
        const loadingMsg = await m.reply("⚡ *[ ＲＡＨＵＬ - ＡＩ ]* ⚡\n> *COMPUTING MENU MATRIX... 🔄*");

        // Chhota delay sathi (1 second)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const prefix = global.BOT_PREFIX || '.';
        const user = m.pushName || 'User';
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // Uptime Calculation
        const uptimeSec = Math.floor((Date.now() - global.botStartTime) / 1000);
        const hours = Math.floor(uptimeSec / 3600);
        const minutes = Math.floor((uptimeSec % 3600) / 60);
        const seconds = uptimeSec % 60;
        const uptime = `${hours}h ${minutes}m ${seconds}s`;

        const menuText = `
⭕ ─── *ＲＡＨＵＬ - ＭＡＳＴＥＲ* ─── ⭕
│
│ 👤 User   : *${user}*
│ ⏱️ Uptime : *${uptime}*
│ ⚙️ Prefix : *${prefix}*
│ 📡 Status : *Online & Active*
│
⭕──────────────────────────────⭕

🔵 *01. GENERAL COMMANDS*
⚪ ${prefix}alive
⚪ ${prefix}ping
⚪ ${prefix}uptime
⚪ ${prefix}owner
⚪ ${prefix}botinfo
⚪ ${prefix}runtime
⚪ ${prefix}speed

🔵 *02. DOWNLOAD COMMANDS*
⚪ ${prefix}tiktok
⚪ ${prefix}ytmp3
⚪ ${prefix}ytmp4
⚪ ${prefix}ig
⚪ ${prefix}facebook
⚪ ${prefix}spotify
⚪ ${prefix}pinterest

🔵 *03. TOOLS & AI ENGINE*
⚪ ${prefix}sticker
⚪ ${prefix}take
⚪ ${prefix}toimg
⚪ ${prefix}ocr
⚪ ${prefix}tts
⚪ ${prefix}ai
⚪ ${prefix}gen
⚪ ${prefix}translate
⚪ ${prefix}calc

🔵 *04. FUN & MISC*
⚪ ${prefix}blue
⚪ ${prefix}flag
⚪ ${prefix}guessgender
⚪ ${prefix}style
⚪ ${prefix}dare
⚪ ${prefix}truth
⚪ ${prefix}roll
⚪ ${prefix}ship

🔵 *05. SEARCH & ANIME*
⚪ ${prefix}weather
⚪ ${prefix}waifu
⚪ ${prefix}neko
⚪ ${prefix}husbando
⚪ ${prefix}google
⚪ ${prefix}pinterest
⚪ ${prefix}lyrics
⚪ ${prefix}github

🔵 *06. ADMIN & GROUP*
⚪ ${prefix}tagall
⚪ ${prefix}tagme
⚪ ${prefix}group
⚪ ${prefix}kick
⚪ ${prefix}promote
⚪ ${prefix}demote
⚪ ${prefix}hidetag
⚪ ${prefix}antilink

⭕──────────────────────────────⭕
> *✨ RAHUL-AI MENU COMPLETED*`.trim();

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
