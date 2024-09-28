import { ConsoleMediaHandler } from "./consoleMediaHandler";
import { ConsoleMessage } from "./consoleMessage";
import { ConsoleCommands } from "./consoleTextCommand";

export class ConsoleManager {
    padre: HTMLElement;
    comandos: { [key: string]: (inputValue: string) => void };
    mediaHandler: ConsoleMediaHandler;
    commands: ConsoleCommands;

    constructor(padre: HTMLElement) {
        this.padre = padre;
        this.comandos = {};
        this.mediaHandler = new ConsoleMediaHandler;  
        this.commands = new ConsoleCommands(padre);

        this.initComandos();
    }

    initComandos() {
        this.comandos = {
            hola: this.hola.bind(this),
            contact: this.commands.contact.bind(this.commands),
            about: this.commands.about.bind(this.commands),
            clear: this.clear.bind(this),
            play: this.play.bind(this),
            pause: this.pause.bind(this),
            help: this.help.bind(this),
        };
    }

    ejecutarComando(inputValue: string) {
        const comando = inputValue.toLowerCase();
        if (this.comandos[comando]) {
            this.appendMessage(inputValue, "inline-msg");
            this.comandos[comando](inputValue);
        } else {
            this.appendMessage(`Comando no reconocido: ${inputValue}`, "middle-msg");
        }
    }

    appendMessage(inputValue: string, clase: string) {
        const newMessage = new ConsoleMessage(this.padre, inputValue, clase);
        newMessage.displayMessage();
    }
    hola(){
        this.commands.hola();
        this.help();
    }

    clear() {
        this.padre.innerHTML = "";
    }

    play() {
        const $rep = document.querySelector("#audio-rep") as HTMLAudioElement;

        this.appendMessage(`Reproduciendo ${$rep.getAttribute("name")}`, "middle-msg");
        this.mediaHandler.playAudio();
    }

    pause() {
        this.appendMessage("Pausado", "middle-msg");
        this.mediaHandler.pauseAudio();
    }

    help() {
        this.commands.help(this.comandos);
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
