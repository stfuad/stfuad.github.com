import * as HTML from "./modules/html.module.js";

const classes = JSON.parse(localStorage.getItem("Classes"));
const feats = JSON.parse(localStorage.getItem("Feats"));
const spells = JSON.parse(localStorage.getItem("Spells"));

const content = document.getElementById("content");

const char = {
    "name": "",
    "race": "",
    "subrace": "",
    "hitPointsMax": "",
    "hitPoints": "",
    "tempHitPoints": "",
    "classes": {},
    "subclasses": {},
    "abilityScores": {},
    "savingThrows": {},
    "skillProficiencies": {},
    "weaponProficiencies": {},
    "armorProficiencies": {},
    "skillExpertise": {},
    "feats": [],
    "classFeatures": [],
    "racialTraits": [],
    "equipment": [],
    "loot": [],
    "spellsCantripsLevel": [],
    "spells1stLevel": [],
    "spells2ndLevel": [],
    "spells3rdLevel": [],
    "spells4thLevel": [],
    "spells5thLevel": [],
    "spells6thLevel": [],
    "spells7thLevel": [],
    "spells8thLevel": [],
    "spells9thLevel": []
};

export function MenuEventListeners() {
    
    let newCharacter = document.getElementById("new");
    newCharacter.addEventListener("click", () => {
        content.innerHTML = "";

        content.appendChild(new CharacterTemplate(undefined));
    }, false);

    let openCharacter = document.getElementById("open");
    openCharacter.addEventListener("click", () => {
        document.body.appendChild(new OpenModal());
    }, false);

    let saveCharacter = document.getElementById("save");
    saveCharacter.onclick = () => {
        if (content.innerHTML) {
            SavetoLocalStorage();
        }
    };
}

function SavetoLocalStorage() {
    let sheet = document.querySelector("character-template");
    let shadow = sheet.shadowRoot;

    char["name"] = shadow.getElementById("name").value;
    char["race"] = shadow.getElementById("race").value;
    char["subrace"] = shadow.getElementById("subrace").value;
    char["hitPointsMax"] = shadow.getElementById("hitPointsMax").value;
    char["hitPoints"] = shadow.getElementById("hitPoints").value;
    char["tempHitPoints"] = shadow.getElementById("tempHitPoints").value;

    ToObject(char, 
    shadow.querySelectorAll("[name=\"classes\"]"),
    shadow.querySelectorAll("[name=\"subclasses\"]"),
    shadow.querySelectorAll("[name=\"abilityScores\"]"),
    shadow.querySelectorAll("[name=\"savingThrows\""),
    shadow.querySelectorAll("[name=\"skillProficiencies\""),
    shadow.querySelectorAll("[name=\"weaponProficiencies\""),
    shadow.querySelectorAll("[name=\"armorProficiencies\""),
    shadow.querySelectorAll("[name=\"skillExpertise\"")
    )

    ToArray(char,
    shadow.getElementById("featsFieldset").querySelectorAll("link-element"),
    /* shadow.getElementById("classFeaturesFieldset").querySelectorAll("link-element"), */
    shadow.getElementById("racialTraitsFieldset").querySelectorAll("link-element"),
    shadow.getElementById("equipmentFieldset").querySelectorAll("link-element"),
    shadow.getElementById("lootFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spellsCantripsFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells1stLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells2ndLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells3rdLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells4thLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells5thLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells6thLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells7thLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells8thLevelFieldset").querySelectorAll("link-element"),
    shadow.getElementById("spells9thLevelFieldset").querySelectorAll("link-element")
    )


    if (char["name"]) {
        localStorage.setItem(`character-${char["name"]}`, JSON.stringify(char));
        console.log(`Saved to character-${char["name"]} in localStorage`)
    } else {
        console.log("Enter a character name.");
    }
}

function ToObject(json, ...nodeList) {
    nodeList.forEach(nodes => {
        for (let node of nodes) {
            if (node.type === "checkbox") {
                json[node.name][node.id] = node.checked;
            } else if (node.type === "number") {
                if (node.value) {
                    json[node.name][node.id] = node.value;
                } else {
                    json[node.name][node.id] = 0;
                }
            } else {
                json[node.name][node.id] = node.value;
            }
        }
    });
}

