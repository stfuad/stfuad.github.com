import * as HTML from "../modules/html.module.js";

import {Spell} from "../modules/spell.module.js";

const classes = localStorage.getItem("Classes");

/* Modals */

export class AddItemModal extends HTMLElement {
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

export class AddSpellModal extends HTMLElement {
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

            select {
                display: block;
            }

            h3 {
                margin: 0px;
            }

        `;

        shadow.appendChild(style);

        shadow.appendChild(HTML.Header("h3", "Add a spell..."));

        let input = HTML.Input("text", undefined);

        shadow.appendChild(input);

        shadow.appendChild(HTML.Header("h3", "...to..."));
        
        let select = HTML.Select("spells");
        select.appendChild(HTML.Option("spells1stLevelFieldset", "1st Level"))
        select.appendChild(HTML.Option("spells2ndLevelFieldset", "2nd Level"))
        select.appendChild(HTML.Option("spells3rdLevelFieldset", "3rd Level"))
        select.appendChild(HTML.Option("spells4thLevelFieldset", "4th Level"))
        select.appendChild(HTML.Option("spells5thLevelFieldset", "5th Level"))
        select.appendChild(HTML.Option("spells6thLevelFieldset", "6th Level"))
        select.appendChild(HTML.Option("spells7thLevelFieldset", "7th Level"))
        select.appendChild(HTML.Option("spells8thLevelFieldset", "8th Level"))
        select.appendChild(HTML.Option("spells9thLevelFieldset", "9th Level"))

        shadow.appendChild(select);

        let addButton = HTML.Button("Add Spell");
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

customElements.define("addspell-modal", AddSpellModal);

export class AddLinkModal extends HTMLElement {
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

export class OpenModal extends HTMLElement {
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

export class InfoModal extends HTMLElement {

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

        `;

        shadow.appendChild(style);
        
        shadow.appendChild(HTML.Header("h3", title));

        if (json) {
            if (Array.isArray(json)) {

            }
        }
    }
}

customElements.define("info-modal", InfoModal);

export class SpellModal extends HTMLElement {
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
    }
}

customElements.define('spell-modal', SpellModal);

export class SubclassModal extends HTMLElement {
    constructor(json) {
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

customElements.define('subclass-modal', SubclassModal);

/* Elements */

export class LinkElement extends HTMLElement {
    constructor(fieldset, text) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            :host {
                display: block;
                height: 24px;
            }

            button {
                float: right;
            }
        `;

        shadow.appendChild(style);

        let a = document.createElement('a');
        a.appendChild(document.createTextNode(text));

        if (fieldset) {
            if (fieldset.includes("spells")) {
                a.onclick = () => {
                    document.body.appendChild(new SpellModal(text));
                }
            }            
        }

        shadow.appendChild(a);

        let closeButton = HTML.Button("\u2716");
        closeButton.onclick = () => {
            this.remove();
        }

        this.setAttribute("id", text);

        if (fieldset) {
            this.setAttribute("title", fieldset.split("Field")[0]);
        }
        
        this.setAttribute("draggable", true);

        shadow.appendChild(closeButton);
    }
}

customElements.define("link-element", LinkElement);

export class CharacterTemplate extends HTMLElement {
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

            ObjectToSheet(json,
                shadow.querySelectorAll("[name=\"classes\"]"),
                shadow.querySelectorAll("[name=\"subclasses\"]"),
                shadow.querySelectorAll("[name=\"abilityScores\"]"),
                shadow.querySelectorAll("[name=\"savingThrows\""),
                shadow.querySelectorAll("[name=\"skillProficiencies\""),
                /* shadow.querySelectorAll("[name=\"weaponProficiencies\""),
                shadow.querySelectorAll("[name=\"armorProficiencies\""), */
                shadow.querySelectorAll("[name=\"skillExpertise\"")
            )

            shadow.getElementById("proficiencyBonusFieldset")
                .appendChild(document.createTextNode(`+${ProficiencyBonus(AddCharacterLevels(json["classes"]))}`));

            shadow.getElementById("initiativeFieldset")
                .appendChild(document.createTextNode(`+${Modifier(parseInt(json["abilityScores"]["dexterity"]))}`));
            
            ChangeSummaries("abilityScores", "savingThrows", "skillProficiencies", "weaponProficiencies", "armorProficiencies", "skillExpertise");

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
                                                            fieldset.appendChild(new LinkElement("classFeatures", feature));
                                                        });
                                                    }
                                                });
                                            }

                                            subclassJSON.forEach(element => {
                                                if (element["Level"] <= clvl) {
                                                    element["Features"].forEach(feature => {
                                                        fieldset.appendChild(new LinkElement("classFeatures", feature));
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
            document.body.appendChild(new AddLinkModal("featsFieldset"));
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
                            array.push(`${input.id} +${proficiencyBonus + Modifier(parseInt(json["abilityScores"][input.id]))}`);
                        }
                    } else if (input.name === "skillProficiencies") {
                        if (input.checked) {
                            let ability = SkillToAbilityScore(input.id);

                            array.push(`${input.id} +${proficiencyBonus + Modifier(parseInt(json["abilityScores"][ability]))}`);
                        }
                    } else if (input.name === "skillExpertise") {
                        if (input.checked) {
                            let ability = SkillToAbilityScore(input.id);

                            array.push(`${input.id} +${(proficiencyBonus * 2) + Modifier(parseInt(json["abilityScores"][ability]))}`);
                        }
                    }
                } else if (input.type === "number") {
                    let value = parseInt(input.value);

                    if (input.name === "abilityScores" && value) {
                        if (value > 0) {
                            array.push(`${input.id} +${Modifier(value)}`)
                        } else {
                            array.push(`${input.id} ${Modifier(value)}`)
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

        function SkillToAbilityScore(skill) {
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
    
                    target.appendChild(new LinkElement(`${array}Fieldset`, item));
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
        
            return bonus;
        }
        
        function Modifier(int) {
            if (int < 0) {
                return `+${Math.floor((int - 10) / 2)}`;
            } else {
                return Math.floor((int - 10) / 2);
            }
            
        }
    }
}

customElements.define("character-template", CharacterTemplate);