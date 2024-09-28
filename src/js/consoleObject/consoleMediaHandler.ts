export class ConsoleMediaHandler {
    constructor() {
      this.setupAudioEvents();
    }
  
    setupAudioEvents() {
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;
      if ($rep) {
        $rep.addEventListener("ended", this.handleAudioEnd.bind(this));
      }
    }
  
    handleAudioEnd() {
      const $thumbnail = document.querySelector(".imagen") as HTMLElement;
      $thumbnail.classList.remove("invert-color");
      const $timer = $thumbnail.querySelector("#timer") as HTMLElement;
      $thumbnail.title =  "Reproducir música"; 
      
      if ($timer) {
        $timer.classList.add("opacity-0");
      }
    }
  
    playAudio() {
      const $thumbnail = document.querySelector(".imagen") as HTMLElement;
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;
      const $timer = $thumbnail.querySelector("#timer") as HTMLElement;
  
      $thumbnail.classList.add("invert-color");
      $timer?.classList.remove("opacity-0");
      $thumbnail.title = "Pausar música";

      $rep.play();
    }
  
    pauseAudio() {
      const $thumbnail = document.querySelector(".imagen") as HTMLElement;
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;
  
      $thumbnail.classList.remove("invert-color");
      $thumbnail.title =  "Reproducir música";
      
      $rep.pause();
    }
  }
  