require('./config');
const pino = require('pino');
const fs = require('fs');
const path = require('path');
const http = require('http');
const QRCode = require('qrcode');
const { Boom } = require('@hapi/boom');
const { sendButtons, sendInteractiveMessage } = require('gifted-btns');

// --- LIB FOLDER IMPORTS ---
// Jar lib folder madhun kahi functions import karaychi astil tar ithe karu shakto
const lib = require('./lib'); 
const { getSession } = require('./lib/fetchSession.js');

const { default: makeWASocket, useMultiFileAuthState, DisconnectReason, downloadMediaMessage, generateWAMessageContent, generateWAMessageFromContent, generateMessageID, prepareWAMessageMedia, fetchLatestWaWebVersion, proto, generateProfilePicture, Browsers } = require('@whiskeysockets/baileys');
const serializeMessage = require('./handler.js');
const JimpImport = require('jimp');

const Jimp =
  JimpImport.read
    ? JimpImport
    : JimpImport.Jimp
    ? JimpImport.Jimp
    : JimpImport.default;

global.generateWAMessageContent = generateWAMessageContent;
global.generateWAMessageFromContent = generateWAMessageFromContent;
global.generateMessageID = generateMessageID;
global.prepareWAMessageMedia = prepareWAMessageMedia;
global.proto = proto;
global.Jimp = Jimp;
global.generateProfilePicture = generateProfilePicture;
global.downloadMediaMessage = downloadMediaMessage;
global.bannedChats = global.bannedChats || [];

// --- SESSION FOLDER HANDLING ---
async function ensureSession() {
    const credsPath = path.join(__dirname, 'session', 'creds.json');

    if (fs.existsSync(credsPath)) {
        console.log('[session] creds.json already exists, skipping fetch');
        return;
    }
    if (!global.sessionid) {
        console.log('[session] no SESSIONID set, will use QR/pairing');
        return;
    }

    console.log('[session] fetching session from API...');
    const raw = await getSession(global.sessionid);
    if (!raw) throw new Error('getSession returned empty');

    const sessionData = typeof raw === 'string' ? JSON.parse(raw) : raw;

    if (!sessionData || typeof sessionData !== 'object' || !sessionData.noiseKey) {
        throw new Error('Fetched session is not a valid Baileys creds object');
    }

    fs.mkdirSync(path.dirname(credsPath), { recursive: true });
    fs.writeFileSync(credsPath, JSON.stringify(sessionData, null, 2));
    console.log('[session] creds.json written');
}

const AUTH_FOLDER = './session';
const PLUGIN_FOLDER = './plugins';
const PORT = process.env.PORT || 8000;

let latestQR = '';
let botStatus = 'disconnected';
let pairingCodes = new Map();
let presenceInterval = null;
let isConnecting = false;

async function loadPrefix() {
    const configPath = path.join(__dirname, 'config.json');
    if (fs.existsSync(configPath)) {
        try {
            const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
            if (config.prefix) {
                global.BOT_PREFIX = config.prefix;
                console.log(`Loaded prefix: ${global.BOT_PREFIX}`);
            }
        } catch (err) {
            console.error('Error loading config:', err);
        }
    }

    try {
        await ensureSession();
    } catch (err) {
        console.error('[session] failed:', err.message);
    }

    await startBot();
}

