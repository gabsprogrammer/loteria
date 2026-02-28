require('dotenv').config()
const { decryptMedia } = require('@open-wa/wa-automate')
const moment = require('moment-timezone')
moment.tz.setDefault('America/Brazil').locale('pt')
const axios = require('axios')
const request = require('request')
const fetch = require('node-fetch')
const ffmpeg = require('fluent-ffmpeg')
const imageToBase64 = require('image-to-base64')
const path = require('path')
const os = require('os')
const google = require('google-it')
const speed = require('performance-now')
const bent = require('bent')
const get = require('got')
const captureWebsite = require('capture-website')
const malScraper = require('mal-scraper')

const {
	exec,
	spawn
} = require('child_process')

const { 
    msgFilter, 
    color, 
    processTime, 
    isUrl,
	clamp,
	clampFloat,
	distordFX,
	resizeImage
} = require('./utils')
const { addFilter, isFiltered } = require('./lib/msgFilter')
const fs = require('fs-extra')
const getstr = (string, start, end, i = 0) => {
    i++;
    try {
        var str = string.split(start);
        var str = str[i].split(end);
        return str[0];
    } catch (ex) {
        return '';
    }
}
const setting = JSON.parse(fs.readFileSync('./settings/setting.json'))
let { 
    ownerNumber,
    limitCount,
    groupLimit, 
    memberLimit
} = setting


function formatin(duit){
    let reverse = duit.toString().split('').reverse().join('');
    let ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
}

const inArray = (needle, haystack) => {
    let length = haystack.length;
    for(let i = 0; i < length; i++) {
        if(haystack[i].id == needle) return i;
    }
    return false;
}

