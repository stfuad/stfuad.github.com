// imports - classes

import {SpellSheet} from "./spellSheet.class.js";

// imports - modules

import {SortByName} from "../modules/sorting.module.js";
import {Element} from "../modules/htmlElements.module.js";

class Spells extends HTMLElement {
    constructor() {
        super();
        
        let shadow = this.attachShadow({mode: 'open'});

        let style = Element('style', shadow);
        style.innerHTML = `
            div {
                overflow-x: hidden;
                overflow-y: auto;
            }

            .header {
                display: block;
                font-weight: bold;
                background-color: gray;
                padding-left: 10px;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
            }

            div > a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-indent: 1em;
                text-overflow: ellipsis;
                color: blue;
                cursor: pointer;
            }
        `;

        CreateList(SortByName(JSON.parse(localStorage.getItem("Spells"))), SpellSheet, "spell-sheet", shadow);
    }
}

customElements.define('spells-page', Spells);