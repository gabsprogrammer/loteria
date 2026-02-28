const { create, Client } = require('@open-wa/wa-automate')
const msgHandler = require('./msgHandler')
const HandleMsg2 = require('./HandleMsg2')
const { color, messageLog } = require('./utils')
const bent = require('bent')
const figlet = require('figlet')
const fs = require('fs-extra')
const adminNumber = JSON.parse(fs.readFileSync('./lib/admin.json'))
const setting = JSON.parse(fs.readFileSync('./lib/setting.json'))
const isWhite = (chatId) => adminNumber.includes(chatId) ? true : false

let { 
    limitCount,
    memberLimit, 
    groupLimit,
    mtc: mtcState,
    banChats,
    restartState: isRestart
    } = setting

const headless = true

require('./HandleMsg2.js')
nocache('./HandleMsg2.js', module => console.log(`'${module}' Updated! on ${new Date()}`))

        const startServer = (client = new Client()) => {
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('LOTERIA BOT', { font: 'Ghost', horizontalLayout: 'default' })))
    console.log(color(figlet.textSync('----------------', { horizontalLayout: 'default' })))
    //console.log(color('[DEV]'), color('clientZ', 'yellow'))
    //console.log(color('[~>>]'), color('BOT Started!', 'green'))
    global.sclient = client
    //
    client.onStateChanged((state) => {
        console.log(color('[~>>]', 'red'), state)
        if (state === 'CONFLICT' || state === 'UNLAUNCHED') client.forceRefocus()
    })
    // Message log for analytic
 
    

        client.onMessage((message) => {
            msgHandler(client, message)
            HandleMsg2(client, message)
			
    client.getAmountOfLoadedMessages() // Cut message Cache if cache more than 3K
            .then((msg) => {
                if (msg >= 500) {
                    console.log('[CLIENT]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
    

    })

       
    client.onGlobalParicipantsChanged(async (event) => {
        
        const gChat = await client.getChatById(event.chat)
        const pChat = await client.getContact(event.who)
        let { pushname, verifiedName, formattedName } = pChat
        pushname = pushname || verifiedName || formattedName
        const { contact, groupMetadata, name } = gChat
        const host = await client.getHostNumber() + '@c.us'
        
    })
    
client.onAddedToGroup(async (chat) => {
    const groups = await client.getAllGroups()
    // kondisi ketika batas group bot telah tercapai,ubah di file settings/setting.json
    if (groups.length > groupLimit) {
    await client.sendText(chat.id, `Erro, chegou no limite, Total de Grupos: ${groupLimit}`).then(() => {
          client.leaveGroup(chat.id)
          client.deleteChat(chat.id)
      }) 
    } else {
    // kondisi ketika batas member group belum tercapai, ubah di file settings/setting.json
        if (chat.groupMetadata.participants.length < memberLimit) {
        await client.sendText(chat.id, `Erro, bot chegou no limite de grupos permitido  ${memberLimit} people`).then(() => {
          client.leaveGroup(chat.id)
          client.deleteChat(chat.id)
        })
        } else {
        await client.sendText(chat.id, `oooooi~, Sou um bot de Loteria.`)
        }
    }
    })
       /*client.onGlobalParicipantsChanged((async (heuh) => {
            await welcome(client, heuh) 
            left(client, heuh)
            }))*/
 // listening on Incoming Call

    
    
         
    client.onMessage(async (message) => {
        client.getAmountOfLoadedMessages() // menghapus pesan cache jika sudah 3000 pesan.
            .then((msg) => {
                if (msg >= 600) {
                    console.log('[icarus]', color(`Loaded Message Reach ${msg}, cuting message cache...`, 'yellow'))
                    client.cutMsgCache()
                }
            })
        require('./HandleMsg2.js')(client, message)
    })
   } 


function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'is now being watched for changes')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}
     const options = {
        sessionId: 'session',
        headless: headless,
        qrTimeout: 0,
        blockAssets: true,
        authTimeout: 0,
        blockCrashLogs: true,
        disableSpins: true,
        restartOnCrash: startServer,
        cacheEnabled: false,
        useChrome: true,
        killProcessOnBrowserClose: true,
        throwErrorOnTosBlock: false,
        chromiumArgs: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    }
    if (!headless) options['defaultViewport'] = null
//create session
create(options)
    .then((client) => startServer(client))
    .catch((err) => new Error(err))

