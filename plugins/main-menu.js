const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Two-Column Compact Side Menu Style WhatsApp Bot Menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
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
        const founder = 'RAHUL-MASTER';

        // कमांड डेटा
        const menuSections = [
            {
                title: 'GENERAL',
                icon: '📌',
                cmds: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2']
            },
            {
                title: 'DOWNLOADERS',
                icon: '📥',
                cmds: ['tiktok', 'tt', 'ytmp3', 'ig']
            },
            {
                title: 'TOOLS & UTILITIES',
                icon: '🛠️',
                cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid']
            },
            {
                title: 'AI COMMANDS',
                icon: '🤖',
                cmds: ['ai', 'ai-search', 'aiv', 'gen']
            },
            {
                title: 'FUN & GAMES',
                icon: '🎮',
                cmds: ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style']
            },
            {
                title: 'SEARCH & ANIME',
                icon: '🔍',
                cmds: ['weather', 'waifu', 'neko', 'kitsune', 'husbando']
            },
            {
                title: 'GROUP & ADMIN',
                icon: '👥',
                cmds: ['tagall', 'tagall1', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst', 'kick', 'promote', 'demote', 'gstatus', 'channelid']
            }
        ];

        // Total Count Calculation
        const totalCmds = menuSections.reduce((acc, sec) => acc + sec.cmds.length, 0);

        // Helper function for 2-Column Formatting
        const formatTwoColumns = (cmdArray) => {
            let result = '';
            for (let i = 0; i < cmdArray.length; i += 2) {
                const cmd1 = `• ${prefix}${cmdArray[i]}`;
                const cmd2 = cmdArray[i + 1] ? `• ${prefix}${cmdArray[i + 1]}` : '';
                result += `┃ ${cmd1.padEnd(16)} ${cmd2}\n`;
            }
            return result;
        };

        // Side Two-Column Formatting
        let menuText = `
▌ *RAHUL-AI SYSTEM DASHBOARD*
┃
┃ 👤 *User:* ${user}
┃ 👑 *Owner:* ${botOwner}
┃ 🏆 *Founder:* ${founder}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ ⚙️ *Prefix:* [ ${prefix} ]
┃ 📊 *Total Commands:* ${totalCmds}
━\n\n`;

        menuSections.forEach(sec => {
            menuText += `▌ ${sec.icon} *${sec.title}*\n`;
            menuText += formatTwoColumns(sec.cmds);
            menuText += `━\n\n`;
        });

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
