const axios = require('axios');

module.exports = {
    name: 'instadl',
    description: 'Ultimate cyber-matrix Instagram downloader with live progress animation',
    aliases: ['insta', 'instagram', 'ig', 'igdl'],
    
    async execute(sock, m, args) {
        await m.react('⚡');

        if (!args.length) {
            const prefix = global.BOT_PREFIX || '.';
            return m.reply(
                `╭━━━〔 ⚡ *ɪɴsᴛᴀɢʀᴀᴍ ᴍᴀᴛʀɪx ʜᴜʙ* 〕━━━⬣\n` +
                `┃ ⚙️ *Usage*   : \`${prefix}ig <url>\`\n` +
                `┃ 🌐 *Example* : \`${prefix}ig https://www.instagram.com/reel/xxxx\`\n` +
                `╰━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣\n` +
                `> *⭕ Powered by Rahul Master*`
            );
        }
        
        const url = args[0];
        
        if (!url.includes('instagram.com')) {
            return m.reply('❌ *Error:* Please provide a valid Instagram URL!');
        }
        
        // Cyber-Matrix Live Editing Animation Sequence with Progress Bar
        const loadMsg = await m.reply("╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ ⚡ *CONNECTING... [ ⚡░░░░░░░░ ] 25%*\n╰━━━━━━━━━━━━━━━━━━⬣");
        
        try {
            await new Promise(resolve => setTimeout(resolve, 400));
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜլ - ᴀɪ* 〕━━━⬣\n┃ 📥 *FETCHING... [ ████░░░░░░ ] 50%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const apiUrl = `https://api-rebix.zone.id/api/igdl?quality=480&url=${encodeURIComponent(url)}`;
            
            const response = await axios({
                method: 'get',
                url: apiUrl,
                timeout: 30000
            });
            
            if (!response.data.status || !response.data.result) {
                throw new Error('API returned invalid response or empty result');
            }
            
            const result = response.data.result;
            const metadata = result.metadata || {};
            const mediaUrl = result.url && result.url[0] ? result.url[0] : null;

            if (!mediaUrl) {
                throw new Error('Media URL not found in API response');
            }
            
            await new Promise(resolve => setTimeout(resolve, 400));
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ ✨ *PROCESSING... [ ████████░░ ] 85%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const mediaResponse = await axios({
                method: 'get',
                url: mediaUrl,
                responseType: 'arraybuffer',
                timeout: 60000
            });
            
            const buffer = Buffer.from(mediaResponse.data);
            
            // Final Completion Status Update
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ 🚀 *COMPLETED! [ ██████████ ] 100%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const caption = `
╭━━━〔 💎 *ɪɴsᴛᴀɢʀᴀᴍ ᴍᴇᴅɪᴀ* 〕━━━⬣
┃ 👤 *User*     : *${metadata.username || 'Unknown'}*
┃ ❤️ *Likes*    : *${metadata.like || '0'}*
┃ 💬 *Comments* : *${metadata.comment || '0'}*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

📝 *Caption:* 
${metadata.caption || 'No caption available'}

> *🔥 Powered by Rahul Master*`.trim();
            
            if (metadata.isVideo) {
                await m.reply(buffer, { 
                    caption: caption,
                    video: buffer,
                    mimetype: 'video/mp4'
                });
            } else {
                await m.reply(buffer, { 
                    caption: caption,
                    image: buffer
                });
            }
            
        } catch (err) {
            console.error('instadl error:', err);
            await sock.sendMessage(m.chat, { text: `❌ *Failed to download content!*\n\n_Reason:_ ${err.message}` }).catch(() => {
                m.reply(`❌ *Failed to download content!*\n\n_Reason:_ ${err.message}`);
            });
        }
    }
};
