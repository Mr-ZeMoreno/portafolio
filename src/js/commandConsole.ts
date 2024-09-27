
export class Console {
    padre: HTMLElement;
    comandos: { [key: string]: (inputValue: string) => void };

    constructor(padre: HTMLElement) {
      this.padre = padre;
      this.comandos = {
        hola: this.hola.bind(this),
        clear: this.clear.bind(this),
        play: this.play.bind(this),
        pause: this.pause.bind(this),
        help: this.help.bind(this),
      };

      this.setupAudioEvents();
    }

    setupAudioEvents() {
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;

      if ($rep) {
        $rep.addEventListener("ended", () => {
          const $thumbnail = document.querySelector(".imagen") as HTMLElement;
          $thumbnail.classList.remove("invert-color");
          const $timer = $thumbnail.querySelector(
            "span.ml-auto"
          ) as HTMLElement;

          if ($timer) {
            $timer.classList.add("hidden");
          }
        });
      }
    }

    appendChild(inputValue: string, clase: string) {
      const $msgLine = document.createElement("div");
      $msgLine.classList.add(clase);
      $msgLine.innerHTML = `<span class="green">></span><p></p>`;

      const $parrafo = $msgLine.querySelector("p");
      if ($parrafo) {
        $parrafo.textContent = inputValue;
      }

      if (this.padre) {
        this.padre.appendChild($msgLine);
      }
    }

    clear() {
      this.padre.innerHTML = "";
    }

    hola() {
      this.appendChild(
        "Hola, Soy Josecarlos, también conocido como Zemoreno. " +
          "Soy apasionado de la programación 👨🏽‍💻, el sushi 🍣 y la música soul 🎧. " +
          "No dudes en contactarme a mi correo y disfruta de la canción de turno, " +
          "la cual voy cambiando semanalmente.",
        "middle-msg"
      );
      this.appendChild(".", "middle-msg");
      this.appendChild(".", "middle-msg");
      this.help();
    }

    help() {
      const comandosList = Object.keys(this.comandos).map((comando) => {
        return `${comando}`;
      });

      const helpMessage =
        comandosList.length > 0
          ? `Comandos disponibles: ${comandosList.join(", ")}`
          : "No hay comandos disponibles.";

      this.appendChild(helpMessage, "middle-msg");
    }

    play() {
      const $thumbnail = document.querySelector(".imagen") as HTMLElement;
      const $timer = $thumbnail.querySelector("span.ml-auto") as HTMLElement;
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;

      this.appendChild(
        `Reproduciendo ${$rep.getAttribute("name")}`,
        "middle-msg"
      );

      $thumbnail.classList.add("invert-color");
      $timer.classList.remove("hidden");
      $rep.play();
    }

    pause() {
      this.appendChild("Pausado", "middle-msg");
      const $thumbnail = document.querySelector(".imagen") as HTMLElement;
      const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;

      $thumbnail.classList.remove("invert-color");
      $rep.pause();
    }

    ejecutarComando(inputValue: string) {
      const comando = inputValue.toLowerCase();
      if (this.comandos[comando]) {
        this.appendChild(inputValue, "inline-msg");
        this.comandos[comando](inputValue);
      } else {
        this.appendChild(`Comando no reconocido: ${inputValue}`, "middle-msg");
      }
    }

    removeAllElements(htmlElement: NodeListOf<Element>) {
      if (htmlElement.length >= 0) {
        htmlElement.forEach((elemento) => {
          elemento.remove();
        });
      }
    }

    limpiarInput(htmlElement: HTMLInputElement) {
      htmlElement.value = "";
    }
  }