Sparky({
		name: "mp3",
		fromMe: isPublic,
		category: "converters",
		desc: "Converts video/audio to MP3. Powered by RAHUL-AI"
	},
	async ({
		m,
		args
	}) => {
		if (!m.quoted || !(m.quoted.message.audioMessage || m.quoted.message.videoMessage || (m.quoted.message.documentMessage && m.quoted.message.documentMessage.mimetype === 'video/mp4'))) {
			return await m.reply("Please reply to an audio or video to convert it into MP3! - RAHUL-AI");
		}
		await m.react('⏫');
		await m.sendMsg(m.jid, await convertToMp3(await m.quoted.download()), { mimetype: "audio/mpeg", quoted: m }, 'audio');
		return await m.react('✅');
	});
