const { exec } = require('child_process');

module.exports = {
    name: 'update',
    alias: ['up', 'upgrade', 'gitupdate'],
    description: 'Updates the bot using git pull from the GitHub repository.',
    category: 'owner',
    async execute(m, client, args) {
        // Optional: Owner check lagana ho toh yahan laga sakte hain
        // const ownerNumber = "YOUR_NUMBER@s.whatsapp.net";
        // if (m.sender !== ownerNumber) return m.reply('❌ This command is only for the owner!');

        await m.reply('🔄 *Checking for updates via Git...*');

        exec('git pull', async (err, stdout, stderr) => {
            if (err) {
                return m.reply(`❌ *Git Error:* \n\`\`\`${err.message}\`\`\``);
            }

            if (stdout && stdout.includes('Already up to date.')) {
                return m.reply('✅ *Your bot is already up-to-date! No new changes found.*');
            }

            let responseText = `✨ *Bot Updated Successfully!*\n\n`;
            responseText += `📦 *Git Output:*\n\`\`\`${stdout.trim()}\`\`\`\n\n`;
            responseText += `🔄 *Restarting process to apply updates...*`;

            await m.reply(responseText);

            // Bot ko restart karne ke liye (Agar PM2 ya Node process manager use ho raha hai)
            setTimeout(() => {
                process.exit(0);
            }, 3000);
        });
    }
};
