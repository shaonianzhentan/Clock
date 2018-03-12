var mpg = require('mpg123')
let request = require('request')
let fs = require('fs')


function Start() {

    var player = new mpg.MpgPlayer()

    let msg = '现在时间是23:50'

    var mp3Url = "http://tts.baidu.com/text2audio?idx=1&tex=" + encodeURIComponent(msg) + "&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=4&vol=5&pit=5"

    player.play(mp3Url)

    console.log('play')

}

Start();

setTimeout(() => {

    Start();
}, 500)
