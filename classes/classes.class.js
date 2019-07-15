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
        
                TextElement('h1', key, div);
        
                Level2(json[key], div, key);
            }
        }
        
        function Level2(json, parent, linkTarget) {
            for (let key in json) {
                // console.log(`Level 2 - ${key}`);
        
                let div = Element('div', parent);
                div.id = `${linkTarget}-${key}`;
        
                if (key !== "Table") {
                    TextElement('h2', key, div);
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
                // console.log(`Level 3 - ${key}`);

                let div = Element('div', parent);
                

                if (key !== "Description") {
                    div.id = `${linkTarget}-${key}`;

                    TextElement('h3', key, div);
                }

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
            let list = shadow.getElementById("list");
            let subContent = shadow.getElementById("subContent");

            let level1 = subContent.querySelectorAll('h1');

            for (let className of level1) {
                TextElement('h3', className.textContent, list);

                let level2 = subContent.querySelector(`#${className.textContent}`);

                for (let node of level2.childNodes) {
                    if (node.id !== "" && node.id !== undefined) {
                        console.log(`node: ${node.id}`);

                        let split = node.id.split("-");

                        if (node.id.includes("Table")) {
                            let a = Link(split[1], undefined, list);
                            a.addEventListener('click', () => {
                                let target = subContent.querySelector(`#${node.id}`)
                                target.scrollIntoView();
                            }, false)
                        } else {
                            TextElement('h4', split[1], list);
                        }
                        
                        for (let subNode of node.childNodes) {
                            console.log(`subNode: ${subNode.id}`);

                            if (subNode.id !== "") {
                                let split2 = subNode.id.split("-");

                                if(node.id.includes("Invocations")) {
                                    let a = Link(subNode.id, undefined, list);
                                    a.addEventListener('click', () => {
                                        let target = shadow.getElementById(subNode.id);
                                        target.scrollIntoView();
                                    }, false)
                                } else {
                                    let a = Link(split2[1], undefined, list);
                                    a.addEventListener('click', () => {
                                        let target = shadow.getElementById(subNode.id);
                                        target.scrollIntoView();
                                    }, false)
                                }
                                
                            }
                        }
                    }
                }
            }
        }
    }
}

customElements.define('classes-page', Classes);