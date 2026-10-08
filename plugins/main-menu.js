const { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

if (command === 'menu' || command === 'help') {
    const listMessage = generateWAMessageFromContent(from, {
        viewOnceMessage: {
            message: {
                interactiveMessage: {
                    body: {
                        text: "╭━━━〔 *RAHUL-AI MENU* 〕━━━⬣\n┃ Click the button below to open\n┃ the full command categories list.\n╰━━━━━━━━━━━━━━━━━━━⬣"
                    },
                    footer: {
                        text: "POWERED BY RAHUL-MASTER"
                    },
                    nativeFlowMessage: {
                        buttons: [
                            {
                                name: "single_select",
                                buttonParamsJson: JSON.stringify({
                                    title: "📂 CLICK HERE TO VIEW MENU",
                                    sections: [
                                        {
                                            title: "POPULAR CATEGORIES",
                                            rows: [
                                                { title: "📥 Download Menu", rowId: ".downloadmenu", description: "View all download commands" },
                                                { title: "👑 Owner Menu", rowId: ".ownermenu", description: "View bot owner control commands" },
                                                { title: "👥 Group Menu", rowId: ".groupmenu", description: "View group management commands" },
                                                { title: "🔍 Search Menu", rowId: ".searchmenu", description: "View search & info commands" }
                                            ]
                                        },
                                        {
                                            title: "OTHER CATEGORIES",
                                            rows: [
                                                { title: "🔄 Convert Menu", rowId: ".convertmenu", description: "View media conversion commands" },
                                                { title: "🤖 AI Menu", rowId: ".aimenu", description: "View AI chat & generation commands" },
                                                { title: "🎉 Fun Menu", rowId: ".funmenu", description: "View fun & entertainment commands" },
                                                { title: "⚙️ Settings Menu", rowId: ".settingsmenu", description: "View bot setting commands" }
                                            ]
                                        }
                                    ]
                                })
                            }
                        ]
                    }
                }
            }
        }
    }, { quoted: m });

    await sock.relayMessage(from, listMessage.message, { messageId: listMessage.key.id });
}
