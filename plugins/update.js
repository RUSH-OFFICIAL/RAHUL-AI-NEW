const axios = require('axios');

module.exports = {
    name: 'update',
    alias: ['up', 'upgrade', 'deploy'],
    description: 'Triggers a fresh deployment on Koyeb via API to update the bot.',
    category: 'owner',
    async execute(conn, m, { reply }) {
        try {
            await reply('🔄 *Triggering update on Koyeb Cloud... Please wait.*');

            // Yahan apni Koyeb details dalein
            const KOYEB_API_TOKEN = process.env.KOYEB_API_TOKEN || 'zk3vy4zc6a7ui5ni32shqxhr91yf6if28n63rcq198md0j33gbowidy0h4c8f80i';
            const SERVICE_ID = process.env.KOYEB_SERVICE_ID || '5dda4504-94d8-446a-802b-0e807984bc4a';

            if (KOYEB_API_TOKEN === 'YOUR_KOYEB_API_TOKEN' || SERVICE_ID === 'YOUR_SERVICE_ID') {
                return reply('❌ *Configuration Missing:* Please add `KOYEB_API_TOKEN` and `KOYEB_SERVICE_ID` in your Koyeb Environment Variables.');
            }

            // Koyeb API call to redeploy service
            const response = await axios.post(
                `https://app.koyeb.com/v1/services/${SERVICE_ID}/redeploy`,
                {},
                {
                    headers: {
                        'Authorization': `Bearer ${KOYEB_API_TOKEN}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.status === 200 || response.status === 201) {
                await reply('✨ *Update triggered successfully!*\n\n🚀 Koyeb is now pulling the latest changes from your GitHub repository and rebuilding the bot. It will restart shortly.');
            } else {
                reply('⚠️ Update triggered, but received an unexpected response from Koyeb API.');
            }

        } catch (e) {
            console.error(e.response?.data || e.message);
            const errorMsg = e.response?.data?.message || e.message;
            reply(`❌ *Update Failed:* \n\`\`\`${errorMsg}\`\`\``);
        }
    }
};
