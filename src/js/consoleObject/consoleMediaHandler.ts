import {Volume}  from "./Reproductor/Volume"
import {Thumbnail} from "./Reproductor/Thumbnail"
import {Reproductor} from "./Reproductor/Reproductor"

export class ConsoleMediaHandler {
    reproductor: Reproductor;
    volume: Volume;
    thumbnail: Thumbnail;

    constructor() {
      this.volume = new Volume;
      this.thumbnail = new Thumbnail;
      this.reproductor = new Reproductor;
      this.setupAudioEvents();

  }

  setupAudioEvents() {
      if (this.reproductor.getRep()) {
          this.reproductor.onEnd(this.handleAudioEnd.bind(this));
          this.reproductor.onPlay(this.playAudio.bind(this));
          this.reproductor.onPause(this.pauseAudio.bind(this));
      }
  }

  handleAudioEnd() {
      this.thumbnail.setInvertColor(false);
      this.thumbnail.setTitle(true);

      if (this.volume.getVolume()) {
          this.volume.setHide(true);
      }

      if (this.thumbnail.getTimer()) {
          this.thumbnail.timerHide(true);
      }
  }

  playAudio() {
      this.volume.setHide(false);

      this.thumbnail.setInvertColor(true);
      this.thumbnail.timerHide(false)
      this.thumbnail.setTitle(false);

      this.reproductor.play();
  }

  stopAudio(){
    this.handleAudioEnd();
    this.reproductor.stop();
  }

  pauseAudio() {
      this.thumbnail.setInvertColor(false);
      this.thumbnail.setTitle(true);
      
      this.reproductor.pause();
  }
}