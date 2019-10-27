import * as HTML from "./modules/html.module.js";

const classes = JSON.parse(localStorage.getItem("Classes"));
const feats = JSON.parse(localStorage.getItem("Feats"));
const spells = JSON.parse(localStorage.getItem("Spells"));

const content = document.getElementById("content");

const char = {
    "name": "",
    "race": "",
    "size": "",
    "alignment": "",
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
    "level0": [],
    "level1": [],
    "level2": [],
    "level3": [],
    "level4": [],
    "level5": [],
    "level6": [],
    "level7": [],
    "level8": [],
    "level9": []
};

/* Exports */

export function MenuEventListeners() {
    document.getElementById("new").addEventListener("click", () => {
        content.innerHTML = "";

        content.appendChild(new CharacterTemplate(undefined));
    }, false);

    document.getElementById("open").addEventListener("click", () => {
        document.body.appendChild(new OpenModal());
    }, false);

    document.getElementById("save").onclick = () => {
        if (content.innerHTML) {
            SavetoLocalStorage();
        }
    };
}

/* Modals */

class AddItemModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(128,128,128,0.5);
                }

                #modal {
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
            </style>

            <div id="modal">
                <h3>Add an Item...</h3>
                <input type="text">
                <h3>...to...</h3>
                <select>
                    <option value="equipment">Equipment</option>
                    <option value="loot">Loot</option>
                </select>
                <button type="button" id="add">Add Item</button>
                <button type="button" id="cancel">Cancel</button>
            </div>
        `
        shadow.innerHTML = template;

        shadow.getElementById('add').onclick = () => {
            let input = shadow.querySelector('input');

            if (input.value) {
                let select = shadow.querySelector('select');
                
                char[select.value].push(input.value);

                UpdateUIArray(select.value, char[select.value]);

                this.remove();
            }
        }

        shadow.getElementById('cancel').onclick = () => {
            this.remove();
        }
    }
}

customElements.define("additem-modal", AddItemModal);

class AddSpellModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(128,128,128,0.5);
                }

                #modal {
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
            </style>

            <div id="modal">
                <h3>Add a spell...</h3>
                <select></select>
                <button type="button" id="add">Add Spell</button>
                <button type="button" id="cancel">Cancel</button>
            </div>
        `;

        shadow.innerHTML = template;

        let select = shadow.querySelector('select');
        let sorted = Object.keys(spells).sort();

        sorted.forEach(key => {
            let option = document.createElement('option');
            option.value = key;
            option.appendChild(document.createTextNode(key));

            select.appendChild(option);
        });

        shadow.getElementById('add').onclick = () => {
            let spellLevel;

            if (spells[select.value]["Level"] === 0) {
                spellLevel = "level0";
            } else if (spells[select.value]["Level"] === 1) {
                spellLevel = "level1";
            } else if (spells[select.value]["Level"] === 2) {
                spellLevel = "level2";
            } else if (spells[select.value]["Level"] === 3) {
                spellLevel = "level3";
            } else if (spells[select.value]["Level"] === 4) {
                spellLevel = "level4";
            } else if (spells[select.value]["Level"] === 5) {
                spellLevel = "level5";
            } else if (spells[select.value]["Level"] === 6) {
                spellLevel = "level6";
            } else if (spells[select.value]["Level"] === 7) {
                spellLevel = "level7";
            } else if (spells[select.value]["Level"] === 8) {
                spellLevel = "level8";
            } else if (spells[select.value]["Level"] === 9) {
                spellLevel = "level9";
            }

            char[spellLevel].push(select.value);

            UpdateUIArray(spellLevel, char[spellLevel]);

            this.remove();
        }

        shadow.getElementById('cancel').onclick = () => {
            this.remove();
        }
    }
}

customElements.define("addspell-modal", AddSpellModal);

/* class AddLinkModal extends HTMLElement {
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

customElements.define("addlink-modal", AddLinkModal); */

class AddFeatModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
        <style>
            :host {
                position: fixed;
                top: 0px;
                left: 0px;
                height: 100vh;
                width: 100vw;
                background-color: rgba(128,128,128,0.5);
            }

            #modal {
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
        </style>

        <div id="modal">
            <h3>Add a feat...</h3>
            <select></select>
            <button type="button" id="add">Add Spell</button>
            <button type="button" id="cancel">Cancel</button>
        </div>
        `;

        shadow.innerHTML = template;

        let select = shadow.querySelector('select')

        for (let key in feats) {
            let option = document.createElement('option');
            option.value = key;
            option.appendChild(document.createTextNode(key));

            select.appendChild(option);
        }

        shadow.getElementById('add').onclick = () => {
            if (select.value) {
                char["feats"].push(select.value);

                UpdateUIArray("feats", char["feats"])

                this.remove();
            }
        }

        shadow.getElementById('cancel').onclick = () => {
            this.remove();
        }
    }
}

customElements.define("addfeat-modal", AddFeatModal);

/* class AddSubclassModal extends HTMLElement {
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

customElements.define('addsubclass-modal', AddSubclassModal); */

class OpenModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(128,128,128,0.5);
                }

                #modal {
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
            </style>

            <div id="modal">
                <h3>Load a saved character from localStorage...</h3>
                <select></select>
                <button type="button" id="load">Load</button>
                <h3>...or import a JSON file...</h3>
                <input type="file" id="file-input">
                <h3>...or close this window.</h3>
                <button type="button" id="cancel">Cancel</button>
            </div>
        `;

        shadow.innerHTML = template;

        let keys = Object.keys(localStorage);

        let content = document.getElementById("content");
        let select = shadow.querySelector('select');

        if (keys.length > 0) {
            keys.forEach(key => {
                if (key.includes("character")) {
                    let split = key.split("-");

                    let option = document.createElement('option');
                    option.value = key;
                    option.appendChild(document.createTextNode(split[1]));

                    select.appendChild(option);
                }
            });

            shadow.querySelector("#load").onclick = () => {
                CopyJSON(JSON.parse(localStorage.getItem(select.value)));

                content.innerHTML = "";

                content.appendChild(new CharacterTemplate(char));

                this.remove();
            };
        }
        
        shadow.querySelector("#file-input").onchange = e => {
            let file = e.target.files[0];

            if (!file) { return; }

            let reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            reader.onload = readerEvent => {
                CopyJSON(JSON.parse(readerEvent.target.result));

                /* Do something if the content div has children */

                if (content.childElementCount > 0) {
                    content.innerHTML = "";
                }

                /* Check for template support and clone the template to the content div. */

                content.appendChild(new CharacterTemplate(char));

                this.remove();
            }
        }

        shadow.querySelector("#cancel").onclick = () => {
            this.remove();
        };
    }
}

customElements.define("open-modal", OpenModal);

class InfoModal extends HTMLElement {
    constructor(title, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(128,128,128,0.5);
                }

                #modal {
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
            </style>

            <div id="modal">
                <h3>${title}</h3>
                <button type="button" id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;
        
        /* console.log(json); */

        let modal = shadow.querySelector("#modal");
        
        if (json[title]) {
            if (Array.isArray(json[title])) {
                Paragraphs(json[title], modal);
            } else {
                for (let key in json[title]) {
                    if (key.includes("Description")) {
                        Paragraphs(json[title][key], modal);
                    } else if (key === "Unordered List") {
                        List(json[title][key], "ul", modal);
                    } else if (key.includes("Table")) {

                    }
                }
            }
        }

        shadow.querySelector('button').onclick = () => {
            this.remove();
        };
    }
}

customElements.define("info-modal", InfoModal);

