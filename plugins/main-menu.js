const { prepareWAMessageMedia, generateWAMessageFromContent } = require('@whiskeysockets/baileys');

async function sendExactSlideMenu(sock, remoteJid) {
    try {
        // Tumchya menu madhil veg-veghe category images
        const images = [
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg', // Image 1: Download & Owner list
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg', // Image 2: Group & Search list
            'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg'  // Image 3: Convert & Main list
        ];

        let albumArray = [];

        for (let i = 0; i < images.length; i++) {
            const media = await prepareWAMessageMedia(
                { image: { url: images[i] } }, 
                { upload: sock.waUploadToServer }
            );

            let textContent = "";
            if (i === 0) {
                textContent = `╭━━━〔 *RAHUL-AI MENU* 〕━━━⬣
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
            } else if (i === 1) {
                textContent = `╭━━━〔 *GROUP COMMAND LIST* 〕━━━⬣
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
            } else if (i === 2) {
                textContent = `╭━━━〔 *CONVERT COMMAND LIST* 〕━━━⬣
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
            }

            albumArray.push({
                imageMessage: media.imageMessage,
                caption: textContent
            });
        }

        // WhatsApp madhe album send karne
        await sock.sendMessage(remoteJid, {
            album: albumArray
        });

    } catch (e) {
        console.error("Menu error:", e);
        // Fallback option jar album support karat nasel
        await sock.sendMessage(remoteJid, { text: "❌ Menu load hot nahiy." });
    }
}
