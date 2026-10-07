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
            month: 'short',
            year: 'numeric',
            timeZone: 'Africa/Accra'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Africa/Accra'
        });

        const botOwner = global.ownerName || 'R A H U L';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = 'R A H U L - M A S T E R';

        const menuText = `
╭━━━〔 ⚡ *ＲＡＨＵＬ - ＡＩ* ⚡ 〕━━━╮

  👤 *User:* ${user}
  👑 *Owner:* ${botOwner}
  💎 *Founder:* ${Founder}
  📅 *Date:* ${date}
  ⏰ *Time:* ${time} (GMT)
  ⚙️ *Prefix:* [ ${prefix} ]

╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📌 *GENERAL* 〕━━━╮
  › ${prefix}alive
  › ${prefix}ping
  › ${prefix}uptime
  › ${prefix}owner
  › ${prefix}guide
  › ${prefix}menu2
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 📥 *DOWNLOADERS* 〕━━━╮
  › ${prefix}tiktok | ${prefix}tt
  › ${prefix}ytmp3
  › ${prefix}ig
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🛠️ *TOOLS* 〕━━━╮
  › ${prefix}sticker
  › ${prefix}ocr
  › ${prefix}tts
  › ${prefix}poll
  › ${prefix}shazam
  › ${prefix}textpro
  › ${prefix}chid
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🤖 *ARTIFICIAL INT.* 〕━━━╮
  › ${prefix}ai
  › ${prefix}ai-search
  › ${prefix}aiv
  › ${prefix}gen
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🎮 *FUN & NEW* 〕━━━╮
  › ${prefix}blue
  › ${prefix}flag
  › ${prefix}hide
  › ${prefix}guessgender
  › ${prefix}agecalculator
  › ${prefix}style
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🔍 *SEARCH & INFO* 〕━━━╮
  › ${prefix}weather
  › ${prefix}gstatus
  › ${prefix}channelid
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 ⛩️ *ANIME* 〕━━━╮
  › ${prefix}waifu
  › ${prefix}neko
  › ${prefix}kitsune
  › ${prefix}husbando
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 👥 *GROUP* 〕━━━╮
  › ${prefix}tagall
  › ${prefix}tagall1
  › ${prefix}tagme
  › ${prefix}couplepp
  › ${prefix}group
  › ${prefix}ginfo
  › ${prefix}antigst
╰━━━━━━━━━━━━━━━━━━━━━━━╯

╭━━━〔 🛡️ *ADMIN* 〕━━━╮
  › ${prefix}kick
  › ${prefix}promote
  › ${prefix}demote
╰━━━━━━━━━━━━━━━━━━━━━━━╯

> ⚡ *Powered by RAHUL MASTER*
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
            // Fallback to text menu if image fails to load
            await m.reply(menuText);
        }
    }
};
