import { Reproductor } from "./Reproductor";

const allowedConfig = {
  volume: "#volume",
  hide: "opacity-0",
};

export class Volume {
  $volume: HTMLInputElement;

  constructor() {
    this.$volume = document.querySelector(
      allowedConfig.volume,
    ) as HTMLInputElement;
  }

  getVolume() {
    return this.$volume;
  }

  setHide(set: boolean = true) {
    if (set) {
      this.$volume.classList.add(allowedConfig.hide);
    } else {
      this.$volume.classList.remove(allowedConfig.hide);
    }
  }
}
