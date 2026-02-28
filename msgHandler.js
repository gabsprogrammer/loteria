const { decryptMedia } = require('@open-wa/wa-decrypt')
const { createClient } = require('pexels')
const fs = require('fs-extra')
const axios = require('axios')
const moment = require('moment-timezone')
const get = require('got')
const { RemoveBgResult, removeBackgroundFromImageBase64, removeBackgroundFromImageFile } = require('remove.bg') //paid
const color = require('./lib/color')
const { liriklagu, quotemaker, wall } = require('./lib/functions')
const akaneko = require('akaneko');
const { exec } = require('child_process')
const fetch = require('node-fetch');
const msgFilter = require('./lib/msgFilter')
const bent = require('bent')
const malScraper = require('mal-scraper')
const request = require('request');
const nsfwgrp = JSON.parse(fs.readFileSync('./lib/nsfw.json')) 
const ban = JSON.parse(fs.readFileSync('./lib/banned.json'))
const errorurl = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const errorurl2 = 'https://steamuserimages-a.akamaihd.net/ugc/954087817129084207/5B7E46EE484181A676C02DFCAD48ECB1C74BC423/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'
const feature = require('./lib/poll');


let download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);

    request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
  });
};
const { watchFile } = require("fs-extra");
var songLine = 0



function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = msgHandler = async (client, message) => {
    try {
        const { type, id, from, t, sender, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, mentionedJidList, author, quotedMsgObj } = message
        let { body } = message
        const { name } = chat
        let { pushname, verifiedName } = sender
        const prefix = ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : ((type === 'image' && caption || type === 'video' && caption) && caption.startsWith(prefix)) ? caption : ''
        const komando = message.body || message.caption || ''
        const command = body.slice(prefix.length).trim().split(/ +/).shift().toLowerCase()
        const args = body.slice(prefix.length).trim().split(/ +/).slice(1)
        const isCmd = body.startsWith(prefix)

        const time = moment(t * 1000).format('DD/MM HH:mm:ss')

        

                  //console.log(content)

client.onMessage(async message => {
    if (message.body === '1') {
	  await client.reply(from, `*Lotérica Caçula.*\nOlá, Seja Bem-Vindo(a) *${pushname}*.\nNotei aqui que você selecionou o comando *[1]*\n*1.* _Para ver os resultados atuais de algum jogo apenas digite o comando._\n*2.* _Jogos Disponíveis:_\n!megasena\n!quina\n!lotofacil\n!lotomania\n!duplasena\n!timemania\n!diadesorte\n!lotogol\n\n*3.* _Caso queira pesquisar algum concurso em específico:_\nApenas digite o comando com o numero do concurso ao lado, por exemplo: *!megasena 2000*.`, id)
    }
  });
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM!]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        if (!isCmd && !isGroupMsg) return 0//console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname))
        if (!isCmd && isGroupMsg) return console.log('[RECV]', color(time, 'yellow'), 'Message from', color(pushname), 'in', color(name))
        if (isCmd && !isGroupMsg) return 0;//console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && isGroupMsg) console.log(color('[EXEC]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name))
        const botNumber = await client.getHostNumber()
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber + '@c.us') : false
        const isBanned = ban.includes(chatId)
        const owner = '558188263143@c.us' // eg 9190xxxxxxxx
        const isowner = owner+'558188263143@c.us' == sender.id 
const serial = sender.id
        msgFilter.addFilter(from)
   client.onMessage(async message => {
    if (message.body === '1') {
	  await client.reply(from, `*Lotérica Caçula.*\nOlá, Seja Bem-Vindo(a) *${pushname}*.\nNotei aqui que você selecionou o comando *[1]*\n*1.* _Para ver os resultados atuais de algum jogo apenas digite o comando._\n*2.* _Jogos Disponíveis:_\n!megasena\n!quina\n!lotofacil\n!lotomania\n!duplasena\n!timemania\n!diadesorte\n!lotogol\n\n*3.* _Caso queira pesquisar algum concurso em específico:_\nApenas digite o comando com o numero do concurso ao lado, por exemplo: *!megasena 2000*.`, id)
    }
  });
        global.pollfile = 'poll_Config_'+chat.id+'.json'
        global.voterslistfile = 'poll_voters_Config_'+chat.id+'.json'
        const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
        const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)
        if (!isBanned) {
            switch (command) {
          
      
             case 'regra':
        case 'regras':
            if (!isGroupMsg) return client.reply(from, '.', message.id) 
            var totalMem = chat.groupMetadata.participants.length
            var desc = chat.groupMetadata.desc
            var ngrp = nsfwgrp.includes(chat.id)
            var grouppic = await client.getProfilePicFromServer(chat.id)
            if (grouppic == undefined) {
                 var pfp = errorurl
            } else {
                 var pfp = grouppic 
            }
            await client.sendFileFromUrl(from, pfp, 'group.png', `** 
🌐️ *Membros: ${totalMem}*
📃️ *Descrição do grupo* 
${desc}`)
        break
       
         case 'oie':
            client.sendTextWithMentions(from, `@${message.author} Olá, como posso ajudar?`);
            break
        
      }
    }
    } catch (err) {
        console.log(color('[ERROR]', 'red'), err)
    }
}
        