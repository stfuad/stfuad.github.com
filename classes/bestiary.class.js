// imports - classes

import {CreatureSheet} from "./creatureSheet.class.js";

// imports - modules

import {SortByName} from "../modules/sorting.module.js";
import {Element, TextElement, Link} from "../modules/htmlElements.module.js";

export class Bestiary extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = Element('style', shadow);
        style.innerHTML = `
            .header {
                display: block;
                font-weight: bold;
                background-color: gray;
                padding-left: 10px;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
            }

            .grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: calc(100vh - 20px);
                grid-gap: 10px;
            }

            #list {
                grid-column: 1;
                overflow: auto;
            }

            #list > div > a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-indent: 1em;
                text-overflow: ellipsis;
                color: blue;
                cursor: pointer;
            }

            #subContent {
                grid-column: 2/3;
                overflow: auto;
            }
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let list = Element('div', container);
        list.id = "list";
    
        let subContent = Element('div', container);
        subContent.id = "subContent";

        let bestiary = JSON.parse(localStorage.getItem("Bestiary"));
        let keys = SortByName(bestiary);

        for (let array in keys) {
            let div = Element('div', list);
    
            let span = TextElement('span', array, div);
            span.className = "header";
    
            keys[array].sort().forEach(item => {
    
                let a = Link(item, undefined, div)
                a.addEventListener('click', () => {
                    let target = shadow.querySelector("creature-sheet");
    
                    if (target !== null) {
                        target.remove()
                    }
                    
                    subContent.appendChild(new CreatureSheet(item, bestiary[item]));
                });
            });
    
            list.appendChild(div);
        }
    }
}

customElements.define('bestiary-page', Bestiary);