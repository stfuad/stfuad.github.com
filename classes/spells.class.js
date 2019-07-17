// imports - classes

import {SpellSheet} from "./spellSheet.class.js";

// imports - modules

import {SortByName, SortBySchool, SortByClass} from "../modules/sorting.module.js";
import {Element, TextElement, Link} from "../modules/htmlElements.module.js";

export class Spells extends HTMLElement {
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
                grid-template-rows: 22px calc(100vh - 42px);
                grid-gap: 10px;
            }

            #tabs > button {
                background-color: white;
                border-radius: 5px;
            }

            #list {
                grid-column: 1;
                grid-row: 2;
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
                grid-column: 2;
                grid-row: 1/3;
                overflow: auto;
            }
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let tabs = Element('div', container);
        tabs.id = "tabs";

        let list = Element('div', container);
        list.id = "list";
    
        let subContent = Element('div', container);
        subContent.id = "subContent";

        let spells = JSON.parse(localStorage.getItem("Spells"));

        let sortedByName = SortByName(spells);
        let sortedBySchool = SortBySchool(spells);
        let sortedByClass = SortByClass(spells);

        let byName = TextElement('button', "by Name", tabs);
        byName.type = "button";
        byName.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByName);
        }, false);

        let bySchool = TextElement('button', "by School", tabs);
        bySchool.type = "button";
        bySchool.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedBySchool);
        }, false);

        let byClass = TextElement('button', "by Class", tabs);
        byClass.type = "button";
        byClass.addEventListener('click', () => {
            list.innerHTML = "";
            CreateClassList(sortedByClass);
        }, false);

        CreateList(sortedByName);

        function CreateList(obj) {
            for (let array in obj) {
                let div = Element('div', list);
        
                if (obj[array].length > 0) {
                    let span = TextElement('span', array, div);
                    span.className = "header";
                }
                
                obj[array].sort().forEach(item => {
        
                    let a = Link(item, undefined, div)
                    a.addEventListener('click', () => {
                        let target = shadow.querySelector("spell-sheet");
        
                        if (target !== null) {
                            target.remove()
                        }
                        
                        subContent.appendChild(new SpellSheet(item, spells[item]));
                    });
                });
        
                list.appendChild(div);
            }
        }
        
        function CreateClassList(obj) {
            let host = shadow.getElementById("list");

            for (let var1 in obj) {
                let h2 = TextElement('h2', var1, host);
                
                for (let var2 in obj[var1]) {
                    let div = Element('div', host);

                    if (obj[var1][var2].length > 0) {
                        let span = TextElement('span', var2, div);
                        span.className = "header";
                    }
                    
                    obj[var1][var2].sort().forEach(item => {
            
                        let a = Link(item, undefined, div)
                        a.addEventListener('click', () => {
                            let target = shadow.querySelector("spell-sheet");
            
                            if (target !== null) {
                                target.remove()
                            }
                            
                            subContent.appendChild(new SpellSheet(item, spells[item]));
                        });
                    });
                }
            }
        }
    }
}

customElements.define('spells-page', Spells);