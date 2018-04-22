let clock = require('./clock')()
const moment = require('moment')
moment.locale('zh-cn')

const http = require('http');
const url = require('url');
const server = http.createServer((req, res) => {
	var pathname = url.parse(req.url).pathname;
	switch (pathname) {
		case '/baoshi':
			BaoShi();
			break;
	}

	res.statusCode = 200;
	res.setHeader('Content-Type', 'text/plain');
	res.end('success');
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
function BaoShi(){
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