function ToArray(json, ...nodeList) {
    nodeList.forEach(nodes => {
        for (let node of nodes) {
            json[node.getAttribute("fieldset")].push(node.id);
        }
    });
}

/* Modals */

class AddItemModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            h3 {
                margin: 0px;
            }

            input {
                display: block;
            }

            select {
                display: block;
            }
        `;

        shadow.appendChild(style);

        shadow.appendChild(HTML.Header("h3", "Add an Item..."))

        let input = HTML.Input("text", undefined);

        shadow.appendChild(input);

        shadow.appendChild(HTML.Header("h3", "...to..."))

        let select = HTML.Select(undefined);
        select.appendChild(HTML.Option("equipmentFieldset", "Equipment"));
        select.appendChild(HTML.Option("lootFieldset", "Loot"));
        
        shadow.appendChild(select);

        let addButton = HTML.Button("Add Item");
        addButton.onclick = () => {
            let sheet = document.querySelector("character-template");
            let shadow = sheet.shadowRoot;
            let target = shadow.querySelector(`#${select.value}`);

            if (input.value) {
                target.appendChild(new LinkElement(select.value, input.value));

                this.remove();                        
            }
        }

        let cancelButton = HTML.Button("Cancel");
        cancelButton.onclick = () => {
            this.remove();
        }

        shadow.appendChild(addButton);
        shadow.appendChild(cancelButton);
    }
}

customElements.define("additem-modal", AddItemModal);

class AddSpellModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            h3 {
                margin: 0px;
            }

        `;

        shadow.appendChild(style);

        shadow.appendChild(HTML.Header("h3", "Add a spell..."));
        
        let sorted = Object.keys(spells).sort();

        let select = HTML.Select(undefined);

        sorted.forEach(key => {
            let option = document.createElement('option');
            option.value = key;
            option.text = key;

            select.appendChild(option);
        });

        shadow.appendChild(select);

        let addButton = HTML.Button("Add Spell");
        addButton.onclick = () => {
            let sheet = document.querySelector("character-template");
            let shadow = sheet.shadowRoot;
            let fieldset;

            if (spells[select.value]["Level"] === 0) {
                fieldset = "spellsCantripsFieldset";
            } else if (spells[select.value]["Level"] === 1) {
                fieldset = "spells1stLevelFieldset";
            } else if (spells[select.value]["Level"] === 2) {
                fieldset = "spells2ndLevelFieldset";
            } else if (spells[select.value]["Level"] === 3) {
                fieldset = "spells3rdLevelFieldset";
            } else if (spells[select.value]["Level"] === 4) {
                fieldset = "spells4thLevelFieldset";
            } else if (spells[select.value]["Level"] === 5) {
                fieldset = "spells5thLevelFieldset";
            } else if (spells[select.value]["Level"] === 6) {
                fieldset = "spells6thLevelFieldset";
            } else if (spells[select.value]["Level"] === 7) {
                fieldset = "spells7thLevelFieldset";
            } else if (spells[select.value]["Level"] === 8) {
                fieldset = "spells8thLevelFieldset";
            } else if (spells[select.value]["Level"] === 9) {
                fieldset = "spells9thLevelFieldset";
            }

            let target = shadow.querySelector(`#${fieldset}`);
            
            let link = new LinkElement(fieldset, select.value);
            let linkShadow = link.shadowRoot;
            let a = linkShadow.querySelector('a');

            a.onclick = () => {
                document.body.appendChild(new SpellModal(select.value));
            }

            target.appendChild(link);

            this.remove();
        }

        let cancelButton = HTML.Button("Cancel");
        cancelButton.onclick = () => {
            this.remove();
        }

        shadow.appendChild(addButton);
        shadow.appendChild(cancelButton);
    }
}

customElements.define("addspell-modal", AddSpellModal);

class AddLinkModal extends HTMLElement {
    constructor(fieldset) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            input {
                display: block;
            }

            h3 {
                margin: 0px;
            }

