const axios = require('axios');
const { generateWAMessageFromContent, proto, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

module.exports = {
    name: 'menu',
    description: 'Show available bot commands in Marathi styled swipeable horizontal cards',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✔️');

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

        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';
        const Founder = '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';

        // Group & Admin permission check
        const isGroup = m.chat.endsWith('@g.us');
        let isAdmin = false;

        if (isGroup) {
            try {
                const groupMetadata = await sock.groupMetadata(m.chat);
                const participants = groupMetadata.participants || [];
                const senderParticipant = participants.find(p => p.id === m.sender);
                isAdmin = senderParticipant?.admin === 'admin' || senderParticipant?.admin === 'superadmin';
            } catch (err) {
                console.error('Group metadata error:', err);
            }
        }

        // Header Media Buffer
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
            console.error('Image header download error:', e);
            imageHeader = null;
        }

        // Marathi Categorized Cards Data
        const allCategories = [
            {
                title: '⚙️ ɢᴇɴᴇʀᴀʟ (सामान्य)',
                desc: 'बॉटची मुख्य माहिती आणि सामान्य कमांड्स',
                cmds: ['alive', 'ping', 'uptime', 'owner', 'guide', 'menu2'],
                btnCmd: 'alive',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '📥 ᴅᴏᴡɴʟᴏᴀᴅᴇʀꜱ (डाउनलोडर्स)',
                desc: 'व्हिडिओ आणि ऑडिओ डाउनलोड करा',
                cmds: ['tiktok', 'tt', 'ytmp3', 'ig'],
                btnCmd: 'tiktok',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🛠️ ᴛᴏᴏʟꜱ (टूल आणि युटिलिटी)',
                desc: 'स्टिकर, OCR आणि इतर उपयुक्त टूल्स',
                cmds: ['sticker', 'ocr', 'tts', 'poll', 'shazam', 'textpro', 'chid'],
                btnCmd: 'sticker',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🤖 ᴀɪ ᴍᴏᴅᴜʟᴇꜱ (एआय कमांड्स)',
                desc: 'आर्टिफिशियल इंटेलिजन्स आणि स्मार्ट सर्च',
                cmds: ['ai', 'ai-search', 'aiv', 'gen'],
                btnCmd: 'ai',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🎉 ꜰᴜɴ & ɴᴇᴡ (मनोरंजन)',
                desc: 'नवीन भन्नाट फीचर्स आणि गेम्स',
                cmds: ['blue', 'flag', 'hide', 'guessgender', 'agecalculator', 'style'],
                btnCmd: 'style',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '🌸 ᴀɴɪᴍᴇ (ॲनिमे कमांड्स)',
                desc: 'ॲनिमे कॅरेक्टर्स आणि स्टेटस अपडेट्स',
                cmds: ['waifu', 'neko', 'kitsune', 'husbando', 'gstatus', 'channelid'],
                btnCmd: 'waifu',
                adminOnly: false,
                groupOnly: false
            },
            {
                title: '👥 ɢʀᴏᴜᴘ (ग्रुप कमांड्स)',
                desc: 'ग्रुप मेंबर्ससाठी फीचर्स',
                cmds: ['tagall1', 'tagme', 'couplepp', 'group', 'ginfo', 'antigst'],
                btnCmd: 'group',
                adminOnly: false,
                groupOnly: true
            },
            {
                title: '👑 ᴀᴅᴍɪɴ (ॲडमिन ऑप्स)',
                desc: 'फक्त ग्रुप ॲडमिनसाठी मॉडरेशन टूल्स',
                cmds: ['tagall', 'kick', 'promote', 'demote'],
                btnCmd: 'tagall',
                adminOnly: true,
                groupOnly: true
            }
        ];

        // Filter active categories
        const categories = allCategories.filter(cat => {
            if (cat.groupOnly && !isGroup) return false;
            if (cat.adminOnly && !isAdmin) return false;
            return true;
        });

        // Generate Horizontal Carousel Cards
        const carouselCards = categories.map((cat, index) => {
            const headerObj = imageHeader 
                ? { title: cat.title, hasVideoPlayback: false, imageMessage: imageHeader }
                : { title: cat.title, hasVideoPlayback: false };

            return {
                header: proto.Message.InteractiveMessage.Header.create(headerObj),
                body: proto.Message.InteractiveMessage.Body.create({
                    text: `📌 *${cat.desc}*\n\n` + cat.cmds.map(c => ` ᪣ ${prefix}${c}`).join('\n')
                }),
                footer: proto.Message.InteractiveMessage.Footer.create({
                    text: `कार्ड ${index + 1} / ${categories.length} | 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸`
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

        // Build Final Interactive Message Payload
        const interactiveMsg = generateWAMessageFromContent(m.chat, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: proto.Message.InteractiveMessage.create({
                        body: proto.Message.InteractiveMessage.Body.create({
                            text: `┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ\n│ *संस्थापक:* ${Founder}\n│ *मालक:* ${botOwner}\n│ *युझर:* ${user}\n│ *तारीख:* ${date}\n│ *वेळ:* ${time} IST\n│ *प्रिफिक्स:* ${prefix}\n╰──────────────────╯\n\n*👉 उजवीकडे/डावीकडे स्वाइप (Swipe) करा सर्व कमांड्स पाहण्यासाठी:*`
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
            console.error('Marathi Carousel Menu Error:', err);
            await m.reply('❌ मेनू लोड करताना अडचण आली. कृपया पुन्हा प्रयत्न करा.');
        }
    }
};
