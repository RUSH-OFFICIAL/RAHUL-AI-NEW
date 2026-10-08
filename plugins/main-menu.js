const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands with ultimate auto-changing styles v3.0',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        m.react('⚡').catch(() => {});
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Africa/Accra'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Africa/Accra'
        });

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // Optimized Command Arrays
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

        // 8 Ultra-Different Auto-Changing Styles
        const menuStyles = [
            // Style 1: Neural Matrix
            `
╔══════════════════════╗
║ 🧬 *${Founder.toUpperCase()} MATRIX* 🧬
╚══════════════════════╝
│ 👑 Founder : ${Founder}
│ ⚡ Owner   : ${botOwner}
│ 👤 User    : ${user}
│ 📅 Date    : ${date}
│ ⏰ Time    : ${time}
│ ⚙️ Prefix  : ${prefix}
╚══════════════════════╝

┌─〔 ⚡ ɢᴇɴᴇʀᴀʟ ᴄᴍᴅꜱ 〕
│ 🚀 ${c.general}
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

> 💫 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${Founder}*`.trim(),

            // Style 2: Neon Hologram Grid
            `
╭━━━〔 💫 ʀᴀʜᴜʟ-ᴀɪ ʜᴏʟᴏɢʀᴀᴍ 〕━━━╮
┃ 👑 𝐹𝑜𝑢𝑛𝒅𝑒𝑟 : ${Founder}
┃ ⚡ 𝑂𝑤𝑛𝑒𝑟   : ${botOwner}
┃ 👤 𝑈𝑠𝑒𝑟    : ${user}
┃ 📅 𝐷𝑎𝑡𝑒    : ${date}
┃ ⏰ 𝑇𝑖𝑚𝑒    : ${time}
┃ ⚙️ 𝑃𝑟𝑒𝑓𝑖𝑥  : ${prefix}
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

┌───❖ *👥 𝐆𝐑𝐎𝐔𝐏*
│ 💎 ${c.group}
└───────────────◆

┌───❖ *📊 𝐒𝐓𝐀𝐓𝐔𝐒*
│ 💎 ${c.status}
└───────────────◆

┌───❖ *📢 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
│ 💎 ${c.channel}
└───────────────◆

┌───❖ *🛡️ 𝐀𝐃𝙼𝙸𝙽*
│ 💎 ${c.admin}
└───────────────◆

> ❖ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ ❖`.trim(),

            // Style 3: Deep Console Retro
            `
╔═════════════════════════╗
║ 🤖 ʀᴀʜᴜʟ-ᴀɪ ᴄᴏɴꜱᴏʟᴇ ᴠ3.0 ║
╚═════════════════════════╝
│ » ꜰᴏᴜɴᴅᴇʀ : ${Founder}
│ » ᴏᴡɴᴇʀ   : ${botOwner}
│ » ᴜꜱᴇʀ    : ${user}
│ » ᴅᴀᴛᴇ    : ${date}
│ » ᴛɪᴍᴇ    : ${time}
│ » ᴘʀᴇꜰɪx  : ${prefix}
╚═════════════════════════╝

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

> ⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${Founder}`.trim(),

            // Style 4: Minimal Elegant Box
            `
┌ ❖ *ʀᴀʜᴜʟ-ᴀɪ ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ*
│ 👑 Founder : ${Founder}
│ ⚡ Owner   : ${botOwner}
│ 👤 User    : ${user}
│ 📅 Date    : ${date}
│ ⏰ Time    : ${time}
│ ⚙️ Prefix  : ${prefix}
└───────────────┈⊷

◈ *ɢᴇɴᴇʀᴀʟ*
  ◦ ${c.general.replace(/\n│ /g, '\n  ◦ ')}

◈ *ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ*
  ◦ ${c.downloader.replace(/\n│ /g, '\n  ◦ ')}

◈ *ᴛᴏᴏʟꜱ*
  ◦ ${c.tools.replace(/\n│ /g, '\n  ◦ ')}

◈ *ᴀɪ ᴄᴍᴅꜱ*
  ◦ ${c.ai.replace(/\n│ /g, '\n  ◦ ')}

◈ *ꜰᴜɴ*
  ◦ ${c.fun.replace(/\n│ /g, '\n  ◦ ')}

◈ *ɴᴇᴡ*
  ◦ ${c.new.replace(/\n│ /g, '\n  ◦ ')}

◈ *ꜱᴇᴀʀᴄʜ*
  ◦ ${c.search}

◈ *ᴀɴɪᴍᴇ*
  ◦ ${c.anime.replace(/\n│ /g, '\n  ◦ ')}

◈ *ɢʀᴏᴜᴘ*
  ◦ ${c.group.replace(/\n│ /g, '\n  ◦ ')}

◈ *ꜱᴛᴀᴛᴜꜱ*
  ◦ ${c.status}

◈ *ᴄʜᴀɴɴᴇʟ*
  ◦ ${c.channel}

◈ *ᴀᴅᴍɪɴ*
  ◦ ${c.admin.replace(/\n│ /g, '\n  ◦ ')}

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${Founder}*`.trim()
        ];

        // Pick one style randomly automatically
        const randomMenuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        try {
            const response = await axios.get(menuImageUrl, {
                responseType: 'arraybuffer',
                timeout: 3500 // Ultra-fast optimized timeout
            });

            await m.reply(response.data, {
                caption: randomMenuText
            });

        } catch (err) {
            console.error('Fast menu fallback:', err.message);
            await m.reply(randomMenuText);
        }
    }
};