        `;

        shadow.appendChild(style);

        shadow.appendChild(HTML.Header("h3", "Add..."));

        let input = HTML.Input("text", undefined);

        shadow.appendChild(input);

        let addButton = HTML.Button("Add");
        addButton.onclick = () => {
            let sheet = document.querySelector("character-template");
            let shadow = sheet.shadowRoot;
            let target = shadow.querySelector(`#${fieldset}`);
            
            if (input.value) {
                target.appendChild(new LinkElement(fieldset, input.value));

                this.remove();
            }
        }

        let cancelButton = HTML.Button("Cancel");
        cancelButton.onclick = () => {
            this.remove();
        }

        shadow.appendChild(addButton);
        shadow.appendChild(cancelButton);
    }
}

customElements.define("addlink-modal", AddLinkModal);

class AddFeatModal extends HTMLElement {
    constructor(fieldset) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            input {
                display: block;
            }

            h3 {
                margin: 0px;
            }

        `;

        shadow.appendChild(style);

        shadow.appendChild(HTML.Header("h3", "Add..."));

        let select = HTML.Select(undefined);

        for (let key in feats) {
            select.appendChild(HTML.Option(key, key));
        }

        shadow.appendChild(select);

        let addButton = HTML.Button("Add");
        addButton.onclick = () => {
            let sheet = document.querySelector("character-template");
            let shadow = sheet.shadowRoot;
            let target = shadow.querySelector(`#${fieldset}`);
            
            if (select.value) {
                target.appendChild(new LinkElement(fieldset, select.value));

                this.remove();
            }
        }

        let cancelButton = HTML.Button("Cancel");
        cancelButton.onclick = () => {
            this.remove();
        }

        shadow.appendChild(addButton);
        shadow.appendChild(cancelButton);
    }
}

customElements.define("addfeat-modal", AddFeatModal);

class AddSubclassModal extends HTMLElement {
    constructor(className) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            h3 {
                margin: 0px;
            }

        `;

        shadow.appendChild(style);
    }
}

customElements.define('addsubclass-modal', AddSubclassModal);

class OpenModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            h3 {
                margin: 0px;
            }

        `;

        shadow.appendChild(style);

        let localText = document.createElement('h3');
        localText.appendChild(document.createTextNode("Load a saved character from localStorage..."));

        shadow.appendChild(localText);

        let select = HTML.Select(undefined);
        
        let keys = Object.keys(localStorage);

        let content = document.getElementById("content");

        if (keys.length > 0) {
            keys.forEach(key => {
                if (key.includes("character")) {
                    let split = key.split("-");

                    select.appendChild(HTML.Option(key, split[1]));
                }
            });

            let loadButton = HTML.Button("Load");
            loadButton.type = "button";
            loadButton.onclick = () => {
                let json = JSON.parse(localStorage.getItem(select.value));

                content.innerHTML = "";

                content.appendChild(new CharacterTemplate(json));

                this.remove();
            };

            shadow.appendChild(select);
            shadow.appendChild(loadButton);
        } else {
            shadow.appendChild(document.createTextNode("No saved characters..."))
        }
        

        let importText = document.createElement('h3');
        importText.appendChild(document.createTextNode("...or import a JSON file..."));

        shadow.appendChild(importText);

        let importFile = document.createElement('input');
        importFile.type = "file";
        importFile.id = "file-input"
        importFile.onchange = e => {
            let file = e.target.files[0];

            if (!file) { return; }

            let reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            reader.onload = readerEvent => {
                let json = JSON.parse(readerEvent.target.result);

                /* Do something if the content div has children */

                if (content.childElementCount > 0) {
                    content.innerHTML = "";
                }

                /* Check for template support and clone the template to the content div. */

                content.appendChild(new CharacterTemplate(json));

                this.remove();
            }
        }

        shadow.appendChild(importFile);

        let cancelText = document.createElement('h3');
        cancelText.appendChild(document.createTextNode("...or close this window."));

        shadow.appendChild(cancelText);

        let closeButton = document.createElement('button');
        closeButton.type = "button";
        closeButton.appendChild(document.createTextNode("Cancel"));
        closeButton.onclick = () => {
            this.remove();
        };

