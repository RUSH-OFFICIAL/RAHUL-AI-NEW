const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('⚡');
        
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

        const menuText = `
root@rahul-ai:~# ./system-info.sh
┌───────────────────────────
│ 👾 System: RAHUL-AI v2.0
│ 👑 Founder: ${Founder}
│ 💻 Owner: ${botOwner}
│ 👤 User: ${user}
│ 📅 Date: ${date}
│ ⏱️ Time: ${time}
│ ⚡ Prefix: [ ${prefix} ]
└───────────────────────────

> root@rahul-ai:~/commands# cat modules.list

root@general ~$
 [>] ${prefix}ᴀʟɪᴠᴇ
 [>] ${prefix}ᴘɪɴɢ
 [>] ${prefix}ᴜᴘᴛɪᴍᴇ
 [>] ${prefix}ᴏᴡɴᴇʀ
 [>] ${prefix}ɢᴜɪᴅᴇ
 [>] ${prefix}ᴍᴇɴᴜ2

root@downloaders ~$
 [>] ${prefix}ᴛɪᴋᴛᴏᴋ / ${prefix}ᴛᴛ
 [>] ${prefix}ʏᴛᴍᴘ3
 [>] ${prefix}ɪɢ

root@tools ~$
 [>] ${prefix}sᴛɪᴄᴋᴇʀ
 [>] ${prefix}ᴏᴄʀ
 [>] ${prefix}ᴛᴛs
 [>] ${prefix}ᴘᴏʟʟ
 [>] ${prefix}sʜᴀᴢᴀᴍ
 [>] ${prefix}ᴛᴇxᴛᴘʀᴏ
 [>] ${prefix}ᴄʜɪᴅ

root@ai ~$
 [>] ${prefix}ᴀɪ
 [>] ${prefix}ᴀɪ-sᴇᴀʀᴄʜ
 [>] ${prefix}ᴀɪᴠ
 [>] ${prefix}ɢᴇɴ

root@fun ~$
 [>] ${prefix}ʙʟᴜᴇ
 [>] ${prefix}ғʟᴀɢ

root@new ~$
 [>] ${prefix}ʜɪᴅᴇ
 [>] ${prefix}ɢᴜᴇssɢᴇɴᴅᴇʀ
 [>] ${prefix}ᴀɢᴇᴄᴀʟᴄᴜʟᴀᴛᴏʀ
 [>] ${prefix}sᴛʏʟᴇ

root@search ~$
 [>] ${prefix}ᴡᴇᴀᴛʜᴇʀ

root@anime ~$
 [>] ${prefix}ᴡᴀɪғᴜ
 [>] ${prefix}ɴᴇᴋᴏ
 [>] ${prefix}ᴋɪᴛꜱᴜɴᴇ
 [>] ${prefix}ʜᴜꜱʙᴀɴᴅᴏ

root@group ~$
 [>] ${prefix}ᴛᴀɢᴀʟʟ
 [>] ${prefix}ᴛᴀɢᴀʟʟ1
 [>] ${prefix}ᴛᴀɢᴍᴇ
 [>] ${prefix}ᴄᴏᴜᴘʟᴇᴘᴘ
 [>] ${prefix}ɢʀᴏᴜᴘ
 [>] ${prefix}ɢɪɴғᴏ
 [>] ${prefix}ᴀɴᴛɪɢsᴛ

root@status ~$
 [>] ${prefix}ɢsᴛᴀᴛᴜs

root@channel ~$
 [>] ${prefix}ᴄʜᴀɴɴᴇʟɪᴅ

root@admin ~$
 [>] ${prefix}ᴋɪᴄᴋ
 [>] ${prefix}ᴘʀᴏᴍᴏᴛᴇ
 [>] ${prefix}ᴅᴇᴍᴏᴛᴇ

# Status: Online & Secure
> [ ⚡ Executed by Rahul Master ]
`.trim();

        try {
            const imageBuffer = (await axios.get(global.menuImage, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply('❌ Failed to load menu. Please try again later.');
        }
    }
};
