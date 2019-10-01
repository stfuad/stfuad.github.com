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
                grid-template-rows: 100vh;
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
        
        let style = document.createElement('style');
        style.textContent = `
            :host {
                display: grid;
                grid-template-columns: 300px 300px 1fr;
                grid-template-rows: 1fr;
            }

            #subNav {
                grid-column: 1;
                grid-row: 1;
                background: white;
                border-bottom: 1px solid black;
                text-align: center;
            }

            #subNav a {
                display: inline-block;
                padding: 10px;
            }

            #subList {
                grid-column: 1;
                grid-row: 2;
            }

            #subList a {
                display: block;
                text-indent: 1em;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            #subContent {
                grid-column: 1;
                grid-row: 3;
                overflow: auto;
            }

            #subContent h1 {
                margin-top: 0px;
            }

            #subContent h3 {
                border-bottom: 1px solid black;
            }

            a {
                color: blue;
                cursor: pointer;
            }

            table {
                width: 100%;
            }
        `;

        shadow.appendChild(style);

        let json = JSON.parse(localStorage.getItem("Classes"));

        let subNav = document.createElement('div');
        subNav.id = "subNav";
    
        for (let className in json) {
            let link = document.createElement('a');
            link.appendChild(document.createTextNode(className));
            link.onclick = () => {
                if (subContent.childElementCount > 0) {
                    while (subContent.firstChild) {
                        subContent.firstChild.remove();
                    }
                }

                if (subList.childElementCount > 0) {
                    while (subList.firstChild) {
                        subList.firstChild.remove();
                    }
                }

                LoadData(className, json[className]);
            };

            subNav.appendChild(link);
        }

        shadow.appendChild(subNav);

        let subList = document.createElement('div');
        subList.id = "subList";

        shadow.appendChild(subList);

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        shadow.appendChild(subContent);

        function LoadData(className, json) {
            let classNameHeader = document.createElement('h1');
            classNameHeader.appendChild(document.createTextNode(className));

            subContent.appendChild(classNameHeader);

            let jsonLevel2;

            for (let key in json) {
                jsonLevel2 = json[key];
        
                if (key !== "Books") {
                    if (key.includes("Table")) {
                        let table = Table(jsonLevel2, subContent);
                        table.id = `${className}-Table`;
                    } else {
                        let categoryContainer = document.createElement('div');
                        categoryContainer.id = `${className}-${key}`;

                        let h2 = document.createElement('h2');
                        h2.appendChild(document.createTextNode(key));

                        categoryContainer.appendChild(h2);

                        if (key === "Eldritch Invocations") {
                            for(let invocation in jsonLevel2) {
                                
                                let div = document.createElement('div');
                                div.id = invocation;
                                
                                let h3 = document.createElement('h3');
                                h3.appendChild(document.createTextNode(invocation));

                                div.appendChild(h3);
                        
                                if(jsonLevel2[invocation]["Prerequisite"] !== undefined) {
                                    let i = document.createElement('i');
                                    i.appendChild(document.createTextNode(`Prerequisite: ${jsonLevel2[invocation]["Prerequisite"]}`));

                                    div.appendChild(i);
                                }
                        
                                Paragraphs(jsonLevel2[invocation]["Description"], div);

                                categoryContainer.appendChild(div);
                            }
                        } else {
                            let jsonLevel3;

                            for (let key2 in jsonLevel2) {
                                jsonLevel3 = jsonLevel2[key2];
                                
                                let level3 = document.createElement('div');
                                level3.id = `${className}-${key}-${key2}`;

                                if (key !== "Description") {
                                    let h3 = document.createElement('h3');
                                    h3.appendChild(document.createTextNode(key2));

                                    level3.appendChild(h3);
                                }
                
                                if (Array.isArray(jsonLevel3)) {
                                    Paragraphs(jsonLevel3, level3);
                                } else {
                                    let jsonLevel4;

                                    for (let key3 in jsonLevel3) {
                                        jsonLevel4 = jsonLevel3[key3];

                                        if(!key3.includes("Table") && !key3.includes("Description") && !key3.includes("Unordered List")) {
                                            let h4 = document.createElement('h4');
                                            h4.appendChild(document.createTextNode(key3));

                                            level3.appendChild(h4);
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

                                categoryContainer.appendChild(level3);
                            }
                        }

                        subContent.appendChild(categoryContainer);
                    }
                }
            }

            let table = shadow.querySelector('table');



            let headers = shadow.querySelectorAll('h2');

            for (let node of headers) {
                let h3 = document.createElement('h3');
                h3.appendChild(document.createTextNode(node.textContent));

                subList.appendChild(h3);

                let className = shadow.querySelector('h1').textContent;

                let category = shadow.getElementById(`${className}-${node.textContent}`).children;

                for (let subNode of category) {
                    if (subNode.id) {
                        if (node.textContent.includes("Invocations")) {
                            let target = shadow.getElementById(subNode.id);
                            
                            let link = document.createElement('a');
                            link.appendChild(document.createTextNode(subNode.id));
                            link.onclick = () => target.scrollIntoView();

                            subList.appendChild(link);
                        } else {
                            let split = subNode.id.split("-");

                            let target = shadow.getElementById(subNode.id);

                            let link = document.createElement('a');
                            link.appendChild(document.createTextNode(split[2]));
                            link.onclick = () => target.scrollIntoView();

                            subList.appendChild(link);
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
            :host {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 100vh;
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

        let list = document.createElement('div');
        list.id = "list";

        shadow.appendChild(list);

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        shadow.appendChild(subContent);
        
        let feats = JSON.parse(localStorage.getItem("Feats"));

        // subContent

        let sorted = Object.keys(feats).sort();

        sorted.forEach(feat => {
            let header = document.createElement('h2');
            header.appendChild(document.createTextNode(feat));
            header.id = feat;

            subContent.appendChild(header);

            for (let key in feats[feat]) {
                if (key === "Prerequisite") {
                    let i = document.createElement('i');
                    i.appendChild(document.createTextNode(`Prerequisite: ${feats[feat]["Prerequisite"]}`));

                    subContent.appendChild(i);
                } else if (key.includes("Description")) {
                    Paragraphs(feats[feat]["Description"], subContent);
                } else if (key === "Unordered List") {
                    List(feats[feat]["Unordered List"], 'ul', subContent);
                }
            }
            
            let footer = document.createElement('i');
            footer.appendChild(document.createTextNode(`${feats[feat]["Book"]}, Pg. ${feats[feat]["Page"]}`));

            subContent.appendChild(footer);
        });

        // list

        let headers = shadow.querySelectorAll('h2');

        for (let header of headers) {
            let link = document.createElement('a');
            link.appendChild(document.createTextNode(header.id));
            link.onclick = () => {
                let target = shadow.getElementById(header.id);

                target.scrollIntoView();
            };

            list.appendChild(link);
        }
    }
}

customElements.define('feats-page', Feats);

export class Bestiary extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 22px calc(100vh - 32px);
                grid-gap: 10px;
            }

            .header {
                display: block;
                font-weight: bold;
                background-color: gray;
                padding-left: 10px;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
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

            shadow.appendChild(style);

        let tabs = document.createElement('div');
        tabs.id = "tabs";

        shadow.appendChild(tabs);

        let list = document.createElement('div');
        list.id = "list";
    
        shadow.appendChild(list);

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        shadow.appendChild(subContent);

        let bestiary = JSON.parse(localStorage.getItem("Bestiary"));

        let sortedByName = sort.ByName(bestiary);
        let sortedByType = sort.ByType(bestiary);
        let sortedByCR = sort.ByCR(bestiary);
        let sortedByBook = sort.ByBook(bestiary);

        // buttons

        let byName = document.createElement('button');
        byName.appendChild(document.createTextNode("by Name"));
        byName.onclick = () => Wrapper(sortedByName);

        tabs.appendChild(byName);

        let byType = document.createElement('button');
        byType.appendChild(document.createTextNode("by Type"));
        byType.onclick = () => Wrapper(sortedByType);

        tabs.appendChild(byType);

        let byCR = document.createElement('button');
        byCR.appendChild(document.createTextNode("by CR"));
        byCR.onclick = () => Wrapper(sortedByCR);

        tabs.appendChild(byCR);

        let byBook = document.createElement('button');
        byBook.appendChild(document.createTextNode("by Book"));
        byBook.onclick = () => Wrapper(sortedByBook);

        tabs.appendChild(byBook);

        CreateList(sortedByName);

        function Wrapper(obj) {
            let list = shadow.querySelector("#list");

            if (list.childElementCount > 0) {
                while (list.firstChild) {
                    list.firstChild.remove();
                }
            }

            CreateList(obj);
        }

        function CreateList(obj) {
            for (let array in obj) {
                let div = document.createElement('div');
        
                if (obj[array].length > 0) {
                    let span = document.createElement('span');
                    span.appendChild(document.createTextNode(array));
                    span.className = "header";

                    div.appendChild(span);
                }
                
                let sorted = obj[array].sort();

                sorted.forEach(item => {
                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(item));
                    a.onclick = () => {
                        let target = shadow.querySelector("creature-sheet");
        
                        if (target !== null) {
                            target.remove()
                        }
                        
                        subContent.appendChild(new sheet.CreatureSheet(item, bestiary[item]));
                    };

                    div.appendChild(a);
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

        let style = document.createElement('style');
        style.innerHTML = `
            .header {
                display: block;
                font-weight: bold;
                background-color: gray;
                padding-left: 10px;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
            }

            :host {
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

        shadow.appendChild(style);

        let tabs = document.createElement('div');
        tabs.id = "tabs";

        shadow.appendChild(tabs);

        let list = document.createElement('div');
        list.id = "list";
    
        shadow.appendChild(list);

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        shadow.appendChild(subContent);

        let spells = JSON.parse(localStorage.getItem("Spells"));

        let sortedByName = sort.ByName(spells);
        let sortedBySchool = sort.BySchool(spells);
        let sortedByClass = sort.ByClass(spells);
        let sortedByLevel = sort.ByLevel(spells);

        let byName = document.createElement('button');
        byName.appendChild(document.createTextNode("by Name"));
        byName.onclick = () => {
            Wrapper(CreateList, sortedByName);
        };

        tabs.appendChild(byName);

        let bySchool = document.createElement('button');
        bySchool.appendChild(document.createTextNode("by School"));
        bySchool.onclick = () => {
            Wrapper(CreateList, sortedBySchool);
        };

        tabs.appendChild(bySchool);

        let byClass = document.createElement('button');
        byClass.appendChild(document.createTextNode("by Class"));
        byClass.onclick = () => {
            Wrapper(CreateClassList, sortedByClass);
        };

        tabs.appendChild(byClass);

        let byLevel = document.createElement('button');
        byLevel.appendChild(document.createTextNode("by Level"));
        byLevel.onclick = () => {
            Wrapper(CreateList, sortedByLevel);
        };

        tabs.appendChild(byLevel);

        CreateList(sortedByName);

        function Wrapper(callback, obj) {
            let list = shadow.querySelector("#list");

            if (list.childElementCount > 0) {
                while (list.firstChild) {
                    list.firstChild.remove();
                }
            }

            callback(obj);
        }

        function CreateList(obj) {
            for (let array in obj) {
                let div = document.createElement('div');

                if (obj[array].length > 0) {
                    let span = document.createElement('span');
                    span.appendChild(document.createTextNode(array));
                    span.className = "header";

                    div.appendChild(span);
                }
                
                obj[array].sort().forEach(item => {
                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(item));
                    a.onclick = () => {
                        let target = shadow.querySelector("spell-sheet");
        
                        if (target !== null) {
                            target.remove()
                        }
                        
                        subContent.appendChild(new sheet.SpellSheet(item, spells[item]));
                    };

                    div.appendChild(a);
                });
        
                list.appendChild(div);
            }
        }
        
        function CreateClassList(obj) {
            for (let var1 in obj) {
                let h2 = document.createElement('h2');
                h2.appendChild(document.createTextNode(var1));

                list.appendChild(h2);
                
                for (let var2 in obj[var1]) {
                    let div = document.createElement('div');

                    if (obj[var1][var2].length > 0) {
                        let span = document.createElement('span');
                        span.appendChild(document.createTextNode(var2));
                        span.className = "header";

                        div.appendChild(span);
                    }
                    
                    obj[var1][var2].sort().forEach(item => {
                        let a = document.createElement('a');
                        a.appendChild(document.createTextNode(item));
                        a.onclick = () => {
                            let target = shadow.querySelector("spell-sheet");
            
                            if (target !== null) {
                                target.remove()
                            }
                            
                            subContent.appendChild(new sheet.SpellSheet(item, spells[item]));
                        };
    
                        div.appendChild(a);
                    });

                    list.appendChild(div);
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