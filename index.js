let clock = require('./clock')()


setInterval(() => {
	clock.tick()
}, 1000)

clock.baoshi('亲爱的，现在时间是' + (new Date()).toLocaleString())

var gpio = require("rpi-gpio")
let PIN = 12
gpio.setup(PIN, gpio.DIR_IN, readInput)

function readInput(err) {
	if (err) {
		console.log(err)
		return
	}
	gpio.read(PIN, function (err, value) {
		if (err) throw err;
		let seconds = 1000;
		if (value) {
			clock.baoshi('亲爱的，现在时间是' + (new Date()).toLocaleString())
			seconds *= 10
			console.log('有人');
		}
		setTimeout(() => {
			readInput()
		}, 1000 * 10)
		//console.log('The value is ' + value);
	});
}