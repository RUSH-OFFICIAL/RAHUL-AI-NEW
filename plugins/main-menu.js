const axios = require('axios');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands with buttons',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('🔥');
        
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
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴🇷';

        const menuText = `
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
 █▀▄▀█ █▀█ █░█ █░█ █ 
 █░▀░█ █▄█ ▀▄▀ ▀▄▀ █ 
▰▰▰▰▰ [ *ᴍᴜʟᴛɪ-ᴅᴇᴠɪᴄᴇ* ] ▰▰▰▰▰

┏ ⚙️ *SYSTEM SPECIFICATIONS*
┃ 👤 *TARGET:* \`${user}\`
┃ 👑 *FOUNDER:* \`${Founder}\`
┃ ⚡ *PREFIX:* [ \`${prefix}\` ]
┃ 🕒 *TIME:* ${time} | ${date}
┗━━━━━━━━━━━━━━━━━━━◢

╔══════════════════════╗
║ ⚡ *ACTIVATED MODULES* ⚡
╚══════════════════════╝

┌───❖ *【 01. GENERAL 】* ❖───┐
│ ✦ ${prefix}alive    │ ✦ ${prefix}ping
│ ✦ ${prefix}uptime   │ ✦ ${prefix}owner
└──────────────────────────┘

┌───❖ *【 02. DOWNLOADERS 】* ❖──┐
│ ⚡ ${prefix}tiktok / ${prefix}tt
│ ⚡ ${prefix}ytmp3   │ ⚡ ${prefix}ig
└──────────────────────────┘

┌───❖ *【 03. AI & TOOLS 】* ❖───┐
│ 🧠 ${prefix}ai       │ 🧠 ${prefix}ai-search
│ ◈ ${prefix}sticker  │ ◈ ${prefix}tts
└──────────────────────────┘

> Niche diye gaye buttons par click karke aap direct commands run kar sakte hain!
`.trim();

        try {
            const imageUrl = global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg';
            const imageBuffer = (await axios.get(imageUrl, {
                responseType: 'arraybuffer'
            })).data;

            // Interactive Buttons Structure for Baileys
            const interactiveMsg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: menuText
                            }),
                            footer: proto.Message.InteractiveMessage.Footer.create({
                                text: "⚡ Powered by Rahul Master"
                            }),
                            header: proto.Message.InteractiveMessage.Header.create({
                                hasMediaAttachment: true,
                                imageMessage: await sock.prepareMessageMedia ? await sock.prepareMessageMedia(imageBuffer, { upload: sock.waUploadToServer }) : undefined
                            }),
                            nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                                buttons: [
                                    {
                                        name: "quick_reply",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "⚡ Ping",
                                            id: `${prefix}ping`
                                        })
                                    },
                                    {
                                        name: "quick_reply",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "🤖 AI Chat",
                                            id: `${prefix}ai`
                                        })
                                    },
                                    {
                                        name: "quick_reply",
                                        buttonParamsJson: JSON.stringify({
                                            display_text: "👑 Owner",
                                            id: `${prefix}owner`
                                        })
                                    }
                                ]
                            })
                        })
                    }
                }
            }, { quoted: m });

            await sock.relayMessage(m.chat, interactiveMsg.message, { messageId: interactiveMsg.key.id });

        } catch (err) {
            console.error('Button Menu Error:', err);
            // Agar buttons support na kare toh normal image + text bhej dega
            await sock.sendMessage(m.chat, { image: { url: global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg' }, caption: menuText }, { quoted: m });
        }
    }
};
