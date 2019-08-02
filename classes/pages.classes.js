// import classes

import * as sheet from "../classes/sheets.classes.js";

// import modules

import {Paragraphs, ParagraphsPrependBold, List, Table, Element, Button, Header, Link} from "../modules/htmlElements.module.js";
import * as sort from "../modules/sorting.module.js";

// global functions

// classes

export class Races extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: calc(100vh - 20px);
                grid-gap: 10px;
            }

            #list {
                grid-column: 1;
                grid-row: 1;
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
                grid-column: 2;
                grid-row: 1;
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

            table {
                width: 100%;
            }
        `;

        shadow.appendChild(style);

        let list = document.createElement('div');
        list.id = "list";

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        let races = JSON.parse(localStorage.getItem('Races'));

        let racesSorted = Object.keys(races).sort();

        // subContent content

        racesSorted.forEach(race => {
            let raceContainer = document.createElement('div');
            raceContainer.id = race;

            let raceHeader = document.createElement('h1');
            raceHeader.appendChild(document.createTextNode(race));

            raceContainer.appendChild(raceHeader);

            for (let category in races[race]) {
                if (category !== "Books") {
                    let categoryContainer = document.createElement('div');
                    categoryContainer.id = `${race}-${category}`;
                    //categoryContainer.className = "level2";

                    let categoryHeader = document.createElement('h2');
                    categoryHeader.appendChild(document.createTextNode(category));
                    
                    categoryContainer.appendChild(categoryHeader);

                    if (category.includes("Traits")) {
                        let json;

                        for (let trait in races[race][category]) {
                            json = races[race][category][trait];

                            if (Array.isArray(json)) {
                                ParagraphsPrependBold(trait, json, categoryContainer);
                            } else {
                                if (trait.includes("Table")) {
                                    Table(json, categoryContainer);
                                } else {
                                    let subJson;

                                    for (let subTrait in json) {
                                        subJson = json[subTrait];

                                        if (Array.isArray(subJson)) {
                                            if (subTrait === "Description") {
                                                ParagraphsPrependBold(trait, subJson, categoryContainer);
                                            } else if (subTrait === "Description-cont") {
                                                Paragraphs(subJson, categoryContainer);
                                            } else {
                                                ParagraphsPrependBold(subTrait, subJson, categoryContainer);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // due to the way the json is structured you need to perform a recursive like function. If the key is for an array check using Array.isArray() otherwise go one level deeper using for ... in ...

                    if (category === "Sub Races" || category === "Creeds") {
                        let subRacesSorted = Object.keys(races[race][category]).filter(word => word !== "Description").sort();

                        if (races[race][category]["Description"] !== undefined) {
                            Paragraphs(races[race][category]["Description"], categoryContainer);
                        }

                        subRacesSorted.forEach(subRace => {
                            let subRaceContainer = document.createElement('div');
                            subRaceContainer.id = `${race}-${subRace}`;

                            let subRaceHeader = document.createElement('h3');
                            subRaceHeader.appendChild(document.createTextNode(subRace));

                            subRaceContainer.appendChild(subRaceHeader);

                            // Sub Race, Creeds... keys

                            for (let trait in races[race][category][subRace]) {
                                if (Array.isArray(races[race][category][subRace][trait])) {
                                    if (trait.includes("Description")) {
                                        Paragraphs(races[race][category][subRace][trait], subRaceContainer);
                                    } else {
                                        ParagraphsPrependBold(trait, races[race][category][subRace][trait], subRaceContainer);
                                    }
                                } else {
                                    for (let subTrait in races[race][category][subRace][trait]) {
                                        if (Array.isArray(races[race][category][subRace][trait][subTrait])) {
                                            if (subTrait === "Description") {
                                                ParagraphsPrependBold(trait, races[race][category][subRace][trait][subTrait], subRaceContainer);
                                            } else if (subTrait === "Description-cont") {
                                                Paragraphs(subJson, subRaceContainer);
                                            } else {
                                                ParagraphsPrependBold(subTrait, races[race][category][subRace][trait][subTrait], subRaceContainer);
                                            }
                                        } else {
                                            // Tribes, Nations... keys

                                            let subTraitHeader = document.createElement('h4');
                                            subTraitHeader.appendChild(document.createTextNode(subTrait));

                                            subRaceContainer.appendChild(subTraitHeader);

                                            for (let subSub in races[race][category][subRace][trait][subTrait]) {
                                                let shorten = races[race][category][subRace][trait][subTrait][subSub];

                                                if (subSub === "Description") {
                                                    Paragraphs(shorten, subRaceContainer);
                                                } else {
                                                    ParagraphsPrependBold(subSub, shorten, subRaceContainer);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            categoryContainer.appendChild(subRaceContainer);
                        });
                    }

                    raceContainer.appendChild(categoryContainer);
                }
            }

            subContent.appendChild(raceContainer);
        });

        shadow.appendChild(subContent);

        // list content

        let listRaceHeaders = shadow.querySelectorAll('h1');
        
        for (let node of listRaceHeaders) {
            let h2 = document.createElement('h2');
            h2.appendChild(document.createTextNode(node.textContent));

            list.appendChild(h2);

            let link = document.createElement('a');
            link.appendChild(document.createTextNode("Traits"));
            link.onclick = () => {
                let target = shadow.getElementById(`${node.textContent} Traits`);

                target.scrollIntoView();
            }

            list.appendChild(link);

            let subRaceNodes = shadow.getElementById(`${node.textContent}-Sub Races`);

            if (subRaceNodes !== null) {
                let h3 = document.createElement('h3');
                h3.appendChild(document.createTextNode("Sub Races"));

                list.appendChild(h3);

                for (let subNode of subRaceNodes.children) {
                    if (subNode.id !== "") {
                        let split = subNode.id.split("-");

                        let subLink = document.createElement('a');
                        subLink.appendChild(document.createTextNode(split[1]));
                        subLink.onclick = () => {
                            let target = shadow.getElementById(subNode.id);

                            target.scrollIntoView();
                        }

                        list.appendChild(subLink);
                    }
                }
            }
        }

        shadow.appendChild(list);
    }
}

customElements.define('races-page', Races);

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
            level1.id = className;
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
        
                if (key !== "Books") {
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
                                    
                                    /* let level4 = Element('div', level3);
                                    level4.className = "level4"; */

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

                                            /* let level5 = Element('div', level3);
                                            level5.className = "level5"; */

                                            //console.log(`Level 5 - ${className} - ${key3} - ${key4}`);
                                    
                                            if(key4.includes("Table")) {
                                                Table(jsonLevel5, level3);
                                            } else if (key4.includes("Unordered List")) {
                                                List(jsonLevel5, 'ul', level3);
                                            } else if (Array.isArray(jsonLevel5)){
                                                if(!key4.includes("Description")) {
                                                    ParagraphsPrependBold(key4, jsonLevel5, level3);
                                                } else {
                                                    Paragraphs(jsonLevel5, level3);
                                                }
                                            } else {
                                                let jsonLevel6;

                                                for (let key5 in jsonLevel5) {
                                                    jsonLevel6 = jsonLevel5[key5];

                                                    //console.log(`Level 6 - ${className} - ${key4} - ${key5}`);
                                                    
                                                    if (key5.includes("Table")) {
                                                        Table(jsonLevel6, level3);
                                                    } else if (key5 === "Unordered List") {
                                                        List(jsonLevel6, 'ul', level3);
                                                    } else {
                                                        ParagraphsPrependBold(key5, jsonLevel6, level3);
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
            }
        }
    }
}

customElements.define('classes-page', Classes);

export class Feats extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
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

        shadow.appendChild(style);

        let container = document.createElement('div');
        container.className = "grid";

        let list = document.createElement('div');
        list.id = "list";

        container.appendChild(list);

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        container.appendChild(subContent);
        
        shadow.appendChild(container);

        let feats = JSON.parse(localStorage.getItem("Feats"));

        let sorted = Object.keys(feats).sort();

        for (let feat in feats) {
            let header = Header('h2', feat, subContent);
            header.id = feat;

            if (feats[feat]["Prerequisite"] !== undefined) {
                let i = Element('i', subContent);
                i.appendChild(document.createTextNode(`Prerequisite: ${feats[feat]["Prerequisite"]}`));
            }

            Paragraphs(feats[feat]["Description"], subContent);

            if (feats[feat]["Unordered List"] !== undefined) {
                List(feats[feat]["Unordered List"], 'ul', subContent);
            }

            let a = Link(feat, undefined, list);
            a.addEventListener('click', () => {
                let target = shadow.getElementById(feat);

                target.scrollIntoView();
            }, false);

            let footer = Element('i', subContent);
            footer.appendChild(document.createTextNode(`${feats[feat]["Book"]}, Pg. ${feats[feat]["Page"]}`));
        }
    }
}

customElements.define('feats-page', Feats);

export class Bestiary extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = Element('style', shadow);
        style.textContent = `
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

        let bestiary = JSON.parse(localStorage.getItem("Bestiary"));

        let sortedByName = sort.ByName(bestiary);
        let sortedByType = sort.ByType(bestiary);
        let sortedByCR = sort.ByCR(bestiary);
        let sortedByBook = sort.ByBook(bestiary);

        // buttons

        let byName = Button("by Name", tabs);
        byName.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByName);
        }, false);

        let byType = Button("by Type", tabs);
        byType.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByType);
        }, false);

        let byCR = Button("by CR", tabs);
        byCR.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByCR);
        }, false);

        let byBook = Button("by Book", tabs);
        byBook.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByBook);
        }, false);

        CreateList(sortedByName);

        function CreateList(obj) {
            for (let array in obj) {
                let div = Element('div', list);
        
                if (obj[array].length > 0) {
                    let span = Element('span', div);
                    span.appendChild(document.createTextNode(array));
                    span.className = "header";
                }
                
                obj[array].sort().forEach(item => {
        
                    let a = Link(item, undefined, div)
                    a.addEventListener('click', () => {
                        let target = shadow.querySelector("creature-sheet");
        
                        if (target !== null) {
                            target.remove()
                        }
                        
                        subContent.appendChild(new sheet.CreatureSheet(item, bestiary[item]));
                    });
                });
        
                list.appendChild(div);
            }
        }
    }
}

