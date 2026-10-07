const fs = require('fs');
const path = require('path');
const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Auto-detects commands and displays safe categorized menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m, args) {
        await m.react('✨');

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
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        const botOwner = global.ownerName || 'RAHUL-MASTER';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        // फोल्डरमधून कमांड्स ऑटो-लोड करा (तुमच्या प्रोजेक्टनुसार commandsPath बदला)
        const commandsPath = path.join(__dirname, '../commands'); 
        let categorizedCommands = {};

        try {
            if (fs.existsSync(commandsPath)) {
                const files = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

                files.forEach(file => {
                    const cmd = require(path.join(commandsPath, file));
                    const category = (cmd.category || 'general').toLowerCase();

                    if (!categorizedCommands[category]) {
                        categorizedCommands[category] = [];
                    }
                    if (cmd.name) {
                        categorizedCommands[category].push(cmd.name);
                    }
                });
            }
        } catch (error) {
            console.error('Error reading commands directory:', error);
        }

        // जर फोल्डर रीडींग फेल झाले तर वापरण्यासाठी डिफॉल्ट फॉलबॅक
        if (Object.keys(categorizedCommands).length === 0) {
            categorizedCommands = {
                general: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu'],
                downloaders: ['tiktok', 'ytmp3', 'ig'],
                tools: ['sticker', 'ocr', 'tts', 'poll', 'shazam'],
                ai: ['ai', 'ai-search', 'aiv', 'gen'],
                group: ['tagall', 'group', 'ginfo', 'kick', 'promote']
            };
        }

        const selectedCategory = args[0] ? args[0].toLowerCase() : null;
        let menuText = '';

        if (!selectedCategory || !categorizedCommands[selectedCategory]) {
            // मेन हॉरिझॉन्टल हब मेनू
            const categoriesList = Object.keys(categorizedCommands)
                .map(cat => `🔹 *${cat.toUpperCase()}* ➔ \`${prefix}menu ${cat}\``)
                .join('\n');

            menuText = `
🤖 *RAHUL-AI MULTIDEVICE*

👤 *User:* ${user}
👑 *Owner:* ${botOwner}
📅 *Date:* ${date}
⏰ *Time:* ${time}
⚙️ *Prefix:* [ ${prefix} ]

━━━━━━ *COMMAND CATEGORIES* ━━━━━━

${categoriesList}

━━━━━━━━━━━━━━━━━━━━━━━━
💡 *Tip:* specific category पाहण्यासाठी उदा. \`${prefix}menu ai\` टाईप करा.

> Powered by Rahul Master
`.trim();
        } else {
            // निवडलेल्या कॅटेगरीचा मेनू
            const catCmds = categorizedCommands[selectedCategory];

            menuText = `
🤖 *RAHUL-AI CATEGORY: ${selectedCategory.toUpperCase()}*

⚙️ *Prefix:* [ ${prefix} ]

━━━━━━ *AVAILABLE COMMANDS* ━━━━━━

${catCmds.map(cmd => `• ${prefix}${cmd}`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━
👈 मुख्य मेनूसाठी \`${prefix}menu\` टाईप करा.

> Powered by Rahul Master
`.trim();
        }

        try {
            if (global.menuImage) {
                const imageBuffer = (await axios.get(global.menuImage, {
                    responseType: 'arraybuffer'
                })).data;

                await m.reply(imageBuffer, { caption: menuText });
            } else {
                await m.reply(menuText);
            }
        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(menuText);
        }
    }
};