        shadow.appendChild(closeButton);
    }
}

customElements.define("open-modal", OpenModal);

class InfoModal extends HTMLElement {

    /* Used for Feat, Feature, Trait display */

    constructor(title, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                position: fixed;
                top: 50%;
                left: 50%;
                height: auto;
                width: auto;
                transform: translate(-50%, -50%);
                border: 1px solid black;
                padding: 10px;
                background-color: white;
            }

            h3 {
                margin: 0px;
            }

            button {
                position: absolute;
                top: 0px;
                right: 0px;
            }

        `;

        shadow.appendChild(style);
        
        shadow.appendChild(HTML.Header("h3", title));

        /* console.log(json); */

        if (json[title]) {
            if (Array.isArray(json[title])) {
                Paragraphs(json[title]).forEach(element => {
                    shadow.appendChild(element)
                });
            } else {
                for (let key in json[title]) {
                    if (key.includes("Description")) {
                        Paragraphs(json[title][key]).forEach(element => {
                            shadow.appendChild(element)
                        });
                    } else if (key === "Unordered List") {
                        shadow.appendChild(List(json[title][key], "ul"));
                    } else if (key.includes("Table")) {

                    }
                }
            }
        }

        let button = document.createElement('button');
        button.appendChild(document.createTextNode("\u2716"));
        button.onclick = () => {
            this.remove();
        };

        shadow.appendChild(button);

        function Paragraphs(array) {
            let temp = [];
    
            array.forEach(line => {
                let p = document.createElement('p');
    
                if(line.includes('#')) {
                    let split = line.split('#');
    
                    let b = document.createElement('b');
                    b.appendChild(document.createTextNode(`${split[0]}. `));
                    p.appendChild(b);
    
                    p.appendChild(document.createTextNode(split[1]));
                } else if (line.includes('=')) {
                    let split = line.split('=');
    
                    let b = document.createElement('b');
                    b.appendChild(document.createTextNode(`${split[0]} `));
                    p.appendChild(b);
    
                    p.appendChild(document.createTextNode(`= ${split[1]} `));
                } else {
                    p.appendChild(document.createTextNode(line));
                }
    
                temp.push(p);
            });
    
            return temp;
        }

        function List(array, listType) {
            let list = document.createElement(listType);
        
            array.forEach(item => {
                let li = document.createElement('li');
        
                if(item.includes("#")) {
                    let split = item.split("#");
        
                    let b = document.createElement('b');
                    b.appendChild(document.createTextNode(`${split[0]}. `));
                    li.appendChild(b);
        
                    li.appendChild(document.createTextNode(split[1]));
                } else {
                    li.appendChild(document.createTextNode(item));
                }
        
                list.appendChild(li);
            });
        
            return list;
        }
        
        function Table(json, parent) {
            let table = Element('table', parent);

            // Caption

            if(json["Title"] != undefined) {
                let caption = Element('caption', table);

                Text(json["Title"], caption);
            }

            // Headers

            let row0 = Element('tr', table);

            if(json["Headers"] !== undefined) {
                json["Headers"].forEach(header => {
                    let th = Element('th', row0);

                    Text(header, th);
                });
            }
            
            // Rows

            if(json["Rows"] !== undefined) {
                json["Rows"].forEach(row => {
                    let tr = Element('tr', table);

                    for(let key in row) {
                        let td = Element('td', tr);

                        if(key === "Spell" || key === "Spells" || key === "Circle Spells") {
                            let spells = JSON.parse(localStorage.getItem("Spells"));

                            let length = row[key].length

                            for(var i = 0; i < length; i++) {
                                let spell = row[key][i];

                                if(i > 0) {
                                    let a = Link(`, ${spell}`, undefined, td);
                                    a.addEventListener('click', () => {
                                        parent.appendChild(new SpellModal(spell, spells[spell]));
                                    }, false);
                                } else {
                                    let a = Link(spell, undefined, td);
                                    a.addEventListener('click', () => {
                                        parent.appendChild(new SpellModal(spell, spells[spell]));
                                    }, false);
                                }
                            }
                        } else {
                            if (typeof(row[key]) === "string" && row[key].includes("#")) {
                                let split = row[key].split("#");

                                let b = document.createElement('b');
                                b.appendChild(document.createTextNode(`${split[0]}. `));
                                
                                td.appendChild(b);

                                td.appendChild(document.createTextNode(split[1]));

                            } else {
                                td.appendChild(document.createTextNode(row[key]));
                                Text(row[key], td);
                            }
                        }
                    }
                });
            }

            return table;
        }
    }
}

customElements.define("info-modal", InfoModal);

class SpellModal extends HTMLElement {
    constructor(name) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let div = document.createElement('div');
        div.id = "spellModal";

        let style = document.createElement('style');
        style.textContent = `
            #spellModal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: auto;
                max-height: 700px;
                width: 400px;
                border: 1px solid black;
                border-radius: 5px;
                padding: 10px;
                overflow: auto;
                background-color: white;
            }

            #spellSheetHeader > h3 {
                margin-top: 0px;
                margin-bottom: 0px;
            }

            #spellSheetStats {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            #spellSheetClose {
                position: absolute;
                top: 0px;
                right: 0px;
            }

            @media (prefers-color-scheme: dark) {
                #spellModal {
                    color: white;
                    background-color: rgb(32, 32, 32);
                }
            }
            
            @media (prefers-color-scheme: light) {
                #spellModal {
                    color: black;
                    background-color: white;
                }
            }
        `;

        Spell(name, JSON.parse(localStorage.getItem("Spells"))[name], div);

        let button = document.createElement('button');
        button.id = "spellSheetClose";
        button.textContent = "\u2716";
        button.onclick = () => {
            this.remove();
        };

        div.appendChild(button);

        shadow.appendChild(style);
        shadow.appendChild(div);

        function Spell(name, json, parent) {
            /* Header */
            
            let title = document.createElement('h3');
            title.appendChild(document.createTextNode(name));
        
            parent.appendChild(title);
        
            /* Sub-Header */
        
            let scrl = "";
        
            let school = json["School"];
            let cantrip = json["Cantrip"];
            let ritual = json["Ritual"];
            let level = json["Level"];
        
            if(level === 0) {
                scrl = "";
            } else if(level === 1) {
                scrl = "1st-level";
            } else if(level === 2) {
                scrl = "2nd-level";
            } else if(level === 3) {
                scrl = "3rd-level";
            } else if(level >= 4) {
                scrl = `${level}th-level`;
            }
        
            scrl += ` ${school}`;
        
            if(cantrip == true) {
                scrl += " cantrip";
            }
        
            if(ritual == true) {
                scrl += " (ritual)";
            }
        
            let subHeader = document.createElement('i');
            subHeader.appendChild(document.createTextNode(scrl));
        
            parent.appendChild(subHeader);
            
            /* Properties */
        
            KeyValue(json, parent, "Casting Time", "Range", "Components", "Duration");
        
            for(let key in json) {
                if(key.includes("Description")) {
                    Paragraphs(json[key], parent);
                } else if(key == "Higher Levels") {
                    Paragraphs(json[key], parent);
                } else if(key.includes("Unordered List")) {
                    List(json[key], "ul", parent);
                } else if(key.includes("Ordered List")) {
                    List(json[key], "ol", parent);
                } else if(key.includes("Table")) {
                    Table(json[key], parent)
                }
            }
        
            /* Footer */
        
            let footer = document.createElement('i');
            footer.appendChild(document.createTextNode(`${json["Book"]}, Pg. ${json["Page"]}`));
            
            parent.appendChild(footer);
        }
        
        function KeyValue(json, parent, ...keys) {
            keys.forEach(key => {
                let div = document.createElement('div')
        
                BoldKeyValue(key, json[key], div);
        
                parent.appendChild(div);
            });
        }
    }
}

customElements.define('spell-modal', SpellModal);

/* Elements */

class LinkElement extends HTMLElement {
    constructor(fieldset, text) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                display: grid;
                grid-template-rows: 24px;
                grid-template-columns: 1fr auto;
                border: 1px solid black;
                margin: 3px;
                padding: 3px;
            }

            a {
                grid-row: 1;
                grid-column: 1;
            }

            button {
                grid-row: 1;
                grid-column: 2;
            }
        `;

        shadow.appendChild(style);

        let a = document.createElement('a');
        a.appendChild(document.createTextNode(text));

        shadow.appendChild(a);

        
        this.setAttribute("id", text);

        if (fieldset) {
            this.setAttribute("fieldset", fieldset.split("Field")[0]);
            
            if (fieldset.includes("classFeatures")) {
                
            } else {
                let closeButton = HTML.Button("\u2716");
                closeButton.onclick = () => {
                    this.remove();
                }

                shadow.appendChild(closeButton);
            }
        }
        
        this.setAttribute("draggable", true);
    }
}

