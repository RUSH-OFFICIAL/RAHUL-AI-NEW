const { prepareWAMessageMedia } = require('@whiskeysockets/baileys');

// 1. Command handler madhe asha prakare check kara (Tumcha prefix '.' ahe)
// Example: inside your message listener function:
/*
const prefix = ".";
const isCmd = body.startsWith(prefix);
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : "";

if (command === "menu") {
    await sendExactSlideMenu(sock, from);
}
*/

// 2. Menu Function
async function sendExactSlideMenu(sock, remoteJid) {
    try {
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        // List 1: Download & Owner
        const text1 = `╭━━━〔 *RAHUL-AI MENU* 〕━━━⬣
┃ *DOWNLOAD COMMAND LIST*
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
┃ • .timp3
┃ • .insta
┃ • .instamp3
┃ • .twitter
┃ • .pinterest
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 *OWNER COMMAND LIST* 〕━━━⬣
┃ • .autobio
┃ • .bgmirefresh
┃ • .jid
┃ • .kickadmins
┃ • .join
┃ • .left
┃ • .newgc
┃ • .smd
┃ • .chreact
┃ • .newsletter
┃ • .status
╰━━━━━━━━━━━━━━━━━━━⬣
*POWERED BY RAHUL-MASTER*`;

        // List 2: Group & Search
        const text2 = `╭━━━〔 *GROUP COMMAND LIST* 〕━━━⬣
┃ • .chstatus
┃ • .del
┃ • .requestlist
┃ • .acceptall
┃ • .rejectall
┃ • .accept
┃ • .reject
┃ • .add
┃ • .remove
┃ • .kickall
┃ • .warn
┃ • .warnings
┃ • .resetwarn
┃ • .promote
┃ • .demote
╰━━━━━━━━━━━━━━━━━━━⬣

╭━━━〔 *SEARCH COMMAND LIST* 〕━━━⬣
┃ • .pins2
┃ • .facebook3
┃ • .define
┃ • .gitstalk
┃ • .moviesearch
┃ • .srepo
┃ • .spotifasearch
┃ • .tiks
┃ • .yts
┃ • .google
╰━━━━━━━━━━━━━━━━━━━⬣
*POWERED BY RAHUL-MASTER*`;

        // List 3: Convert List
        const text3 = `╭━━━〔 *CONVERT COMMAND LIST* 〕━━━⬣
┃ • .tts
┃ • .currency
┃ • .sticker2img
┃ • .tomp3
┃ • .toptt
┃ • .gif
┃ • .attp
┃ • .ttp
┃ • .uploadfile
╰━━━━━━━━━━━━━━━━━━━⬣
*POWERED BY RAHUL-MASTER*`;

        // Eka mage ek images pathvane jevhyane te WhatsApp madhe swipe album sarkhe disatat
        await sock.sendMessage(remoteJid, { image: { url: imageUrl }, caption: text1 });
        await sock.sendMessage(remoteJid, { image: { url: imageUrl }, caption: text2 });
        await sock.sendMessage(remoteJid, { image: { url: imageUrl }, caption: text3 });

    } catch (e) {
        console.error("Menu error:", e);
        await sock.sendMessage(remoteJid, { text: "❌ Menu load hot nahiy: " + e.message });
    }
}
