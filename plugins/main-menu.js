const axios = require('axios');
const os = require('os');

if (!global.botStartTime) {
    global.botStartTime = Date.now();
}

module.exports = {
    name: 'menu',
    description: 'Legendary Cyber-Matrix Ultimate Bot Menu with Heavy Double-Box Design',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        const startPing = Date.now();
        await m.react('⚡');
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        // Time-based Greeting
        const hour = now.getHours();
        let greeting = 'Good Night 🌙';
        if (hour >= 5 && hour < 12) greeting = 'Good Morning 🌅';
        else if (hour >= 12 && hour < 17) greeting = 'Good Afternoon ☀️';
        else if (hour >= 17 && hour < 21) greeting = 'Good Evening 🌆';

        const botOwner = global.ownerName || 'RAHUL-MASTER';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = 'RAHUL-MASTER';
        const botMode = global.isPublic ? 'Public 🌍' : 'Private 🔒';

        // Direct image URL
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // Matrix Spinner & Glow Effect
        const spinners = ['⣾', '⣽', '⣻', '⢿', '⡿', '⣟', '⣯', '⣷'];
        const activeSpinner = spinners[Math.floor(now.getTime() / 200) % spinners.length];
        
        const neonIcons = ['💎', '⚡', '🔥', '🌟', '🚀', '🔮', '💫', '⚡'];
        const activeIcon = neonIcons[now.getSeconds() % neonIcons.length];

        // Rotating Cyber Taglines
        const cyberQuotes = [
            "⚡ Core Matrix Firewall: ACTIVE & SECURE",
            "🚀 High-Speed Neural Pipeline Executing...",
            "🛡️ Encrypted Transmission Channel Online",
            "🔥 Blazing Through Asynchronous Requests..."
        ];
        const activeQuote = cyberQuotes[Math.floor(now.getTime() / 4000) % cyberQuotes.length];

        // Uptime Calculation
        const uptimeSeconds = Math.floor((Date.now() - global.botStartTime) / 1000);
        const days = Math.floor(uptimeSeconds / (3600 * 24));
        const hoursUp = Math.floor((uptimeSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptimeSeconds % 3600) / 60);
        const seconds = uptimeSeconds % 60;
        const uptimeFormatted = `${days > 0 ? days + 'd ' : ''}${hoursUp}h ${minutes}m ${seconds}s`;

        // RAM Usage & Progress Bar
        const totalMem = os.totalmem();
        const freeMem = os.freemem();
        const usedMem = totalMem - freeMem;
        const memPercentage = ((usedMem / totalMem) * 100).toFixed(1);
        
        const totalMemMB = (totalMem / 1024 / 1024).toFixed(2);
        const usedMemMB = (usedMem / 1024 / 1024).toFixed(2);

        const filledBlocks = Math.round((memPercentage / 100) * 10);
        const emptyBlocks = 10 - filledBlocks;
        const progressBar = '█'.repeat(filledBlocks) + '░'.repeat(emptyBlocks);

        const latency = Date.now() - startPing;

        // Command Arrays
        const generalCmds = ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2'];
        const downloaderCmds = ['tiktok', 'tt', 'ytmp3', 'ig'];
        const toolsCmds = ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid', 'ai', 'ai-search', 'aiv', 'gen'];
        const funCmds = ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style'];
        const searchCmds = ['weather', 'waifu', 'neko', 'kitsune', 'husbando'];
        const adminCmds = ['tagall', 'tagall1', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst', 'gstatus', 'channelid', 'kick', 'promote', 'demote'];
        
        const totalCommandsCount = generalCmds.length + downloaderCmds.length + toolsCmds.length + funCmds.length + searchCmds.length + adminCmds.length;

        const menuText = `
${activeIcon} *ＲＡＨＵＬ ◈ ＭＡＳＴＥＲ ◈ ＨＵＢ* ${activeIcon}
> *${greeting}, ${user}!* ${activeSpinner}

╔═════════════════════════╗
║ 👑 *Founder*  : ${Founder}
║ 👤 *Owner*    : ${botOwner}
║ 🛡️ *Mode*     : ${botMode}
║ ⏱️ *Uptime*   : ${uptimeFormatted}
║ ⚡ *Latency*  : ${latency}ms
║ 📅 *Date*     : ${date}
║ ⏰ *Time*     : ${time}
║ 📦 *Commands* : ${totalCommandsCount} Active
║ ⚙️ *Prefix*   : ${prefix}
╚═════════════════════════╝

┌───「 *ＳＹＳＴＥＭ ＲＡＭ* 」
│ [${progressBar}] ${memPercentage}%
│ 💾 *Usage* : ${usedMemMB}MB / ${totalMemMB}MB
└───────────────

> *💬 System:* "${activeQuote}"

╔══════ 🌐 *ＧＥＮＥＲＡＬ [${generalCmds.length}]*
╠ ◦ ${prefix}alive | ${prefix}ping
╠ ◦ ${prefix}uptime | ${prefix}owner
╠ ◦ ${prefix}guide | ${prefix}menu2
╚═════════════════════════╝

╔══════ 📥 *ＤＯＷＮＬＯＡＤＥＲＳ [${downloaderCmds.length}]*
╠ ◦ ${prefix}tiktok / ${prefix}tt
╠ ◦ ${prefix}ytmp3 | ${prefix}ig
╚═════════════════════════╝

╔══════ 🛠️ *ＴＯＯＬＳ & ＡＩ [${toolsCmds.length}]*
╠ ◦ ${prefix}sticker | ${prefix}ocr
╠ ◦ ${prefix}tts | ${prefix}poll
╠ ◦ ${prefix}shazam | ${prefix}textpro
╠ ◦ ${prefix}chid | ${prefix}ai
╠ ◦ ${prefix}ai-search | ${prefix}aiv | ${prefix}gen
╚═════════════════════════╝

╔══════ 🎮 *ＦＵＮ & ＮＥＷ [${funCmds.length}]*
╠ ◦ ${prefix}blue | ${prefix}flag
╠ ◦ ${prefix}hide | ${prefix}guessgender
╠ ◦ ${prefix}agecalculator | ${prefix}style
╚═════════════════════════╝

╔══════ ✨ *ＳＥＡＲＣＨ & ＡＮＩＭＥ [${searchCmds.length}]*
╠ ◦ ${prefix}weather | ${prefix}waifu
╠ ◦ ${prefix}neko | ${prefix}kitsune
╠ ◦ ${prefix}husbando
╚═════════════════════════╝

╔══════ 🛡️ *ＡＤＭＩＮ & ＧＲＯＵＰ [${adminCmds.length}]*
╠ ◦ ${prefix}tagall / ${prefix}tagall1
╠ ◦ ${prefix}tagme | ${prefix}couplepp
╠ ◦ ${prefix}group | ${prefix}ginfo
╠ ◦ ${prefix}antigst | ${prefix}gstatus
╠ ◦ ${prefix}channelid | ${prefix}kick
╠ ◦ ${prefix}promote | ${prefix}demote
╚═════════════════════════╝

> *🔥 Powered by Rahul Master*`.trim();

        try {
            const imageBuffer = (await axios.get(menuImageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(menuText);
        }
    }
};
