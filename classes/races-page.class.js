// modules

import {Paragraphs, ParagraphsPrependBold, Table, Element, Header, Link} from "../modules/htmlElements.module.js";

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

            #subContent h2 {
                margin-bottom: 0px;
                border-bottom: 1px solid black;
            }

            b + p {
                display: inline;
            }

            table {
                width: 100%;
            }

            .level2 {
                background-color: #d6eaf8 ;
            }

            .level3 {
                background-color: #85c1e9;
            }

            .level4 {
                background-color: #3498db;
            }

            .level5 {
                background-color: #2874a6;
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
            level1.id = race;

            Header('h1', race, level1);

            Header('h3', race, list);

            let level2Json;

            for (let var2 in races[race]) {
                level2Json = races[race][var2];

                let level2 = Element('div', level1);
                level2.id = var2;
                //level2.className = "level2";

                Header('h2', var2, level2);

                let listLink = Link(var2, undefined, list);
                listLink.addEventListener('click', () => {
                    level2.scrollIntoView();
                }, false);

                let level3Json;

                for (let var3 in level2Json) {
                    level3Json = level2Json[var3];

                    if (Array.isArray(level3Json)) {
                        if (var3 !== "Description") {
                            ParagraphsPrependBold(var3, level3Json, level2);
                        } else {
                            Paragraphs(level3Json, level2);
                        }
                    } else if (var3.includes("Table")) {
                        Table(level3Json, level2);
                    } else {
                        let h3 = document.createElement('h3');
                        h3.appendChild(document.createTextNode(var3));
            
                        level2.appendChild(h3);
            
                        let level4Json;

                        for (let var4 in level3Json) {
                            level4Json = level3Json[var4];

                            if (Array.isArray(level4Json)) {
                                if (var4 !== "Description") {
                                    ParagraphsPrependBold(var4, level4Json, level2);
                                } else {
                                    Paragraphs(level4Json, level2);
                                }
                            } else {
                                let level5Json;

                                for (let var5 in level4Json) {
                                    level5Json = level4Json[var5];

                                    if (var5 === "Description") {
                                        ParagraphsPrependBold(var4, level5Json, level2);
                                    } else if (var5 !== "Description") {
                                        ParagraphsPrependBold(var5, level5Json, level2);
                                    } else {
                                        Paragraphs(level5Json, level2);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

customElements.define('races-page', Races);