import { ConsoleMediaHandler } from "./consoleMediaHandler";
import { ConsoleMessage } from "./consoleMessage";
import { ConsoleCommands } from "./consoleTextCommand";

export const messageFormat = {
    middle: "middle-msg",
    inline: "inline-msg"
}

export class ConsoleManager {
    padre: HTMLElement;
    comandos: { [key: string]: (inputValue: string) => void };
    mediaHandler: ConsoleMediaHandler;
    commands: ConsoleCommands;

    constructor(padre?:HTMLElement) {
        if(padre){
            this.padre = padre;
        }else{
            this.padre = document.querySelector("#consola") as HTMLElement;
        }
        this.comandos = {};
        this.mediaHandler = new ConsoleMediaHandler;  
        this.commands = new ConsoleCommands(this.padre);

        this.initComandos();
    }

    getConsola(){
        return this.padre;
    }

    initComandos() {
        this.comandos = {
            hola: this.hola.bind(this),
            contact: this.commands.contact.bind(this.commands),
            about: this.commands.about.bind(this.commands),
            clear: this.clear.bind(this),
            play: this.play.bind(this),
            pause: this.pause.bind(this),
            stop: this.stop.bind(this),
            help: this.help.bind(this),
        };
    }

    ejecutarComando(inputValue: string) {
        const comando = inputValue.toLowerCase();
        if (this.comandos[comando]) {
            this.appendMessage(inputValue, messageFormat.inline);
            this.comandos[comando](inputValue);
        } else {
            this.appendMessage(".", messageFormat.middle);
            this.appendMessage(`Comando no reconocido: ${inputValue}`, messageFormat.middle);
            this.appendMessage(".", messageFormat.middle);
        }
    }

    appendMessage(inputValue: string, format: string) {
        const allowedFormats = Object.values(messageFormat);
        if (allowedFormats.includes(format)) {
            const newMessage = new ConsoleMessage(this.padre, inputValue, format);
            newMessage.displayMessage();
        } else {
            console.error(`Formato no permitido: ${format}`);
        }
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

        this.appendMessage(`Reproduciendo ${$rep.getAttribute("name")}`, messageFormat.middle);
        this.mediaHandler.playAudio();
    }

    pause() {
        this.appendMessage("Pausado", messageFormat.middle);
        this.mediaHandler.pauseAudio();
    }

    stop() {
        this.appendMessage("Se ha detenido y puesto al comienzo", messageFormat.middle);
        this.mediaHandler.stopAudio();
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
