// Declara que el parámetro parent puede ser de tipo Document o Element
export const $ = (query: string, parent: Document | Element = document): Element | null => {
    if (parent instanceof Document || parent instanceof Element) {
        return parent.querySelector(query);
    } else {
        console.error('Invalid parent element provided for $ function');
        return null;
    }
};

export const $$ = (query: string, parent: Document | Element = document): NodeListOf<Element> => {
    if (parent instanceof Document || parent instanceof Element) {
        return parent.querySelectorAll(query);
    } else {
        console.error('Invalid parent element provided for $$ function');
        return document.createDocumentFragment().childNodes as NodeListOf<Element>; // Empty NodeList
    }
};


export const clases = {
    ALERTA: "alerta-msg",
    INLINE: "inline-msg",
    MSG: "msg",
    CONSOLA: "consola",
};
export const dotClass = (clase: string) => {
    return "." + clase;
};