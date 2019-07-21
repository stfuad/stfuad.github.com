// imports - classes

// imports - modules

import {Paragraphs, List, Table, Element, Header, Text, Link} from "../modules/htmlElements.module.js";

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

            .grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: calc(100vh - 20px);
                grid-gap: 10px;
            }

            a {
                color: blue;
                cursor: pointer;
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
            }

            #subContent {
                grid-column: 2/3;
                overflow: auto;
            }

            #subContent div > b + p {
                display: inline;
            }

            #subContent h1 {
                margin-top: 0px;
            }

            #subContent h3 {
                border-bottom: 1px solid black;
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

            .level6 {
                background-color: red;
            }
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let list = Element('div', container);
        list.id = "list";
    
        let subContent = Element('div', container);
        subContent.id = "subContent";

        let json = JSON.parse(localStorage.getItem("Classes"));

        for(let className in json) {
            //console.log(`Level 1 - ${className}`);

            let level1 = Element('div', subContent);
            //level1.id = className;
            //level1.className = "level1";

            // subContent Header
            Header('h1', className, level1);

            // list Header
            Header('h3', className, list);
            
            let jsonLevel2;

            for (let key in json[className]) {
                jsonLevel2 = json[className][key];
                //console.log(`Level 2 - ${key}`);
        
                let level2 = Element('div', level1);
                level2.id = `${className}-${key}`;
                //level2.className = "level2";
        
                if (key !== "Table") {
                    // subContent Header
                    Header('h2', key, level2);

                    // list Header
                    Header('h4', key, list);
                }
        
                if (key === "Table") {
                    let a = Link("Table", undefined, list);
                    a.addEventListener('click', () => {
                        let target = shadow.getElementById(level2.id);
                        target.scrollIntoView();
                    }, false);

                    Table(jsonLevel2, level2);
                } else if (key === "Eldritch Invocations") {
                    for(let invocation in jsonLevel2) {
                        //console.log(`Invocation - ${invocation}`)

                        let div = Element('div', level2);
                        div.id = invocation;
                        //div.className = "invocation";
                        
                        let a = Link(invocation, undefined, list);
                        a.addEventListener('click', () => {
                            let target = shadow.getElementById(div.id);
                            target.scrollIntoView();
                        }, false);

                        Header('h3', invocation, div);
                
                        if(jsonLevel2[invocation]["Prerequisite"] !== undefined) {
                            let i = Element('i', div);
                            i.appendChild(document.createTextNode(`Prerequisite: ${jsonLevel2[invocation]["Prerequisite"]}`));
                        }
                
                        Paragraphs(jsonLevel2[invocation]["Description"], div);
                    }
                } else {
                    let jsonLevel3;

                    for (let key2 in jsonLevel2) {
                        jsonLevel3 = jsonLevel2[key2];
                        //console.log(`Level 3 - ${key2}`);
        
                        let level3 = Element('div', level2);
                        level3.id = `${className}-${key2}`;
                        //level3.className = "level3";
        
                        let a = Link(key2, undefined, list);
                        a.addEventListener('click', () => {
                            let target = shadow.getElementById(level3.id);
                            target.scrollIntoView();
                        }, false);

                        if (key !== "Description") {
                            Header('h3', key2, level3);
                        }
        
                        if (Array.isArray(jsonLevel3)) {
                            Paragraphs(jsonLevel3, level3);
                        } else {
                            let jsonLevel4;

                            for (let key3 in jsonLevel3) {
                                jsonLevel4 = jsonLevel3[key3];
                                // console.log(`Level 4 - ${key3}`);
                                
                                /* let level4 = document.createElement('div');
                                //level4.className = "level4"; */

                                if(!key3.includes("Table") && !key3.includes("Description") && !key3.includes("Unordered List")) {
                                    Header('h4', key3, level3);
                                }
                        
                                if(key3.includes("Table")) {
                                    Table(jsonLevel4, level3);
                                } else if (key3.includes("Unordered List")) {
                                    List(jsonLevel4, 'ul', level3);
                                } else if (Array.isArray(jsonLevel4)) {
                                    Paragraphs(jsonLevel4, level3);
                                } else {
                                    let jsonLevel5;

                                    for(let key4 in jsonLevel4) {
                                        jsonLevel5 = jsonLevel4[key4];

                                        let level5 = document.createElement('div');
                                        //level5.className = "level5";

                                        //console.log(`Level 5 - ${className} - ${key3} - ${key4}`);
                                
                                        if(key4.includes("Table")) {
                                            Table(jsonLevel5, level5);
                                        } else if (key4.includes("Unordered List")) {
                                            List(jsonLevel5, 'ul', level5);
                                        } else if (Array.isArray(jsonLevel5)){
                                            if(!key4.includes("Description")) {
                                                let b = Element('b', level5);
                                                b.appendChild(document.createTextNode(`${key4}. `));
                                            }
                                                    
                                            Paragraphs(jsonLevel5, level5);
                                        } else {
                                            let jsonLevel6;

                                            for (let key5 in jsonLevel5) {
                                                jsonLevel6 = jsonLevel5[key5];

                                                //console.log(`Level 6 - ${className} - ${key4} - ${key5}`);
                                                
                                                if (key5.includes("Table")) {
                                                    Table(jsonLevel6, level5);
                                                } else if (key5 === "Unordered List") {
                                                    List(jsonLevel6, 'ul', level5);
                                                } else {
                                                    let b = Element('b', level5);
                                                    b.appendChild(document.createTextNode(`${key4}. `));
                                
                                                    Paragraphs(jsonLevel6, level5);
                                                }
                                            }
                                        }

                                        level3.appendChild(level5);
                                    }
                                }

                                /* level3.appendChild(level4); */
                            }
                        }
                    }
                }
            }
        }
    }
}

customElements.define('classes-page', Classes);