class SpellModal extends HTMLElement {
    constructor(name) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(128,128,128,0.5);
                }

                #modal {
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

                #modal, #content, #description{
                    display: grid;
                    grid-auto-rows: auto;
                }

                button {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                }

                @media (width <= 500px) {
                    #modal {
                        height: 100vh;
                        width: calc(100vw - 20px);
                    }
                }
            </style>

            <div id="modal">
                <button type="button">\u2716</button>

                <div id="header">
                    <h3>${name}</h3>
                    <i></i>
                </div>
                <div id="content">
                    <span><b>Casting Time</b> ${spells[name]["Casting Time"]}</span>
                    <span><b>Range</b> ${spells[name]["Range"]}</span>
                    <span><b>Components</b> ${spells[name]["Components"]}</span>
                    <span><b>Duration</b> ${spells[name]["Duration"]}</span>
                </div>
                <div id="description"></div>
                <div id="footer">
                    <i></i>
                </div>
            </div>
        `;

        shadow.innerHTML = template;

        /* Set subheader */

        let subheader = "";
        
        let level = spells[name]["Level"];
    
        if (level === 0) {
            subheader = "";
        } else if (level === 1) {
            subheader = "1st-level";
        } else if (level === 2) {
            subheader = "2nd-level";
        } else if (level === 3) {
            subheader = "3rd-level";
        } else if (level >= 4) {
            subheader = `${level}th-level`;
        }
    
        subheader += ` ${spells[name]["School"]}`;
    
        if (spells[name]["Cantrip"] === true) {
            subheader += " cantrip";
        }
    
        if (spells[name]["Ritual"] === true) {
            subheader += " (ritual)";
        }

        shadow.querySelector('#header i').appendChild(document.createTextNode(subheader));

        /* Spell(name, JSON.parse(localStorage.getItem("Spells"))[name], div); */

        shadow.querySelector('button').onclick = () => {
            this.remove();
        };

        let description = shadow.querySelector('#description');

        for(let key in spells[name]) {
            if(key.includes("Description")) {
                Paragraphs(spells[name][key], description);
            } else if(key == "Higher Levels") {
                Paragraphs(spells[name][key], description);
            } else if(key.includes("Unordered List")) {
                List(spells[name][key], "ul", description);
            } else if(key.includes("Ordered List")) {
                List(spells[name][key], "ol", description);
            } else if(key.includes("Table")) {
                Table(spells[name][key], description)
            }
        }

        shadow.querySelector('#footer i').appendChild(document.createTextNode(`${spells[name]["Book"]}, Pg. ${spells[name]["Page"]}`));

    }
}

customElements.define('spell-modal', SpellModal);

class SelectNameModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    height: 100vh;
                    width: 100vw;
                    background-color: rgba(128,128,128,0.5);
                }

                #modal {
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
            </style>

            <div id="modal">
                <h3>Select a character name...</h3>
                <input type="text">
                <button type="button">Select</button>
            </div>
        `;

        shadow.innerHTML = template;

        let input = shadow.querySelector('input');

        shadow.querySelector('button').onclick = () => {
            char["name"] = input.value;

            SetCharacterName(input.value);

            this.remove();
        };

        input.focus();
    }
}

customElements.define('selectname-modal', SelectNameModal);

class SelectRaceModal extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            
        `;

        shadow.innerHTML = template;
    }
}

customElements.define('selectrace-modal', SelectRaceModal);

/* Elements */

class LinkElement extends HTMLElement {
    constructor(fieldset, text) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
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
            </style>
            
            <a>${text}</a>
            <button type="button">\u2716</button>
        `;

        shadow.innerHTML = template;

        this.setAttribute("id", text);

        if (fieldset) {
            this.setAttribute("fieldset", fieldset.split("Field")[0]);
            
            /* if (fieldset.includes("level")) {
                a.onclick = () => {
                    document.body.appendChild(new SpellModal(text));
                };
            } */

            if (!fieldset.includes("classFeatures")) {
                shadow.querySelector('button').onclick = () => {
                    RemoveLinkElement(this, char);
                }
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
            shadow.querySelector(`h2`).appendChild(document.createTextNode(json["name"]));
            shadow.querySelector('i').appendChild(document.createTextNode(`${json["size"]} ${json["race"]} ${json["alignment"]}`));
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
                /* "racialTraits",  */
                "equipment",
                "loot", 
                "level0", 
                "level1", 
                "level2", 
                "level3", 
                "level4", 
                "level5", 
                "level6", 
                "level7", 
                "level8", 
                "level9")
        } else {
            document.body.appendChild(new SelectNameModal());
        }

        /* Events */

        shadow.getElementById("addItemLink").onclick = () => {
            document.body.appendChild(new AddItemModal());
        };

        shadow.getElementById("addSpellLink").onclick = () => {
            document.body.appendChild(new AddSpellModal());
        };

        shadow.getElementById("addFeatLink").onclick = () => {
            document.body.appendChild(new AddFeatModal());
        };

        /* shadow.getElementById("addFeatureLink").onclick = () => {
            document.body.appendChild(new AddLinkModal("classFeaturesFieldset"));
        }; */

        /* shadow.getElementById("addTraitLink").onclick = () => {
            document.body.appendChild(new AddLinkModal("racialTraitsFieldset"));
        }; */

        /* let inputs = shadow.querySelectorAll('input');

        for (let node of inputs) {
            node.onchange = () => {
                char[node.id] = node.id;

                
            }
        } */

        /* Local Functions */

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
        
                    if (array.includes("level")) {
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
    }
}

