const allowedConfig = {
    thumbnail: ".imagen",
    timer: "#timer",
    invertColor: "invert-color",
    title:{
        onPlay: "Pausar música",
        onPause: "Reproducir música"
    },
    hide: "opacity-0"
}

export class Thumbnail{
    $thumbnail: HTMLButtonElement;
    $timer: HTMLElement;
    constructor(){
        this.$thumbnail = document.querySelector(allowedConfig.thumbnail) as HTMLButtonElement;
        this.$timer = this.$thumbnail.querySelector(allowedConfig.timer) as HTMLElement;
    }

    setInvertColor(set: boolean = true){
        if(set){
            this.$thumbnail.classList.add(allowedConfig.invertColor);
        }else{
            this.$thumbnail.classList.remove(allowedConfig.invertColor);
        }
      }

    setTitle(set:boolean = true){
        if(set){
            this.$thumbnail.title = allowedConfig.title.onPause;
        }else{
            this.$thumbnail.title = allowedConfig.title.onPlay;
        }
    }
    timerHide(set:boolean=true){
        if(set){
            this.$timer.classList.add(allowedConfig.hide)
        }else{
            this.$timer.classList.remove(allowedConfig.hide)
        }
    }
    getTimer(){
        return this.$timer;
    }
}