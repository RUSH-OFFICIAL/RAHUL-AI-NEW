});

System({
    pattern: 'insta',
    fromMe: isPrivate,
    type: 'download',
    desc: 'instagram downloader',
}, async (message, match) => {
    const url = (await extractUrlsFromText(match || message.reply_message.text))[0];
    if (!url) return await message.reply('Please provide an Instagram *url*'); 
    if (!isUrl(url)) return await message.reply("Please provide a valid Instagram *url*");
    if (!url.includes("instagram.com")) return await message.reply("*Please provide a valid Instagram url*");
    const data = await instaDL(url);
    if (!data || data.length === 0) return await message.reply("*No content found at the provided URL*");
    for (const imageUrl of data) {
        if (imageUrl) await message.sendFromUrl(imageUrl.url, { quoted: message.data });
    }
});

System({
  pattern: "story",
  fromMe: isPrivate,
  type: "download",
  desc: "To download insta story",
}, async (message, match) => {
  match = match || message.reply_message.text;
  if (!isUrl(match)) {
    const { media: result } = await getJson(IronMan("ironman/ig/story?user=" + match));
    if (!result) return await message.reply("*Exᴀᴍᴘʟᴇ: .story username/link*");
    if(result.length === 1) return await message.sendFromUrl(result[0], { caption: "*done ♥️*", quoted: message });
    const options = result.map((u, index) => ({ displayText:`${index + 1}/${result.length}`, id: `sendurl ${u}` }));
    if(message.isGroup) return await message.send("\n*Story downloader*\n", { values: options, withPrefix: true, participates: [message.sender] }, "poll");
    for (const media of result) {
      await message.sendFromUrl(media, { quoted: message.data });
    }
    return;
  }
  const url = (await extractUrlsFromText(match))[0];
  if (!url.includes("instagram.com")) return message.reply("_*Provide a valid Instagram story URL*_");
  const result = await instaDL(url);
  if (!result || result.length === 0) return await message.reply("*Exᴀᴍᴘʟᴇ: .story username/link*");
  if(result.length === 1) return await message.sendFromUrl(result[0].url, { caption: "*done ♥️*", quoted: message });
  const options = result.map((u, index) => ({ displayText:`${index + 1}/${result.length}`, id: `sendurl ${u.url}` }));
  if(message.isGroup) return await message.send("\n*Story downloader*\n", { values: options, withPrefix: true, participates: [message.sender] }, "poll");
  for (const media of result) {
    await message.sendFromUrl(media.url, { quoted: message.data });
  }
});
