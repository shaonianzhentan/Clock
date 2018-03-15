let clock = require('./clock')()


setInterval(() => {
	clock.tick()
}, 1000)

clock.baoshi('亲爱的，现在时间是' + (new Date()).toLocaleString())

//红外感应开关
var gpio = require("rpi-gpio")
let PIN = 12
gpio.setup(PIN, gpio.DIR_IN, err => {
	if (err) {
		console.log(err)
		return
	}
	let obj = {
		a: 0,
		b: 0
	}
	setInterval(() => {
		gpio.read(PIN, function (err, value) {
			if (err) {
				console.error(err)
				return
			}
			if (value) {
				if (obj.b > 0) {
					console.log('fail', obj.b)
					obj.b = 0
				}
				obj.a += 1
			} else {
				if (obj.a > 0) {
					console.log('success', obj.a)
					if(obj.a > 10 && clock.music.musicList.length > 0){
						clock.baoshi('亲爱的，现在时间是' + (new Date()).toLocaleString())
						console.log((new Date()).toLocaleString(), '有人')
					}
					obj.a = 0
				}
				obj.b += 1
			}
			//console.log(value)
		})
	}, 1000)
})
