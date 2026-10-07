const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Horizontal Carousel Card Page Navigation Menu',
    aliases: ['help', 'cmdlist', 'commands', 'p'],

    async execute(sock, m, args) {
        await m.react('📱');

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

        // सर्व पेजेसचा डेटा (Cards)
        const pages = [
            {
                id: 1,
                category: 'GENERAL & MAIN COMMANDS',
                icon: '📌',
                cmds: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2', 'system', 'info']
            },
            {
                id: 2,
                category: 'DOWNLOADERS & MEDIA',
                icon: '📥',
                cmds: ['tiktok', 'tt', 'ytmp3', 'ytmp4', 'ig', 'fb', 'play', 'song']
            },
            {
                id: 3,
                category: 'TOOLS & UTILITIES',
                icon: '🛠️',
                cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid', 'url']
            },
            {
                id: 4,
                category: 'ARTIFICIAL INTELLIGENCE',
                icon: '🤖',
                cmds: ['ai', 'ai-search', 'aiv', 'gen', 'gpt4', 'bing', 'dalle', 'bard']
            },
            {
                id: 5,
                category: 'FUN & GAMES',
                icon: '🎮',
                cmds: ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style', 'truth', 'dare']
            },
            {
                id: 6,
                category: 'GROUP & ADMIN MANAGEMENT',
                icon: '👑',
                cmds: ['tagall', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst', 'kick', 'promote', 'demote']
            }
        ];

        // इनपुटवरून पेज नंबर ओळखणे
        let requestedPage = parseInt(args[0]) || 1;
        if (requestedPage < 1) requestedPage = 1;
        if (requestedPage > pages.length) requestedPage = pages.length;

        const currentCard = pages[requestedPage - 1];
        const totalPages = pages.length;

        // Visual Progress Slider Tracker
        let progressTrack = '';
        for (let i = 1; i <= totalPages; i++) {
            if (i === requestedPage) {
                progressTrack += '🔘'; // Active Card Slide
            } else {
                progressTrack += '➖'; // Inactive Card
            }
        }

        let menuText = `
╭━━━〔 *RAHUL-AI CAROUSEL* 〕━━━┈
┃ 👤 *User:* ${user}
┃ 👑 *Owner:* ${botOwner}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ ⚙️ *Prefix:* [ ${prefix} ]
╰━━━━━━━━━━━━━━━━━━━━━━┈

┌─〔 ${currentCard.icon} *${currentCard.category}* 〕─┐
│\n`;

        currentCard.cmds.forEach(cmd => {
            menuText += `│  ├ 🔹 ${prefix}${cmd}\n`;
        });

        menuText += `│
└────────────────────────────┈

◀️ [ ${progressTrack} ] ▶️
📊 *CARD ${requestedPage} OF ${totalPages}*

─────────────────────────────\n`;

        // Next / Prev Slide Commands Helper
        if (requestedPage < totalPages) {
            menuText += `➡️ *Next Slide:* \`${prefix}menu${requestedPage + 1}\`\n`;
        }
        if (requestedPage > 1) {
            menuText += `⬅️ *Prev Slide:* \`${prefix}menu${requestedPage - 1}\`\n`;
        }

        menuText += `\n> 「 POWERED BY RAHUL MASTER 」`;

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
