module.exports = {
    name: 'menu',
    description: 'Show available bot commands with ultimate auto-changing styles & direct image url',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        // Safe reaction handling
        try {
            if (sock.sendMessage && m.key) {
                await sock.sendMessage(m.chat, { 
                    react: { text: '⚡', key: m.key } 
                });
            }
        } catch (e) {}
        
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

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴🇷';
        
        // Rotating Image URLs (Pratyek veles automatically image change hoil)
        const menuImages = [
            'https://sam-cdn.zone.id/files/QyFk2yt61I.jpg',
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg',
            'https://files.catbox.moe/57j7w5.jpg',
            'https://files.catbox.moe/g24h0f.jpg'
        ];
        const menuImageUrl = menuImages[Math.floor(Math.random() * menuImages.length)];

        // Commands list
        const c = {
            general: `${prefix}alive\n│ 🚀 ${prefix}ping\n│ 🚀 ${prefix}uptime\n│ 🚀 ${prefix}owner\n│ 🚀 ${prefix}guide\n│ 🚀 ${prefix}menu2`,
            downloader: `${prefix}tiktok / ${prefix}tt\n│ 📥 ${prefix}ytmp3\n│ 📥 ${prefix}ig`,
            tools: `${prefix}sticker\n│ 🛠️ ${prefix}ocr\n│ 🛠️ ${prefix}tts\n│ 🛠️ ${prefix}poll\n│ 🛠️ ${prefix}shazam\n│ 🛠️ ${prefix}textpro\n│ 🛠️ ${prefix}chid`,
            ai: `${prefix}ai\n│ 🤖 ${prefix}ai-search\n│ 🤖 ${prefix}aiv\n│ 🤖 ${prefix}gen`,
            fun: `${prefix}blue\n│ 🎮 ${prefix}flag`,
            new: `${prefix}hide\n│ ✨ ${prefix}guessgender\n│ ✨ ${prefix}agecalculator\n│ ✨ ${prefix}style`,
            search: `${prefix}weather`,
            anime: `${prefix}waifu\n│ 🌸 ${prefix}neko\n│ 🌸 ${prefix}kitsune\n│ 🌸 ${prefix}husbando`,
            group: `${prefix}tagall\n│ 👥 ${prefix}tagall1\n│ 👥 ${prefix}tagme\n│ 👥 ${prefix}couplepp\n│ 👥 ${prefix}group\n│ 👥 ${prefix}ginfo\n│ 👥 ${prefix}antigst`,
            status: `${prefix}gstatus`,
            channel: `${prefix}channelid`,
            admin: `${prefix}kick\n│ 🛡️ ${prefix}promote\n│ 🛡️ ${prefix}demote`
        };

        // Unique Menu Variations (Auto-Changing Styles)
        const menuStyles = [
            // Style 1: Matrix Core
            `╔════════════════════════════╗
║ 🧬 *⚡ 𝑹𝑨𝑯𝑼𝑳-𝑨𝑰 𝑴𝑨𝑻𝑹𝑰𝓧 ⚡* 🧬
╚════════════════════════════╝
│ 👑 𝐹𝑜𝑢𝑛𝒅𝑒𝑟 : ${Founder}
│ ⚡ 𝑂𝑤𝑛𝑒𝑟   : ${botOwner}
│ 👤 𝑈𝑠𝑒𝑟    : ${user}
│ 📅 𝐷𝑎𝑡𝑒    : ${date}
│ ⏰ 𝑇𝑖𝑚𝑒    : ${time}
│ ⚙️ 𝑃𝑟𝑒𝑓𝑖𝑥  : ${prefix}
╚════════════════════════════╝

┌─〔 🚀 ɢᴇɴᴇʀᴀʟ ᴄᴍᴅꜱ 〕
│ ⚡ ${c.general}
└───────────────◆

┌─〔 📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ 〕
│ 📥 ${c.downloader}
└───────────────◆

┌─〔 🛠️ ᴛᴏᴏʟꜱ 〕
│ 🛠️ ${c.tools}
└───────────────◆

┌─〔 🤖 ᴀɪ ᴄᴍᴅꜱ 〕
│ 🤖 ${c.ai}
└───────────────◆

┌─〔 🎮 ꜰᴜɴ 〕
│ 🎮 ${c.fun}
└───────────────◆

┌─〔 ✨ ɴᴇᴡ ᴄᴍᴅꜱ 〕
│ ✨ ${c.new}
└───────────────◆

┌─〔 🔍 ꜱᴇᴀʀᴄʜ 〕
│ 🔍 ${c.search}
└───────────────◆

┌─〔 🌸 ᴀɴɪᴍᴇ 〕
│ 🌸 ${c.anime}
└───────────────◆

┌─〔 👥 ɢʀᴏᴜᴘ ᴄᴍᴅꜱ 〕
│ 👥 ${c.group}
└───────────────◆

┌─〔 📊 ꜱᴛᴀᴛᴜꜱ 〕
│ 📊 ${c.status}
└───────────────◆

┌─〔 📢 ᴄʜᴀɴɴᴇʟ 〕
│ 📢 ${c.channel}
└───────────────◆

┌─〔 🛡️ ᴀᴅᴍɪɴ ᴄᴍᴅꜱ 〕
│ 🛡️ ${c.admin}
└───────────────◆

> 💫 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜ𝗟-ᴀɪ*`,

            // Style 2: Hologram Grid
            `╭━━━〔 💫 𝕽𝙰𝙷𝚄𝙻-𝙰𝙸 𝖍𝖔𝖑𝖔𝖌𝖗𝖆𝖒 〕━━━╮
┃ 👑 Founder : ${Founder}
┃ ⚡ Owner   : ${botOwner}
┃ 👤 User    : ${user}
┃ 📅 Date    : ${date}
┃ ⏰ Time    : ${time}
┃ ⚙️ Prefix  : ${prefix}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

┌───❖ *🚀 𝐆𝐄𝐍𝐄𝐑𝐀𝐋*
│ 💎 ${c.general}
└───────────────◆

┌───❖ *📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑𝐒*
│ 💎 ${c.downloader}
└───────────────◆

┌───❖ *🛠️ 𝐓𝐎𝐎𝐋𝐒*
│ 💎 ${c.tools}
└───────────────◆

┌───❖ *🤖 𝐀𝐈 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
│ 💎 ${c.ai}
└───────────────◆

┌───❖ *🎮 𝐅𝐔𝐍*
│ 💎 ${c.fun}
└───────────────◆

┌───❖ *✨ 𝐍𝐄𝐖 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
│ 💎 ${c.new}
└───────────────◆

┌───❖ *🔍 𝐒𝐄𝐀𝐑𝐂𝐇*
│ 💎 ${c.search}
└───────────────◆

┌───❖ *🌸 𝐀𝐍𝐈𝐌𝐄*
│ 💎 ${c.anime}
└───────────────◆

┌───❖ *👥 𝐆𝐑𝐎𝚄𝙿*
│ 💎 ${c.group}
└───────────────◆

┌───❖ *📊 𝐒𝐓𝐀𝐓𝚄𝚂*
│ 💎 ${c.status}
└───────────────◆

┌───❖ *📢 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
│ 💎 ${c.channel}
└───────────────◆

┌───❖ *🛡️ 𝐀𝐃𝙼𝙸𝙽*
│ 💎 ${c.admin}
└───────────────◆

> ❖ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜ𝚕-ᴀɪ ɴᴇᴛᴡᴏʀᴋ ❖`,

            // Style 3: Cyber Console
            `╔═════════════════════════════╗
║ 🤖 ʀᴀʜᴜʟ-ᴀɪ ᴄʏʙᴇʀ ᴄᴏɴꜱᴏʟᴇ  ║
╚═════════════════════════════╝
│ » ꜰᴏᴜɴᴅᴇʀ : ${Founder}
│ » ᴏᴡɴᴇ🇷   : ${botOwner}
│ » ᴜꜱᴇʀ    : ${user}
│ » ᴅᴀᴛᴇ    : ${date}
│ » ᴛɪᴍᴇ    : ${time}
│ » ᴘʀᴇꜰɪx  : ${prefix}
╚═════════════════════════════╝

╭─[ ⚡ ɢᴇɴᴇʀᴀʟ ]
│ ◈ ${c.general}
╰───────────────◆

╭─[ 📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ ]
│ ◈ ${c.downloader}
╰───────────────◆

╭─[ 🛠️ ᴛᴏᴏʟꜱ ]
│ ◈ ${c.tools}
╰───────────────◆

╭─[ 🤖 ᴀɪ ]
│ ◈ ${c.ai}
╰───────────────◆

╭─[ 🎮 ꜰᴜɴ ]
│ ◈ ${c.fun}
╰───────────────◆

╭─[ ✨ ɴᴇᴡ ]
│ ◈ ${c.new}
╰───────────────◆

╭─[ 🔍 ꜱᴇᴀʀᴄʜ ]
│ ◈ ${c.search}
╰───────────────◆

╭─[ 🌸 ᴀɴɪᴍᴇ ]
│ ◈ ${c.anime}
╰───────────────◆

╭─[ 👥 ɢʀᴏᴜᴘ ]
│ ◈ ${c.group}
╰───────────────◆

╭─[ 📊 ꜱᴛᴀᴛᴜꜱ ]
│ ◈ ${c.status}
╰───────────────◆

╭─[ 📢 ᴄʜᴀɴɴᴇʟ ]
│ ◈ ${c.channel}
╰───────────────◆

╭─[ 🛡️ ᴀᴅᴍɪɴ ]
│ ◈ ${c.admin}
╰───────────────◆

> ⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ-ᴀɪ ꜱʏꜱᴛᴇᴍ`
        ];

        const randomMenuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        // Send message with direct Image URL & Auto-Changing Style Text
        try {
            await sock.sendMessage(m.chat, {
                image: { url: menuImageUrl },
                caption: randomMenuText
            }, { quoted: m });
        } catch (err) {
            console.error('Menu send error:', err);
            // Fallback to text if image fails to render
            await sock.sendMessage(m.chat, { text: randomMenuText }, { quoted: m });
        }
    }
};