customElements.define("link-element", LinkElement);

class CharacterTemplate extends HTMLElement {
    constructor(json) {
        super();

        let template = document.getElementById("characterTemplate");
        let content = template.content;

        let shadow = this.attachShadow({mode: "open"});
        shadow.appendChild(content.cloneNode(true));

        if (json) {
            shadow.getElementById("name").value = json["name"];
            shadow.getElementById("race").value = json["race"];
            shadow.getElementById("subrace").value = json["subrace"];
            shadow.getElementById("hitPointsMax").value = json["hitPointsMax"];
            shadow.getElementById("hitPoints").value = json["hitPoints"];
            shadow.getElementById("tempHitPoints").value = json["tempHitPoints"];

            ObjectToSheet(json,
                shadow.querySelectorAll("[name=\"classes\"]"),
                shadow.querySelectorAll("[name=\"subclasses\"]"),
                shadow.querySelectorAll("[name=\"abilityScores\"]"),
                shadow.querySelectorAll("[name=\"savingThrows\""),
                shadow.querySelectorAll("[name=\"skillProficiencies\""),
                shadow.querySelectorAll("[name=\"weaponProficiencies\""),
                shadow.querySelectorAll("[name=\"armorProficiencies\""),
                shadow.querySelectorAll("[name=\"skillExpertise\"")
            )

            shadow.getElementById("proficiencyBonusFieldset")
                .appendChild(document.createTextNode(`+${ProficiencyBonus(AddCharacterLevels(json["classes"]))}`));

            shadow.getElementById("initiativeFieldset")
                .appendChild(document.createTextNode(`+${Modifier(parseInt(json["abilityScores"]["dexterity"]))}`));
            
            ChangeSummaries("abilityScores", "savingThrows", "skillProficiencies", "skillExpertise");

            /* Class Features */

            fetch("./json/5e Data.json")
                .then(response => response.json())
                .then(data => {
                    let classData = data["Classes"]
                    let classFeaturesFieldset = shadow.getElementById("classFeaturesFieldset");

                    for (let key in json["classes"]) {
                        let level = json["classes"][key];

                        if (level) {
                            if (level > 0) {
                                let subclass = json["subclasses"][`${key}Subclass`];

                                if (subclass) {
                                    let fieldset = HTML.Fieldset(undefined, shadow);
                                    fieldset.appendChild(HTML.Legend(key));

                                    for (let name in classData) {
                                        let nameToLower = name.toLowerCase();

                                        if (nameToLower === key) {
                                            let base = classData[name]["Base"];
                                            let placeholder = ClassToSubclass(nameToLower);
                                            let subclassJSON = classData[name][placeholder][subclass];

                                            let clvl = json["classes"][nameToLower];

                                            if (base) {
                                                base.forEach(element => {
                                                    if (element["Level"] <= clvl) {
                                                        element["Features"].forEach(feature => {
                                                            let link = new LinkElement("classFeatures", feature);
                                                            link.onclick = () => {
                                                                document.body.appendChild(new InfoModal(feature, classes[name]["Class Features"]));
                                                            }

                                                            fieldset.appendChild(link);
                                                        });
                                                    }
                                                });
                                            }

                                            subclassJSON.forEach(element => {
                                                if (element["Level"] <= clvl) {
                                                    element["Features"].forEach(feature => {
                                                        let link = new LinkElement("classFeatures", feature);
                                                        link.onclick = () => {
                                                            document.body.appendChild(new InfoModal(feature, classes[name]["Class Features"]));
                                                        }

                                                        fieldset.appendChild(link);
                                                    });
                                                }
                                            });
                                        }
                                    }

                                    classFeaturesFieldset.appendChild(fieldset);
                                } else {
                                    /* open a modal, select a subclass */
                                }
                            }
                        }
                    }
                })
            

            ArrayToSheet(shadow, json, 
                "feats", 
                /* "classFeatures", */ 
                "racialTraits", 
                "equipment",
                "loot", 
                "spells1stLevel", 
                "spells2ndLevel", 
                "spells3rdLevel", 
                "spells4thLevel", 
                "spells5thLevel", 
                "spells6thLevel", 
                "spells7thLevel", 
                "spells8thLevel", 
                "spells9thLevel")
        }

        /* Events */

        shadow.getElementById("addItemLink").onclick = () => {
            document.body.appendChild(new AddItemModal());
        };

        shadow.getElementById("addSpellLink").onclick = () => {
            document.body.appendChild(new AddSpellModal());
        };

        shadow.getElementById("addFeatLink").onclick = () => {
            document.body.appendChild(new AddFeatModal("featsFieldset"));
        };

        shadow.getElementById("addFeatureLink").onclick = () => {
            document.body.appendChild(new AddLinkModal("classFeaturesFieldset"));
        };

        shadow.getElementById("addTraitLink").onclick = () => {
            document.body.appendChild(new AddLinkModal("racialTraitsFieldset"));
        };

        /* Local Functions */

        function FetchWrapper(url) {
            fetch(url)
                .then(response => response.json())
                .then(json => {
                    return json;
                })
        }

        function AddCharacterLevels(json) {
            let total = 0;

            for (let key in json["classes"]) {
                total += parseInt(key);
            }
            
            return total;
        }

        function BuildArray(fieldset) {
            let target = shadow.getElementById(fieldset);
            let inputs = target.querySelectorAll("input");
        
            let array = [];
        
            for (let input of inputs) {
                if (input.type === "checkbox") {
                    let proficiencyBonus = ProficiencyBonus(AddCharacterLevels(json["classes"]));

                    if (input.name === "savingThrows") {
                        if (input.checked) {
                            let modifier = Modifier(json["abilityScores"][input.id])

                            if (modifier > 0) {
                                array.push(`${input.id} +${proficiencyBonus + modifier}`);
                            } else {
                                array.push(`${input.id} ${proficiencyBonus + modifier}`);
                            }
                        }
                    } else if (input.name === "skillProficiencies") {
                        if (input.checked) {
                            let modifier = Modifier(json["abilityScores"][SkillToAbility(input.id)]);
                            
                            if (modifier > 0) {
                                array.push(`${input.id} +${proficiencyBonus + modifier}`);
                            } else {
                                array.push(`${input.id} ${proficiencyBonus + modifier}`);
                            }
                        }
                    } else if (input.name === "skillExpertise") {
                        if (input.checked) {
                            let modifier = Modifier(json["abilityScores"][SkillToAbility(input.id)]);
                            
                            if (modifier > 0) {
                                array.push(`${input.id} +${(proficiencyBonus * 2) + modifier}`);
                            } else {
                                array.push(`${input.id} ${(proficiencyBonus * 2) + modifier}`);
                            }
                        }
                    }
                } else if (input.type === "number") {
                    let value = parseInt(input.value);

                    if (input.name === "abilityScores" && value) {
                            let modifier = Modifier(json["abilityScores"][input.id]);
                            
                            if (modifier > 0) {
                                array.push(`${input.id} +${modifier}`);
                            } else {
                                array.push(`${input.id} ${modifier}`);
                            }
                    }
                }
            }
        
            return array;
        }
        
        function ClassToSubclass(string) {
            if (string === "artificer") {
                
            } else if (string === "barbarian") {
                return "Primal Paths"
            } else if (string === "bard") {
                return "Bard Colleges"
            } else if (string === "cleric") {
                return "Divine Domains"
            } else if (string === "druid") {
                return "Druid Circles"
            } else if (string === "fighter") {
                return "Martial Archetypes"
            } else if (string === "monk") {
                return "Monastic Traditions"
            } else if (string === "paladin") {
                return "Sacred Oaths"
            } else if (string === "ranger") {
                return "Ranger Archetypes"
            } else if (string === "rogue") {
                return "Roguish Archetypes"
            } else if (string === "sorcerer") {
                return "Sorcerous Origins"
            } else if (string === "warlock") {
                return "Otherworldly Patrons"
            } else if (string === "wizard") {
                return "Arcane Traditions"
            }
        }

        function SkillToAbility(skill) {
            if (skill === "acrobatics") {
                return "dexterity";
            } else if (skill === "animalHandling") {
                return "wisdom";
            } else if (skill === "arcana") {
                return "intelligence";
            } else if (skill === "athletics") {
                return "strength";
            } else if (skill === "deception") {
                return "charisma";
            } else if (skill === "history") {
                return "intelligence";
            } else if (skill === "insight") {
                return "wisdom";
            } else if (skill === "intimidation") {
                return "charisma";
            } else if (skill === "investigation") {
                return "intelligence";
            } else if (skill === "medicine") {
                return "wisdom";
            } else if (skill === "nature") {
                return "intelligence";
            } else if (skill === "perception") {
                return "wisdom";
            } else if (skill === "performance") {
                return "charisma";
            } else if (skill === "persuasion") {
                return "charisma";
            } else if (skill === "religon") {
                return "intelligence";
            } else if (skill === "sleightofHand") {
                return "dexterity";
            } else if (skill === "stealth") {
                return "dexterity";
            } else if (skill === "survival") {
                return "wisdom";
            }
        }

        function ChangeSummaries(...keys) {
            keys.forEach(key => {
                ChangeSummary(key);
            });
        }

        function ChangeSummary(key) {
            let target = shadow.getElementById(`${key}Details`);
            
            let summary = target.querySelector("summary");

            let newArray = BuildArray(`${key}Fieldset`);

            summary.textContent = `${summary.textContent} - ${newArray.join(", ")}`;
        }
        
        function ObjectToSheet(json, ...nodeLists) {
            /* console.log(json); */

            nodeLists.forEach(nodeList => {
                for (let node of nodeList) {
                    /* console.log(node); */

                    if (node.type === "checkbox") {
                        node.checked = json[node.name][node.id];
                    } else {
                        node.value = json[node.name][node.id];
                    }
                }
            });
        }
    
        function ArrayToSheet(shadowRoot, json, ...arrays) {
            arrays.forEach(array => {
                json[array].forEach(item => {
                    let target = shadowRoot.querySelector(`#${array}Fieldset`);
    
                    let link = new LinkElement(`${array}Fieldset`, item);
                    let linkShadow = link.shadowRoot;
                    let a = linkShadow.querySelector('a');

                    if (array.includes("spells")) {
                        a.onclick = () => {
                            document.body.appendChild(new SpellModal(item));
                        }
                    } else if (array.includes("feats")) {
                        a.onclick = () => {
                            document.body.appendChild(new InfoModal(item, feats));
                        }
                    }

                    target.appendChild(link);
                });
            });
        }
    
        function ProficiencyBonus(cr) {
            let bonus = 0;
        
            if(cr == 0) {
                bonus = 2;
            } else if(cr == "1/8") {
                bonus = 2;
            } else if(cr == "1/4") {
                bonus = 2;
            } else if(cr == "1/2") {
                bonus = 2;
            } else if(cr < 4) {
                bonus = 2;
            } else if(cr < 9) {
                bonus = 3;
            } else if(cr < 13) {
                bonus = 4;
            } else if(cr < 17) {
                bonus = 5;
            } else if(cr < 21) {
                bonus = 6;
            } else if(cr < 25) {
                bonus = 7;
            } else if(cr < 29) {
                bonus = 8;
            } else if(cr < 31) {
                bonus = 9;
            }
        
            return parseInt(bonus);
        }
        
        function Modifier(int) {
                return Math.floor((parseInt(int) - 10) / 2);
        }
    }
}

customElements.define("character-template", CharacterTemplate);