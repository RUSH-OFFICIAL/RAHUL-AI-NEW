const { exec } = require('child_process');

let handler = async (m, { conn }) => {
    // Bot cha swatahcha number ani owner number check karne
    const botNumber = await conn.decodeJid(conn.user.id);
    const ownerNumber = conn.decodeJid(global.owner?.[0] || ''); // config.js madhla owner number
    
    // Sender (msg pathavnara) owner ahe ka kinva bot cha swatahcha number ahe ka te check karne
    const isAuthorized = [botNumber, ownerNumber].includes(m.sender) || global.owner.includes(m.sender.split('@')[0]);

    if (!isAuthorized) {
        return m.reply('Haa command fakt bot owner ani bot cha swatahcha number vapru shakto!');
    }
    
    m.reply('Bot update hot ahe, krupaya thoda vel thamba...');
    
    exec('git pull', (err, stdout, stderr) => {
        if (err) {
            return m.reply(`Update karatana error ala: ${err.message}`);
        }
        if (stdout.includes('Already up to date.')) {
            return m.reply('Bot pahilepasunch latest version var ahe!');
        }
        m.reply(`Bot safaltapurvak update zala ahe!\n\nLogs:\n${stdout}`);
    });
}

handler.help = ['update'];
handler.tags = ['owner'];
handler.command = /^(update|gitpull)$/i;

module.exports = handler;
