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
            await new Promise(resolve => setTimeout(resolve, 300));
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ 📥 *FETCHING... [ ████░░░░░░ ] 50%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const apiUrl = `https://api.gifted.co.ke/api/download/instadl?apikey=gifted&url=${encodeURIComponent(url)}`;
            
            // Added headers to bypass basic 401 Unauthorized blocks (User-Agent & Referer)
            const response = await axios({
                method: 'get',
                url: apiUrl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Referer': 'https://instagram.com'
                },
                timeout: 30000
            });
            
            if (!response.data || (!response.data.status && !response.data.data && !response.data.result)) {
                throw new Error('API returned invalid response or empty result');
            }
            
            const resData = response.data.data || response.data.result || response.data;
            const mediaList = Array.isArray(resData) ? resData : (resData.url || resData.downloadUrl || [resData]);
            const mediaUrl = typeof mediaList === 'string' ? mediaList : (mediaList[0]?.url || mediaList[0]);

            if (!mediaUrl) {
                throw new Error('Media URL not found in API response');
            }
            
            await new Promise(resolve => setTimeout(resolve, 300));
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ ✨ *PROCESSING... [ ████████░░ ] 85%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const mediaResponse = await axios({
                method: 'get',
                url: mediaUrl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                responseType: 'arraybuffer',
                timeout: 60000
            });
            
            const buffer = Buffer.from(mediaResponse.data);
            
            // Final Completion Status Update
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ 🚀 *COMPLETED! [ ██████████ ] 100%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const caption = `
╭━━━〔 💎 *ɪɴsᴛᴀɢʀᴀᴍ ᴍᴇᴅɪᴀ* 〕━━━⬣
┃ 👤 *Status*   : *Success*
╰━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

> *🔥 Powered by Rahul Master*`.trim();
            
            const isVideo = mediaUrl.includes('.mp4') || mediaResponse.headers['content-type']?.includes('video');

            if (isVideo) {
                await sock.sendMessage(m.chat, { 
                    video: buffer,
                    caption: caption,
                    mimetype: 'video/mp4'
                }, { quoted: m });
            } else {
                await sock.sendMessage(m.chat, { 
                    image: buffer,
                    caption: caption
                }, { quoted: m });
            }
            
        } catch (err) {
            console.error('instadl error:', err);
            await sock.sendMessage(m.chat, { text: `❌ *Failed to download content!*\n\n_Reason:_ ${err.message}` }).catch(() => {
                m.reply(`❌ *Failed to download content!*\n\n_Reason:_ ${err.message}`);
            });
        }
    }
};