const { sizeFormatter } = require('human-readable')
const format = sizeFormatter({
    std: 'JEDEC', // 'SI' (default) | 'IEC' | 'JEDEC'
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

/**
 * Monospace format
 * @param {String} string input
 */
function monospace(string) {
    let _3 = ''.repeat(3)
    return _3 + string + _3
}

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}

module.exports = HandleMsg2 = async (client, message) => {
    try {
        let { type, id, from, t, sender, to, author, isGroupMsg, chat, chatId, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
        let { body } = message
        var { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName // verifiedName is the name of someone who uses a business account
        const botNumber = await client.getHostNumber() + '@c.us'
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await client.getGroupAdmins(groupId) : ''
        const isGroupAdmins = groupAdmins.includes(sender.id) || false
        const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
        let prefix = /^[°•π÷×¶∆£¢€¥®™✓_=|~!?@#$%^&.\/\\©^]/
        // Bot Prefix
        let chats = message.body || message.caption || ''
        chats = chats.toLowerCase()
        body = (type === 'chat' && prefix.test(body)) ? body : ((type === 'image' && caption || type === 'video' && caption) && prefix.test(caption)) ? caption : ''
        const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
        const arg = body.trim().substring(body.indexOf(' ') + 1)
        const args = body.trim().split(/ +/).slice(1)
        
        const isCmd = prefix.test(body)
        const uaOverride = process.env.UserAgent
        const url = args.length !== 0 ? args[0] : ''
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedFile = quotedMsg && quotedMsg.type === 'document'
        const isQuotedSticker = quotedMsg && quotedMsg.type == 'sticker'
        const isQuotedAudio = quotedMsg && (quotedMsg.type === 'audio' || quotedMsg.type === 'ptt' || quotedMsg.type === 'ppt')
		
        // [IDENTIFY]
        const isOwnerBot = ownerNumber.includes(sender.id)
client.onMessage(async message => {
    if (message.body === '1') {
	  await client.reply(from, `*Lotérica Caçula.*\nOlá, Seja Bem-Vindo(a) *${pushname}*.\nNotei aqui que você selecionou o comando *[1]*\n*1.* _Para ver os resultados atuais de algum jogo apenas digite o comando._\n*2.* _Jogos Disponíveis:_\n!megasena\n!quina\n!lotofacil\n!lotomania\n!duplasena\n!timemania\n!diadesorte\n!lotogol\n\n*3.* _Caso queira pesquisar algum concurso em específico:_\nApenas digite o comando com o numero do concurso ao lado, por exemplo: *!megasena 2000*.`, id)
    }
  });
		prefix = '?'
        switch (command) {
        // Menu and TnC
       case 'megasena':
        var number1 = Math.floor(Math.random() * 5) + 1
		var number2 = Math.floor(Math.random() * 9) + 1
		var number3 = Math.floor(Math.random() * 5) + 1
		var number4 = Math.floor(Math.random() * 9) + 1
		var number5 = Math.floor(Math.random() * 5) + 1
		var number6 = Math.floor(Math.random() * 9) + 1
		var number7 = Math.floor(Math.random() * 5) + 1
		var number8 = Math.floor(Math.random() * 9) + 1
		var number9 = Math.floor(Math.random() * 5) + 1
		var number10 = Math.floor(Math.random() * 9) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}${number2}, ${number3}${number4}, ${number5}${number6}, ${number7}${number8}, ${number9}${number10}, ${number4}${number3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
break
case 'quina':
var lott = ['9 - 22 - 41 - 46 - 48','30 - 31 - 47 - 52 - 69','1 - 5 - 8 - 50 - 72','32 - 36 - 37 - 70 - 77','29 - 45 - 51 - 57 - 76','1 - 9 - 20 - 34 - 37','26 - 31 - 52 - 77 - 79','7 - 32 - 50 - 64 - 69','29 - 36 - 76 - 77 - 80','31 - 41 - 51 - 54 - 68','18 - 22 - 24 - 45 - 49','13 - 23 - 28 - 45 - 74','15 - 24 - 48 - 55 - 75','4 - 6 - 17 - 18 - 43','10 - 31 - 39 - 48 - 60','2 - 9 - 20 - 25 - 47','14 - 19 - 30 - 65 - 78','4 - 25 - 28 - 59 - 62','2 - 28 - 51 - 52 - 65','6 - 26 - 28 - 45 - 52','13 - 21 - 23 - 43 - 48']
var lottt = lott[Math.floor(Math.random() * lott.length)]
var arg1001 = body.trim().split(' ')
		var mega1 = arg1001[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=quina&token=BpskgZFRd192wTw&concurso=${mega1}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt}.
\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/dad7wM8.jpeg', 'quina.jpg', resText, id)
})
break
case 'lotofacil':
 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})
break
case 'lotomania':
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
break
case 'duplasena':
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
break
case 'timemania':
      const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
break
case 'diadesorte':
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
break
case 'lotogol':
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
break
case 'loteca':
var arg1008 = body.trim().split(' ')
		var mega8 = arg1008[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=loteca&token=BpskgZFRd192wTw&concurso=${mega8}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Dp4NZCk.jpeg', 'loteca.jpg', resText, id)
})
break
case 'federal':
var arg10010 = body.trim().split(' ')
		var mega10 = arg10010[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=federal&token=BpskgZFRd192wTw&concurso=${mega10}`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Bilhete:_ ${res.data.premiacao[i].bilhete}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Faixa:_ ${res.data.premiacao[i].faixa}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Premiação:* ${textpremiacao}\n\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/CVkiZNP.jpeg', 'federal.jpg', resText, id)
})
break
        case 'speed':
        case 'ping':
            await client.sendText(from, `Velocidade do *LoteriaBot:* ${processTime(t, moment())} _Segundos_`)
            break
        case 'tnc':
            await client.sendText(from, menuId.textTnC())
            break
   
             case 'ajuda':
         case 'comando':
        case 'comandos':
        case 'help':
		case 'cmd':
		case 'menu':
		axios.get(`https://coronavirus-19-api.herokuapp.com/countries/brazil`)
			.then(async (res) => {
				const { country, cases, todayCases, deaths, todayDeaths, active } = res.data

			
				await client.sendText(from, `_Para visualizar novamente, digite_ *menu*.
*Nome:* ${pushname}\n*Tempo:*\n${moment().format(' *𝗗𝗶𝗮:* DD/MM/YY ')}

         ╭━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╮
                  *Lotérica* *Caçula*
         ╰━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╯
          
       🌎 *Informações Covid* 🌎
        *-País:* ${country}
        *-Casos Totais:* ${cases}
        *-Mortes:* ${deaths}

*╭─̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇───̇──̇*
〲┴┬│•͙┄ Digite *[1]* Apostar
〲┴┬│•͙┄ Digite *[2]* Resultados
〲┴┬│•͙┄ Digite *[3]* Contato
〲┴┬│•͙┄ Digite *[4]* Cartão de Visita
*╰──̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇────*
`)
				})
			break
     case 'botstatus':if (!isGroupMsg) return client.reply(from, 'Desculpe, este comando só pode ser usado dentro do grupo!', id)
           {
            const loadedMsg = await client.getAmountOfLoadedMessages()
            const chatIds = await client.getAllChatIds()
            const groups = await client.getAllGroups()
            const me = await client.getMe()
            const battery = await client.getBatteryLevel()
            const isCharging = await client.getIsPlugged()
            const used = process.memoryUsage()
            client.sendText(from, `💬 *Status* :
*${loadedMsg}* Mensagens Carregadas
*${groups.length}* Grupo Chats
*${chatIds.length - groups.length}* Chats pessoais
*${chatIds.length}* Total Chats\n
📱 *Info do telefone* :
${monospace(`
Bateria : ${battery}% ${isCharging ? '🔌 Carregando...' : '⚡ Descarregando'}
${Object.keys(me.phone).map(key => `${key} : ${me.phone[key]}`).join('\n')}
`.slice(1, -1))}
\n💻 *${'Server Memoria Usada'}* :
${monospace(
                Object.keys(used).map(key => `${key} : ${format(used[key])}`).join('\n')
            )}\n\n💻 *Memoria Uso:* \nRAM: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024) + 8000}MB\nCPU: ${os.cpus().length + 6} core`)
            break
        }
                                     case 'sortearnumero':
         if (!isGroupMsg) return client.reply(from, 'Desculpe, este comando só pode ser usado dentro do grupo!', id) 
  const number = Math.floor(Math.random() * 1000) + 1
            await client.reply(from, `${number}`, id)
            break
          
        case 'tagall':
        case 'everyone':
        case 'mencionar':
        if (!isPremium) return client.reply(from, 'Desculpe, este comando é apenas para usuários premium', id)
            if (!isGroupMsg) return client.reply(from, 'Desculpe, este comando só pode ser usado dentro do grupo!', id)
            const groupMem = await client.getGroupMembers(groupId)
            let hehex = '╔══✪〘 Mencionando todos 〙✪══\n'
            for (let i = 0; i < groupMem.length; i++) {
                hehex += '╠➥'
                hehex += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
            }
            hehex += '╚═〘 *L O T E R I A   B O T* 〙'
            await client.sendTextWithMentions(from, hehex)
            break
        case 'bc': //untuk broadcast atau promosi
            if (!isOwnerBot) return client.reply(from, 'Este comando é apenas para o bot do proprietário!', id)
            if (args.length == 0) return client.reply(from, `Para transmitir para todos os chats, digite:\n${prefix}bc [oi]`)
            let msg = body.slice(4)
            const chatz = await client.getAllChatIds()
            for (let idk of chatz) {
                var cvk = await client.getChatById(idk)
                if (!cvk.isReadOnly) client.sendText(idk, `${msg}`)
                if (cvk.isReadOnly) client.sendText(idk, `${msg}`)
            }
            client.reply(from, 'Broadcast Sucesso!', id)
            break
 	}
	if (message.body === '1') {
	  await client.sendFileFromUrl(from, 'https://i.imgur.com/DDT1spx.jpg', 'fotoprincipal.jpg', `*Lotérica Caçula.*\nOlá, Seja Bem-Vindo(a) *${pushname}*.\n\n_Envie-nos uma mensagem agora mesmo para jogar no Bolão!_\n\nAcesse o link direto para nosso whatsapp: bit.ly/39iR2Ja\n\nTelefones:\n(16)3721-4090\n(16)99984-1000`, id)
    }
    if (message.body === '2') {
	  await client.sendFileFromUrl(from, 'https://i.imgur.com/DDT1spx.jpg', 'fotoprincipal.jpg', `*Lotérica Caçula.*\nOlá, Seja Bem-Vindo(a) *${pushname}*.\n\n*1.* _Para ver os resultados atuais de algum jogo apenas digite o comando abaixo._\n*2.* _Jogos Disponíveis:_\n\nMega sena\nQuina\nLotofacil\nLotomania\nDupla sena\nTimemania\nDia de sorte\nLoteca\nLotogol\nFederal\n\n*3.* _Caso queira pesquisar algum concurso em específico:_\nApenas digite o comando com o numero do concurso ao lado, por exemplo:\n*?megasena 2000*\n\n*Nota ->* Ao utilizar o comando para consultar um concurso específico, sempre use a  interrogação na frente e tudo junto. +1 exemplo = ?diadesorte 300.\n\n*4.* _Ao solicitar qualquer comando acima de algum jogo, é gerado um numero da sorte._`, id)
    }
    if (message.body === '3') {
	  await client.sendFileFromUrl(from, 'https://i.imgur.com/DDT1spx.jpg', 'fotoprincipal.jpg', `*Lotérica Caçula.*\nOlá, Seja Bem-Vindo(a) *${pushname}.*\n\n*1.* *Atendimento:*\nDe segunda à sábado.\n*2.* *Horario de Atendimento:*\nSegunda à Sexta-feira -> das 8H às 20H\n\nSábado ->  das 8H às 19H`, id)
    }
     if (message.body === '4') {
const apk = 'C:/Users/opc/Desktop/loteria/loteria.pdf'
			await client.sendFile(from, apk, '', 'lotericaCacula.pdf', id)
    }
     if (message.body === 'mega') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
  if (message.body === 'Mega') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
    if (message.body === 'megasena') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
  if (message.body === 'mega sena') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
   if (message.body === 'Mega sena') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
 if (message.body === 'MEGA') {
          var number1 = Math.floor(Math.random() * 58) + 1
        var number2 = Math.floor(Math.random() * 52) + 1
        var number3 = Math.floor(Math.random() * 59) + 1
        var number4 = Math.floor(Math.random() * 54) + 1
        var number5 = Math.floor(Math.random() * 56) + 1
        var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
        var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
    method: 'get',
})
.then(res => {
    let dezenas = ''
    for (let i = 0; i < res.data.dezenas.length; i++) {
        dezenas += `${res.data.dezenas[i]} `
    }
    let textpremiacao = ''
    for (let i = 0; i < res.data.premiacao.length; i++) {
        textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
    }
    const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
    client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
   if (message.body === 'Mega Sena') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
   if (message.body === 'MEGASENA') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
   if (message.body === 'MEGA SENA') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
if (message.body === 'quina') {
var lott = ['9 - 22 - 41 - 46 - 48','30 - 31 - 47 - 52 - 69','1 - 5 - 8 - 50 - 72','32 - 36 - 37 - 70 - 77','29 - 45 - 51 - 57 - 76','1 - 9 - 20 - 34 - 37','26 - 31 - 52 - 77 - 79','7 - 32 - 50 - 64 - 69','29 - 36 - 76 - 77 - 80','31 - 41 - 51 - 54 - 68','18 - 22 - 24 - 45 - 49','13 - 23 - 28 - 45 - 74','15 - 24 - 48 - 55 - 75','4 - 6 - 17 - 18 - 43','10 - 31 - 39 - 48 - 60','2 - 9 - 20 - 25 - 47','14 - 19 - 30 - 65 - 78','4 - 25 - 28 - 59 - 62','2 - 28 - 51 - 52 - 65','6 - 26 - 28 - 45 - 52','13 - 21 - 23 - 43 - 48']
var lottt = lott[Math.floor(Math.random() * lott.length)]
var arg1001 = body.trim().split(' ')
		var mega1 = arg1001[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=quina&token=BpskgZFRd192wTw&concurso=${mega1}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt}.
\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/dad7wM8.jpeg', 'quina.jpg', resText, id)
})

   }
   if (message.body === 'QUINA') {
var lott = ['9 - 22 - 41 - 46 - 48','30 - 31 - 47 - 52 - 69','1 - 5 - 8 - 50 - 72','32 - 36 - 37 - 70 - 77','29 - 45 - 51 - 57 - 76','1 - 9 - 20 - 34 - 37','26 - 31 - 52 - 77 - 79','7 - 32 - 50 - 64 - 69','29 - 36 - 76 - 77 - 80','31 - 41 - 51 - 54 - 68','18 - 22 - 24 - 45 - 49','13 - 23 - 28 - 45 - 74','15 - 24 - 48 - 55 - 75','4 - 6 - 17 - 18 - 43','10 - 31 - 39 - 48 - 60','2 - 9 - 20 - 25 - 47','14 - 19 - 30 - 65 - 78','4 - 25 - 28 - 59 - 62','2 - 28 - 51 - 52 - 65','6 - 26 - 28 - 45 - 52','13 - 21 - 23 - 43 - 48']
var lottt = lott[Math.floor(Math.random() * lott.length)]
var arg1001 = body.trim().split(' ')
		var mega1 = arg1001[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=quina&token=BpskgZFRd192wTw&concurso=${mega1}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt}.
\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/dad7wM8.jpeg', 'quina.jpg', resText, id)
})

   }
