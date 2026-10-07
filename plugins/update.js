const { exec } = require('child_process');

let handler = async (m, { conn, isOwner }) => {
    if (!isOwner) return m.reply('Haa command fakt bot ownerich vapru shakto!');
    
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
handler.owner = true;

module.exports = handler;
