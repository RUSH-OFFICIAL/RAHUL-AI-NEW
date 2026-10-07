const axios = require('axios');

module.exports = {
    name: 'menu',
    description: 'Exact Rahul-AI Box Bordered Menu Layout',
    aliases: ['help', 'cmdlist', 'commands'],

    async execute(sock, m) {
        await m.react('✔️');

        const prefix = global.BOT_PREFIX || '.';

        const menuText = `
┌─ム DOWNLOAD COMMAND LIST
│
│ ⚪ ${prefix}AN1
│ ⚪ ${prefix}DL-NPM
│ ⚪ ${prefix}PLAY
│ ⚪ ${prefix}VIDEO
│ ⚪ ${prefix}DRAMA
│ ⚪ ${prefix}APK
│ ⚪ ${prefix}FB
│ ⚪ ${prefix}GITCLONE
│ ⚪ ${prefix}GDRIVE
│ ⚪ ${prefix}MEDIAFIRE
│ ⚪ ${prefix}TIKTOK
│ ⚪ ${prefix}YTMP3
│ ⚪ ${prefix}INSTA
│ ⚪ ${prefix}INSTAMP3
│ ⚪ ${prefix}TWITTER
│ ⚪ ${prefix}THREADS
│ ⚪ ${prefix}PINTEREST
│
├───────────────────
│ TOTAL COMMANDS LIST : 17
╰───────────────────╯

┌─ム OWNER COMMAND LIST
│
│ ⚪ ${prefix}AUTOBIO
│ ⚪ ${prefix}BGMIREFRESH
│ ⚪ ${prefix}JID
│ ⚪ ${prefix}KICKADMINS
│ ⚪ ${prefix}JOIN
│ ⚪ ${prefix}LEFT
│ ⚪ ${prefix}NEWGC
│ ⚪ ${prefix}SMD
│ ⚪ ${prefix}CHREACT
│ ⚪ ${prefix}NEWSLETTER
│ ⚪ ${prefix}STATUS
│ ⚪ ${prefix}VV
│ ⚪ ${prefix}BOOM
│ ⚪ ${prefix}BAN
│ ⚪ ${prefix}UNBAN
│ ⚪ ${prefix}BLOCK
│ ⚪ ${prefix}UNBLOCK
│ ⚪ ${prefix}BLOCKLIST
│ ⚪ ${prefix}SUDO
│ ⚪ ${prefix}DELSUDO
│ ⚪ ${prefix}LISTSUDO
│ ⚪ ${prefix}LISTBAN
│ ⚪ ${prefix}SIM
│ ⚪ ${prefix}CNIC
│ ⚪ ${prefix}GETPP
│ ⚪ ${prefix}GETGPP
│
├───────────────────
│ TOTAL COMMANDS LIST : 26
╰───────────────────╯

┌─ム GROUP COMMAND LIST
│
│ ⚪ ${prefix}CHSTATUS
│ ⚪ ${prefix}DEL
│ ⚪ ${prefix}REQUESTLIST
│ ⚪ ${prefix}ACCEPTALL
│ ⚪ ${prefix}REJECTALL
│ ⚪ ${prefix}ACCEPT
│ ⚪ ${prefix}REJECT
│ ⚪ ${prefix}ADD
│ ⚪ ${prefix}REMOVE
│ ⚪ ${prefix}KICKME
│ ⚪ ${prefix}KICKALL
│ ⚪ ${prefix}OUT
│ ⚪ ${prefix}WARN
│ ⚪ ${prefix}WARNINGS
│ ⚪ ${prefix}RESETWARN
│ ⚪ ${prefix}PROMOTE
│ ⚪ ${prefix}DEMOTE
│ ⚪ ${prefix}MUTE
│ ⚪ ${prefix}UNMUTE
│ ⚪ ${prefix}LOCK
│ ⚪ ${prefix}UNLOCK
│ ⚪ ${prefix}GNAME
│ ⚪ ${prefix}GDESC
│ ⚪ ${prefix}SETPPGROUP
│ ⚪ ${prefix}QLINK
│ ⚪ ${prefix}TAGALL
│ ⚪ ${prefix}HIDETAG
│ ⚪ ${prefix}TAG
│ ⚪ ${prefix}TOTAG
│ ⚪ ${prefix}RULES
│ ⚪ ${prefix}WHO
│ ⚪ ${prefix}OFF
│
├───────────────────
│ TOTAL COMMANDS LIST : 32
╰───────────────────╯

┌─ム SEARCH COMMAND LIST
│
│ ⚪ ${prefix}PINS2
│ ⚪ ${prefix}FACEBOOK3
│ ⚪ ${prefix}DEFINE
│ ⚪ ${prefix}GITSTALK
│ ⚪ ${prefix}MOVIESEARCH
│ ⚪ ${prefix}SREPO
│ ⚪ ${prefix}SPOTIFYSEARCH
│ ⚪ ${prefix}TIKS
│ ⚪ ${prefix}YTS
│ ⚪ ${prefix}GOOGLE
│ ⚪ ${prefix}COUNTRY
│ ⚪ ${prefix}CRYPTO
│ ⚪ ${prefix}URBAN
│ ⚪ ${prefix}GITHUB
│ ⚪ ${prefix}LYRICS
│ ⚪ ${prefix}WEATHER
│ ⚪ ${prefix}WIKI
│
├───────────────────
│ TOTAL COMMANDS LIST : 17
╰───────────────────╯

┌─ム CONVERT COMMAND LIST
│
│ ⚪ ${prefix}TTS
│ ⚪ ${prefix}TTS2
│ ⚪ ${prefix}CURRENCY
│ ⚪ ${prefix}STICKER2IMG
│ ⚪ ${prefix}TOMP3
│ ⚪ ${prefix}TOPTT
│ ⚪ ${prefix}GIF
│ ⚪ ${prefix}ATTP
│ ⚪ ${prefix}TTP
│ ⚪ ${prefix}UPLOADFILE
│
├───────────────────
│ TOTAL COMMANDS LIST : 10
╰───────────────────╯

┌─ム MAIN COMMAND LIST
│
│ ⚪ ${prefix}ALIVE
│ ⚪ ${prefix}ALIVE2
│ ⚪ ${prefix}TOOLSMENU
│ ⚪ ${prefix}MAINMENU
│ ⚪ ${prefix}BUGMENU
│ ⚪ ${prefix}DOWNLOADMENU
│ ⚪ ${prefix}RANDOMMENU
│ ⚪ ${prefix}FUNMENU
│ ⚪ ${prefix}OWNERMENU
│ ⚪ ${prefix}GROUPMENU
│ ⚪ ${prefix}SEARCHMENU
│ ⚪ ${prefix}CONVERTERMENU
│ ⚪ ${prefix}ISLAMICMENU
│ ⚪ ${prefix}AIMENU
│ ⚪ ${prefix}SETTINGSMENU
│ ⚪ ${prefix}GPASS
│ ⚪ ${prefix}MENU
│
├───────────────────
│ TOTAL COMMANDS LIST : 17
╰───────────────────╯

┌─ム AI COMMAND LIST
│
│ ⚪ ${prefix}COPILOT
│ ⚪ ${prefix}TALKAI
│ ⚪ ${prefix}CHATGPT
│ ⚪ ${prefix}MISTRAL
│ ⚪ ${prefix}LLAMA
│ ⚪ ${prefix}MISTRAL2
│ ⚪ ${prefix}FLUX
│ ⚪ ${prefix}GEMINI
│ ⚪ ${prefix}DEEPSEEK
│ ⚪ ${prefix}BLACKBOX
│ ⚪ ${prefix}DALLE
│ ⚪ ${prefix}ANIMEEAI
│ ⚪ ${prefix}GRAMMAR
│ ⚪ ${prefix}SUMMARIZE
│ ⚪ ${prefix}REPHRASE
│ ⚪ ${prefix}AITRANSLATE
│ ⚪ ${prefix}ROAST
│ ⚪ ${prefix}MATHAI
│
├───────────────────
│ TOTAL COMMANDS LIST : 18
╰───────────────────╯

┌─ム FUN COMMAND LIST
│
│ ⚪ ${prefix}ALERT
│ ⚪ ${prefix}CAUTION
│ ⚪ ${prefix}DRAKE
│ ⚪ ${prefix}POOH
│ ⚪ ${prefix}HAPPYLOOP
│ ⚪ ${prefix}HEART
│ ⚪ ${prefix}ANGRYLOOP
│ ⚪ ${prefix}SAD
│ ⚪ ${prefix}SHY
│ ⚪ ${prefix}MOON
│ ⚪ ${prefix}CONFUSEDLOOP
│ ⚪ ${prefix}HOT
│ ⚪ ${prefix}COMPATIBILITY
│ ⚪ ${prefix}AURA
│ ⚪ ${prefix}ROAST
│ ⚪ ${prefix}COMPLIMENT
│ ⚪ ${prefix}LOVETEST
│ ⚪ ${prefix}SHIP
│
├───────────────────
│ TOTAL COMMANDS LIST : 18
╰───────────────────╯

┌─ム PRIVACY COMMAND LIST
│
├───────────────────
│ TOTAL COMMANDS LIST : 0
╰───────────────────╯

┌─ム SETTINGS COMMAND LIST
│
│ ⚪ ${prefix}AUTOBIO
│ ⚪ ${prefix}AUTORECORD
│ ⚪ ${prefix}ANTISTATUS
│ ⚪ ${prefix}WELCOME
│ ⚪ ${prefix}SETWELCOME
│ ⚪ ${prefix}GOODBYE
│ ⚪ ${prefix}SETGOODBYE
│ ⚪ ${prefix}ANTIPROMOTE
│ ⚪ ${prefix}ANTIDEMOTE
│ ⚪ ${prefix}ADMINEVENTS
│ ⚪ ${prefix}ANTIFOREIGN
│ ⚪ ${prefix}ANTIFOREIGNNUMBER
│ ⚪ ${prefix}ALWAYSONLINE
│ ⚪ ${prefix}ANTIBAD
│ ⚪ ${prefix}ANTIBADACTION
│ ⚪ ${prefix}AUTOREPLY
│ ⚪ ${prefix}MENTIONREPLY
│ ⚪ ${prefix}AUTOSTICKER
│
├───────────────────
│ TOTAL COMMANDS LIST : 18
╰───────────────────╯

> 「 POWERED BY RAHUL-MASTER 」
`.trim();

        try {
            if (global.menuImage) {
                const imageBuffer = (await axios.get(global.menuImage, {
                    responseType: 'arraybuffer'
                })).data;

                await m.reply(imageBuffer, { caption: menuText });
            } else {
                await m.reply(menuText);
            }
        } catch (err) {
            console.error('Menu Error:', err);
            await m.reply(menuText);
        }
    }
};
