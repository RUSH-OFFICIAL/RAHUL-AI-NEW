const axios = require('axios');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in swipeable carousel cards',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✔️');
        
        const prefix = global.BOT_PREFIX || '.';
        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        try {
            // Cards Content Setup
            const cardsContent = [
                {
                    title: "📌 GENERAL & DOWNLOADERS",
                    text: `*GENERAL:*\n᪣ ${prefix}alive\n᪣ ${prefix}ping\n᪣ ${prefix}uptime\n᪣ ${prefix}owner\n\n*DOWNLOADERS:*\n᪣ ${prefix}tiktok / ${prefix}tt\n᪣ ${prefix}ytmp3\n᪣ ${prefix}ig`,
                    buttonText: "⚡ Quick Menu",
                    buttonId: `${prefix}ping`
                },
                {
                    title: "🛠️ TOOLS & AI",
                    text: `*TOOLS:*\n᪣ ${prefix}sticker\n᪣ ${prefix}ocr\n᪣ ${prefix}tts\n᪣ ${prefix}poll\n\n*AI COMMANDS:*\n᪣ ${prefix}ai\n᪣ ${prefix}ai-search\n᪣ ${prefix}gen`,
                    buttonText: "🤖 AI Menu",
                    buttonId: `${prefix}ai`
                },
                {
                    title: "🎮 FUN, NEW & SEARCH",
                    text: `*FUN & NEW:*\n᪣ ${prefix}blue\n᪣ ${prefix}hide\n᪣ ${prefix}agecalculator\n\n*SEARCH & ANIME:*\n᪣ ${prefix}weather\n᪣ ${prefix}waifu\n᪣ ${prefix}neko`,
                    buttonText: "✨ Fun Menu",
                    buttonId: `${prefix}blue`
                },
                {
                    title: "👥 GROUP & ADMIN",
                    text: `*GROUP:*\n᪣ ${prefix}tagall\n᪣ ${prefix}tagme\n᪣ ${prefix}couplepp\n᪣ ${prefix}ginfo\n\n*ADMIN:*\n᪣ ${prefix}kick\n᪣ ${prefix}promote\n᪣ ${prefix}demote`,
                    buttonText: "🛡️ Admin Menu",
                    buttonId: `${prefix}tagall`
                }
            ];

            const cardsArray = cardsContent.map(card => {
                return proto.Message.InteractiveMessage.create({
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `┌─ム *${card.title}*\n│ \n${card.text}\n╰─────────◆────────╯`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `User: ${user} | Prefix: ${prefix}`
                    }),
                    nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: card.buttonText,
                                    id: card.buttonId
                                })
                            }
                        ]
                    })
                });
            });

            const interactiveMessage = proto.Message.InteractiveMessage.create({
                body: proto.Message.InteractiveMessage.Body.create({
                    text: `👋 Hello *${user}*, here is your interactive swipeable menu powered by *${botOwner}*:`
                }),
                carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
                    cards: cardsArray
                })
            });

            const msg = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: interactiveMessage
                    }
                }
            }, { quoted: m });

            await sock.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

        } catch (err) {
            console.error('Menu Execution Error:', err);
            
            // Fallback text menu agar koi version compatibility issue ho toh
            const fallbackText = `
┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ
│ *ᴏᴡɴᴇʀ:* ${botOwner}
│ *ᴜsᴇʀ:* ${user}
│ *ᴘʀᴇғɪx:* ${prefix}
╰──────────────────╯
❌ Carousel failed to render. Please check your Baileys version.
            `.trim();
            await m.reply(fallbackText);
        }
    }
};
