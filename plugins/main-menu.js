// Jevha kontahi message yeil, tevha to check karnyasathi:
if (m.messages && m.messages[0]) {
    const msg = m.messages[0];
    if (!msg.message) return;
    
    const remoteJid = msg.key.remoteJid;
    const messageType = Object.keys(msg.message)[0];
    
    // Message text kadhne (Conversation ya Extended Text)
    const body = (messageType === 'conversation') ? msg.message.conversation : 
                 (messageType === 'extendedTextMessage') ? msg.message.extendedTextMessage.text : '';

    // Prefix ani Command check karne
    const prefix = ".";
    if (body.startsWith(prefix)) {
        const command = body.slice(prefix.length).trim().split(' ').shift().toLowerCase();
        
        if (command === 'menu') {
            // Image sobat menu send karne
            await sock.sendMessage(remoteJid, {
                image: { url: 'https://sam-cdn.zone.id/files/xQer9GrIVT.jpg' },
                caption: `╭━━━〔 *RAHUL-AI MENU* 〕━━━⬣
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
*POWERED BY RAHUL-MASTER*`
            });
        }
    }
}
