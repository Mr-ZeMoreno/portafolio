
export class Console {
    padre: HTMLElement;
    comandos: { [key: string]: (inputValue: string) => void };

    constructor(padre: HTMLElement) {
      this.padre = padre;
      this.comandos = {
        hola: this.hola.bind(this),
        contact: this.contact.bind(this),
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

    appendRrss(url: string, imgSrc: string, altText: string, contenedor: HTMLElement) {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
  
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = altText;
      img.style.width = "24px"; // Ajusta el tamaño del icono
      img.style.height = "24px";
      img.style.margin = "0 5px"; // Espaciado entre íconos
  
      link.appendChild(img);
      
      // Añadir el enlace al contenedor proporcionado
      contenedor.appendChild(link);
  }
  
  

    clear() {
      this.padre.innerHTML = "";
    }

    hola() {
      this.appendChild(
        "Hola, Soy Josecarlos, también conocido como Zemoreno. " +
          "Soy apasionado de la programación 👨🏽‍💻, el sushi 🍣 y la música soul 🎧. " +
          "No dudes en contactarme y disfruta de la canción de turno, " +
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

contact() {
    const mensaje = "Puedes encontrarme en las siguientes redes sociales:";
    this.appendChild(mensaje, "middle-msg");

    const $contenedorRrss = document.createElement("div");
    $contenedorRrss.style.marginTop = "5px";
    $contenedorRrss.style.display = "flex";
    $contenedorRrss.style.alignItems = "center";
    $contenedorRrss.style.justifyContent = "center";

    this.appendRrss("https://www.linkedin.com/in/josecarlos-vidal/", "/svg/linkedin.svg", "LinkedIn", $contenedorRrss);
    this.appendRrss("https://github.com/Mr-ZeMoreno", "/svg/github.svg", "GitHub", $contenedorRrss);

    if (this.padre) {
        this.padre.appendChild($contenedorRrss);
    }
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