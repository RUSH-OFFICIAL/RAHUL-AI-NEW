// --- TUMCHYA MESSAGE HANDLER CHA FULL WORKING CODE ---

// 1. Message text ani command baher kadhne
const prefix = "."; // Ithe prefix . set kelela ahe
const budy = (m.mtype === 'conversation') ? m.message.conversation : 
             (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : 
             (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : '';

const isCmd = budy.startsWith(prefix);
const command = isCmd ? budy.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const from = m.key.remoteJid;

// Image URL
const menuBanner = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

// 2. Menu Commands Switch / If-Else Handler
if (command === 'menu' || command === 'help') {
    const mainText = `┏━━━✦ *R A HUL - A I* ✦━━━
┃ 👑 *Owner*  : Rahul-Master
┃ ⚡ *Prefix* : [ . ]
┃ 🟢 *Status* : Active
┗━━━━━━━━━━━━━━━━━━━━━✦

📂 *SELECT A CATEGORY:*
┃ ➔ \`.downloadmenu\`
┃ ➔ \`.ownermenu\`
┃ ➔ \`.groupmenu\`
┃ ➔ \`.searchmenu\`
┃ ➔ \`.convertmenu\`
┃ ➔ \`.aimenu\`
┗━━━━━━━━━━━━━━━━━━━━━✦
*POWERED BY RAHUL-MASTER*`;

    await sock.sendMessage(from, { 
        image: { url: menuBanner }, 
        caption: mainText 
    }, { quoted: m });
}

else if (command === 'downloadmenu') {
    const downloadText = `┏━━━✦ *DOWNLOAD MENU* ✦━━━
┃ • .an1
┃ • .dl-npm
┃ • .play
┃ • .video
┃ • .drama
┃ • .apk
┃ • .fb
┃ • .gitclone
┃ • .gdrive
┃ • .mediafire
┃ • .tiktok
┃ • .insta
┃ • .twitter
┗━━━━━━━━━━━━━━━━━━━━━✦
*POWERED BY RAHUL-MASTER*`;

    await sock.sendMessage(from, { 
        image: { url: menuBanner }, 
        caption: downloadText 
    }, { quoted: m });
}

else if (command === 'ownermenu') {
    const ownerText = `┏━━━✦ *OWNER MENU* ✦━━━
┃ • .autobio
┃ • .bgmirefresh
┃ • .jid
┃ • .kickadmins
┃ • .join
┃ • .left
┃ • .newgc
┃ • .smd
┃ • .chreact
┃ • .status
┗━━━━━━━━━━━━━━━━━━━━━✦
*POWERED BY RAHUL-MASTER*`;

    await sock.sendMessage(from, { 
        image: { url: menuBanner }, 
        caption: ownerText 
    }, { quoted: m });
}

else if (command === 'groupmenu') {
    const groupText = `┏━━━✦ *GROUP MENU* ✦━━━
┃ • .del
┃ • .accept
┃ • .reject
┃ • .add
┃ • .remove
┃ • .kickall
┃ • .warn
┃ • .promote
┃ • .demote
┗━━━━━━━━━━━━━━━━━━━━━✦
*POWERED BY RAHUL-MASTER*`;

    await sock.sendMessage(from, { 
        image: { url: menuBanner }, 
        caption: groupText 
    }, { quoted: m });
}

else if (command === 'searchmenu') {
    const searchMenuText = `┏━━━✦ *SEARCH MENU* ✦━━━
┃ • .pins2
┃ • .facebook3
┃ • .define
┃ • .gitstalk
┃ • .moviesearch
┃ • .srepo
┃ • .yts
┃ • .google
┗━━━━━━━━━━━━━━━━━━━━━✦
*POWERED BY RAHUL-MASTER*`;

    await sock.sendMessage(from, { 
        image: { url: menuBanner }, 
        caption: searchMenuText 
    }, { quoted: m });
}

else if (command === 'convertmenu') {
    const convertText = `┏━━━✦ *CONVERT MENU* ✦━━━
┃ • .tts
┃ • .currency
┃ • .sticker2img
┃ • .tomp3
┃ • .toptt
┃ • .gif
┃ • .attp
┃ • .ttp
┗━━━━━━━━━━━━━━━━━━━━━✦
*POWERED BY RAHUL-MASTER*`;

    await sock.sendMessage(from, { 
        image: { url: menuBanner }, 
        caption: convertText 
    }, { quoted: m });
}

else if (command === 'aimenu') {
    const aiText = `┏━━━✦ *AI MENU* ✦━━━
┃ • .copilot
┃ • .chatgpt
┃ • .mistral
┃ • .llama
┃
 { generateWAMessageFromContent } = require('@whiskeysockets/baileys');

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
