var mpg = require('mpg123')

var player = new mpg.MpgPlayer()

let msg = 'abc'

player.play(`https://ai.baidu.com/aidemo?type=tns2&idx=1&tex=${decodeURIComponent(msg)}&cuid=baidu_speech_demo&cod=2&lan=zh&ctp=1&pdt=1&spd=5&per=4&vol=9&pit=5`);
