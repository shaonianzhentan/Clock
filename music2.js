const fetch = require('node-fetch')
const { spawn } = require('child_process');

class Music {
    constructor() {
        this.api_url = `http://jiluxinqing.com:3000/`
        this.isLoading = false
        this.playing = false
        this._musicList = []
        //音乐列表索引
        this.musicIndex = 0
        this.timeout = 0
    }

    //音乐列表
    get musicList() {
        return this._musicList;
    }
    set musicList(value) {
        if (Array.isArray(value)) {
            this._musicList = value;
            this.musicIndex = 0;
        }
    }

    //播放歌单
    playlist(id) {
        return new Promise((resolve, reject) => {
            fetch(`${this.api_url}playlist/detail?id=${id}`).then(res => {
                res.json().then((data) => {
                    var arr = [];
                    data.playlist.tracks.forEach((ele) => {
                        arr.push({
                            id: ele.id,
                            title: ele.name,
                            name: ele.ar[0].name
                        });
                    })
                    this.musicList = arr;
                    resolve();
                })
            }).catch(err => {
                this.setStatus('获取歌单失败');
                reject(err);
            });
        })
    }

    load() {
        if (this.musicList.length == 0) return;
        if (this.isLoading) return;
        this.isLoading = true;
        var obj = this.musicList[this.musicIndex];
        //网易云音乐
        return new Promise((resolve, reject) => {
            //获取音乐地址
            fetch(`${this.api_url}music/url?id=${obj.id}`).then(res => {
                res.json().then(data => {
                    //console.log(data);
                    var url = data.data[0].url;
                    if (url) this.play(url);
                    else this.next();
                    this.isLoading = false;
                    resolve();
                })
            }).catch(err => {
                this.setStatus('获取音乐失败');
                console.log('Fetch Error : %S', err);
                this.isLoading = false;
                reject(err);
            })
        })
    }

    play(url) {

        let ps = spawn('mplayer', [url])
        ps.stdout.on('data', (data) => {
            console.log(`ps stdout: ${data}`);
        });

        ps.stderr.on('data', (data) => {
            console.log(`ps stderr: ${data}`);
        });

        ps.on('close', (code) => {
            console.log(`子进程退出码：${code}`);
            console.log('play end')
            this.next();
        });

        this.setStatus('正在播放');
        console.log('playing');
    }

    pause() {
        //this.player.pause()
		/*
		let audio = this.video;
		if(this.timer) clearInterval(this.timer);
		
		var volume = audio.volume;
		this.timer = setInterval(() => { 
			
			if(audio.volume <= 0.01){				
				audio.pause();
				audio.volume = volume;		
				clearInterval(this.timer); 
			}
			audio.volume -= 0.01; 
			//console.log(audio.volume)
		},10);
		*/
        this.setStatus('暂停音乐');
    }

    next() {
        this.musicIndex++;

        if (this.musicIndex >= this.musicList.length) {
            this.musicIndex = 0;
        }

        this.setStatus('下一曲');
        this.load();
    }

    prev() {
        this.musicIndex--;
        if (this.musicIndex < 0) {
            this.musicIndex = this.musicList.length - 1;
        }
        this.setStatus('上一曲');
        this.load();
    }

    setStatus(ss) {
        this.status = ss;
        this.optime = (new Date()).toLocaleString();

        var obj = this.musicList[this.musicIndex];
        if (obj) {
            console.log(this.status + '：    ' + obj.title + " - " + obj.name);
        }
    }

    random() {
        var len = this.musicList.length;
        var index = Math.round(Math.random() * len);
        if (index == len) index = 0;
        this.musicIndex = index;
        this.setStatus('随机播放');
        this.load();
    }
}

module.exports = () => {
    return new Music()
}
