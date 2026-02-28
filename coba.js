var NSFAI = require('nsfai')
var nsfai = new NSFAI('a551adab68d4428bb1adca809c508e44')

const porn = 'https://img-hw.xvideos-cdn.com/videos/thumbs169lll/7e/08/ae/7e08ae8d8c63333f8395a106d002f677/7e08ae8d8c63333f8395a106d002f677.23.jpg'
const noporn = 'https://upload.wikimedia.org/wikipedia/id/thumb/c/c5/KucingSingapura.jpg/235px-KucingSingapura.jpg'
nsfai.predict(noporn)
.then(async res => {
	if (res.sfw) return console.log('Its no porn image')
	console.log('Its a porn image')
})