const allowedConfig = {
    reproductor: "#audio-rep",
    listeners:{
        end:"ended",
        play: "play",
        pause: "pause",
        timeupdate: "timeupdate"
    }
}

export class Reproductor{
    $rep: HTMLAudioElement;

    constructor(padre?:HTMLAudioElement){
        if(padre){
            this.$rep = padre;
        }
        else{
            this.$rep = document.querySelector(allowedConfig.reproductor) as HTMLAudioElement;
        }
}

    getRep(){
        return this.$rep;
    }

    play(){
        this.$rep.play();
    }

    pause(){
        this.$rep.pause();
    }

    stop(){
        this.$rep.currentTime = 0;
        this.pause();
    }

    setVolume(newVolume: number){
        this.$rep.volume = newVolume;
    }

    isPlaying(){
        return !this.$rep.paused
    }

    onEnd(handler: ()=> void, set:boolean = true){
        if(set){
            this.$rep.addEventListener(allowedConfig.listeners.end, handler);
        }else{
            this.$rep.removeEventListener(allowedConfig.listeners.end, handler);
        }
}
    onPlay(handler: ()=> void, set:boolean = true){
        if(set){
            this.$rep.addEventListener(allowedConfig.listeners.play, handler);
        }else{
            this.$rep.removeEventListener(allowedConfig.listeners.play, handler);
        }
}
    onPause(handler: ()=> void, set:boolean = true){
        if(set){
            this.$rep.addEventListener(allowedConfig.listeners.pause, handler);
        }else{
            this.$rep.removeEventListener(allowedConfig.listeners.pause, handler);
        }
}
    onTimeUpdate(handler: ()=>void, set:boolean = true){
        if(set){
            this.$rep.addEventListener(allowedConfig.listeners.timeupdate, handler);
        }else{
            this.$rep.removeEventListener(allowedConfig.listeners.timeupdate, handler);
        }
}
}