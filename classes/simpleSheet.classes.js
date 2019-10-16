import * as misc from "../modules/misc.module.js/index.js";
import * as HTML from "../modules/html.module.js";
import * as Modal from "./spellModal.class.js"; 

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

                /* Do something if the content div has children */

                if (content.childElementCount > 0) {
                    content.innerHTML = "";
                }

                /* Check for template support and clone the template to the content div. */

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

        if (fieldset.includes("spells")) {
            a.onclick = () => {
                document.body.appendChild(new Modal.SpellModal())
            }
        }

        shadow.appendChild(a);

        let closeButton = HTML.Button("\u2716");
        closeButton.onclick = () => {
            this.remove();
        }

        this.setAttribute("id", text);

        let split = fieldset.split("Field");

        this.setAttribute("title", split[0]);

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

            misc.ObjectToSheet(json,
                shadow.querySelectorAll("[name=\"classes\"]"),
                shadow.querySelectorAll("[name=\"classes\"]"),
                shadow.querySelectorAll("[name=\"abilityScores\"]"),
                shadow.querySelectorAll("[name=\"savingThrows\""),
                shadow.querySelectorAll("[name=\"skillProficiencies\""),
                shadow.querySelectorAll("[name=\"weaponProficiencies\""),
                shadow.querySelectorAll("[name=\"armorProficiencies\""),
                shadow.querySelectorAll("[name=\"skillExpertise\"")
            )

            misc.ArrayToSheet(shadow, json, 
                "feats", 
                "classFeatures", 
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

        let addItem = shadow.getElementById("addItemLink");
        addItem.onclick = () => {
            document.body.appendChild(new AddItemModal());
        };

        let addSpell = shadow.getElementById("addSpellLink");
        addSpell.onclick = () => {
            document.body.appendChild(new AddSpellModal());
        };

        let addFeat = shadow.getElementById("addFeatLink");
        addFeat.onclick = () => {
            document.body.appendChild(new AddLinkModal("featsFieldset"));
        };

        let addFeature = shadow.getElementById("addFeatureLink");
        addFeature.onclick = () => {
            document.body.appendChild(new AddLinkModal("classFeaturesFieldset"));
        };

        let addTrait = shadow.getElementById("addTraitLink");
        addTrait.onclick = () => {
            document.body.appendChild(new AddLinkModal("racialTraitsFieldset"));
        };
    }
}

customElements.define("character-template", CharacterTemplate);