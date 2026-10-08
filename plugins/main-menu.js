// Command handler madhe he check kara:
// Prefix . set kelay ani command parse hot ahe.
const prefix = ".";
const budy = (m.mtype === 'conversation') ? m.message.conversation : (m.mtype == 'imageMessage') ? m.message.imageMessage.caption : (m.mtype == 'extendedTextMessage') ? m.message.extendedTextMessage.text : '';
const isCmd = budy.startsWith(prefix);
const command = isCmd ? budy.slice(prefix.length).trim().split(' ').shift().toLowerCase() : '';
const from = m.chat;

// Menu Switch / If-Else Handler
switch (command) {
    case 'menu':
    case 'help':
        await sendMainSlideMenu(sock, from);
        break;

    case 'downloadmenu':
        await sock.sendMessage(from, { 
            image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, 
            caption: `╭━━━〔 *DOWNLOAD COMMAND LIST* 〕━━━⬣\n┃ • .an1\n┃ • .dl-npm\n┃ • .play\n┃ • .video\n┃ • .drama\n┃ • .apk\n┃ • .fb\n┃ • .gitclone\n┃ • .gdrive\n┃ • .mediafire\n┃ • .tiktok\n┃ • .timp3\n┃ • .insta\n┃ • .instamp3\n┃ • .twitter\n┃ • .pinterest\n╰━━━━━━━━━━━━━━━━━━━⬣\n*POWERED BY RAHUL-MASTER*` 
        });
        break;

    case 'ownermenu':
        await sock.sendMessage(from, { 
            image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, 
            caption: `╭━━━〔 *OWNER COMMAND LIST* 〕━━━⬣\n┃ • .autobio\n┃ • .bgmirefresh\n┃ • .jid\n┃ • .kickadmins\n┃ • .join\n┃ • .left\n┃ • .newgc\n┃ • .smd\n┃ • .chreact\n┃ • .newsletter\n┃ • .status\n╰━━━━━━━━━━━━━━━━━━━⬣\n*POWERED BY RAHUL-MASTER*` 
        });
        break;

    case 'groupmenu':
        await sock.sendMessage(from, { 
            image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, 
            caption: `╭━━━〔 *GROUP COMMAND LIST* 〕━━━⬣\n┃ • .chstatus\n┃ • .del\n┃ • .requestlist\n┃ • .acceptall\n┃ • .rejectall\n┃ • .accept\n┃ • .reject\n┃ • .add\n┃ • .remove\n┃ • .kickall\n┃ • .warn\n┃ • .warnings\n┃ • .resetwarn\n┃ • .promote\n┃ • .demote\n╰━━━━━━━━━━━━━━━━━━━⬣\n*POWERED BY RAHUL-MASTER*` 
        });
        break;

    case 'searchmenu':
        await sock.sendMessage(from, { 
            image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, 
            caption: `╭━━━〔 *SEARCH COMMAND LIST* 〕━━━⬣\n┃ • .pins2\n┃ • .facebook3\n┃ • .define\n┃ • .gitstalk\n┃ • .moviesearch\n┃ • .srepo\n┃ • .spotifasearch\n┃ • .tiks\n┃ • .yts\n┃ • .google\n╰━━━━━━━━━━━━━━━━━━━⬣\n*POWERED BY RAHUL-MASTER*` 
        });
        break;

    case 'convertmenu':
        await sock.sendMessage(from, { 
            image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' }, 
            caption: `╭━━━〔 *CONVERT COMMAND LIST* 〕━━━⬣\n┃ • .tts\n┃ • .currency\n┃ • .sticker2img\n┃ • .tomp3\n┃ • .toptt\n┃ • .gif\n┃ • .attp\n┃ • .ttp\n┃ • .uploadfile\n╰━━━━━━━━━━━━━━━━━━━⬣\n*POWERED BY RAHUL-MASTER*` 
        });
        break;
}


// Main Slide Function (Jevha user .menu type karel tevha sarv menus ekaach veli swipe sathi jatil)
async function sendMainSlideMenu(sock, remoteJid) {
    try {
        const imageUrl = 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg';

        const text1 = `╭━━━〔 *RAHUL-AI MAIN MENU* 〕━━━⬣
┃ *DOWNLOAD & OWNER LIST*
┃ Use prefix [ . ] for all commands.
╰━━━━━━━━━━━━━━━━━━━⬣
• .downloadmenu
• .ownermenu
• .groupmenu
• .searchmenu
• .convertmenu
*POWERED BY RAHUL-MASTER*`;

        const text2 = `╭━━━〔 *DOWNLOAD COMMAND LIST* 〕━━━⬣
┃ • .an1 | .dl-npm | .play
┃ • .video | .drama | .apk
┃ • .fb | .gitclone | .gdrive
┃ • .tiktok | .insta | .twitter
╰━━━━━━━━━━━━━━━━━━━⬣
*POWERED BY RAHUL-MASTER*`;

        const text3 = `╭━━━〔 *OWNER COMMAND LIST* 〕━━━⬣
┃ • .autobio | .jid | .join
┃ • .left | .newgc | .smd
┃ • .status | .chreact
╰━━━━━━━━━━━━━━━━━━━⬣
*POWERED BY RAHUL-MASTER*`;

        // Eka mage ek messages pathvlyane te WhatsApp madhe swipe gallery/album sarkhe disatat[span_3](start_span)[span_3](end_span)[span_4](start_span)[span_4](end_span)
        await sock.sendMessage(remoteJid, { image: { url: imageUrl }, caption: text1 });
        await sock.sendMessage(remoteJid, { image: { url: imageUrl }, caption: text2 });
        await sock.sendMessage(remoteJid, { image: { url: imageUrl }, caption: text3 });

    } catch (e) {
        console.error("Menu error:", e);
        await sock.sendMessage(remoteJid, { text: "❌ Menu load hot nahiy." });
    }
}
