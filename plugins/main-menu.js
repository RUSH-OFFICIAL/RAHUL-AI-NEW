const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in a small fancy layout',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('⚡');
        
        const prefix = global.BOT_PREFIX || '.';
        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        const menuText = `
╭━━━❮ *🌐 RAHUL-AI MINI* ❯━━━╮
┃ 👤 *User:* \`${user}\`
┃ ⚡ *Prefix:* [ \`${prefix}\` ]
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭──❑ *⚡ QUICK COMMANDS* 
┃ ◈ \`${prefix}alive\` • \`${prefix}ping\`
┃ ◈ \`${prefix}owner\` • \`${prefix}uptime\`
╰──────────────────────╯

╭──❑ *📥 DOWNLOADERS*
┃ ◈ \`${prefix}tt\` / \`${prefix}tiktok\`
┃ ◈ \`${prefix}ytmp3\` • \`${prefix}ig\`
╰──────────────────────╯

╭──❑ *🛠️ TOOLS & AI*
┃ ◈ \`${prefix}ai\` • \`${prefix}ai-search\`
┃ ◈ \`${prefix}sticker\` • \`${prefix}tts\`
╰──────────────────────╯

╭──❑ *🎮 FUN & OTHERS*
┃ ◈ \`${prefix}blue\` • \`${prefix}weather\`
┃ ◈ \`${prefix}waifu\` • \`${prefix}tagall\`
╰──────────────────────╯

> *Type ${prefix}help <command> for info*
⚡ *Powered by ${botOwner}*
`.trim();

        try {
            const imageUrl = global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg';
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await sock.sendMessage(m.chat, {
                image: imageBuffer,
                caption: menuText
            }, { quoted: m });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(menuText);
        }
    }
};
