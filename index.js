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
    player.play(`${__dirname}/test.mp3`)
});

stream.on('error', err => {
    console.log(err)
});
