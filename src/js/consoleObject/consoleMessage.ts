export class ConsoleMessage {
    private parent: HTMLElement;
    private message: string;
    private className: string;
  
    constructor(parent: HTMLElement, message: string, className: string) {
      this.parent = parent;
      this.message = message;
      this.className = className;
    }
  
    displayMessage() {
      const msgElement = document.createElement("div");
      msgElement.classList.add(this.className);
      msgElement.innerHTML = `<span class="green">></span><p></p>`;
      const paragraph = msgElement.querySelector("p");
  
      if (paragraph) {
        paragraph.textContent = this.message;
      }
  
      if (this.parent) {
        this.parent.appendChild(msgElement);
      }
    }
  }
  