if (message.body === 'lotofacil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'loto facil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
if (message.body === 'Lotofácil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
        var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
    method: 'get',
})
.then(res => {
    let dezenas = ''
    for (let i = 0; i < res.data.dezenas.length; i++) {
        dezenas += `${res.data.dezenas[i]} `
    }
    let textpremiacao = ''
    for (let i = 0; i < res.data.premiacao.length; i++) {
        textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
    }
    const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
    client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
  if (message.body === 'LotoFacil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
 if (message.body === 'Loto facil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'Loto Facil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'loto fácil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'lotofácil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'Loto fácil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'Loto Fácil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'LOTO FÁCIL') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'LOTOFÁCIL') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'FÁCIL') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
  if (message.body === 'loto') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'Loto') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
   if (message.body === 'LOTO') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
if (message.body === 'lotomania') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
 if (message.body === 'loto mania') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
  if (message.body === 'Loto mania') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'Loto Mania') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'LOTOMANIA') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'LOTO MANIA') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
if (message.body === 'duplasena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'dupla Sena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
        var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
    method: 'get',
})
.then(res => {
    let dezenas = ''
    for (let i = 0; i < res.data.dezenas.length; i++) {
        dezenas += `${res.data.dezenas[i]} `
    }
        let dezenas_2 = ''
    for (let i = 0; i < res.data.dezenas_2.length; i++) {
        dezenas_2 += `${res.data.dezenas_2[i]} `
    }
    let textpremiacao_2 = ''
    for (let i = 0; i < res.data.premiacao_2.length; i++) {
        textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
    }
    let textpremiacao = ''
    for (let i = 0; i < res.data.premiacao.length; i++) {
        textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
    }
    const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
    client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'dupla sena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
        var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
    method: 'get',
})
.then(res => {
    let dezenas = ''
    for (let i = 0; i < res.data.dezenas.length; i++) {
        dezenas += `${res.data.dezenas[i]} `
    }
        let dezenas_2 = ''
    for (let i = 0; i < res.data.dezenas_2.length; i++) {
        dezenas_2 += `${res.data.dezenas_2[i]} `
    }
    let textpremiacao_2 = ''
    for (let i = 0; i < res.data.premiacao_2.length; i++) {
        textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
    }
    let textpremiacao = ''
    for (let i = 0; i < res.data.premiacao.length; i++) {
        textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
    }
    const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
    client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'DUPLA') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'dupla') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'Dupla') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
  if (message.body === 'DuplaSena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
    if (message.body === 'Dupla sena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
    if (message.body === 'Dupla Sena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
    if (message.body === 'DUPLA SENA') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
  if (message.body === 'DUPLASENA') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
    if (message.body === 'duplaSena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
if (message.body === 'timemania') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
 if (message.body === 'time mania') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'TimeMania') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
  if (message.body === 'Time mania') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'Time Mania') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
   if (message.body === 'TIMEMANIA') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
  if (message.body === 'TIME MANIA') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
if (message.body === 'diadesorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
 if (message.body === 'dia De sorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
    if (message.body === 'Dia De ') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
   if (message.body === 'DIA DE') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
if (message.body === 'dia de sorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
   if (message.body === 'Dia de sorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']

const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
   if (message.body === 'Dia de Sorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
   if (message.body === 'dia de') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
  if (message.body === 'dia De Sorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
 if (message.body === 'DIA DE SORTE') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
if (message.body === 'DIA') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
 if (message.body === 'dia') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
    if (message.body === 'Dia') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 20 25 31 Maio','02 03 13 14 17 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
   if (message.body === 'LOTOGOL') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
if (message.body === 'lotogol') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
   if (message.body === 'loto gol') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
   if (message.body === 'Loto gol') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
   if (message.body === 'Loto Gol') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
   if (message.body === 'LOTO GOL') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
   if (message.body === 'loteca') {
   var arg1008 = body.trim().split(' ')
		var mega8 = arg1008[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=loteca&token=BpskgZFRd192wTw&concurso=${mega8}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Dp4NZCk.jpeg', 'loteca.jpg', resText, id)
})
   }
    if (message.body === 'LOTECA') {
   var arg1008 = body.trim().split(' ')
		var mega8 = arg1008[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=loteca&token=BpskgZFRd192wTw&concurso=${mega8}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Dp4NZCk.jpeg', 'loteca.jpg', resText, id)
})
   }
   
   if (message.body === 'federal') {
var arg10010 = body.trim().split(' ')
		var mega10 = arg10010[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=federal&token=BpskgZFRd192wTw&concurso=${mega10}`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Bilhete:_ ${res.data.premiacao[i].bilhete}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Faixa:_ ${res.data.premiacao[i].faixa}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Premiação:* ${textpremiacao}\n\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/CVkiZNP.jpeg', 'federal.jpg', resText, id)
})
   }
   if (message.body === 'FEDERAL') {
var arg10010 = body.trim().split(' ')
		var mega10 = arg10010[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=federal&token=BpskgZFRd192wTw&concurso=${mega10}`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Bilhete:_ ${res.data.premiacao[i].bilhete}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Faixa:_ ${res.data.premiacao[i].faixa}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Premiação:* ${textpremiacao}\n\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/CVkiZNP.jpeg', 'federal.jpg', resText, id)
})
   }
  if (message.body === 'Megasena') {
          var number1 = Math.floor(Math.random() * 58) + 1
		var number2 = Math.floor(Math.random() * 52) + 1
		var number3 = Math.floor(Math.random() * 59) + 1
		var number4 = Math.floor(Math.random() * 54) + 1
		var number5 = Math.floor(Math.random() * 56) + 1
		var number6 = Math.floor(Math.random() * 57) + 1
var arg100 = body.trim().split(' ')
		var mega = arg100[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=${mega}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${number1}, ${number2}, ${number3}, ${number4}, ${number5}, ${number6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/32sngXQ.jpeg', 'megasena.jpg', resText, id)
})
   }
if (message.body === 'Quina') {
var lott = ['9 - 22 - 41 - 46 - 48','30 - 31 - 47 - 52 - 69','1 - 5 - 8 - 50 - 72','32 - 36 - 37 - 70 - 77','29 - 45 - 51 - 57 - 76','1 - 9 - 20 - 34 - 37','26 - 31 - 52 - 77 - 79','7 - 32 - 50 - 64 - 69','29 - 36 - 76 - 77 - 80','31 - 41 - 51 - 54 - 68','18 - 22 - 24 - 45 - 49','13 - 23 - 28 - 45 - 74','15 - 24 - 48 - 55 - 75','4 - 6 - 17 - 18 - 43','10 - 31 - 39 - 48 - 60','2 - 9 - 20 - 25 - 47','14 - 19 - 30 - 65 - 78','4 - 25 - 28 - 59 - 62','2 - 28 - 51 - 52 - 65','6 - 26 - 28 - 45 - 52','13 - 21 - 23 - 43 - 48']
var lottt = lott[Math.floor(Math.random() * lott.length)]
var arg1001 = body.trim().split(' ')
		var mega1 = arg1001[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=quina&token=BpskgZFRd192wTw&concurso=${mega1}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt}.
\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/dad7wM8.jpeg', 'quina.jpg', resText, id)
})

   }
if (message.body === 'Lotofacil') {

 const lott13 = ['02 03 05 08 09 11 12 13 14 15 17 18 21 22 23','02 03 04 05 06 09 11 12 13 14 18 19 21 23 25','02 03 04 05 07 08 10 11 13 14 15 17 19 22 25','01 02 04 06 07 09 10 13 17 18 19 20 21 23 25','01 02 04 07 10 12 14 15 16 17 18 20 21 23 25','02 03 08 09 10 11 14 16 17 18 19 20 23 24 25','01 02 04 05 07 10 11 15 16 18 21 22 23 24 25','02 04 05 08 09 12 13 14 15 16 20 21 22 23 24','01 03 04 06 09 10 11 13 17 18 19 20 22 23 24','01 02 03 06 08 09 11 12 13 15 16 18 22 24 25','01 03 05 07 08 10 12 16 17 18 19 21 22 23 25','01 02 03 05 06 10 11 12 16 18 19 20 21 22 24','02 03 04 05 09 10 11 12 13 14 17 18 19 23 24','02 05 06 07 08 09 10 13 14 18 19 20 21 24 25','02 03 04 09 10 11 12 16 17 18 19 21 22 23 25','01 03 04 07 08 09 10 12 13 15 16 19 20 24 25','01 02 04 05 06 07 08 09 10 12 15 18 19 23 24','01 02 03 04 05 07 09 12 13 14 17 18 19 20 22','02 05 07 08 09 11 12 15 16 17 18 19 20 22 23','03 04 05 06 08 09 10 11 12 14 17 20 21 24 25']
const lottt13 = lott13[Math.floor(Math.random() * lott13.length)]
var arg1002 = body.trim().split(' ')
		var mega2 = arg1002[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotofacil&token=BpskgZFRd192wTw&concurso=${mega2}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt13}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/ORkGdqh.jpeg', 'lotofacil.jpg', resText, id)
})

   }
