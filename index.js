let clock = require('./clock')()
const moment = require('moment')
moment.locale('zh-cn')

const http = require('http');
const url = require('url');
const querystring = require('querystring');
const server = http.createServer((req, res) => {
	var body = 'success'
	var obj = url.parse(req.url)
	var pathname = obj.pathname;
	switch (pathname) {
		case '/baoshi':
			BaoShi();
			break;
	}
	if (obj.query) {
		let query = querystring.parse(obj.query);
		//播放音乐链接
		if (query.mp3 && query.mp3.indexOf('http') == 0) {
			body = `playing ${query.mp3}`
			clock.play(query.mp3)
		}
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end(body);
});

server.listen(3000, () => {
	console.log(`Server is running `);
});


const process = require('process')

process.on('uncaughtException', function (err) {
	//打印出错误
	//console.log(err);
	//打印出错误的调用栈方便调试
	//console.log(err.stack);
});


setInterval(() => {
	clock.tick()
}, 1000)


let flags = true
function BaoShi() {
	if (flags) {
		flags = false
		clock.getData()
		clock.baoshi(`亲爱的，现在时间是${moment().format('LLLL')}`)
		setTimeout(() => {
			flags = true
		}, 10000)
	}
	//console.log((new Date()).toLocaleString(), '有人')
}