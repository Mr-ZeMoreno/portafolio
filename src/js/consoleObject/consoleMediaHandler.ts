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
      const $timer = $thumbnail.querySelector("span.ml-auto") as HTMLElement;
      $thumbnail.title =  "Reproducir música"; 
      
      if ($timer) {
        $timer.classList.add("hidden");
      }
    }
  
    playAudio() {
      const $thumbnail = document.querySelector(".imagen") as HTMLElement;
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;
      const $timer = $thumbnail.querySelector("span.ml-auto") as HTMLElement;
  
      $thumbnail.classList.add("invert-color");
      $timer?.classList.remove("hidden");
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
  