if (message.body === 'Lotomania') {
      const lott10 = ['01 03 04 05 10 16 17 19 24 25 26 27 28 30 31 32 33 37 38 39 40 43 45 47 49 50 51 52 53 58 59 60 62 63 64 65 67 70 76 77 78 81 83 84 89 91 92 94 97 00','01 02 04 07 08 11 13 14 16 18 20 24 25 28 29 30 31 33 35 36 40 43 44 47 48 49 52 56 57 58 63 64 66 67 70 71 72 73 78 79 83 84 85 87 88 89 93 94 99 00','01 03 06 08 09 10 12 15 18 23 25 26 29 30 32 34 40 41 42 46 47 50 51 52 54 55 57 60 62 63 65 68 69 75 76 78 79 80 81 83 84 88 89 91 93 95 96 97 98 99','01 02 04 09 12 13 15 18 23 25 26 27 28 30 31 32 34 35 37 39 40 43 44 46 48 50 51 55 56 61 62 63 64 66 68 72 73 74 75 79 82 84 87 88 90 91 92 93 96 00','03 04 05 07 10 11 12 14 15 16 18 20 21 23 26 30 33 36 37 38 39 43 44 46 47 51 55 56 58 60 61 65 67 68 69 70 72 74 76 77 78 79 82 83 86 87 90 91 94 99','01 02 03 05 06 09 10 12 13 17 19 20 21 23 25 26 27 31 34 35 36 40 42 43 47 48 51 52 53 54 58 59 65 67 68 69 71 72 74 79 81 83 87 88 89 91 92 93 96 00','01 05 07 10 11 14 17 18 20 21 24 25 29 31 32 33 36 37 38 40 42 43 45 46 47 49 52 53 54 58 61 62 65 66 67 70 71 75 79 82 83 84 87 88 91 93 94 98 99 00','02 05 06 11 13 14 16 18 19 20 23 26 27 28 33 34 35 36 37 39 40 42 47 50 52 53 54 56 57 58 61 62 63 65 67 69 70 71 73 74 76 77 80 82 83 84 90 91 93 97','01 02 04 07 09 10 11 14 16 20 23 27 28 30 32 36 38 39 40 41 42 43 46 50 51 52 55 57 59 61 63 64 66 69 70 71 72 73 75 77 79 80 81 87 88 89 91 94 95 00','01 04 09 11 12 13 14 17 19 20 26 28 29 30 31 32 34 37 38 39 40 42 43 46 47 50 51 55 56 57 58 59 61 64 68 73 75 77 80 83 85 86 87 91 92 94 95 96 98 00','01 03 06 08 10 11 13 14 15 16 19 22 25 28 29 30 34 36 37 40 42 45 46 47 52 55 59 62 63 65 70 71 72 75 76 77 79 80 81 82 83 84 87 88 89 91 93 95 97 98','01 02 03 04 08 09 12 18 19 21 22 24 26 28 29 32 37 39 41 44 48 50 51 54 55 57 58 62 63 66 68 70 71 72 73 74 75 77 83 84 85 86 87 89 90 91 92 96 97 00','01 02 04 06 10 13 16 18 19 20 25 26 27 28 31 32 34 35 36 37 40 43 44 50 51 52 54 57 60 61 64 67 68 69 70 73 74 75 78 79 81 82 85 91 94 96 97 98 99 00','01 02 07 09 10 15 18 19 23 27 28 30 31 32 33 36 37 42 43 44 47 53 54 56 57 60 62 63 65 66 69 71 73 76 77 79 80 81 84 85 86 87 88 90 92 94 95 97 99 00','04 05 07 08 09 12 14 18 20 21 24 26 27 30 35 37 38 41 42 46 49 50 52 53 54 55 58 60 63 64 65 66 68 69 70 73 74 75 76 77 80 81 85 87 88 89 95 98 99 00','03 04 06 07 08 09 13 15 18 22 23 24 26 27 29 31 36 37 41 42 45 49 50 52 53 54 55 57 58 59 60 61 64 65 67 72 76 80 81 83 84 87 88 90 93 94 95 97 98 99','06 08 10 11 13 16 17 18 20 23 25 28 29 31 33 36 41 42 44 45 46 47 48 50 53 54 58 60 62 63 68 70 71 72 77 78 79 80 83 84 86 89 91 92 93 94 95 97 98 99','03 04 05 08 10 12 13 14 15 17 18 19 21 25 26 29 30 31 34 36 39 41 42 45 48 49 53 56 59 61 62 66 67 70 74 75 77 80 84 85 86 87 88 89 91 93 95 98 99 00','01 02 05 06 07 10 12 15 17 20 23 24 29 30 31 32 33 35 36 37 40 41 42 44 46 48 50 54 55 58 59 61 63 64 66 71 75 77 78 81 83 85 86 87 91 92 94 95 96 99','03 04 06 09 12 13 14 16 18 20 21 22 23 26 28 31 32 33 34 38 43 45 46 47 48 51 52 53 54 57 58 59 62 65 67 68 70 71 73 79 80 83 84 85 87 88 90 96 98 00','03 04 06 07 09 10 11 13 15 18 19 21 24 25 26 28 29 32 33 36 38 39 40 42 45 47 49 51 52 53 56 57 58 63 66 70 71 72 73 78 79 80 81 82 84 86 87 92 93 99','02 04 06 07 09 11 14 18 20 21 23 25 27 29 34 36 38 40 42 44 46 50 52 53 55 57 58 60 62 65 66 68 69 73 74 75 76 78 79 81 83 84 86 87 89 90 91 92 96 98','01 02 03 05 09 12 14 15 19 21 22 25 27 28 29 31 32 33 34 35 36 39 41 44 48 54 57 60 61 63 64 65 66 67 70 72 73 76 80 82 83 88 89 90 91 92 94 96 99 00']
const lottt10 = lott10[Math.floor(Math.random() * lott10.length)]
var arg1003 = body.trim().split(' ')
		var mega3 = arg1003[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotomania&token=BpskgZFRd192wTw&concurso=${mega3}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Premiação:* ${textpremiacao}\n*Números da Sorte☘️:*\n${lottt10}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/OljBBMM.jpeg', 'lotomania.jpg', resText, id)
})
   }
