module.exports = {
    name: 'menu',
    description: 'Minimal card style fast menu',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        try {
            await sock.sendMessage(m.chat, { react: { text: '✨', key: m.key } }).catch(() => {});

            const prefix = global.BOT_PREFIX || '.';
            const now = new Date();

            const date = now.toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                timeZone: 'Asia/Kolkata'
            });

            const time = now.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
                timeZone: 'Asia/Kolkata'
            });

            const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
            const user = m.pushName || (m.sender ? m.sender.split('@')[0] : 'User');
            const founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

            const menuText = `
◈━━━━━━━━━━━━━━━━━◈
   ⚡ *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝚅𝙸𝙿 𝙼𝙴𝙽𝚄* ⚡
◈━━━━━━━━━━━━━━━━━◈

⚙️ *INFO CARD*
🔸 *User:* ${user}
🔸 *Owner:* ${botOwner}
🔸 *Founder:* ${founder}
🔸 *Date:* ${date}
🔸 *Time:* ${time}
🔸 *Prefix:* [ ${prefix} ]

━━━━━ COMMAND LIST ━━━━━

⚙️ *GENERAL*
 » ${prefix}alive
 » ${prefix}ping
 » ${prefix}uptime
 » ${prefix}owner
 » ${prefix}guide

📥 *DOWNLOADS*
 » ${prefix}tiktok
 » ${prefix}ytmp3
 » ${prefix}ig

🛠️ *TOOLS*
 » ${prefix}sticker
 » ${prefix}ocr
 » ${prefix}tts
 » ${prefix}poll
 » ${prefix}shazam
 » ${prefix}chid

🤖 *AI POWER*
 » ${prefix}ai
 » ${prefix}ai-search
 » ${prefix}aiv
 » ${prefix}gen

🎭 *FUN & UTILITY*
 » ${prefix}blue
 » ${prefix}flag
 » ${prefix}guessgender
 » ${prefix}agecalculator
 » ${prefix}style

⛩️ *ANIME & SEARCH*
 » ${prefix}weather
 » ${prefix}waifu
 » ${prefix}neko
 » ${prefix}kitsune
 » ${prefix}husbando

👥 *GROUP MODS*
 » ${prefix}tagall
 » ${prefix}tagme
 » ${prefix}couplepp
 » ${prefix}group
 » ${prefix}ginfo
 » ${prefix}kick
 » ${prefix}promote
 » ${prefix}demote

◈━━━━━━━━━━━━━━━━━◈
> 🔥 *POWERED BY RAHUL MASTER*
`.trim();

            await sock.sendMessage(m.chat, { 
                text: menuText 
            }, { quoted: m });

        } catch (err) {
            console.error('Menu Command Execution Error:', err);
            await sock.sendMessage(m.chat, { 
                text: '❌ Menu load karnyaat adchan aali.' 
            }, { quoted: m }).catch(() => {});
        }
    }
};
