module.exports = {
    name: 'ping',
    aliases: ['speed', 'latency'],
    description: 'Check bot response speed',

    async execute(sock, m, args) {
        try {
            const start = Date.now();
            const latency = Date.now() - start;
            
            // Direct m.reply vaparla ahe, mhanun kuthlach undefined error yenar nahi
            await m.reply(`> 𝚁𝙰𝙷𝚄𝙻-𝙰𝙸: ${latency} ms`);

        } catch (err) {
            console.error('Ping error:', err);
            await m.reply(`❌ Error: ${err.message}`);
        }
    }
};
