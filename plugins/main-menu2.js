module.exports = {
    name: 'menu',
    description: 'Show available bot commands in swipeable carousel cards',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✨');
        
        const prefix = global.BOT_PREFIX || '.';
        const botOwner = global.ownerName || '𝚁𝙰𝙷𝚄𝙻-𝙼𝙰𝚂𝚃𝙴𝚁';
        const user = m.pushName || m.sender?.split('@')[0] || 'User';

        // Horizontal Swipeable Cards Definition
        const cards = [
            {
                header: {
                    title: '📱 CARD 1: GENERAL & AI',
                    hasMediaAttachment: true,
                    imageMessage: (await sock.prepareMessageMedia({ url: global.menuImage || 'https://i.imgur.com/3Z5Q9aX.jpeg' }, { upload: sock.waUploadToServer })).imageMessage
                },
                body: { text: `👋 *Welcome ${user}*\n\n📌 *General:* ${prefix}alive, ${prefix}ping, ${prefix}uptime, ${prefix}owner\n🤖 *AI Tools:* ${prefix}ai, ${prefix}ai-search, ${prefix}aiv, ${prefix}gen` },
                footer: { text: `Owner: ${botOwner}` },
                nativeFlowMessage: {
                    buttons: [
                        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '⚡ Ping Bot', id: `${prefix}ping` }) }
                    ]
                }
            },
            {
                header: {
                    title: '📥 CARD 2: DOWNLOADS & TOOLS',
                    hasMediaAttachment: true,
                    imageMessage: (await sock.prepareMessageMedia({ url: global.menuImage || 'https://i.imgur.com/3Z5Q9aX.jpeg' }, { upload: sock.waUploadToServer })).imageMessage
                },
                body: { text: `📥 *Downloaders:* ${prefix}tiktok, ${prefix}ytmp3, ${prefix}ig\n🛠️ *Tools:* ${prefix}sticker, ${prefix}ocr, ${prefix}tts, ${prefix}poll, ${prefix}shazam` },
                footer: { text: `PowerBy: RAHUL MASTER` },
                nativeFlowMessage: {
                    buttons: [
                        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '🎵 TikTok', id: `${prefix}tiktok` }) }
                    ]
                }
            },
            {
                header: {
                    title: '👥 CARD 3: GROUP & ADMIN',
                    hasMediaAttachment: true,
                    imageMessage: (await sock.prepareMessageMedia({ url: global.menuImage || 'https://i.imgur.com/3Z5Q9aX.jpeg' }, { upload: sock.waUploadToServer })).imageMessage
                },
                body: { text: `👥 *Group:* ${prefix}tagall, ${prefix}tagme, ${prefix}group, ${prefix}ginfo\n👑 *Admin:* ${prefix}kick, ${prefix}promote, ${prefix}demote` },
                footer: { text: `Select action below` },
                nativeFlowMessage: {
                    buttons: [
                        { name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: '📢 Tag All', id: `${prefix}tagall` }) }
                    ]
                }
            }
        ];

        try {
            // Constructing Native Carousel Message
            const message = {
                viewOnceMessage: {
                    message: {
                        interactiveMessage: {
                            body: { text: `┌─ム 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸 ᴍᴜʟᴛɪᴅᴇᴠɪᴄᴇ\n│ *Swipe left/right to view command cards!* 👈👉` },
                            carouselMessage: {
                                cards: cards
                            }
                        }
                    }
                }
            };

            await sock.relayMessage(m.chat, message, {});
        } catch (err) {
            console.error('Carousel Menu Error:', err);
            await m.reply('❌ Carousel menu display karnyatal error aala. Direct text menu wapra.');
        }
    }
};
