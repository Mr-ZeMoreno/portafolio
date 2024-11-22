export class ConsoleMessage {
  private parent: HTMLElement;

  constructor(parent: HTMLElement) {
    this.parent = parent;
  }

  /**
   * Muestra un mensaje en la consola con el formato '> mensaje'.
   * @param message - El mensaje a mostrar.
   * @param className - La clase CSS para el mensaje.
   */
  displayMessage(message?: string, className?: string) {
    if (message && className) {
      const msgElement = document.createElement("div");
      msgElement.classList.add(className);

      const symbolSpan = document.createElement("span");
      symbolSpan.className = "green";
      symbolSpan.textContent = ">";

      const paragraph = document.createElement("p");
      paragraph.textContent = message;

      msgElement.appendChild(symbolSpan);
      msgElement.appendChild(paragraph);

      this.parent.appendChild(msgElement);
    } else {
      console.log("Faltan argumentos");
    }
  }

  /**
   * Muestra un mensaje musical con el nombre y autor, y un enlace.
   * @param name - El nombre de la canción.
   * @param autor - El autor de la canción.
   * @param link - El enlace para escuchar la canción.
   *
   * Es usado en ConsoleManager
   */
  displayMusic(name: string, autor: string, link: string) {
    const msgElement = document.createElement("div");
    msgElement.classList.add("middle-msg");

    const paragraph = document.createElement("p");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = name;
    nameSpan.className = "text-fuchsia-500";

    const prefixText = document.createTextNode("Reproduciendo ");
    const suffixText = document.createTextNode(" de ");

    const anchor = document.createElement("a");
    anchor.href = link;
    anchor.target = "_blank";
    anchor.rel = "noopener noreferrer";

    const autorSpan = document.createElement("span");
    autorSpan.className =
      "text-lime-500 hover:text-lime-600 transition-all text-[15px]";
    autorSpan.textContent = autor;

    paragraph.appendChild(prefixText);
    paragraph.appendChild(nameSpan);
    paragraph.appendChild(suffixText);
    anchor.appendChild(autorSpan);
    paragraph.appendChild(anchor);

    msgElement.appendChild(paragraph);

    this.parent.appendChild(msgElement);
  }
}
