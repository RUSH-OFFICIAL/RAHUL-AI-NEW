module.exports = {
    name: 'menu',
    description: 'Show available bot commands with auto-changing styles and images',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        // Safe reaction handler
        try {
            await sock.sendMessage(m.chat, { 
                react: { text: '⚡', key: m.key } 
            });
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

        // 🌟 Automatic Rotating Image URLs (Direct URL passing - No Axios Crash)
        const menuImages = [
            'https://sam-cdn.zone.id/files/QyFk2yt61I.jpg',
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg',
            'https://files.catbox.moe/57j7w5.jpg',
            'https://files.catbox.moe/g24h0f.jpg'
        ];
        const randomImage = menuImages[Math.floor(Math.random() * menuImages.length)];

        // Commands block
        const cmdList = `
├─ム *ɢᴇɴᴇʀᴀʟ*
│ ᪣ ${prefix}ᴀʟɪᴠᴇ
│ ᪣ ${prefix}ᴘɪɴɢ
│ ᪣ ${prefix}ᴜᴘᴛɪᴍᴇ
│ ᪣ ${prefix}ᴏᴡɴᴇʀ
│ ᪣ ${prefix}ɢᴜɪᴅᴇ
│ ᪣ ${prefix}ᴍᴇɴᴜ2
│
├─ム *ᴅᴏᴡɴʟᴏᴀᴅᴇʀs*
│ ᪣ ${prefix}ᴛɪᴋᴛᴏᴋ / ${prefix}ᴛᴛ
│ ᪣ ${prefix}ʏᴛᴍᴘ3
│ ᪣ ${prefix}ɪɢ
│
├─ム *ᴛᴏᴏʟs*
│ ᪣ ${prefix}sᴛɪᴄᴋᴇʀ
│ ᪣ ${prefix}ᴏᴄʀ
│ ᪣ ${prefix}ᴛᴛs
│ ᪣ ${prefix}ᴘᴏʟʟ
│ ᪣ ${prefix}sʜᴀᴢᴀᴍ
│ ᪣ ${prefix}ᴛᴇxᴛᴘʀᴏ
│ ᪣ ${prefix}ᴄʜɪᴅ
│
├─ム *ᴀɪ*
│ ᪣ ${prefix}ᴀɪ
│ ᪣ ${prefix}ᴀɪ-sᴇᴀʀᴄʜ
│ ᪣ ${prefix}ᴀɪᴠ
│ ᪣ ${prefix}ɢᴇɴ
│
├─ム *ғᴜɴ*
│ ᪣ ${prefix}ʙʟᴜᴇ
│ ᪣ ${prefix}ғʟᴀɢ
│
├─ム *ɴᴇᴡ*
│ ᪣ ${prefix}ʜɪᴅᴇ
│ ᪣ ${prefix}ɢᴜᴇssɢᴇɴᴅᴇʀ
│ ᪣ ${prefix}ᴀɢᴇᴄᴀʟᴄᴜʟᴀᴛᴏʀ
│ ᪣ ${prefix}sᴛʏʟᴇ
│
├─ム *ꜱᴇᴀʀᴄʜ*
│ ᪣ ${prefix}ᴡᴇᴀᴛʜᴇʀ
│
├─ム *ᴀɴɪᴍᴇ*
│ ᪣ ${prefix}ᴡᴀɪғᴜ
│ ᪣ ${prefix}ɴᴇᴋᴏ
│ ᪣ ${prefix}ᴋɪᴛꜱᴜɴᴇ
│ ᪣ ${prefix}ʜᴜꜱʙᴀɴᴅᴏ
│
├─ム *ɢʀᴏᴜᴘ*
│ ᪣ ${prefix}ᴛᴀɢᴀʟʟ
│ ᪣ ${prefix}ᴛᴀɢᴀʟʟ1
│ ᪣ ${prefix}ᴛᴀɢᴍᴇ
│ ᪣ ${prefix}ᴄᴏᴜᴘʟᴇᴘᴘ
│ ᪣ ${prefix}ɢʀᴏᴜᴘ
│ ᪣ ${prefix}ɢɪɴғᴏ
│ ᪣ ${prefix}ᴀɴᴛɪɢsᴛ
│
├─ム *sᴛᴀᴛᴜs*
│ ᪣ ${prefix}ɢsᴛᴀᴛᴜs
│
├─ム *ᴄʜᴀɴɴᴇʟ*
│ ᪣ ${prefix}ᴄʜᴀɴɴᴇʟɪᴅ
│
├─ム *ᴀᴅᴍɪɴ*
│ ᪣ ${prefix}ᴋɪᴄᴋ
│ ᪣ ${prefix}ᴘʀᴏᴍᴏᴛᴇ
│ ᪣ ${prefix}ᴅᴇᴍᴏᴛᴇ`;

        // 🌟 Automatic Rotating 5 Different Styles
        const menuStyles = [
            `┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ (STYLE 1)
│ *ғᴏᴜɴᴅᴇʀ:* ${Founder}
│ *ᴏᴡɴᴇʀ:* ${botOwner}
│ *ᴜsᴇʀ:* ${user}
│ *ᴅᴀᴛᴇ:* ${date}
│ *ᴛɪᴍᴇ:* ${time}
│ *ᴘʀᴇғɪx:* ${prefix}
╰──────────────────╯

┌─ム ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅs
${cmdList}
╰─────────◆────────╯

> 「 ᴩᴏᴡᴇʀᴇᴅ - ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ 」`,

            `╭━━━〔 💫 𝕽𝙰𝙷𝚄𝙻-𝙰𝙸 ʜᴏʟᴏɢʀ𝖆ᴍ 〕━━━╮
┃ *ғᴏᴜɴᴅᴇʀ:* ${Founder}
┃ *ᴏᴡɴᴇʀ:* ${botOwner}
┃ *ᴜsᴇʀ:* ${user}
┃ *ᴅᴀᴛᴇ:* ${date}
┃ *ᴘʀᴇғɪx:* ${prefix}
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━╯

┌───❖ *ᴀᴠᴀɪʟᴀʙʟᴇ ᴄᴏᴍᴍᴀɴᴅs*
${cmdList}
└───────────────◆

> ❖ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜ𝚕-ᴀɪ (STYLE 2)`,

            `╔════════════════════════════╗
║ 🧬 *⚡ 𝑹𝑨𝙷𝚄𝙻-𝑨𝙸 𝙼𝙰𝚃𝚁𝙸𝚇 ⚡* 🧬
╚════════════════════════════╝
│ 👑 𝐹𝑜𝑢𝑛𝒅𝑒𝑟 : ${Founder}
│ ⚡ 𝑂𝑤𝑛𝑒𝑟   : ${botOwner}
│ 👤 𝑈𝑠𝑒𝑟    : ${user}
│ 📅 𝐷𝑎𝑡𝑒    : ${date}
╚════════════════════════════╝

┌─〔 ᴄᴏᴍᴍᴀɴᴅꜱ ʟɪꜱᴛ 〕
${cmdList}
└───────────────◆

> 💫 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜ𝚕-ᴀɪ (STYLE 3)*`,

            `╔═════════════════════════════╗
║ 🤖 ʀᴀʜᴜʟ-ᴀɪ ᴄʏʙᴇʀ ᴄᴏɴꜱᴏʟᴇ  ║
╚═════════════════════════════╝
│ » ꜰᴏᴜɴᴅᴇʀ : ${Founder}
│ » ᴏᴡɴᴇʀ   : ${botOwner}
│ » ᴜꜱᴇʀ    : ${user}
│ » ᴛɪᴍᴇ    : ${time}
╚═════════════════════════════╝

╭─[ ᴄᴍᴅꜱ ᴄᴏɴꜱᴏʟᴇ ]
${cmdList}
╰───────────────◆

> ⚡ ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜ𝚕-ᴀɪ (STYLE 4)`,

            `╔════════════════════════════╗
║ 👑 *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝚁𝙾𝚈𝙰𝙻 𝙼𝙴𝙽𝚄* 👑
╚════════════════════════════╝
│ ❖ ꜰᴏᴜɴᴅᴇʀ : ${Founder}
│ ❖ ᴏᴡɴᴇʀ   : ${botOwner}
│ ❖ ᴜꜱᴇʀ    : ${user}
╚════════════════════════════╝

🚀 *[ ᴀʟʟ ᴄᴏᴍᴍᱟɴᴅꜱ ]*
${cmdList}

> 💎 *ᴘᴏᴡᴇʀᴇᴅ ʙʏ ʀᴀʜᴜ𝚕-ᴀɪ (STYLE 5)*`
        ];

        // Randomly select one style automatically
        const randomMenuText = menuStyles[Math.floor(Math.random() * menuStyles.length)].trim();

        try {
            // Direct safe URL sending (No Axios Buffer needed)
            await sock.sendMessage(m.chat, {
                image: { url: randomImage },
                caption: randomMenuText
            }, { quoted: m });

        } catch (err) {
            console.error('Menu error:', err);
            // Fallback text just in case
            await sock.sendMessage(m.chat, { text: randomMenuText }, { quoted: m });
        }
    }
};
