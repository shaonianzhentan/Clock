const fetch = require('node-fetch')
const music = require('./music')

class Clock {
	constructor() {
		this.list = []
		fetch('http://jiluxinqing.com:3000/clock.json').then(res => {
			res.json().then(arr => {
				this.list = arr
			})
		})
	}
	//滴答滴答滴答
	tick() {
		let today = new Date()
		this.today = {
			y: today.getFullYear()
			, m: today.getMonth() + 1
			, d: today.getDate()
			, h: today.getHours()
			, i: today.getMinutes()
			, s: today.getSeconds()
			, w: today.getDay()
		}
		
		for (let e of this.list) {
			let t = this.today
			//判断时间是否一致
			if (t.h == e.h && t.i == e.i && t.s == e.s) {
				//判断是否当天
				if (t.w == e.w && e.type == 1) {
					//闹钟响了，播放音乐
					break
				} else if (e.type == 0) {
					if (e.mp3) {
						//播放链接								
					} else {
						//报时								
						this.baoshi('亲爱的，现在时间是' + (new Date()).toLocaleString())
					}
					break
				}
			}
		}
	}
	
	baoshi(msg){
		music.play(`http://tts.baidu.com/text2audio?idx=1&tex=${encodeURIComponent(msg)}&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=4&vol=5&pit=5`)
	}
}

module.exports = ()=>{
	return new Clock()
}
