const axios = require('axios');
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in swipeable horizontal cards with permission checks',
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
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

        // Check if message is in a group and check sender permissions
        const isGroup = m.chat.endsWith('@g.us');
        let isAdmin = false;
        let isBotAdmin = false;

        if (isGroup) {
            try {
                const groupMetadata = await sock.groupMetadata(m.chat);
                const participants = groupMetadata.participants || [];
                const senderParticipant = participants.find(p => p.id === m.sender);
                
                isAdmin = senderParticipant?.admin === 'admin' || senderParticipant?.admin === 'superadmin';

                const botParticipant = participants.find(p => p.id === sock.user.id.split(':')[0] + '@s.whatsapp.net');
                isBotAdmin = botParticipant?.admin === 'admin' || botParticipant?.admin === 'superadmin';
            } catch (err) {
                console.error('Group metadata check error:', err);
            }
        }

        // Prepare Header Media for Carousel Cards
        let imageHeader;
        try {
            const imgBuffer = (await axios.get(global.menuImage || 'https://via.placeholder.com/600x300.png', {
                responseType: 'arraybuffer'
            })).data;

            const media = await prepareWAMessageMedia(
                { image: imgBuffer },
                { upload: sock.waUploadToServer }
            );
            imageHeader = media.imageMessage;
        } catch (e) {
            console.error('Header image download failed:', e);
            imageHeader = null;
        }

        // Define All Category Cards
        const allCategories = [
            {
                title: '⚙️ GENERAL',
                desc: 'Core bot commands & basic info',
                cmds: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2'],
                btnCmd: 'alive',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '📥 DOWNLOADERS',
                desc: 'Download media from online platforms',
                cmds: ['tiktok', 'tt', 'ytmp3', 'ig'],
                btnCmd: 'tiktok',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🛠️ UTILITY TOOLS',
                desc: 'Converters & useful utilities',
                cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid'],
                btnCmd: 'sticker',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🤖 ARTIFICIAL INTELLIGENCE',
                desc: 'AI modules & smart search tools',
                cmds: ['ai', 'ai-search', 'aiv', 'gen'],
                btnCmd: 'ai',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🎉 FUN & NEW',
                desc: 'Games and newly added features',
                cmds: ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style'],
                btnCmd: 'style',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🌸 ANIME & STATUS',
                desc: 'Anime features & status updates',
                cmds: ['waifu', 'neko', 'kitsune', 'husbando', 'gstatus', 'channelid'],
                btnCmd: 'waifu',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '👥 GROUP COMMANDS',
                desc: 'General group features & tools',
                cmds: ['tagall1', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst'],
                btnCmd: 'group',
                adminOnly: false,
                groupOnly: true
            },
            {
                title: '👑 ADMIN & MODERATION',
                desc: 'Restricted group moderation tools',
                cmds: ['tagall', 'kick', 'promote', 'demote'],
                btnCmd: 'tagall',
                adminOnly: true,
                groupOnly: true
            }
        ];

        // Filter Categories based on Context & Permissions
        const availableCategories = allCategories.filter(cat => {
            if (cat.groupOnly && !isGroup) return false;
            if (cat.adminOnly && !isAdmin) return false;
            return true;
        });

        // Build Horizontal Scrollable Cards
        const carouselCards = availableCategories.map((cat, index) => {
            const headerObj = imageHeader 
                ? { title: cat.title, hasVideoPlayback: false, imageMessage: imageHeader }
                : { title: cat.title, hasVideoPlayback: false };

            return {
                header: proto.Message.InteractiveMessage.Header.create(headerObj),
                body: proto.Message.InteractiveMessage.Body.create({
                    text: `📌 *${cat.desc}*\n\n` + cat.cmds.map(c => ` ᪣ ${prefix}${c}`).join('\n')
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `Card ${index + 1} of ${availableCategories.length} | 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸`
                }),
                nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.create({
                    buttons: [
                        {
                            name: 'quick_reply',
                            buttonParamsJson: JSON.stringify({
                                display_text: `▶ Run ${prefix}${cat.btnCmd}`,
                                id: `${prefix}${cat.btnCmd}`
                            })
                        }
                    ]
                })
            };
        });

        // Main Message Container
        const interactiveMsg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ\n│ *ғᴏᴜɴᴅᴇʀ:* ${Founder}\n│ *ᴏᴡɴᴇʀ:* ${botOwner}\n│ *ᴜsᴇʀ:* ${user}\n│ *ᴅᴀᴛᴇ:* ${date}\n│ *ᴛɪᴍᴇ:* ${time} (GMT)\n│ *ᴘʀᴇғɪx:* ${prefix}\n╰──────────────────╯\n\n*👇 Swipe left or right to switch cards (${availableCategories.length} categories available):*`
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
            await sock.relayMessage(m.chat, interactiveMsg.message, { 
                messageId: interactiveMsg.key.id 
            });
        } catch (err) {
            console.error('Carousel Menu Error:', err);
            await m.reply('❌ Horizontal menu failed to load.');
        }
    }
};
