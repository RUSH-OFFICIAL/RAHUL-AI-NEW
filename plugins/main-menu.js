const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Multi-Style Config Switchable WhatsApp Bot Menu',
    aliases: ['help', 'm', 'cmds', 'cmdlist'],

    async execute(sock, m, args) {
        await m.react('👑');

        // ==========================================
        // ⚙️ CONFIGURATION SETTINGS
        // ==========================================
        // Styles: 'terminal', 'cyber', 'card', 'mini', 'side', 'two_column',
        //         'bracket', 'rounded', 'single_frame', 'ascii_block',
        //         'vertical_line', 'bullet_list', 'tabular_grid', 'symmetrical',
        //         'sidebar', 'paginated', 'tabbed', 'slash'
        
        const menuStyle = global.menuStyle || 'terminal'; // 👈 इथे हवा तो स्टाईल सेट करा
        const prefix = global.BOT_PREFIX || '.';
        const botOwner = global.ownerName || 'RAHUL-MASTER';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const founder = 'RAHUL-MASTER';

        // Uptime Calculation
        const uptime = process.uptime();
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${hours}h ${minutes}m${seconds}s`;

        const now = new Date();
        const date = now.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' });
        const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' });

        // Master Command Categories Database
        const menuSections = [
            { sysTag: 'SYS_GENERAL', title: 'GENERAL', icon: '📌', cmds: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2'] },
            { sysTag: 'NET_DOWNLOAD', title: 'DOWNLOADERS', icon: '📥', cmds: ['tiktok', 'tt', 'ytmp3', 'ytmp4', 'ig', 'fb', 'play'] },
            { sysTag: 'SYS_UTILITIES', title: 'TOOLS & UTILITIES', icon: '🛠️', cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid'] },
            { sysTag: 'CORE_AI_ENG', title: 'AI COMMANDS', icon: '🤖', cmds: ['ai', 'ai-search', 'aiv', 'gen', 'gpt4'] },
            { sysTag: 'FUN_MODULES', title: 'FUN & GAMES', icon: '🎮', cmds: ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style'] },
            { sysTag: 'NET_SEARCH', title: 'SEARCH & ANIME', icon: '🔍', cmds: ['weather', 'waifu', 'neko', 'kitsune', 'husbando'] },
            { sysTag: 'GRP_CONTROL', title: 'GROUP & ADMIN', icon: '👑', cmds: ['tagall', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst', 'kick', 'promote', 'demote'] }
        ];

        const totalCmds = menuSections.reduce((acc, sec) => acc + sec.cmds.length, 0);
        let menuText = '';

        // ==========================================
        // 🎨 LAYOUT RENDER ENGINE
        // ==========================================
        switch (menuStyle.toLowerCase()) {

            // 1. TERMINAL MATRIX STYLE
            case 'terminal':
                menuText = `\`\`\`
[SYSTEM_KERNEL_INIT] >> RAHUL-AI
------------------------------------
root@rahul-ai:~# status --info

[USER_SESSION] : ${user}
[CORE_OWNER]   : ${botOwner}
[SYS_PREFIX]   : ${prefix}
[UPTIME_LOG]   : ${uptimeStr}
[TOTAL_CMDS]   : ${totalCmds} Active
------------------------------------
\`\`\`\n`;
                menuSections.forEach(sec => {
                    const cmdList = sec.cmds.map(c => `${prefix}${c}`).join('  ');
                    menuText += `\`[MODULE::${sec.sysTag}]\`\n\`\`\`\n$ ${cmdList}\n\`\`\`\n`;
                });
                menuText += `\`\`\`\n------------------------------------\n> RAHUL-MASTER TERMINAL ENGINE <\n\`\`\``;
                break;

            // 2. ULTRA COMPACT MINI MENU
            case 'mini':
                menuText = `🤖 *RAHUL-AI MINI MENU*\n👤 ${user} | 👑 ${botOwner} | ⚙️ [ ${prefix} ] | 📊 ${totalCmds} Cmds\n─━─━─━─━─━─━─━─━─━─\n\n`;
                menuSections.forEach(sec => {
                    const formattedCmds = sec.cmds.map(c => `${prefix}${c}`).join(' • ');
                    menuText += `${sec.icon} *${sec.title}:*\n> ${formattedCmds}\n\n`;
                });
                menuText += `─━─━─━─━─━─━─━─━─━─\n> 「 POWERED BY RAHUL MASTER 」`;
                break;

            // 3. TWO COLUMN SIDE MENU
            case 'two_column':
                menuText = `▌ *RAHUL-AI SYSTEM DASHBOARD*\n┃\n┃ 👤 *User:* ${user}\n┃ 👑 *Owner:* ${botOwner}\n┃ ⚙️ *Prefix:* [ ${prefix} ]\n┃ 📊 *Total:* ${totalCmds}\n━\n\n`;
                menuSections.forEach(sec => {
                    menuText += `▌ ${sec.icon} *${sec.title}*\n`;
                    for (let i = 0; i < sec.cmds.length; i += 2) {
                        const cmd1 = `• ${prefix}${sec.cmds[i]}`;
                        const cmd2 = sec.cmds[i + 1] ? `• ${prefix}${sec.cmds[i + 1]}` : '';
                        menuText += `┃ ${cmd1.padEnd(16)} ${cmd2}\n`;
                    }
                    menuText += `━\n\n`;
                });
                menuText += `> 「 POWERED BY RAHUL MASTER 」`;
                break;

            // 4. SIDEBAR MENU
            case 'side':
            case 'sidebar':
                menuText = `▌ *RAHUL-AI DASHBOARD*\n┃ 👤 *User:* ${user}\n┃ 👑 *Owner:* ${botOwner}\n┃ ⚙️ *Prefix:* [ ${prefix} ]\n━\n\n`;
                menuSections.forEach(sec => {
                    menuText += `▌ ${sec.icon} *${sec.title}*\n`;
                    sec.cmds.forEach(cmd => { menuText += `┃ ➔ ${prefix}${cmd}\n`; });
                    menuText += `━\n\n`;
                });
                menuText += `> 「 POWERED BY RAHUL MASTER 」`;
                break;

            // 5. ROUNDED CORNER MENU
            case 'rounded':
                menuText = `╭──────────────────────────────╮\n│     🤖 *RAHUL-AI SYSTEM*      │\n├──────────────────────────────┤\n│ 👤 *User:* ${user}\n│ 👑 *Owner:* ${botOwner}\n│ ⚙️ *Prefix:* [ ${prefix} ]\n╰──────────────────────────────╯\n\n`;
                menuSections.forEach(sec => {
                    menuText += `╭─〔 ${sec.icon} *${sec.title}* 〕╮\n`;
                    sec.cmds.forEach(cmd => { menuText += `│ • ${prefix}${cmd}\n`; });
                    menuText += `╰──────────────────────────────╯\n\n`;
                });
                menuText += `> 「 POWERED BY RAHUL MASTER 」`;
                break;

            // 6. SYMMETRICAL BRACKET BOX MENU
            case 'bracket':
            case 'symmetrical':
                menuText = `╔════════════════════════════╗\n│   🤖 [ RAHUL-AI MULTIDEVICE ]   │\n╠════════════════════════════╣\n│ 👤 *User:* ${user}\n│ 👑 *Owner:* ${botOwner}\n│ ⚙️ *Prefix:* [ ${prefix} ]\n╚════════════════════════════╝\n\n`;
                menuSections.forEach(sec => {
                    menuText += `┌─[ ${sec.icon} *${sec.title}* ]─┐\n`;
                    sec.cmds.forEach(cmd => { menuText += `│ ▫️ ${prefix}${cmd}\n`; });
                    menuText += `└─────────────────────────┘\n\n`;
                });
                menuText += `> 「 POWERED BY RAHUL MASTER 」`;
                break;

            // 7. COMPACT SLASH LIST
            case 'slash':
                menuText = `*🤖 RAHUL-AI COMPACT MENU*\n👤 *User:* ${user} | 👑 *Owner:* ${botOwner}\n⚙️ *Prefix:* [ ${prefix} ] | 📊 *Total:* ${totalCmds} Cmds\n┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n\n`;
                menuSections.forEach(sec => {
                    const slashCmds = sec.cmds.map(c => `${prefix}${c}`).join(' / ');
                    menuText += `${sec.icon} *${sec.title}*\n└─ ${slashCmds}\n\n`;
                });
                menuText += `┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈\n> 「 POWERED BY RAHUL MASTER 」`;
                break;

            // DEFAULT / CARD NEON FALLBACK
            case 'card':
            case 'cyber':
            default:
                menuText = `
╭━━━〔 *RAHUL-AI SYSTEM* 〕━━━┈
┃ 👤 *User:* ${user}
┃ 👑 *Owner:* ${botOwner}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ ⚙️ *Prefix:* [ ${prefix} ]
┃ 📊 *Commands:* ${totalCmds}
╰━━━━━━━━━━━━━━━━━━━━━━┈\n\n`;

                menuSections.forEach(sec => {
                    menuText += `┌─〔 ${sec.icon} *${sec.title}* 〕\n`;
                    sec.cmds.forEach(cmd => {
                        menuText += `├ ◈ ${prefix}${cmd}\n`;
                    });
                    menuText += `└──────────────┈\n\n`;
                });
                menuText += `> 「 POWERED BY RAHUL MASTER 」`;
                break;
        }

        // ==========================================
        // 📤 MESSAGE DISPATCH
        // ==========================================
        try {
            if (global.menuImage) {
                const imageBuffer = (await axios.get(global.menuImage, { responseType: 'arraybuffer' })).data;
                await m.reply(imageBuffer, { caption: menuText.trim() });
            } else {
                await m.reply(menuText.trim());
            }
        } catch (err) {
            console.error('Menu Execution Error:', err);
            await m.reply(menuText.trim());
        }
    }
};
