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
        
        // Clean up the URL to prevent double encoding issues
        let url = args[0].trim();
        if (url.includes('?')) {
            url = url.split('?')[0]; // Keeps the core clean post/reel link without tracking tokens causing 401s
        }
        
        if (!url.includes('instagram.com')) {
            return m.reply('❌ *Error:* Please provide a valid Instagram URL!');
        }
        
        // Cyber-Matrix Live Editing Animation Sequence with Progress Bar
        const loadMsg = await m.reply("╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ ⚡ *CONNECTING... [ ⚡░░░░░░░░ ] 25%*\n╰━━━━━━━━━━━━━━━━━━⬣");
        
        try {
            await new Promise(resolve => setTimeout(resolve, 300));
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ 📥 *FETCHING... [ ████░░░░░░ ] 50%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            // Correct API URL construction
            const apiUrl = `https://delirius-apiofc.vercel.app/download/igv2?url=${q}`;
            
            const response = await axios({
                method: 'get',
                url: apiUrl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Accept': 'application/json'
                },
                timeout: 30000
            });
            
            if (!response.data) {
                throw new Error('API returned empty response');
            }

            // Handle different possible JSON structures returned by third-party APIs
            const resData = response.data.data || response.data.result || response.data;
            let mediaUrl = null;

            if (Array.isArray(resData)) {
                mediaUrl = resData[0]?.url || resData[0];
            } else if (typeof resData === 'object' && resData !== null) {
                mediaUrl = resData.url || resData.downloadUrl || resData.dl_url || (resData.data && resData.data[0]?.url);
            } else if (typeof resData === 'string') {
                mediaUrl = resData;
            }

            if (!mediaUrl) {
                throw new Error('Media URL could not be extracted from API response');
            }
            
            await new Promise(resolve => setTimeout(resolve, 300));
            await sock.sendMessage(m.chat, { text: "╭━━━〔 🌐 *ʀᴀʜᴜʟ - ᴀɪ* 〕━━━⬣\n┃ ✨ *PROCESSING... [ ████████░░ ] 85%*\n╰━━━━━━━━━━━━━━━━━━⬣", edit: loadMsg.key }).catch(() => {});

            const mediaResponse = await axios({
                method: 'get',
                url: mediaUrl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                    'Referer': 'https://www.instagram.com/'
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
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━⬣

> *🔥 Powered by Rahul Master*`.trim();
            
            const contentType = mediaResponse.headers['content-type'] || '';
            const isVideo = mediaUrl.includes('.mp4') || contentType.includes('video');

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
            console.error('instadl error:', err.message);
            let errorMsg = err.message;
            if (err.response && err.response.status === 401) {
                errorMsg = 'API Key unauthorized or expired (401).';
            }
            await sock.sendMessage(m.chat, { text: `❌ *Failed to download content!*\n\n_Reason:_ ${errorMsg}` }).catch(() => {
                m.reply(`❌ *Failed to download content!*\n\n_Reason:_ ${errorMsg}`);
            });
        }
    }
};
