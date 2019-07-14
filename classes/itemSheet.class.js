import {Item} from "../modules/item.module.js";

export class ItemSheet extends HTMLElement {
    constructor(name) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.innerHTML = `
            div > h3 {
                margin-top: 0px;
                margin-bottom: 0px;
            }
        `;

        Item(name, JSON.parse(localStorage.getItem("Magic Items"))[name], shadow);

        shadow.appendChild(style);
    }
}

customElements.define('item-sheet', ItemSheet);