const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Paginated / Sliding Style WhatsApp Bot Menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m, args) {
        await m.react('📖');

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
        const page = parseInt(args[0]) || 1; // डिफॉल्ट १ नंबरचे पेज उघडेल

        const pages = [
            // PAGE 1: SYSTEM & GENERAL
            {
                pageNumber: 1,
                title: 'SYSTEM & GENERAL',
                sections: [
                    { title: 'GENERAL', cmds: ['alive', 'ping', 'uptime', 'owner', 'guide'] },
                    { title: 'AI COMMANDS', cmds: ['ai', 'ai-search', 'aiv', 'gen'] }
                ]
            },
            // PAGE 2: DOWNLOADERS & TOOLS
            {
                pageNumber: 2,
                title: 'MEDIA & UTILITIES',
                sections: [
                    { title: 'DOWNLOADERS', cmds: ['tiktok', 'tt', 'ytmp3', 'ig'] },
                    { title: 'TOOLS', cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam'] }
                ]
            },
            // PAGE 3: FUN, ANIME & GROUP
            {
                pageNumber: 3,
                title: 'MANAGEMENT & FUN',
                sections: [
                    { title: 'FUN & GAMES', cmds: ['blue', 'flag', 'hide', 'style'] },
                    { title: 'GROUP & ADMIN', cmds: ['tagall', 'group', 'kick', 'promote', 'demote'] }
                ]
            }
        ];

        const totalPages = pages.length;
        const currentPageData = pages[page - 1] || pages[0];

        let menuText = `
╭━━━〔 *RAHUL-AI MENU* 〕━━━┈
┃ 👤 *User:* ${user}
┃ 👑 *Owner:* ${botOwner}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ 📑 *Page:* [ ${currentPageData.pageNumber} / ${totalPages} ]
╰━━━━━━━━━━━━━━━━━━━━━━┈\n\n`;

        currentPageData.sections.forEach(sec => {
            menuText += `┌─〔 ◈ *${sec.title}* 〕\n`;
            sec.cmds.forEach(cmd => {
                menuText += `├ ◈ ${prefix}${cmd}\n`;
            });
            menuText += `└──────────────┈\n\n`;
        });

        // Left / Right Navigation Indicator
        menuText += `◀️ *PAGE ${currentPageData.pageNumber} OF ${totalPages}* ▶️\n`;
        if (currentPageData.pageNumber < totalPages) {
            menuText += `💡 *Type \`${prefix}menu${currentPageData.pageNumber + 1}\` for Next Page (➡️)*\n\n`;
        } else {
            menuText += `💡 *Type \`${prefix}menu 1\` to return to First Page (⬅️)*\n\n`;
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
            console.error('Menu error:', err);
            await m.reply(menuText.trim());
        }
    }
};
