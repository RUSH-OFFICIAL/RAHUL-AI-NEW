const axios = require('axios');
const { generateWAMessageFromContent, proto } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in swipeable horizontal cards',
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

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const menuImageUrl = global.menuImage || 'https://via.placeholder.com/600x300.png';

        // Horizontal Carousel Category Cards Config
        const categories = [
            {
                title: '⚙️ GENERAL COMMANDS',
                desc: 'Core bot functions and system utilities',
                commands: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2'],
                actionCmd: 'alive'
            },
            {
                title: '📥 DOWNLOADERS',
                desc: 'Download media directly from social platforms',
                commands: ['tiktok', 'ytmp3', 'ig'],
                actionCmd: 'tiktok'
            },
            {
                title: '🛠️ UTILITY TOOLS',
                desc: 'Media manipulation and productivity tools',
                commands: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro'],
                actionCmd: 'sticker'
            },
            {
                title: '🤖 ARTIFICIAL INTELLIGENCE',
                desc: 'AI query tools and intelligent generation',
                commands: ['ai', 'ai-search', 'aiv', 'gen'],
                actionCmd: 'ai'
            },
            {
                title: '👥 GROUP MANAGEMENT',
                desc: 'Administration tools and moderation controls',
                commands: ['tagall', 'tagme', 'group', 'kick', 'promote', 'demote'],
                actionCmd: 'tagall'
            }
        ];

        // Build native Baileys interactive carousel cards
        const carouselCards = categories.map((cat, index) => {
            return {
                header: proto.Message.InteractiveMessage.Header.create({
                    title: cat.title,
                    hasVideoPlayback: false,
                    imageMessage: { url: menuImageUrl }
                }),
                body: proto.Message.InteractiveMessage.Body.create({
                    text: `${cat.desc}\n\n` + cat.commands.map(cmd => `• ${prefix}${cmd}`).join('\n')
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `Card ${index + 1} of ${categories.length} | 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸`
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({
                                display_text: `Run ${prefix}${cat.actionCmd}`,
                                id: `${prefix}${cat.actionCmd}`
                            })
                        }
                    ]
                })
            };
        });

        // Main Carousel Message Payload
        const interactiveMessage = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `╭━━━〔 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝙼𝚄𝙻𝚃𝙸𝙳𝙴𝚅𝙸𝙲𝙴 〕━━━╮\n┃ 👤 *User:* ${user}\n┃ 👑 *Owner:* ${botOwner}\n┃ 📅 *Date:* ${date}\n┃ ⏰ *Time:* ${time} GMT\n┃ ⚡ *Prefix:* [ ${prefix} ]\n╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━╯\n\n*Swipe left / right to browse command categories:*`
                        }),
                        footer: proto.Message.InteractiveMessage.Footer.create({
                            text: '「 ᴩᴏᴡᴇʀᴇᴅ - ʙʏ ʀᴀʜᴜʟ ᴍᴀꜱᴛᴇʀ 」'
                        }),
                        carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.create({
                            cards: carouselCards
                        })
                    })
                }
            }
        }, { quoted: m });

        try {
            await sock.relayMessage(m.chat, interactiveMessage.message, { 
                messageId: interactiveMessage.key.id 
            });
        } catch (err) {
            console.error('Horizontal Menu Error:', err);
            await m.reply('❌ Failed to render menu carousel. Please ensure your Baileys library is updated.');
        }
    }
};
