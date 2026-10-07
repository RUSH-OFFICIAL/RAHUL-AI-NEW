const axios = require('axios');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in swipeable carousel cards',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✔️');
        
        const prefix = global.BOT_PREFIX || '.';
        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴🇷';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        try {
            // Menu image fetch kar rahe hain carousel header ke liye
            const imageBuffer = (await axios.get(global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg', {
                responseType: 'arraybuffer'
            })).data;

            // Carousel Cards Data Structure
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

            // Cards ko Baileys Interactive Carousel format mein map karna
            const cardsArray = [];
            for (const card of cardsContent) {
                const interactiveCard = {
                    body: proto.Message.InteractiveMessage.Body.create({
                        text: `┌─ム *${card.title}*\n│ \n${card.text}\n╰─────────◆────────╯`
                    }),
                    footer: proto.Message.InteractiveMessage.Footer.create({
                        text: `User: ${user} | Prefix: ${prefix}`
                    }),
                    header: proto.Message.InteractiveMessage.Header.create({
                        hasMediaAttachment: true,
                        imageMessage: await sock.prepareMessageMedia(imageBuffer, { upload: sock.waUploadToServer })
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
                };
                cardsArray.push(interactiveCard);
            }

            // Final Message Builder using generateWAMessageFromContent
            const carouselMessage = generateWAMessageFromContent(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: proto.Message.InteractiveMessage.create({
                            body: proto.Message.InteractiveMessage.Body.create({
                                text: `👋 Hello *${user}*, here is your interactive swipeable menu powered by *${botOwner}*:`
                            }),
                            carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
                                cards: cardsArray
                            })
                        })
                    }
                }
            }, { quoted: m });

            await sock.relayMessage(m.chat, carouselMessage.message, { messageId: carouselMessage.key.id });

        } catch (err) {
            console.error('Carousel Menu Error:', err);
            
            // Fallback: Agar kisi purane Baileys version ya client mein carousel support na ho toh normal text menu bhej dega
            await m.reply(`❌ Carousel failed, sending standard text menu...\n\n┌─ム *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸* ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ\n│ *ᴏᴡɴᴇʀ:* ${botOwner}\n│ *ᴜsᴇʀ:* ${user}\n╰──────────────────╯`);
        }
    }
};
