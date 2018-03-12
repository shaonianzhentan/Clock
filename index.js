var mpg = require('mpg123')
let request = require('request')

let fs = require('fs')

var player = new mpg.MpgPlayer()

let msg = 'abcdefghijklmnopqrst'

const stream = request(`https://ai.baidu.com/aidemo?type=tns2&idx=1&tex=${decodeURIComponent(msg)}&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=4&vol=9&pit=5`)
    .pipe(fs.createWriteStream('test.mp3'))

console.log(msg);



stream.on('finish', () => {
    console.log('play')
      var mp3Url = "http://tts.baidu.com/text2audio?idx=1&tex=" + encodeURIComponent(msg) + "&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=0&vol=5&pit=5"
  
    player.play(mp3Url)
});

stream.on('error', err => {
    console.log(err)
});
