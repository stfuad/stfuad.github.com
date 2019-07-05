// imports - classes

// imports - modules

import {Paragraphs, List, Table, Element, TextElement, Link} from "../modules/htmlElements.module.js";

export class Classes extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});
        
        let style = Element('style', shadow);
        style.textContent = `
            table {
                width: 100%;
            }

            table th {
                text-align: left;
            }

            .level5 p:first-of-type {
                display: inline;
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
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let list = Element('div', container);
        list.id = "list";
    
        let subContent = Element('div', container);
        subContent.id = "subContent";

        Level1(JSON.parse(localStorage.getItem("Classes")), subContent);

        Navigation();

        function Level1(json, parent) {
            for(let key in json) {
                // console.log(`Level 1 - ${key}`);
                let div = Element('div', parent);
                div.id = key;
        
                let h1 = TextElement('h1', key, div);
                h1.id = key;
        
                //TextElement('h3', key, div);
        
                Level2(json[key], div, h1.id);
            }
        }
        
        function Level2(json, parent, linkTarget) {
            for (let key in json) {
                let div = Element('div', parent);
                div.id = key;
                // div.className = "level2";
        
                // console.log(`Level 2 - ${key}`);
        
                if(key.includes("Table")) {
                    let h2 = TextElement('h2', `${linkTarget} ${key}`, div);
                    h2.id = `${linkTarget} ${key}`;
                } else {
                    let h2 = TextElement('h2', key, div);
                    h2.id = `${linkTarget} ${key}`;
                }
        
                if (key.includes("Table")) {
                    Table(json[key], div);
                } else if (key === "Eldritch Invocations") {
                    EldritchInvocations(json[key], div);
                } else {
                    Level3(json[key], div, linkTarget);
                }
            }
        }
        
        function Level3(json, parent, linkTarget) {
            for (let key in json) {
                let div = Element('div', parent);
                div.id = key;
                // div.className = "level3";
        
                // console.log(`Level 3 - ${key}`);
        
                let h3 = TextElement('h3', key, div);
                //h3.id = `${linkTarget} ${key}`;

                if (Array.isArray(json[key])) {
                    Paragraphs(json[key], div);
                } else {
                    Level4(json[key], div);
                }
            }
        }
        
        function Level4(json, parent) {
            for (let key in json) {
                let div = document.createElement('div');
                div.id = key;
                // div.className = "level3";
        
                // console.log(`Level 4 - ${key}`);
        
                if(!key.includes("Table") && !key.includes("Description") && !key.includes("Calc") && !key.includes("Unordered List")) {
                    let h4 = document.createElement('h4');
                    h4.appendChild(document.createTextNode(key));
                    div.appendChild(h4);
                }
        
                if(key.includes("Table")) {
                    Table(json[key], div);
                } else if (key.includes("Unordered List")) {
                    List(json[key], 'ul', div)
                } else if (Array.isArray(json[key])) {
                    Paragraphs(json[key], div);
                } else {
                    Level5(json[key], div);
                }
        
                parent.appendChild(div);
            }
        }
        
        function Level5(json, parent) {
            for(let key in json) {
                let div = document.createElement('div');
                div.id = key;
                div.className = "level5";
        
                //console.log(`Level 5 - ${key}`);
        
                if(!key.includes("Calc") && !key.includes("Table") && !key.includes("Description") && !key.includes("Unordered List")) {
                    /* let h5 = document.createElement('h5');
                    h5.appendChild(document.createTextNode(key));
                    parent.appendChild(h5); */
        
                    let b = document.createElement('b');
                    b.appendChild(document.createTextNode(`${key}. `));
                    div.appendChild(b);
                }
        
                if(key.includes("Table")) {
                    Table(json[key], div);
                } else if (key.includes("Unordered List")) {
                    List(json[key], 'ul', div);
                } else if (Array.isArray(json[key])){
                    Paragraphs(json[key], div);
                } else {
                    Level6(json[key], div);
                }
        
                parent.appendChild(div);
            }
        }
        
        function Level6(json, parent) {
            for(let key in json) {
                let div = document.createElement('div');
                div.id = key;
                // div.className = "level6";
                
                //console.log(`Level 6 - ${key}`);
                
                if(key.includes("Table")) {
                    Table(json[key], div);
                } else {
                    Paragraphs(json[key], div);
                }
        
                parent.appendChild(div);
            }
        }
        
        function EldritchInvocations(json, parent) {
            for(let invocation in json) {
                let div = document.createElement('div');
                div.id = invocation;
                div.className = "invocation";
        
                let h3 = document.createElement('h3');
                h3.appendChild(document.createTextNode(invocation));
                div.appendChild(h3);
        
                if(json[invocation]["Prerequisite"] !== undefined) {
                    let i = document.createElement('i');
                    i.appendChild(document.createTextNode(`Prerequisite: ${json[invocation]["Prerequisite"]}`));
                    div.appendChild(i);
                }
        
                Paragraphs(json[invocation]["Description"], div);
                
                parent.appendChild(div);
            }
        }
        
        function Navigation() {
            let target = shadow.querySelector("#list");

            let h1s = shadow.querySelectorAll('h1');
            
            for (let h1 of h1s) {
                TextElement('h1', h1.textContent, target);

                let target2 = shadow.getElementById(h1.textContent);

                let h2s = target2.querySelectorAll('h2');

                for (let h2 of h2s) {
                    let a = Link(h2.textContent, undefined, target);
                    a.addEventListener('click', () => {
                        let target3 = shadow.getElementById(h2.id);

                        target3.scrollIntoView();
                    }, false)
                    
                }
            }
        }
    }
}

customElements.define('classes-page', Classes);