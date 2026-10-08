let handler = async (m, { conn, text, isOwner }) => {
    if (!isOwner) {
        return m.reply('❌ Ye command sirf bot ka owner use kar sakta hai!')
    }

    m.reply('⚠️ Koyeb cloud par direct `git pull` kaam nahi karta kyunki yahan file system temporary hota hai. Code update karne ke liye aapko GitHub par push karna hoga ya Koyeb par redeploy karna hoga.')
}

handler.help = ['update']
handler.tags = ['owner']
handler.command = /^update$/i
handler.rowner = true

module.exports = handler