customElements.define("character-template", CharacterTemplate);

function CopyJSON(json) {
    for (let key in json) {
        char[key] = json[key];
    }
}

/* Localstorage */

function SavetoLocalStorage() {
    if (char["name"]) {
        localStorage.setItem(`character-${char["name"]}`, JSON.stringify(char));
        console.log(`Saved to character-${char["name"]} in localStorage`)
    } else {
        console.log("Enter a character name.");
    }
}

/* HTML Functions */

function UpdateUIArray(fieldset, json) {
    let template = document.querySelector('character-template')
    let shadow = template.shadowRoot;
    let target = shadow.getElementById(`${fieldset}Fieldset`);

    for (let node of target.children) {
        if (node.localName !== "legend") {
            node.remove();
        }
    }

    json.forEach(element => {
        target.appendChild(new LinkElement(fieldset, element));
    });
}

function UpdateUIInput(input, json) {
    document.querySelector('character-template').shadowRoot.querySelector(`#${input}`).setAttribute("value", json);
}

function RemoveLinkElement(node, char) {
    /* Remove the link-element */

    node.remove();
    
    /* Get the index of the link-element from the character json */

    let target = char[node.getAttribute("fieldset")];

    let index = target.findIndex( x => x === node.id);
    target.splice(index, 1);
}

function Paragraphs(array, parent) {
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

        parent.appendChild(p);
    });
}

function List(array, listType, parent) {
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

    parent.appendChild(list);
}

function Table(json, parent) {
    let table = document.createElement('table');

    // Caption

    if(json["Title"] !== undefined) {
        let caption = document.createElement('caption');
        caption.appendChild(document.createTextNode(json["Title"]))

        table.appendChild(caption);
    }

    // Headers

    

    if(json["Headers"] !== undefined) {
        let headers = document.createElement('tr');

        json["Headers"].forEach(header => {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode(header));
            
            headers.appendChild(th);
        });

        table.appendChild(headers);
    }
    
    // Rows

    if(json["Rows"] !== undefined) {
        json["Rows"].forEach(row => {
            let tr = document.createElement('tr');

            for(let key in row) {
                let td = document.createElement('td');

                if(key === "Spell" || key === "Spells" || key === "Circle Spells") {
                    let length = row[key].length

                    for(var i = 0; i < length; i++) {
                        let spell = row[key][i];

                        let a = document.createElement('a');

                        if(i > 0) {
                            a.appendChild(document.createTextNode(`, ${spell}`))
                            a.addEventListener('click', () => {
                                parent.appendChild(new SpellModal(spell));
                            }, false);


                        } else {
                            a.appendChild(document.createTextNode(spell))
                            a.addEventListener('click', () => {
                                parent.appendChild(new SpellModal(spell));
                            }, false);

                        }

                        td.appendChild(a);
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
                    }
                }

                tr.appendChild(td);
            }

            table.appendChild(tr);
        });
    }

    parent.appendChild(table);
}

function SetCharacterName(name) {
    document.querySelector('character-template').shadowRoot.querySelector(`h2`).appendChild(document.createTextNode(name));
}

/* DnD Functions */

function AddCharacterLevels(json) {
    let total = 0;

    for (let key in json["classes"]) {
        total += parseInt(key);
    }
    
    return total;
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
