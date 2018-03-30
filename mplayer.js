var cp = require('child_process')

class Mplayer {
    constructor(url) {
        let ps = cp.spawn('mpg123', url)
        ps.stdout.on('data', (data) => {
            console.log(data);
        });

        ps.stderr.on('data', (data) => {
            console.log(`ps stderr: ${data}`);
        });

        ps.on('close', (code) => {
            if (code !== 0) {
                console.log(`ps 进程退出码：${code}`);
            }
        });
    }

    on(event, func) {
        console.log(event,func)
    }

    play(){

    }

    pause(){
        
    }
}

exports.Mplayer = function (url) {
    return new Mplayer(url)
}