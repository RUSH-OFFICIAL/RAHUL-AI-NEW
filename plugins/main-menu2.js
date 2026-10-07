const axios = require('axios');

module.exports = {
    name: 'menu2',
    description: 'Quick Search & Mini Grid WhatsApp Bot Menu Style',
    aliases: ['help2', 'cmds2', 'm2'],

    async execute(sock, m, args) {
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

        const botOwner = global.ownerName || 'RAHUL-MASTER';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        // कमांड मॅप
        const commandMap = {
            '1': { title: 'GENERAL & SYSTEM', icon: '📌', cmds: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu'] },
            '2': { title: 'DOWNLOADERS', icon: '📥', cmds: ['tiktok', 'tt', 'ytmp3', 'ytmp4', 'ig', 'fb'] },
            '3': { title: 'TOOLS & UTILITIES', icon: '🛠️', cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid'] },
            '4': { title: 'AI & SMART CHAT', icon: '🤖', cmds: ['ai', 'ai-search', 'aiv', 'gen', 'gpt4'] },
            '5': { title: 'FUN & UTILITIES', icon: '🎮', cmds: ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style'] },
            '6': { title: 'SEARCH & ANIME', icon: '🔍', cmds: ['weather', 'waifu', 'neko', 'kitsune', 'husbando'] },
            '7': { title: 'GROUP & ADMIN', icon: '👑', cmds: ['tagall', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst', 'kick', 'promote', 'demote'] }
        };

        const choice = args[0]?.trim();

        let menuText = `
┌──────────────────────────────┐
│    ⚡ *RAHUL-AI INDEX MENU* ⚡   │
├──────────────────────────────┤
│ 👤 *User:* ${user}
│ 👑 *Owner:* ${botOwner}
│ 📅 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ ⚙️ *Prefix:* [ ${prefix} ]
└──────────────────────────────┘\n\n`;

        if (choice && commandMap[choice]) {
            // विशिष्ट क्रमांक टाकल्यावर उघडणारा विभाग
            const sec = commandMap[choice];
            menuText += `┌─〔 ${sec.icon} *${sec.title}* 〕─┐\n│\n`;
            sec.cmds.forEach(cmd => {
                menuText += `│  ├ 🔹 ${prefix}${cmd}\n`;
            });
            menuText += `│\n└───────────────────────────┈\n\n`;
            menuText += `💡 *Type \`${prefix}menu2\` to view the full Index Grid again.*\n\n`;
        } else {
            // मूळ Index Grid
            menuText += `👇 *Quick Select Category Number:* 👇\n\n`;
            
            Object.keys(commandMap).forEach(key => {
                const sec = commandMap[key];
                menuText += `*[ ${key} ]* ${sec.icon} ${sec.title}\n`;
            });

            menuText += `\n──────────────────────────────\n`;
            menuText += `💡 *How to use:* Type \`${prefix}menu2 1\` or \`${prefix}menu2 4\` to open specific category.\n\n`;
        }

        menuText += `> 「 POWERED BY RAHUL MASTER 」`;

        try {
            if (global.menuImage) {
                const imageBuffer = (await axios.get(global.menuImage, {
                    responseType: 'arraybuffer'
                })).data;

                await m.reply(imageBuffer, { caption: menuText.trim() });
            } else {
                await m.reply(menuText.trim());
            }
        } catch (err) {
            console.error('Menu2 error:', err);
            await m.reply(menuText.trim());
        }
    }
};
