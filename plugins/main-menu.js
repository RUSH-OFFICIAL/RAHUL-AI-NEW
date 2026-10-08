const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✔️');
        
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

        const botOwner = global.ownerName || 'RAHUL-MASTER';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = 'RAHUL-MASTER';

        // Direct image URL provided by you
        const menuImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        const menuText = `
Bot Information:

- Founder : ${Founder}

- Owner   : ${botOwner}

- User    : ${user}

- Date    : ${date}

- Time    : ${time} 

- Prefix  : ${prefix}

General Commands:
  - ${prefix}alive
  - ${prefix}ping
  - ${prefix}uptime
  - ${prefix}owner
  - ${prefix}guide
  - ${prefix}menu2

Downloaders:
  - ${prefix}tiktok / ${prefix}tt
  - ${prefix}ytmp3
  - ${prefix}ig

Tools & AI:
  - ${prefix}sticker
  - ${prefix}ocr
  - ${prefix}tts
  - ${prefix}poll
  - ${prefix}shazam
  - ${prefix}textpro
  - ${prefix}chid
  - ${prefix}ai
  - ${prefix}ai-search
  - ${prefix}aiv
  - ${prefix}gen

Fun & New:
  - ${prefix}blue
  - ${prefix}flag
  - ${prefix}hide
  - ${prefix}guessgender
  - ${prefix}agecalculator
  - ${prefix}style

Search & Anime:
  - ${prefix}weather
  - ${prefix}waifu
  - ${prefix}neko
  - ${prefix}kitsune
  - ${prefix}husbando

Group & Admin:
  - ${prefix}tagall
  - ${prefix}tagall1
  - ${prefix}tagme
  - ${prefix}couplepp
  - ${prefix}group
  - ${prefix}ginfo
  - ${prefix}antigst
  - ${prefix}gstatus
  - ${prefix}channelid
  - ${prefix}kick
  - ${prefix}promote
  - ${prefix}demote

Powered by Rahul Master
`.trim();

        try {
            const imageBuffer = (await axios.get(menuImageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu error:', err);
            await m.reply(menuText);
        }
    }
};
