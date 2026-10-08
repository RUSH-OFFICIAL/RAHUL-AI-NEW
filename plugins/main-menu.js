const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands with auto-changing styles',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('🔥');
        
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
        
        // Fixed Menu Image Link
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // Command lists structure
        const cmds = {
            general: `${prefix}alive | ${prefix}ping | ${prefix}uptime | ${prefix}owner | ${prefix}guide | ${prefix}menu2`,
            downloader: `${prefix}tiktok (${prefix}tt) | ${prefix}ytmp3 | ${prefix}ig`,
            tools: `${prefix}sticker | ${prefix}ocr | ${prefix}tts | ${prefix}poll | ${prefix}shazam | ${prefix}textpro | ${prefix}chid`,
            ai: `${prefix}ai | ${prefix}ai-search | ${prefix}aiv | ${prefix}gen`,
            fun: `${prefix}blue | ${prefix}flag`,
            new: `${prefix}hide | ${prefix}guessgender | ${prefix}agecalculator | ${prefix}style`,
            search: `${prefix}weather`,
            anime: `${prefix}waifu | ${prefix}neko | ${prefix}kitsune | ${prefix}husbando`,
            group: `${prefix}tagall | ${prefix}tagall1 | ${prefix}tagme | ${prefix}couplepp | ${prefix}group | ${prefix}ginfo | ${prefix}antigst`,
            status: `${prefix}gstatus`,
            channel: `${prefix}channelid`,
            admin: `${prefix}kick | ${prefix}promote | ${prefix}demote`
        };

        // Array of different menu designs that change automatically
        const menuStyles = [
            // Style 1: Cyberpunk Box Style
            `
┏━━━✦ 𝑹𝑨𝑯𝑼𝑳-𝑨𝑰 𝑴𝑼𝑳𝑻𝑰𝑫𝑬𝑽𝑰𝑪𝑬 ✦━━━┓
┃ 👑 𝐹𝑜𝑢𝑛𝒅𝑒𝑟 : ${Founder}
┃ ⚡ 𝑂𝑤𝑛𝑒𝑟   : ${botOwner}
┃ 👤 𝑈𝑠𝑒𝑟    : ${user}
┃ 📅 𝐷𝑎𝑡𝑒    : ${date}
┃ ⏰ 𝑇𝑖𝑚𝑒    : ${time}
┃ ⚙️ 𝑃𝑟𝑒𝑓𝑖𝑥  : ${prefix}
┗━━━━━━━━━━━━━━━━━━━━━━━━━━━┛

┌───❖ *⚡ 𝐆𝐄𝐍𝐄𝐑𝐀𝐋*
│ ➣ ${cmds.general.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *📥 𝐃𝐎𝐖𝐍𝐋𝐎𝐀𝐃𝐄𝐑𝐒*
│ ➣ ${cmds.downloader.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *🛠️ 𝐓𝐎𝐎𝐋𝐒*
│ ➣ ${cmds.tools.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *🤖 𝐀𝐈 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
│ ➣ ${cmds.ai.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *🎮 𝐅𝐔𝐍*
│ ➣ ${cmds.fun.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *✨ 𝐍𝐄𝐖 𝐂𝐎𝐌𝐌𝐀𝐍𝐃𝐒*
│ ➣ ${cmds.new.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *🔍 𝐒𝐄𝐀𝐑𝐂𝐇*
│ ➣ ${cmds.search.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *🌸 𝐀𝐍𝐈𝐌𝐄*
│ ➣ ${cmds.anime.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *👥 𝐆𝐑𝐎𝐔𝐏*
│ ➣ ${cmds.group.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *📊 𝐒𝐓𝐀𝐓𝐔𝐒*
│ ➣ ${cmds.status.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *📢 𝐂𝐇𝐀𝐍𝐍𝐄𝐋*
│ ➣ ${cmds.channel.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

┌───❖ *🛡️ 𝐀𝐃𝐌𝐈𝐍*
│ ➣ ${cmds.admin.replaceAll(' | ', '\n│ ➣ ')}
└───────────────◆

> ❖ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛ𝙴ʀ ❖`.trim(),

            // Style 2: Modern Minimal Box Style
            `
╭━━━〔 🅡︎🅐︎🅗︎🅤︎-🅛︎🅘︎🅣︎🅔︎ 🅑︎🅞︎🅣︎ 〕━━━⬣
┃ 👑 *Founder:* ${Founder}
┃ ⚡ *Owner:* ${botOwner}
┃ 👤 *User:* ${user}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ ⚙️ *Prefix:* ${prefix}
╰━━━━━━━━━━━━━━━━━━━⬣

╭─〔 🚀 ɢᴇɴᴇʀᴀʟ ᴄᴍᴅs 〕
│ ✦ ${cmds.general.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀs 〕
│ ✦ ${cmds.downloader.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 🛠️ ᴛᴏᴏʟs 〕
│ ✦ ${cmds.tools.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 🤖 ᴀɪ ᴄᴏᴍᴍᴀɴᴅs 〕
│ ✦ ${cmds.ai.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 🎮 ꜰᴜɴ 〕
│ ✦ ${cmds.fun.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 ✨ ɴᴇᴡ ᴄᴍᴅs 〕
│ ✦ ${cmds.new.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 🔍 sᴇᴀʀᴄʜ 〕
│ ✦ ${cmds.search.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 🌸 ᴀɴɪᴍᴇ 〕
│ ✦ ${cmds.anime.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 👥 ɢʀᴏᴜ𝚙 ᴄᴍᴅs 〕
│ ✦ ${cmds.group.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 📊 sᴛᴀᴛᴜs 〕
│ ✦ ${cmds.status.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 📢 ᴄʜᴀɴɴᴇʟ 〕
│ ✦ ${cmds.channel.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

╭─〔 🛡️ ᴀᴅᴍɪɴ 〕
│ ✦ ${cmds.admin.replaceAll(' | ', '\n│ ✦ ')}
╰───────────────◆

> 💫 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ*`.trim(),

            // Style 3: Hacker Terminal Style
            `
┌──────────────────────────
│ 🅡︎🅐︎🅗︎🅤︎🅛︎-🅐︎🅘︎ 🅜︎🅤︎🅛︎🅣︎🅘︎🅥︎🅔︎🅡︎🅢︎𝙴
├──────────────────────────
│ » 𝙁𝙤𝙪𝙣𝙙𝙚𝙧 : ${Founder}
│ » 𝙊𝙬𝙣𝙚𝙧   : ${botOwner}
│ » 𝙐𝙨𝙚𝙧    : ${user}
│ » 𝘿𝙖𝙩𝙚    : ${date}
│ » 𝙏𝙞𝙢𝙚    : ${time}
│ » 𝙋𝙧𝙚𝙛𝙞𝙭  : ${prefix}
└──────────────────────────

╭───「 🌐 𝙂𝙀𝙉𝙀𝙍𝘼𝙇 」
│ ◈ ${cmds.general.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 📥 𝘿𝙊𝙒𝙉𝙇𝙊𝘼𝘿𝙀𝙍𝙎 」
│ ◈ ${cmds.downloader.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 🛠️ 𝙏𝙊𝙊𝙇𝙎 」
│ ◈ ${cmds.tools.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 🤖 𝘼𝙄 𝘾𝙊𝙈𝙼𝘼𝙉𝘿𝙎 」
│ ◈ ${cmds.ai.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 🎮 𝙁𝙐𝙉 」
│ ◈ ${cmds.fun.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 ✨ 𝙉𝙀𝙒 𝘾𝙈𝘿𝙎 」
│ ◈ ${cmds.new.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 🔍 𝙎𝙀𝘼𝙍𝘾𝙃 」
│ ◈ ${cmds.search.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 🌸 𝘼𝙉𝙄𝙈𝙀 」
│ ◈ ${cmds.anime.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 👥 𝙂𝙍𝙊𝙐𝙋 」
│ ◈ ${cmds.group.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 📊 𝙎𝙏𝘼𝙏𝙐𝙎 」
│ ◈ ${cmds.status.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 📢 𝘾𝙃𝘼𝙉𝙉𝙀𝙇 」
│ ◈ ${cmds.channel.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

╭───「 🛡️ 𝘼𝘿𝐌𝙸𝙽 」
│ ◈ ${cmds.admin.replaceAll(' | ', '\n│ ◈ ')}
╰───────────────◆

> ⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ${Founder}`.trim()
        ];

        // Automatically pick a random style every time the command is triggered
        const randomMenuText = menuStyles[Math.floor(Math.random() * menuStyles.length)];

        try {
            const imageBuffer = (await axios.get(menuImageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: randomMenuText
            });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(randomMenuText);
        }
    }
};
