const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✨');
        
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

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        const menuText = `
╭━━━〔 ⚡ 𝚁𝙰𝙷𝚄𝙻 - 𝙰𝙸 ━━━╮
┃ 👤 *User:* ${user}
┃ 👑 *Owner:* ${botOwner}
┃ 📅 *Date:* ${date}
┃ ⏰ *Time:* ${time}
┃ 🔑 *Prefix:* [ ${prefix} ]
╰━━━━━━━━━━━━━━━━━━━━╯

┌─── ❖ *COMMAND MENU* ❖ ───┐

📱 *[ CARD 01: GENERAL ]*
▸ ${prefix}alive  ▸ ${prefix}ping
▸ ${prefix}uptime ▸ ${prefix}owner
▸ ${prefix}guide  ▸ ${prefix}menu2

📥 *[ CARD 02: DOWNLOADS ]*
▸ ${prefix}tiktok / ${prefix}tt
▸ ${prefix}ytmp3   ▸ ${prefix}ig

🛠️ *[ CARD 03: TOOLS ]*
▸ ${prefix}sticker  ▸ ${prefix}ocr
▸ ${prefix}tts      ▸ ${prefix}poll
▸ ${prefix}shazam   ▸ ${prefix}textpro
▸ ${prefix}chid

🤖 *[ CARD 04: AI SUITE ]*
▸ ${prefix}ai         ▸ ${prefix}ai-search
▸ ${prefix}aiv        ▸ ${prefix}gen

🎮 *[ CARD 05: FUN & EXTRA ]*
▸ ${prefix}blue      ▸ ${prefix}flag
▸ ${prefix}hide      ▸ ${prefix}guessgender
▸ ${prefix}style     ▸ ${prefix}agecalculator

🔍 *[ CARD 06: SEARCH ]*
▸ ${prefix}weather

⛩️ *[ CARD 07: ANIME ]*
▸ ${prefix}waifu     ▸ ${prefix}neko
▸ ${prefix}kitsune   ▸ ${prefix}husbando

👥 *[ CARD 08: GROUP & ADMIN ]*
▸ ${prefix}tagall    ▸ ${prefix}tagme
▸ ${prefix}couplepp  ▸ ${prefix}group
▸ ${prefix}ginfo     ▸ ${prefix}antigst
▸ ${prefix}kick      ▸ ${prefix}promote
▸ ${prefix}demote

📡 *[ CARD 09: SYSTEM & CHANNEL ]*
▸ ${prefix}gstatus   ▸ ${prefix}channelid

└──────────────────────────┘

> 💡 *Tip:* Type ${prefix}help <command> for details.
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
            await m.reply('❌ Menu load hoi na. Kripya nantar prayatna kara.');
        }
    }
};
