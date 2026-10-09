const { exec } = require('child_process');
const simpleGit = require('simple-git'); // Optional: Agar git installed ho to fast update ke liye
const fs = require('fs');
const path = require('path');

module.exports = {
    name: 'update',
    alias: ['up', 'upgrade'],
    description: 'Check for updates and update the bot from GitHub repository.',
    category: 'system',
    async execute(m, client, args, sharedData) {
        const prefix = sharedData?.prefix || '.';
        
        // Check owner or admin permissions if needed
        // const isOwner = ...; 

        await m.reply('🔄 *Checking for updates, please wait...*');

        // Method using git command (Standard for Node.js bots running on VPS/Termux/Panel)
        exec('git pull', async (error, stdout, stderr) => {
            if (error) {
                console.error(`Update Error: ${error.message}`);
                return m.reply(`❌ *Update Failed:* \n\`\`\`${error.message}\`\`\``);
            }

            if (stderr && stderr.includes('Already up to date.')) {
                return m.reply('✅ *Your bot is already on the latest version!*');
            }

            if (stdout) {
                if (stdout.includes('Already up to date.') || stdout.includes('Already up-to-date.')) {
                    return m.reply('✅ *Bot is already up to date!*');
                }

                let updateMsg = `✨ *Bot Updated Successfully!*\n\n`;
                updateMsg += `📦 *Logs:* \n\`\`\`${stdout.slice(0, 1000)}\`\`\`\n\n`;
                updateMsg += `🔄 *Restarting bot to apply changes...*`;

                await m.reply(updateMsg);

                // Restart process (PM2 or standard Node process exit for auto-restart)
                setTimeout(() => {
                    process.exit(0);
                }, 2000);
            } else {
                m.reply('⚠️ Update executed, but no response output received. Try restarting manually.');
            }
        });
    }
};