async function startBot() {
    console.log('Starting WhatsApp Bot...');
    isConnecting = true;

    if (!fs.existsSync(AUTH_FOLDER)) {
        fs.mkdirSync(AUTH_FOLDER, { recursive: true });
    }

    const credsPath = path.join(AUTH_FOLDER, 'creds.json');
    if (fs.existsSync(credsPath)) {
        try {
            const creds = JSON.parse(fs.readFileSync(credsPath, 'utf8'));
            if (creds.noiseKey && creds.noiseKey.private) {
                console.log('Using existing session from session folder...');
            } else {
                console.log('Invalid session detected...');
            }
        } catch (err) {
            console.log('Corrupted session...');
        }
    }

    try {
        const { version, isLatest } = await fetchLatestWaWebVersion();
        console.log(`Using WA v${version.join(".")}, isLatest: ${isLatest}`);

        // Session folder vaprun auth state loadat ahe
        const { state, saveCreds } = await useMultiFileAuthState(AUTH_FOLDER);
            
        const sock = makeWASocket({
            version, 
            logger: pino({ level: 'silent' }),
            auth: state,
            keepAliveIntervalMs: 10000,
            markOnlineOnConnect: true,
            syncFullHistory: false,
            browser: Browsers.ubuntu('Chrome'),
            connectTimeoutMs: 60000
        });
            
        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                QRCode.toDataURL(qr, (err, url) => {
                    if (!err) {
                        latestQR = url;
                    }
                });
            }

            if (connection === 'close') {
                botStatus = 'disconnected';
                isConnecting = false;

                if (presenceInterval) {
                    clearInterval(presenceInterval);
                    presenceInterval = null;
                }

                const statusCode = (lastDisconnect?.error instanceof Boom)
                    ? lastDisconnect.error.output.statusCode
                    : 0;

                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;

                if (shouldReconnect) {
                    setTimeout(async () => await startBot(), 3000);
                } else {
                    if (fs.existsSync(AUTH_FOLDER)) {
                        fs.rmSync(AUTH_FOLDER, { recursive: true, force: true });
                    }
                    setTimeout(async () => await startBot(), 3000);
                }
            } else if (connection === 'open') {
                botStatus = 'connected';
                isConnecting = false;

                if (!global.owners) global.owners = [];
                
                if (!global.owners.includes(sock.user.id)) {
                    global.owners.push(sock.user.id);
                }

                try {
                    await sock.sendMessage(sock.user.id, {
                        text: `Bot linked successfully!\nCurrent prefix: ${global.BOT_PREFIX || '.'}\nConnected at: ${new Date().toLocaleString()}`
                    });
                } catch (err) {}
                
            } else if (connection === 'connecting') {
                botStatus = 'connecting';
                isConnecting = true;
            }
        });
        
        sock.ev.on('creds.update', async () => {
            await saveCreds();
            console.log('Credentials updated');
        });

        // --- PLUGINS FOLDER AUTO-LOADER ---
        const plugins = new Map();
        const pluginPath = path.join(__dirname, PLUGIN_FOLDER);
            
        if (fs.existsSync(pluginPath)) {
            try {
                const pluginFiles = fs.readdirSync(pluginPath).filter(file => file.endsWith('.js'));
                    
                for (const file of pluginFiles) {
                    try {
                        const plugin = require(path.join(pluginPath, file));
                        if (plugin.name && typeof plugin.execute === 'function') {
                            plugins.set(plugin.name.toLowerCase(), plugin);
                            if (Array.isArray(plugin.aliases)) {
                                plugin.aliases.forEach(alias => {
                                    plugins.set(alias.toLowerCase(), plugin);
                                });
                            }
                            console.log(`Loaded plugin: ${plugin.name}`);
                        } else {
                            console.warn(`Invalid plugin structure in ${file}`);
                        }
                    } catch (error) {
                        console.error(`Failed to load plugin ${file}:`, error.message);
                    }
                }
                console.log(`Total plugins loaded: ${plugins.size}`);
            } catch (error) {
                console.error('Error loading plugins:', error);
            }
        } else {
            console.log('No plugins folder found');
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
                    } catch (err) { 
                        console.error(`onMessage error (${plugin.name}):`, err); 
                    }
                }
            }

            const prefix = global.BOT_PREFIX || '.';
            if (m.body && m.body.startsWith(prefix)) {
                const args = m.body.slice(prefix.length).trim().split(/\s+/);
                const commandName = args.shift().toLowerCase();
                const plugin = plugins.get(commandName);
        
                if (plugin) {
                    try { 
                        await plugin.execute(sock, m, args); 
                    } catch (err) { 
                        console.error(`Plugin error (${commandName}):`, err); 
                        await m.reply('Error running command.'); 
                    }
                }
            }
        });

    } catch (error) {
        console.error('Bot startup error:', error);
        isConnecting = false;
        setTimeout(async () => await startBot(), 10000);
    }
}

// HTTP Server setup sathi
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h1>RAHUL-AI Bot is Running</h1>');
});

server.listen(PORT, async () => {
    console.log(`Web server running at http://localhost:${PORT}`);
    console.log(`Session folder: ${path.resolve(AUTH_FOLDER)}`);
    console.log(`Plugins folder: ${path.resolve(PLUGIN_FOLDER)}`);
    console.log(`Lib folder: ${path.resolve('./lib')} (Loaded)`);
    await loadPrefix();
});
