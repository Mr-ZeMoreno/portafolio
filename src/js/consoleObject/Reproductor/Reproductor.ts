const allowedConfig = {
    reproductor: "#audio-rep",
    listeners:{
        end:"end",
        play: "play",
        pause: "pause"
    }
}

export class Reproductor{
    $rep: HTMLAudioElement;

    constructor(){
        this.$rep = document.querySelector(allowedConfig.reproductor) as HTMLAudioElement;
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

    onEnd(handler: ()=> void){
        this.$rep.addEventListener(allowedConfig.listeners.end, handler);
    }
    onPlay(handler: ()=> void){
        this.$rep.addEventListener(allowedConfig.listeners.play, handler);
    }
    onPause(handler: ()=> void){
        this.$rep.addEventListener(allowedConfig.listeners.pause, handler);
    }
}