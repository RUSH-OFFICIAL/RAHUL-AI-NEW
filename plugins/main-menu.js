const { prepareWAMessageMedia, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

async function sendRahulAiMenu(sock, remoteJid) {
    try {
        // Tumchya menu sathi laganarya image URLs ya local file paths
        // Tumhi ithe 2 te 4 images chya links ya paths deu shakta je album banavtil
        const menuImages = [
            './assets/menu_banner.jpg', // Banner image (jar asel tar)
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' // Tumhi dileli image link
        ];

        let albumMessages = [];

        for (let i = 0; i < menuImages.length; i++) {
            // Media prepare karne
            const media = await prepareWAMessageMedia(
                { image: { url: menuImages[i] } }, 
                { upload: sock.waUploadToServer }
            );

            // Pahilya image sobat full menu text / command list dena
            let captionText = "";
            if (i === 0) {
                captionText = `╭━━━〔 *RAHUL-AI MENU* 〕━━━⬣
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
┃ • .thwards
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

*TOTAL COMMANDS LIST : 43*
*POWERED BY RAHUL-MASTER*`;
            } else if (i === 1) {
                // Dusrya image sathi pudhchi list (Group, Search, AI, etc.)
                captionText = `╭━━━〔 *GROUP COMMAND LIST* 〕━━━⬣
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
            }

            albumMessages.push({
                imageMessage: media.imageMessage,
                caption: captionText
            });
        }

        // WhatsApp madhe album format madhe message pathvane
        await sock.sendMessage(remoteJid, {
            album: albumMessages
        });

    } catch (error) {
        console.error("Menu pathavtana error ala:", error);
        await sock.sendMessage(remoteJid, { text: "❌ Menu load hot nahiy, kachari error ala ahe." });
    }
}
