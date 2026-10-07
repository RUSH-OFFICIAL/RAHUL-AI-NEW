const axios = require('axios');
const os = require('os');

module.exports = {
    name: 'alive',
    description: 'Check bot status in compact neon style',
    aliases: ['botstatus', 'status'],

    async execute(sock, m) {
        await m.react('🟢');

        const prefix = global.BOT_PREFIX || '.';
        const botOwner = global.ownerName || 'Rahul Hiran';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        // Uptime
        const uptime = process.uptime();
        const h = Math.floor(uptime / 3600);
        const mMin = Math.floor((uptime % 3600) / 60);
        const s = Math.floor(uptime % 60);

        const aliveText = `
┌───『 🟢 *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝚂𝚃𝙰𝚃𝚄𝚂* 』
│
├◈ *User:* \`${user}\`
├◈ *Owner:* \`${botOwner}\`
├◈ *Prefix:* [ \`${prefix}\` ]
├◈ *Uptime:* \`${h}h ${mMin}m${s}s\`
├◈ *RAM:* \`${(os.freemem() / 1024 / 1024 / 1024).toFixed(1)}GB Free\`
│
└──『 ⚡ *SYSTEM OPERATIONAL* 』
`.trim();

        try {
            const imageUrl = global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg';
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await sock.sendMessage(m.chat, {
                image: imageBuffer,
                caption: aliveText
            }, { quoted: m });

        } catch (err) {
            console.error('Alive style error:', err);
            await sock.sendMessage(m.chat, { text: aliveText }, { quoted: m });
        }
    }
};
