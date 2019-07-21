// modules

import {Paragraphs, List, Table, Element, TextElement, Link} from "../modules/htmlElements.module.js";

export class Races extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = Element('style', shadow);
        style.textContent = `
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

            #list > a {
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

            #subContent div {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            b + p {
                display: inline;
            }

            table {
                width: 100%;
            }
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let list = Element('div', container);
        list.id = "list";
    
        let subContent = Element('div', container);
        subContent.id = "subContent";

        let races = JSON.parse(localStorage.getItem('Races'));

        for (let race in races) {
            let level1 = Element('div', subContent);

            TextElement('h1', race, level1);

            TextElement('h3', race, list);

            for (let var2 in races[race]) {
                let level2 = Element('div', level1);
                level2.id = var2;

                TextElement('h2', var2, level2);
                Element('hr', level2);

                let a = Link(var2, undefined, list);
                a.addEventListener('click', () => {
                    level2.scrollIntoView();
                }, false);

                for (let var3 in races[race][var2]) {
                    let level3 = Element('div', level2);
                    level3.id = var3;

                    if (Array.isArray(races[race][var2][var3])) {
                        if (var3 !== "Description") {
                            TextElement('b', `${var3}. `, level3);
                            Paragraphs(races[race][var2][var3], level3);
                        } else {
                            Paragraphs(races[race][var2][var3], level3);
                        }
                    } else if (var3.includes("Table")) {
                        Table(races[race][var2][var3], level3);
                    } else {
                        TextElement('h3', var3, level3);

                        for (let var4 in races[race][var2][var3]) {
                            let level4 = Element('div', level3);
                            level4.id = var4;

                            if (var4 !== "Description") {
                                TextElement('b', `${var4}. `, level4);
                                Paragraphs(races[race][var2][var3][var4], level4);
                            } else {
                                Paragraphs(races[race][var2][var3][var4], level4);
                            }
                        }
                    }
                }
            }
        }
    }
}

customElements.define('races-page', Races);