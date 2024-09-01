// Define una clase Console
export class Console {
    constructor(padre) {
        this.padre = padre;
    }

    appendChild(inputValue, clase) {
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

    command(htmlElement, inputValue) {

        const comando = {
            CLEAR: "clear",
            HOLA: "hola"
        }

        let value = inputValue.toLowerCase();
        if (value === comando.CLEAR) {
            htmlElement.innerHTML = "";
            return;
        } else if (value === comando.HOLA) {
            this.appendChild("Hola, ¿Cómo estás?", "alerta-msg");
        }
    }
    removeAllElements(htmlElement) {
        if (htmlElement.length >= 0) {
            htmlElement.forEach((elemento) => {
                elemento.remove();
            });
        }
    }

    limpiarInput(htmlElement) {
        htmlElement.value = "";
    }
}
