const { generateWAMessageFromContent, prepareWAMessageMedia } = require('@whiskeysockets/baileys');

async function sendMenuSlide(sock, remoteJid) {
    // Header image (jar image pathvichi asel tar)
    const mediaMessage = await prepareWAMessageMedia({ image: { url: './path_to_your_banner.jpg' } }, { upload: sock.waUploadToServer });

    const interactiveMsg = generateWAMessageFromContent(remoteJid, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    header: {
                        hasMediaAttachment: true,
                        imageMessage: mediaMessage.imageMessage
                    },
                    body: {
                        text: "╭━━━〔 *RAHUL-AI MENU* 〕━━━⬣\n┃ Here is your command list.\n┃ Choose a category below:\n╰━━━━━━━━━━━━━━━━━━━⬣"
                    },
                    footer: {
                        text: "POWERED BY RAHUL-MASTER"
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "📥 DOWNLOAD LIST",
                                    id: ".downloadmenu"
                                })
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "👑 OWNER LIST",
                                    id: ".ownermenu"
                                })
                            },
                            {
                                name: "quick_reply",
                                buttonParamsJson: JSON.stringify({
                                    display_text: "🤖 AI MENU",
                                    id: ".aimenu"
                                })
                            }
                        ]
                    }
                }
            }
        }
    }, {});

    await sock.relayMessage(remoteJid, interactiveMsg.message, { messageId: interactiveMsg.key.id });
}
