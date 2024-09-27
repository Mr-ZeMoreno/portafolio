export class Reproductor {
    constructor(reproductorRef) {
        this.reproductor = reproductorRef.current;
        this.isPlaying = false;
    }

    load(url) {
        if (url !== this.reproductor.src) {
            this.reproductor.src = url;
            this.reproductor.load();
        }
    }

    async play() {
        if (!this.isPlaying) {
            try {
                await this.reproductor.play();
                this.isPlaying = true;
            } catch (error) {
                console.error("Error playing audio:", error);
            }
        }
    }

    async pause() {
        if (this.isPlaying) {
            this.reproductor.pause();
            this.isPlaying = false;
        }
    }
}