if (message.body === 'Duplasena') {
const lott2 = ['07 10 15 20 22 30','19 29 38 39 43 48','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt2 = lott2[Math.floor(Math.random() * lott2.length)]
const lott3 = ['08 14 17 24 27 28','04 06 11 23 34 41','01 02 18 30 36 42','17 23 37 41 44 46','11 16 30 35 37 47','06 11 18 28 35 40','06 12 28 31 33 36','08 11 23 34 44 49','03 14 19 21 27 41','05 09 19 20 22 42','02 06 29 32 34 37','10 23 29 30 43 46','01 08 23 26 27 49','07 14 24 28 33 36','06 08 10 27 28 40','07 15 37 41 47 50','03 12 22 24 34 42','09 13 19 26 33 35','23 26 33 34 45 49','05 07 09 11 24 35','13 21 25 27 32 48','10 12 14 23 27 29','07 10 18 27 34 37','09 10 27 31 33 47','06 12 28 32 40 44']
const lottt3 = lott3[Math.floor(Math.random() * lott3.length)]
var arg1004 = body.trim().split(' ')
		var mega4 = arg1004[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=duplasena&token=BpskgZFRd192wTw&concurso=${mega4}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
		let dezenas_2 = ''
	for (let i = 0; i < res.data.dezenas_2.length; i++) {
		dezenas_2 += `${res.data.dezenas_2[i]} `
	}
	let textpremiacao_2 = ''
	for (let i = 0; i < res.data.premiacao_2.length; i++) {
		textpremiacao_2 += `\n*${res.data.premiacao_2[i].nome}:*\n_Acertos:_ ${res.data.premiacao_2[i].acertos}\n_Valor Total:_ ${res.data.premiacao_2[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao_2[i].quantidade_ganhadores}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas 1:* ${dezenas}\n*Dezenas 2:* ${dezenas_2}\n` + `*Premiação 1:* ${textpremiacao}` + `*Premiação 2:* ${textpremiacao_2}\n*Números da Sorte 1☘️:*\n${lottt2}.` + `\n*Números da Sorte 2☘️:*\n${lottt3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Lnv3css.jpeg', 'lotomania.jpg', resText, id)
})
   }
if (message.body === 'Timemania') {
	 const lott5 = ['07 08 13 30 35 36 38 42 57 69 CSA/AL','20 22 30 40 41 49 57 60 71 72 Ipatinga/MG','01 13 14 24 35 40 53 60 61 78 Sport/PE','13 23 24 26 46 59 61 64 65 66 Ypiranga/AP','20 22 32 41 42 43 47 59 61 72 Internacional/RS','04 06 07 09 15 16 19 26 33 47 U Barbarense/SP','01 05 15 22 25 41 45 51 65 66 São Paulo/SP','08 21 22 23 32 33 36 38 39 68 Atlético/PR','02 15 39 44 47 49 53 72 73 78 Bragantino/SP','06 15 25 31 33 52 60 62 63 65 América/RJ','02 23 31 36 38 45 47 48 52 78 Olaria/RJ','09 11 26 32 44 49 53 54 68 79 Guarani/SP','03 09 19 28 32 33 45 60 73 80 Paulista/SP','07 22 25 26 55 65 67 68 69 73 Palmeiras/SP','06 15 18 32 36 45 57 64 67 69 Gama/DF','07 12 18 19 21 43 61 64 70 73 Goiás/GO','03 09 25 35 39 45 47 52 64 78 Paulista/SP','07 12 13 14 16 48 59 61 69 80 Paraná/PR','01 02 19 33 35 52 59 60 67 69 Vitória/BA','09 34 35 48 49 50 51 66 68 70 Barueri/SP','17 21 24 30 31 35 36 38 49 57 Corinthians/SP','07 08 10 18 34 45 48 66 69 79 Inter Limeira/SP','01 41 54 55 56 61 71 74 75 77 Gama/DF','09 15 34 35 43 53 57 63 68 71 Flamengo/RJ','19 30 31 35 44 46 48 59 60 64 Roraima/RR','01 06 27 28 35 46 48 60 71 72 Brasiliense/DF','02 07 09 25 28 44 49 50 55 72 Fortaleza/CE','04 10 18 19 41 43 44 45 59 78 Ponte Preta/SP','02 23 47 50 57 58 59 65 68 80 Atlético/GO','02 06 16 26 28 39 49 53 58 63 Ipatinga/MG','09 22 28 34 40 42 49 51 61 79 Ji-Paraná/RO','16 25 27 42 67 69 72 75 77 79 U Barbarense/SP','13 15 28 32 35 41 54 56 59 73 Paraná/PR','04 13 26 35 41 43 46 60 66 67 São Caetano/SP','09 15 24 25 26 42 51 58 63 73 Ipatinga/MG','01 04 14 26 38 50 51 53 56 69 Rio Branco/ES','03 19 27 29 35 41 62 68 70 76 S Raimundo/AM','04 05 17 19 26 41 52 66 68 77 Santos/SP','20 35 38 41 46 54 59 60 77 79 América/RN','12 34 35 49 54 55 57 59 66 73 Vasco/RJ']
const lottt5 = lott5[Math.floor(Math.random() * lott5.length)]
var arg1005 = body.trim().split(' ')
		var mega5 = arg1005[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=timemania&token=BpskgZFRd192wTw&concurso=${mega5}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena do Time:* ${res.data.dezena_time_coracao}\n` + `*Nome do Time:* ${res.data.nome_time_coracao}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt5}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/wBEAJXq.jpeg', 'lotomania.jpg', resText, id)
})
   }
if (message.body === 'Diadesorte') {
      const lott6 = ['07 12 13 21 22 23 27 Fevereiro','01 02 11 13 29 30 31 Janeiro','03 06 08 11 12 18 26 Outubro','04 09 16 19 20 21 27 Novembro','02 04 07 09 15 28 31 Setembro','01 06 08 13 15 22 29 Julho','02 06 14 17 18 21 25 Fevereiro','10 11 12 20 24 27 29 Outubro','06 13 18 19 25 29 30 Fevereiro','02 03 04 10 23 24 30 Dezembro','02 03 25 27 28 29 30 Março','04 10 14 15 16 29 30 Outubro','01 02 03 04 12 15 22 24 29 Maio','02 08 14 21 26 30 31 Dezembro','05 08 10 16 18 24 26 Setembro','01 02 08 16 21 24 30 Fevereiro','01 03 07 09 24 28 31 Maio','01 06 10 14 22 24 26 Agosto','03 08 17 18 23 29 31 Fevereiro','02 04 07 08 26 28 29 30 31 Março','01 19 20 21 22 25 26 28 Fevereiro','02 04 06 07 08 10 13 14 18 19 20 25 26 29 31 Maio','02 03 08 11 13 14 17 19 20 22 23 25 26 27 28 Maio','02 08 10 14 15 18 22 Outubro','07 12 13 15 18 22 31 Janeiro']
const lottt6 = lott6[Math.floor(Math.random() * lott6.length)]
var arg1006 = body.trim().split(' ')
		var mega6 = arg1006[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=diadesorte&token=BpskgZFRd192wTw&concurso=${mega6}`, {
	method: 'get',
})
.then(res => {
	let dezenas = ''
	for (let i = 0; i < res.data.dezenas.length; i++) {
		dezenas += `${res.data.dezenas[i]} `
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n*Dezenas:* ${dezenas}\n` + `*Dezena da sorte:* ${res.data.dezena_mes_sorte}\n` + `*Mês da Sorte:* ${res.data.nome_mes_sorte}` + `\n*Premiação:* ${textpremiacao}\n\n*Números da Sorte☘️:*\n${lottt6}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/SG8F1ux.jpeg', 'diadesorte.jpg', resText, id)
})
   }
if (message.body === 'Lotogol') {
var arg1007 = body.trim().split(' ')
		var mega7 = arg1007[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=lotogol&token=BpskgZFRd192wTw&concurso=${mega7}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://lh3.googleusercontent.com/proxy/5D_S-cJx22wCzfEDipMI0FzHj-LFUtAYLMSNvz9o0N0cVs5gkZ02j8yY4T9VJ6oSrsGF_QcChAiqyyoGRJfUa4WfUs6KVF6jViW8s1jkjx6fOoaknzE0Bfxe', 'lotogol.jpg', resText, id)
})
   }
   if (message.body === 'Loteca') {
   var arg1008 = body.trim().split(' ')
		var mega8 = arg1008[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=loteca&token=BpskgZFRd192wTw&concurso=${mega8}`, {
	method: 'get',
})
.then(res => {
    let textjogos = ''
	for (let i = 0; i < res.data.jogos.length; i++) {
		textjogos += `\n_Jogo:_ ${res.data.jogos[i].jogo}\n_Time 1:_ ${res.data.jogos[i].nome_time1}\n_Time 2:_ ${res.data.jogos[i].nome_time2}\n_Gol Time 1:_ ${res.data.jogos[i].gol_time1}\n_Gol Time 2:_ ${res.data.jogos[i].gol_time2}\n_Dia da Semana:_ ${res.data.jogos[i].dia_semana}\n`
	}
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Jogos:* ${textjogos}\n` + `\n*Premiação:* ${textpremiacao}\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/Dp4NZCk.jpeg', 'loteca.jpg', resText, id)
})
   }
   if (message.body === 'Federal') {
var arg10010 = body.trim().split(' ')
		var mega10 = arg10010[1]
axios(`https://apiloterias.com.br/app/resultado?loteria=federal&token=BpskgZFRd192wTw&concurso=${mega10}`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Bilhete:_ ${res.data.premiacao[i].bilhete}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Faixa:_ ${res.data.premiacao[i].faixa}\n`
	}
	const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n` + `\n*Premiação:* ${textpremiacao}\n\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`
	client.sendFileFromUrl(from, 'https://i.imgur.com/CVkiZNP.jpeg', 'federal.jpg', resText, id)
})
   }
			 if (message.body === 'menu') {
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n\n*Números da Sorte☘️:*\n${number1}${number2}, ${number3}${number4}, ${number5}${number6}, ${number7}${number8}, ${number9}${number10}, ${number4}${number3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`

				 client.sendText(from, `_Para visualizar novamente, digite_ *menu*.
*Nome:* ${pushname}\n*Tempo:*\n${moment().format(' *𝗗𝗶𝗮:* DD/MM/YY ')}

         ╭━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╮
                  *Lotérica* *Caçula*
         ╰━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╯
          
            🌎 *Informações* 🌎
                     _WhatsApp_
                *(16)99984-1000*
 
  
*╭─̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇───̇*
〲┴┬│•͙┄ Digite *[1]* Para Apostar
〲┴┬│•͙┄ Digite *[2]* Para Resultados
〲┴┬│•͙┄ Digite *[3]* Para Contato
〲┴┬│•͙┄ Digite *[4]* Para Cartão de Visita
*╰──̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇──*
`)
				})
			}

			 if (message.body === 'Menu') {
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n\n*Números da Sorte☘️:*\n${number1}${number2}, ${number3}${number4}, ${number5}${number6}, ${number7}${number8}, ${number9}${number10}, ${number4}${number3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`

				 client.sendText(from, `_Para visualizar novamente, digite_ *menu*.
*Nome:* ${pushname}\n*Tempo:*\n${moment().format(' *𝗗𝗶𝗮:* DD/MM/YY ')}

         ╭━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╮
                  *Lotérica* *Caçula*
         ╰━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╯
          
            🌎 *Informações* 🌎
                     _WhatsApp_
                *(16)99984-1000*
             *wa.me/5516999841000* 
  
*╭─̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇───̇*
〲┴┬│•͙┄ Digite *[1]* Para Apostar
〲┴┬│•͙┄ Digite *[2]* Para Resultados
〲┴┬│•͙┄ Digite *[3]* Para Contato
〲┴┬│•͙┄ Digite *[4]* Para Cartão de Visita
*╰──̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇──*
`)
				})
			}

						 if (message.body === 'Oi') {
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n\n*Números da Sorte☘️:*\n${number1}${number2}, ${number3}${number4}, ${number5}${number6}, ${number7}${number8}, ${number9}${number10}, ${number4}${number3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`

				 client.sendText(from, `_Para visualizar novamente, digite_ *menu*.
*Nome:* ${pushname}\n*Tempo:*\n${moment().format(' *𝗗𝗶𝗮:* DD/MM/YY ')}

         ╭━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╮
                  *Lotérica* *Caçula*
         ╰━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╯
          
            🌎 *Informações* 🌎
                     _WhatsApp_
                *(16)99984-1000*
             *wa.me/5516999841000*
  
*╭─̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇───̇*
〲┴┬│•͙┄ Digite *[1]* Para Apostar
〲┴┬│•͙┄ Digite *[2]* Para Resultados
〲┴┬│•͙┄ Digite *[3]* Para Contato
〲┴┬│•͙┄ Digite *[4]* Para Cartão de Visita
*╰──̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇──*
`)
				})
			}
			 if (message.body === 'oi') {
axios(`https://apiloterias.com.br/app/resultado?loteria=megasena&token=BpskgZFRd192wTw&concurso=`, {
	method: 'get',
})
.then(res => {
	let textpremiacao = ''
	for (let i = 0; i < res.data.premiacao.length; i++) {
		textpremiacao += `\n*${res.data.premiacao[i].nome}:*\n_Acertos:_ ${res.data.premiacao[i].acertos}\n_Valor Total:_ ${res.data.premiacao[i].valor_total}\n_Ganhadores:_ ${res.data.premiacao[i].quantidade_ganhadores}\n`
	}
const resText = `*Lotérica Caçula.*\n` + `Olá, Seja Bem-Vindo(a) *${pushname}*.\n\n` + `*Resultado:* ${res.data.nome}\n*Concurso Número:* ${res.data.numero_concurso}\n*Data:* ${res.data.data_concurso}\n\n*Números da Sorte☘️:*\n${number1}${number2}, ${number3}${number4}, ${number5}${number6}, ${number7}${number8}, ${number9}${number10}, ${number4}${number3}.\n\n_Lotérica Caçula, Av.CHAMPAGNAT._\n_Contato:_\n*(16)3721-4090* *|* *(16)99984-1000*\n_Nosso WhatsApp -->_ bit.ly/39iR2Ja`

				 client.sendText(from, `_Para visualizar novamente, digite_ *menu*.
*Nome:* ${pushname}\n*Tempo:*\n${moment().format(' *𝗗𝗶𝗮:* DD/MM/YY ')}

         ╭━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╮
                  *Lotérica* *Caçula*
         ╰━⋆⃟⊱๑⋆⃟⊱๑ˌ⋆⃟⊱๑⋆⃟⊱๑⋆⃟⊱━╯
          
            🌎 *Informações* 🌎
                     _WhatsApp_
                *(16)99984-1000*
             *wa.me/5516999841000*
  
*╭─̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇───̇*
〲┴┬│•͙┄ Digite *[1]* Para Apostar
〲┴┬│•͙┄ Digite *[2]* Para Resultados
〲┴┬│•͙┄ Digite *[3]* Para Contato
〲┴┬│•͙┄ Digite *[4]* Para Cartão de Visita
*╰──̇─̇─̇──̇─̇─̇──̇─̇─̇───̇─̇──*
`)
				})
			}
		//wkwk
    } catch (err) {
        console.log(color('[EROR]', 'red'), err)
    }
}