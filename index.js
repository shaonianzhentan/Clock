let clock = require('./clock')()


setInterval(() => {
	clock.tick()							
}, 1000)

clock.baoshi('亲爱的，现在时间是' + (new Date()).toLocaleString())