customElements.define('bestiary-page', Bestiary);

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

        let sortedByName = sort.ByName(spells);
        let sortedBySchool = sort.BySchool(spells);
        let sortedByClass = sort.ByClass(spells);

        let byName = Button("by Name", tabs);
        byName.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByName);
        }, false);

        let bySchool = Button("by School", tabs);
        bySchool.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedBySchool);
        }, false);

        let byClass = Button("by Class", tabs);
        byClass.addEventListener('click', () => {
            list.innerHTML = "";
            CreateClassList(sortedByClass);
        }, false);

        CreateList(sortedByName);

        function CreateList(obj) {
            for (let array in obj) {
                let div = Element('div', list);
        
                if (obj[array].length > 0) {
                    let span = Element('span', div);
                    span.appendChild(document.createTextNode(array));
                    span.className = "header";
                }
                
                obj[array].sort().forEach(item => {
        
                    let a = Link(item, undefined, div)
                    a.addEventListener('click', () => {
                        let target = shadow.querySelector("spell-sheet");
        
                        if (target !== null) {
                            target.remove()
                        }
                        
                        subContent.appendChild(new sheet.SpellSheet(item, spells[item]));
                    });
                });
        
                list.appendChild(div);
            }
        }
        
        function CreateClassList(obj) {
            let host = shadow.getElementById("list");

            for (let var1 in obj) {
                Header('h2', var1, host);
                
                for (let var2 in obj[var1]) {
                    let div = Element('div', host);

                    if (obj[var1][var2].length > 0) {
                        let span = Element('span', div);
                        span.appendChild(document.createTextNode(var2));
                        span.className = "header";
                    }
                    
                    obj[var1][var2].sort().forEach(item => {
            
                        let a = Link(item, undefined, div)
                        a.addEventListener('click', () => {
                            let target = shadow.querySelector("spell-sheet");
            
                            if (target !== null) {
                                target.remove()
                            }
                            
                            subContent.appendChild(new sheet.SpellSheet(item, spells[item]));
                        });
                    });
                }
            }
        }
    }
}

customElements.define('spells-page', Spells);

export class Items extends HTMLElement {
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

        let items = JSON.parse(localStorage.getItem("Magic Items"));

        let sortedByName = sort.ByName(items);
        let sortedByRarity = sort.ByRarity(items);

        let byName = Button("by Name", tabs);
        byName.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByName);
        }, false);

        let byRarity = Button("by Rarity", tabs);
        byRarity.addEventListener('click', () => {
            list.innerHTML = "";
            CreateList(sortedByRarity);
        }, false);

        CreateList(sortedByName);

        function CreateList(obj) {
            for (let array in obj) {
                let div = Element('div', list);
        
                if (obj[array].length > 0) {
                    let span = Element('span', div);
                    span.appendChild(document.createTextNode(array));
                    span.className = "header";
                }
                
                obj[array].sort().forEach(item => {
        
                    let a = Link(item, undefined, div)
                    a.addEventListener('click', () => {
                        let target = shadow.querySelector("item-sheet");
        
                        if (target !== null) {
                            target.remove()
                        }
                        
                        subContent.appendChild(new sheet.ItemSheet(item, items[item]));
                    });
                });
        
                list.appendChild(div);
            }
        }
    }
}

customElements.define('items-page', Items);