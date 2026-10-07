const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('💻');
        
        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        const botOwner = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'Rahul_User';

        const menuText = `
╭─────────────────────────────╮
│   ⚡ *𝐑𝐀𝐇𝐔𝐋  // AI* ⚡   │
╰─────────────────────────────╯

 ❖ User   : ${user}
 ❖ Owner  : ${botOwner}
 ❖ Time   : ${time} | ${date}
 ❖ Prefix : [ ${prefix} ]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🎯 [ PART 01 ] RAHUL SYSTEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • ${prefix}alive   ⤿ Node status
  • ${prefix}ping    ⤿ Server latency
  • ${prefix}uptime  ⤿ Active time
  • ${prefix}owner   ⤿ Master profile

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🎯 [ PART 02 ] RAHUL MEDIA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • ${prefix}tiktok  ⤿ TikTok download
  • ${prefix}tt      ⤿ Quick grabber
  • ${prefix}ytmp3   ⤿ YouTube audio
  • ${prefix}ig      ⤿ Instagram media

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🎯 [ PART 03 ] RAHUL NEURAL AI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • ${prefix}ai      ⤿ Neural chat
  • ${prefix}ai-search ⤿ Web intelligence
  • ${prefix}aiv     ⤿ Vision parser
  • ${prefix}gen     ⤿ Asset generator

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🎯 [ PART 04 ] RAHUL UTILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • ${prefix}sticker ⤿ Webp converter
  • ${prefix}style   ⤿ Fancy typography
  • ${prefix}ocr     ⤿ Text extractor
  • ${prefix}tts     ⤿ Speech synth

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 🎯 [ PART 05 ] RAHUL ADMIN
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  • ${prefix}tagall  ⤿ Broadcast mention
  • ${prefix}kick    ⤿ Purge node user
  • ${prefix}promote ⤿ Grant admin rank
  • ${prefix}demote  ⤿ Revoke clearance

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 > *[RAHUL-AI SECURE // 2026]*
`.trim();

        // तुझी फिक्स इमेज युआरएल
        const customImageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        try {
            const imageBuffer = (await axios.get(customImageUrl, {
                responseType: 'arraybuffer'
            })).data;

            await m.reply(imageBuffer, {
                caption: menuText
            });

        } catch (err) {
            console.error('Menu image error, sending text:', err);
            await m.reply(menuText);
        }
    }
};
