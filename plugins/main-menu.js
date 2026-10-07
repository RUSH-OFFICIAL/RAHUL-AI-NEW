const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        // युजरला कमांड दिल्यावर सुरुवातीला 'completed' रिप्लाय पाठवण्यासाठी
        await m.reply('⚡ Completed! Loading Slide Menu...');
        await m.react('📑');
        
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
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        const menuText = `
╭─────────────────────────╮
│   ⚡ *RAHUL-AI SLIDE* ⚡   │
╰─────────────────────────╯

 👤 User   : ${user}
 👑 Owner  : ${botOwner}
 ⏰ Time   : ${time} | ${date}
 ⚙️ Prefix : ${prefix}

┌── [ 1 ] ── ‹ SYSTEM › ──┐
├ • ${prefix}alive
├ • ${prefix}ping
├ • ${prefix}uptime
└ • ${prefix}owner

┌── [ 2 ] ── ‹ MEDIA › ───┐
├ • ${prefix}tiktok
├ • ${prefix}tt
├ • ${prefix}ytmp3
└ • ${prefix}ig

┌── [ 3 ] ── ‹ NEURAL AI › ─┐
├ • ${prefix}ai
├ • ${prefix}ai-search
├ • ${prefix}aiv
└ • ${prefix}gen

┌── [ 4 ] ── ‹ UTILS › ───┐
├ • ${prefix}sticker
├ • ${prefix}style
├ • ${prefix}ocr
└ • ${prefix}tts

┌── [ 5 ] ── ‹ ADMIN › ───┐
├ • ${prefix}tagall
├ • ${prefix}kick
├ • ${prefix}promote
└ • ${prefix}demote

> *[SLIDE STATUS: ONLINE]*
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
