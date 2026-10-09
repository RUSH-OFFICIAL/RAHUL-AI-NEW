const { exec } = require('child_process');

module.exports = {
    name: 'update',
    alias: ['up', 'upgrade', 'gitupdate'],
    description: 'Updates the bot using git pull from the GitHub repository.',
    category: 'owner',
    async execute(conn, m, { args, reply }) {
        try {
            await reply('🔄 *Checking for updates via Git...*');

            exec('git pull', async (err, stdout, stderr) => {
                if (err) {
                    return reply(`❌ *Git Error:* \n\`\`\`${err.message}\`\`\``);
                }

                if (stdout && (stdout.includes('Already up to date.') || stdout.includes('Already up-to-date.'))) {
                    return reply('✅ *Your bot is already up-to-date! No new changes found.*');
                }

                let responseText = `✨ *Bot Updated Successfully!*\n\n`;
                responseText += `📦 *Git Output:*\n\`\`\`${stdout.trim()}\`\`\`\n\n`;
                responseText += `🔄 *Restarting process to apply updates...*`;

                await reply(responseText);

                // Bot restart to apply changes
                setTimeout(() => {
                    process.exit(0);
                }, 3000);
            });
        } catch (e) {
            console.error(e);
            reply(`❌ *Error executing update:* ${e.message}`);
        }
    }
};
