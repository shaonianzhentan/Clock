const fetch = require('node-fetch')
const music = require('./music2')()
const moment = require('moment')
moment.locale('zh-cn')

class Clock {
	constructor() {
		this.list = []
		this.music = music
		this.getData()
		/*
						music.playlist('2160550186').then(() => {
							music.random()
						}).catch(err => {
							console.log(err)
						})
		*/
		let nowTime = moment(new Date()).format('LLLL')
		this.baoshi(`亲爱的，现在时间是${nowTime}`)
		console.log('闹钟启动成功')
	}

	getData() {
		fetch(`http://api3.jiluxinqing.com/data/clock.json?v=${Date.now()}`).then(res => {
			res.text().then(body => {
				this.list = JSON.parse(body)
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
					console.log('闹钟响了，播放音乐')
					//闹钟响了，播放音乐
					if (e.mp3.indexOf('http') == 0) {
						//播放链接		
						this.play(e.mp3)
					} else {
						music.playlist(e.mp3).then(() => {
							music.random()
						}).catch(err => {
							console.log(err)
						})
					}
					break
				} else if (e.type == 0) {
					if (e.mp3 && e.mp3.indexOf('http') == 0) {
						console.log('自定义报时')
						//播放链接		
						this.play(e.mp3)
					} else {
						console.log('报时')
						let nowTime = moment(today).format('LLLL')
						this.baoshi(`亲爱的，现在时间是${nowTime}`)
					}
					break
				}
			}
		}

		if (today.i == 0 && today.s == 0) this.getData()
	}

	baoshi(msg) {
		music.musicList = []
		music.play(`http://tts.baidu.com/text2audio?idx=1&tex=${encodeURIComponent(msg)}&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=4&vol=5&pit=5`)
	}

	play(mp3) {
		music.musicList = []
		music.play(mp3)
	}
}

module.exports = () => {
	return new Clock()
}
