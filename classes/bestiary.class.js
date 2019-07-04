// imports - classes

import {CreatureSheet} from "./creatureSheet.class.js";

// imports - modules

import {SortByName} from "../modules/sorting.module.js";
import {Element} from "../modules/htmlElements.module.js";

export class Bestiary extends HTMLElement {
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

            .grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 1fr;
                grid-gap: 10px;
            }

            #list {
                grid-column: 1;
                overflow: auto;
            }

            #subContent {
                grid-column: 2/3;
            }
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let list = Element('div', container);
        list.id = "list";
    
        let subContent = Element('div', container);
        subContent.id = "subContent";

        CreateList(SortByName(JSON.parse(localStorage.getItem("Bestiary"))), CreatureSheet, "creature-sheet", list);
    }
}

customElements.define('bestiary-page', Bestiary);