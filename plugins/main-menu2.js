const axios = require('axios');

module.exports = {
    name: 'menu2',
    description: 'Show interactive drop-down list menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('📑');

        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        const captionText = `
╭─── System Overview ───╮
│ 👤 *User:* ${user}
│ 👑 *Owner:* ${botOwner}
│ 📅 *Date:* ${date}
│ ⏰ *Time:* ${time}
│ 🔑 *Prefix:* [ ${prefix} ]
╰────────────────────────╯

👇 *Khali dilya dropdown list madhun tumhi command category select karu shakta:*`;

        // Interactive Dropdown Sections
        const listSections = [
            {
                title: "📌 Main Categories",
                rows: [
                    {
                        header: "🌐 General",
                        title: "General Commands",
                        description: "Alive, Ping, Uptime, Owner, Guide",
                        id: `${prefix}generalmenu`
                    },
                    {
                        header: "📥 Downloads",
                        title: "Media Downloader",
                        description: "TikTok, YouTube, Instagram",
                        id: `${prefix}downmenu`
                    },
                    {
                        header: "🤖 AI Tools",
                        title: "Artificial Intelligence",
                        description: "ChatGPT, AI Search, Gen AI",
                        id: `${prefix}aimenu`
                    },
                    {
                        header: "🛠️ Utility Tools",
                        title: "Bot Utilities",
                        description: "Sticker, OCR, TTS, Poll, Shazam",
                        id: `${prefix}toolmenu`
                    },
                    {
                        header: "👥 Group Admin",
                        title: "Group Management",
                        description: "TagAll, Kick, Promote, Demote",
                        id: `${prefix}groupmenu`
                    },
                    {
                        header: "⛩️ Anime",
                        title: "Anime Commands",
                        description: "Waifu, Neko, Kitsune, Husbando",
                        id: `${prefix}animemenu`
                    }
                ]
            }
        ];

        try {
            const imageUrl = global.menuImage || 'https://i.imgur.com/8N4X9Zm.jpeg';

            // Baileys Interactive List Message Payload
            const listMessage = {
                image: { url: imageUrl },
                caption: captionText,
                footer: "⚡ Powered by RAHUL MASTER",
                title: "❖ RAHUL-AI COMMAND MENU ❖",
                buttonText: "📋 Select Category",
                sections: listSections
            };

            await sock.sendMessage(m.chat, listMessage, { quoted: m });

        } catch (err) {
            console.error('List Menu error:', err);
            await sock.sendMessage(m.chat, { text: captionText }, { quoted: m });
        }
    }
};
