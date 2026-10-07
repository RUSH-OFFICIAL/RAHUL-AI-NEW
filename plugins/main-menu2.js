const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in Horizontal Scrollable Carousel Cards',
    aliases: ['help', 'cmdlist', 'commands', 'carousel'],

    async execute(sock, m) {
        await m.react('🎠');

        const prefix = global.BOT_PREFIX || '.';
        const now = new Date();

        const date = now.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'Asia/Kolkata'
        });

        const time = now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: 'Asia/Kolkata'
        });

        const botOwner = global.ownerName || '`𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁`;
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

        try {
            // इमेज लोड करणे
            const imageUrl = global.menuImage || 'https://i.imgur.com/3Z82BCm.jpg';
            const imgBuffer = (await axios.get(imageUrl, { responseType: 'arraybuffer' })).data;

            // WhatsApp सर्व्हरवर इमेज अपलोड करणे
            const preparedImage = (await sock.sendMessage(m.chat, { image: imgBuffer }, { upload: sock.waUploadToServer })).message.imageMessage;

            // 🎠 Horizontal Scrollable Cards Structure
            const cards = [
                // CARD 1: Bot Main Info
                {
                    header: {
                        title: "┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `*ғᴏᴜɴᴅᴇʀ:* ${Founder}\n*ᴏᴡɴᴇR:* ${botOwner}\n*ᴜsᴇʀ:* ${user}\n*ᴅᴀᴛᴇ:* ${date}\n*ᴛɪᴍᴇ:* ${time}\n*ᴘʀᴇғɪx:* ${prefix}\n\n👉 *Swipe right to view categories!*`
                    },
                    footer: { text: "Card 1 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "⚡ PING SPEED",
                                    id: `${prefix}ping`
                                })
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🟢 BOT ALIVE",
                                    id: `${prefix}alive`
                                })
                            }
                        ]
                    }
                },
                // CARD 2: General
                {
                    header: {
                        title: "├─ム *ɢᴇɴᴇʀᴀʟ*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `᪣ ${prefix}ᴀʟɪᴠᴇ\n᪣ ${prefix}ᴘɪɴɢ\n᪣ ${prefix}ᴜᴘᴛɪᴍᴇ\n᪣ ${prefix}ᴏᴡɴᴇʀ\n᪣ ${prefix}ɢᴜɪᴅᴇ\n᪣ ${prefix}ᴍᴇɴᴜ2`
                    },
                    footer: { text: "Card 2 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "👑 OWNER INFO",
                                    id: `${prefix}owner`
                                })
                            }
                        ]
                    }
                },
                // CARD 3: Downloaders
                {
                    header: {
                        title: "├─ム *ᴅᴏᴡɴʟᴏᴀᴅᴇʀs*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `᪣ ${prefix}ᴛɪᴋᴛᴏᴋ / ${prefix}ᴛᴛ\n᪣ ${prefix}ʏᴛᴍᴘ3\n᪣ ${prefix}ɪɢ`
                    },
                    footer: { text: "Card 3 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🎵 YT MP3",
                                    id: `${prefix}ytmp3`
                                })
                            }
                        ]
                    }
                },
                // CARD 4: Tools
                {
                    header: {
                        title: "├─ム *ᴛᴏᴏʟs*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `᪣ ${prefix}sᴛɪᴄᴋᴇʀ\n᪣ ${prefix}ᴏᴄʀ\n᪣ ${prefix}ᴛᴛs\n᪣ ${prefix}ᴘᴏʟʟ\n᪣ ${prefix}sʜᴀᴢᴀᴍ\n᪣ ${prefix}ᴛᴇxᴛᴘʀᴏ\n᪣ ${prefix}ᴄʜɪᴅ`
                    },
                    footer: { text: "Card 4 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🖼️ STICKER",
                                    id: `${prefix}sticker`
                                })
                            }
                        ]
                    }
                },
                // CARD 5: AI & Search
                {
                    header: {
                        title: "├─ム *ᴀɪ & ꜱᴇᴀʀᴄʜ*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `*ᴀɪ*\n᪣ ${prefix}ᴀɪ\n᪣ ${prefix}ᴀɪ-sᴇᴀʀᴄʜ\n᪣ ${prefix}ᴀɪᴠ\n᪣ ${prefix}ɢᴇɴ\n\n*ꜱᴇᴀʀᴄʜ*\n᪣ ${prefix}ᴡᴇᴀᴛʜᴇʀ`
                    },
                    footer: { text: "Card 5 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🤖 ASK AI",
                                    id: `${prefix}ai`
                                })
                            }
                        ]
                    }
                },
                // CARD 6: Fun & New
                {
                    header: {
                        title: "├─ム *ғᴜɴ & ɴᴇᴡ*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `*ғᴜɴ*\n᪣ ${prefix}ʙʟᴜᴇ\n᪣ ${prefix}ғʟᴀɢ\n\n*ɴᴇᴡ*\n᪣ ${prefix}ʜɪᴅᴇ\n᪣ ${prefix}ɢᴜᴇssɢᴇɴᴅᴇʀ\n᪣ ${prefix}ᴀɢᴇᴄᴀʟᴄᴜʟᴀᴛᴏʀ\n᪣ ${prefix}sᴛʏʟᴇ`
                    },
                    footer: { text: "Card 6 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🔤 STYLE TEXT",
                                    id: `${prefix}style`
                                })
                            }
                        ]
                    }
                },
                // CARD 7: Anime
                {
                    header: {
                        title: "├─ム *ᴀɴɪᴍᴇ*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `᪣ ${prefix}ᴡᴀɪғᴜ\n᪣ ${prefix}ɴᴇᴋᴏ\n᪣ ${prefix}ᴋɪᴛꜱᴜɴᴇ\n᪣ ${prefix}ʜᴜꜱʙᴀɴᴅᴏ`
                    },
                    footer: { text: "Card 7 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🌸 WAIFU",
                                    id: `${prefix}waifu`
                                })
                            }
                        ]
                    }
                },
                // CARD 8: Group & Status & Channel
                {
                    header: {
                        title: "├─ム *ɢʀᴏᴜᴘ & ᴄʜᴀɴɴᴇʟ*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `*ɢʀᴏᴜᴘ*\n᪣ ${prefix}ᴛᴀɢᴀʟʟ\n᪣ ${prefix}ᴛᴀɢᴀʟʟ1\n᪣ ${prefix}ᴛᴀɢᴍᴇ\n᪣ ${prefix}ᴄᴏᴜᴘʟᴇᴘᴘ\n᪣ ${prefix}ɢʀᴏᴜᴘ\n᪣ ${prefix}ɢɪɴғᴏ\n᪣ ${prefix}ᴀɴᴛɪɢsᴛ\n\n*sᴛᴀᴛᴜs & ᴄʜᴀɴɴᴇʟ*\n᪣ ${prefix}ɢsᴛᴀᴛᴜs\n᪣ ${prefix}ᴄʜᴀɴɴᴇʟɪᴅ`
                    },
                    footer: { text: "Card 8 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📢 TAG ALL",
                                    id: `${prefix}tagall`
                                })
                            }
                        ]
                    }
                },
                // CARD 9: Admin
                {
                    header: {
                        title: "├─ム *ᴀᴅᴍɪɴ*",
                        hasVideoAttachment: false,
                        imageMessage: preparedImage
                    },
                    body: {
                        text: `᪣ ${prefix}ᴋɪᴄᴋ\n᪣ ${prefix}ᴘʀᴏᴍᴏᴛᴇ\n᪣ ${prefix}ᴅᴇᴍᴏᴛᴇ`
                    },
                    footer: { text: "Card 9 of 9" },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🛡️ GROUP INFO",
                                    id: `${prefix}ginfo`
                                })
                            }
                        ]
                    }
                }
            ];

            // Send Interactive Carousel Message
            await sock.sendMessage(m.chat, {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: "⚡ *𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 𝚂𝚆𝙸𝙿𝙴𝙰𝙱𝙻𝙴 𝙼𝙴𝙽𝚄* ⚡" },
                            footer: { text: "➔ Swipe cards left or right" },
                            carouselMessage: {
                                cards: cards
                            }
                        }
                    }
                }
            }, { quoted: m });

        } catch (err) {
            console.error('Carousel Menu Error:', err);
            // Fallback Text Menu
            const fallbackText = `❌ *Carousel Failed to Load!* Falling back to Standard Menu.\n\n` +
`┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ
│ *ғᴏᴜɴᴅᴇʀ:* ${Founder}
│ *ᴏᴡɴᴇR:* ${botOwner}
│ *ᴜsᴇʀ:* ${user}
│ *ᴅᴀᴛᴇ:* ${date}
│ *ᴛɪᴍᴇ:* ${time}
│ *ᴘʀᴇғɪx:* ${prefix}
╰──────────────────╯`;

            await m.reply(fallbackText);
        }
    }
};
