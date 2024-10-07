import { ConsoleMessage } from "./consoleMessage";
import { SocialLinks } from "./socialLinks";
import { messageFormat } from "./consoleManager";
import Data from "../../consola.info.json"

export class ConsoleCommands {
  padre: HTMLElement;
  message: ConsoleMessage;

  constructor(padre: HTMLElement) {
    this.padre = padre;
    this.message = new ConsoleMessage(this.padre);
  }

  hola() {
    this.appendMessage(Data.hola,messageFormat.middle);
    this.appendMessage(".", messageFormat.middle);
    this.appendMessage(".", messageFormat.middle);
  }
 
  help(comandos: { [key: string]: (inputValue: string) => void }) {
    this.appendMessage(
      "Comandos disponibles: " + Object.keys(comandos).join(", "),
      messageFormat.middle
    );
  }

  about() {
    this.appendMessage(
      Data.about,
      messageFormat.middle
    );
    this.appendMessage(
      ".",
      messageFormat.middle
    );
    this.appendMessage(
      "Las herramientas usadas para este proyecto fueron:",
      messageFormat.middle
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
      messageFormat.middle
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
    this.message.displayMessage(inputValue, clase);
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
