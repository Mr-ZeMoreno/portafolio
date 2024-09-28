import { ConsoleMessage } from "./consoleMessage";
import { SocialLinks } from "./socialLinks";

export class ConsoleCommands {
  padre: HTMLElement;

  constructor(padre: HTMLElement) {
    this.padre = padre;
  }

  hola() {
    this.appendMessage(
      "Hola, Soy Josecarlos, también conocido como Zemoreno. " +
        "Soy apasionado de la programación 👨🏽‍💻, el sushi 🍣 y la música soul 🎧. " +
        "No dudes en contactarme y disfruta de la canción de turno, " +
        "la cual voy cambiando semanalmente.",
      "middle-msg"
    );
    this.appendMessage(".", "middle-msg");
    this.appendMessage(".", "middle-msg");
  }

  help(comandos: { [key: string]: (inputValue: string) => void }) {
    this.appendMessage(
      "Comandos disponibles: " + Object.keys(comandos).join(", "),
      "middle-msg"
    );
  }

  about() {
    this.appendMessage(
      "Esta página no fue creada como portafolio, " +
        "si no más bien como mi espacio personal en el mundo 💫.",
      "middle-msg"
    );
    this.appendMessage(
      ".",
      "middle-msg"
    );
    this.appendMessage(
      "Las herramientas usadas para este proyecto fueron:",
      "middle-msg"
    );
    const $contenedorFrameworks = this.createContainer();

    const socialLinks = new SocialLinks($contenedorFrameworks);

    socialLinks.appendRrss(
      "https://astro.build/",
      "/svg/astro.svg",
      "Astro"
    );
    socialLinks.appendRrss(
      "https://es.react.dev/",
      "/svg/react.svg",
      "React"
    );
    socialLinks.appendRrss(
      "https://tailwindcss.com/",
      "/svg/tailwind.svg",
      "Tailwind"
    );

    this.padre.appendChild($contenedorFrameworks);
  }

  contact() {
    this.appendMessage(
      "Puedes encontrarme en las siguientes redes sociales:",
      "middle-msg"
    );

    const $contenedorRrss = this.createContainer();

    const socialLinks = new SocialLinks($contenedorRrss);

    socialLinks.appendRrss(
      "https://www.linkedin.com/in/josecarlos-vidal/",
      "/svg/linkedin.svg",
      "LinkedIn"
    );
    socialLinks.appendRrss(
      "https://github.com/Mr-ZeMoreno",
      "/svg/github.svg",
      "GitHub"
    );

    this.padre.appendChild($contenedorRrss);
  }

  appendMessage(inputValue: string, clase: string) {
    const newMessage = new ConsoleMessage(this.padre, inputValue, clase);
    newMessage.displayMessage();
  }

  private createContainer(){
    const $contenedorRrss = document.createElement("div");
    $contenedorRrss.classList.add("mt-1.5")
    $contenedorRrss.classList.add("flex")
    $contenedorRrss.classList.add("items-center")
    $contenedorRrss.classList.add("justify-center")
    $contenedorRrss.classList.add("gap-2")

    return $contenedorRrss
  }
}
