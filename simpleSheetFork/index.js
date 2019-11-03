import * as HTML from "./modules/html.module.js";

const classes = JSON.parse(localStorage.getItem("Classes"));
const feats = JSON.parse(localStorage.getItem("Feats"));
const spells = JSON.parse(localStorage.getItem("Spells"));

/* const char = {
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
}; */

const char = {
    "Name": "",
    "Race": "",
    "Size": "",
    "Alignment": "",
    "Hit Points Max": "",
    "Hit Points": "",
    "Classes": {
        "Artificer": 0,
        "Barbarian": 0,
        "Bard": 0,
        "Cleric": 0,
        "Fighter": 0,
        "Monk": 0,
        "Paladin": 0,
        "Ranger": 0,
        "Rogue": 0,
        "Sorcerer": 0,
        "Warlock": 0,
        "Wizard": 0
    },
    "Subclasses": {
        "Path of the Ancestral Guardian": false,
        "Path of the Battlerager": false,
        "Path of the Berserker": false,
        "Path of the Storm Herald": false,
        "Path of the Totem Warrior": false,
        "Path of the Zealot": false,
        "College of Glamour": false,
        "College of Lore": false,
        "College of Swords": false,
        "College of Valor": false,
        "College of Whispers": false,
        "Ambition Domain": false,
        "Arcana Domain": false,
        "Forge Domain": false,
        "Grave Domain": false,
        "Knowledge Domain": false,
        "Life Domain": false,
        "Light Domain": false,
        "Nature Domain": false,
        "Order Domain": false,
        "Solidarity Domain": false,
        "Strength Domain": false,
        "Tempest Domain": false,
        "Trickery Domain": false,
        "War Domain": false,
        "Zeal Domain": false,
        "Circle of Dreams": false,
        "Circle of Spores": false,
        "Circle of the Land": false,
        "Circle of the Moon": false,
        "Circle of the Sheperd": false,
        "Arcane Archer": false,
        "Cavalier": false,
        "Champion": false,
        "Battle Master": false,
        "Eldritch Night": false,
        "Samurai": false,
        "Way of Shadow": false,
        "Way of the Drunken Master": false,
        "Way of the Four Elements": false,
        "Way of the Kensei": false,
        "Way of the Long Death": false,
        "Way of the Open Hand": false,
        "Way of the Sun Soul": false,
        "Oath of Conquest": false,
        "Oath of Devotion": false,
        "Oath of Redemption": false,
        "Oath of Vengeance": false,
        "Oath of the Ancients": false,
        "Oath of the Crown": false,
        "Beast Master": false,
        "Gloom Stalker": false,
        "Horizon Walker": false,
        "Hunter": false,
        "Monster Slayer": false,
        "Arcane Trickster": false,
        "Assassin": false,
        "Inquisitive": false,
        "Mastermind": false,
        "Scout": false,
        "Swashbuckler": false,
        "Thief": false,
        "Draconic Bloodline": false,
        "Divine Soul": false,
        "Shadow Magic": false,
        "Storm Sorcery": false,
        "Wild Magic": false,
        "The Archfey": false,
        "The Celestial": false,
        "The Fiend": false,
        "The Great Old One": false,
        "The Hexblade": false,
        "The Undying": false,
        "Bladesinging": false,
        "School of Abjuration": false,
        "School of Conjuration": false,
        "School of Divination": false,
        "School of Enchantment": false,
        "School of Evocation": false,
        "School of Illusion": false,
        "School of Necromancy": false,
        "School of Transmutation": false,
        "Warmagic": false
    },
    "Ability Scores": {
        "Strength": 0,
        "Dexterity": 0,
        "Constitution": 0,
        "Intelligence": 0,
        "Wisdom": 0,
        "Charisma": 0
    },
    "Saving Throws": {
        "Strength": false,
        "Dexterity": false,
        "Constitution": false,
        "Intelligence": false,
        "Wisdom": false,
        "Charisma": false
    },
    "Skills": {
        "Acrobatics": false,
        "Animal Handling": false,
        "Arcana": false,
        "Athletics": false,
        "Deception": false,
        "History": false,
        "Insight": false,
        "Intimidation": false,
        "Investigation": false,
        "Medicine": false,
        "Nature": false,
        "Perception": false,
        "Performance": false,
        "Persuasion": false,
        "Religion": false,
        "Sleight of Hand": false,
        "Stealth": false,
        "Survival":  false
    },
    "Speeds": {
        "Walk": 25,
        "Burrow": 0,
        "Climb": 0,
        "Fly": 50,
        "Swim": 0
    },
    "Weapon Proficiencies": {
        "Club": false,
        "Dagger": false,
        "Greatclub": false,
        "Handaxe": false,
        "Javelin": false,
        "Light Hammer": false,
        "Mace": false,
        "Quarterstaff": false,
        "Sickle": false,
        "Spear": false,
        "Unarmed Strike": true,
        "Crossbow Light": false,
        "Dart": false,
        "Shortbow": false,
        "Sling": false,
        "Battleaxe": false,
        "Flail": false,
        "Glaive": false,
        "Greataxe": false,
        "Greatsword": false,
        "Halberd": false,
        "Kopesh": false,
        "Lance": false,
        "Longsword": false,
        "Maul": false,
        "Morningstar": false,
        "Pike": false,
        "Rapier": false,
        "Scimitar": false,
        "Shortsword": false,
        "Trident": false,
        "War Pick": false,
        "Warhammer": false,
        "Whip": false,
        "Blowgun": false,
        "Crossbow Hand": false,
        "Crossbow Heavy": false,
        "Longbow": false,
        "Net": false,
        "Simple": false,
        "Martial": false,
        "All": false
    },
    "Armor Proficiencies": {
        "Light": false,
        "Medium": false,
        "Heavy": false,
        "All": false
    },
    "Tool Proficiencies": {
        "Alchemist's Supplies": false,
        "Brewer's Supplies": false,
        "Calligraphers Supplies": false,
        "Carpenter's Tools": false,
        "Cartographer's Tools": false,
        "Cobbler's Tools": false,
        "Cook's Tools": false,
        "Glassblower's Tools": false,
        "Jeweler's Tools": false,
        "Leatherworker's Tools": false,
        "Mason's Tools": false,
        "Painter's Supplies": false,
        "Potter's Tools": false,
        "Smith's Tools": false,
        "Tinker's Tools": false,
        "Weaver's Tools": false,
        "Woodcarver's Tools": false,
        "Disguise Kit": false,
        "Forgery Kit": false,
        "Herbalism Kit": false,
        "Bagpipes": false,
        "Drum": false,
        "Dulcimer": false,
        "Flute": false,
        "Lute": false,
        "Lyre": false,
        "Horn": false,
        "Pan Flute": false,
        "Shawm": false,
        "Viol": false,
        "Navigator's Tools": false,
        "Poisoner's Kit": false,
        "Thieves' Tools": false
    },
    "Languages": {
        "Abyssal": false,
        "Aquan": false,
        "Aarakocra": true,
        "Auran": true,
        "Aven": false,
        "Celestial": false,
        "Common": true,
        "Deep Speech": false,
        "Draconic": false,
        "Druidic": false,
        "Dwarvish": false,
        "Elvish": false,
        "Giant": false,
        "Gith": false,
        "Gnomish": false,
        "Goblin": false,
        "Gnoll": false,
        "Grung": false,
        "Halfling": false,
        "Ignan": false,
        "Infernal": false,
        "Keldon": false,
        "Loxodon": false,
        "Merfolk": false,
        "Minotaur": false,
        "Orc": false,
        "Primordial": false,
        "Siren": false,
        "Sylvan": false,
        "Terran": false,
        "Undercommon": false,
        "Vampire": false,
        "Vedalken": false
    },
    "Damage Resistances": {
        "Acid": false,
        "Bludgeoning": false,
        "Cold": false,
        "Fire": false,
        "Force": false,
        "Lightning": false,
        "Necrotic": false,
        "Piercing": false,
        "Poison": false,
        "Psychic": false,
        "Radiant": false,
        "Slashing": false,
        "Thunder": false
    },
    "Damage Immunities": {
        "Acid": false,
        "Bludgeoning": false,
        "Cold": false,
        "Fire": false,
        "Force": false,
        "Lightning": false,
        "Necrotic": false,
        "Piercing": false,
        "Poison": false,
        "Psychic": false,
        "Radiant": false,
        "Slashing": false,
        "Thunder": false
    },
    "Condition Immunities": {
        "Blinded": false,
        "Charmed": false,
        "Deafened": false,
        "Frightened": false,
        "Grappled": false,
        "Incapacitated": false,
        "Invisible": false,
        "Paralyzed": false,
        "Petrified": false,
        "Poisoned": false,
        "Prone": false,
        "Restrained": false,
        "Stunned": false,
        "Unconcious": false
    },
    "Feats": [

    ],
    "Equipment": [

    ],
    "Spells": [

    ]
};

/* Exports */

export function Init() {
    document.getElementById("new").addEventListener("click", () => {
        document.getElementById("content").innerHTML = "";

        document.body.appendChild(new SetupModal());
    }, false);

    document.getElementById("open").addEventListener("click", () => {
        document.body.appendChild(new OpenModal());
    }, false);

    document.getElementById("save").onclick = () => {
        if (document.querySelector("#content").innerHTML) {
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

                /* UpdateUIArray(select.value, char[select.value]); */

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
            /* let spellLevel;

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
            } */

            char["Spells"].push(select.value);

            /* UpdateUIArray(spellLevel, char[spellLevel]); */

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
                char["Feats"].push(select.value);

                /* UpdateUIArray("feats", char["feats"]) */

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
                    transform: translate(-50%, -50%);
                    height: calc(100vh - 20px);
                    width: calc(100vw - 20px);
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
                    height: calc(100vh - 20px);
                    width: calc(100vw - 20px);
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

class SetupModal extends HTMLElement {
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
                    display: grid;
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
                <h3>...select a race...</h3>
                <select id="race"></select>
                <h3>...select an alignment...</h3>
                <select id="alignment">
                    <option value="Lawful Good">Lawful Good</option>
                    <option value="Neutral Good">Neutral Good</option>
                    <option value="Chaotic Good">Chaotic Good</option>
                    <option value="Lawful Neutral">Lawful Neutral</option>
                    <option value="Neutral">Neutral</option>
                    <option value="Chaotic Neutral">Chaotic Neutral</option>
                    <option value="Lawful Evil">Lawful Evil</option>
                    <option value="Neutral Evil">Neutral Evil</option>
                    <option value="Chaotic Evil">Chaotic Evil</option>
                </select>
                <h3>...select a class.</h3>
                <select id="class">
                    <option value="Artificer">Artificer</option>
                    <option value="Barbarian">Barbarian</option>
                    <option value="Bard">Bard</option>
                    <option value="Cleric">Cleric</option>
                    <option value="Fighter">Fighter</option>
                    <option value="Monk">Monk</option>
                    <option value="Paladin">Paladin</option>
                    <option value="Ranger">Ranger</option>
                    <option value="Rouge">Rouge</option>
                    <option value="Sorcerer">Sorcerer</option>
                    <option value="Warlock">Warlock</option>
                    <option value="Wizard">Wizard</option>
                </select>
                <button type="button">Continue</button>
            </div>
        `;

        shadow.innerHTML = template;

        shadow.querySelector('button').onclick = () => {
            /* char["name"] = shadow.querySelector('input').value;
            char["race"] = shadow.querySelector('#race').value;
            char["alignment"] = shadow.querySelector('#alignment').value;
            char["classes"][shadow.querySelector('#class').value] = 1; */

            document.querySelector('#content').appendChild(new CharacterTemplate(char));

            this.remove();
        };
    }
}

customElements.define('setup-modal', SetupModal);

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

        /* if (fieldset) {
            this.setAttribute("fieldset", fieldset.split("Field")[0]);
            
            if (fieldset.includes("level")) {
                shadow.querySelector('a').onclick = () => {
                    document.body.appendChild(new SpellModal(text));
                };
            } else if (fieldset.includes("feat")) {
                shadow.querySelector('a').onclick = () => {
                    document.body.appendChild(new InfoModal(text, feats));
                };
            }

            if (!fieldset.includes("classFeatures")) {
                shadow.querySelector('button').onclick = () => {
                    RemoveLinkElement(this, char);
                }
            }
        } */
        
        this.setAttribute("draggable", true);
    }
}

customElements.define("link-element", LinkElement);

class CharacterTemplate extends HTMLElement {
    constructor(json) {
        super();

        let shadow = this.attachShadow({mode: "open"});

        let template = `
            <style>
                label {
                    display: block;
                }

                a {
                    color: blue;
                    cursor: pointer;
                }

                #abilityScoresFieldset {
                    display: grid;
                    grid-template-columns: repeat(6, minmax(auto, 50px));
                }

                #abilityScoresFieldset input {
                    width: 35px;
                }

                .grid {
                    display: grid;
                    grid-auto-rows: auto;
                    grid-auto-columns: auto;
                }
            </style>

            <h2></h2>
            <i></i>
            
            <fieldset id="proficiencyBonusFieldset">
                <legend>Proficiency Bonus</legend>
            </fieldset>

            <fieldset id="initiativeFieldset">
                <legend>Initiative</legend>
            </fieldset>
        
            <fieldset id="hitpointsFieldset" class="grid">
                <legend>Hit Points</legend>

                <label for="hitPointsMax">Hit Points Max</label>
                <input type="number" id="hitPointsMax">

                <label for="hitPoints">Hit Points</label>
                <input type="number" id="hitPoints"></td>
            </fieldset>

            <fieldset id="abilityScoresFieldset">
                <legend>Ability Scores</legend>
                <label for="Strength">Str</label>
                <label for="Dexterity">Dex</label>
                <label for="Consitution">Con</label>
                <label for="Intelligence">Int</label>
                <label for="Wisdom">Wis</label>
                <label for="Charisma">Cha</label>
                <input type="number" id="Strength" name="abilityScores">
                <input type="number" id="Dexterity" name="abilityScores">
                <input type="number" id="Consitution" name="abilityScores">
                <input type="number" id="Intelligence" name="abilityScores">
                <input type="number" id="Wisdom" name="abilityScores">
                <input type="number" id="Charisma" name="abilityScores">
            </fieldset>

            <details id="savingThrowsDetails" class="grid">
                <summary>Saving Throws</summary>
                <label><input type="checkbox" id="Strength" name="savingThrows">Strength</label>
                <label><input type="checkbox" id="Dexterity" name="savingThrows">Dexterity</label>
                <label><input type="checkbox" id="Consitution" name="savingThrows">Constitution</label>
                <label><input type="checkbox" id="Intelligence" name="savingThrows">Intelligence</label>
                <label><input type="checkbox" id="Wisdom" name="savingThrows">Wisdom</label>
                <label><input type="checkbox" id="Charisma" name="savingThrows">Charisma</label>
            </details>

            <!-- Proficiencies -->

            <details id="skillProficienciesDetails" class="grid">
                <summary>Skills</summary>
                <label><input type="checkbox" id="Acrobatics" name="skillProficiencies">Acrobatics</label>
                <label><input type="checkbox" id="Animal Handling" name="skillProficiencies">Animal Handling</label>
                <label><input type="checkbox" id="Arcana" name="skillProficiencies">Arcana</label>
                <label><input type="checkbox" id="Athletics" name="skillProficiencies">Athletics</label>
                <label><input type="checkbox" id="Deception" name="skillProficiencies">Deception</label>
                <label><input type="checkbox" id="History" name="skillProficiencies">History</label>
                <label><input type="checkbox" id="Insight" name="skillProficiencies">Insight</label>
                <label><input type="checkbox" id="Intimidation" name="skillProficiencies">Intimidation</label>
                <label><input type="checkbox" id="Investigation" name="skillProficiencies">Investigation</label>
                <label><input type="checkbox" id="Medicine" name="skillProficiencies">Medicine</label>
                <label><input type="checkbox" id="Nature" name="skillProficiencies">Nature</label>
                <label><input type="checkbox" id="Perception" name="skillProficiencies">Perception</label>
                <label><input type="checkbox" id="Performance" name="skillProficiencies">Performance</label>
                <label><input type="checkbox" id="Persuasion" name="skillProficiencies">Persuasion</label>
                <label><input type="checkbox" id="Religon" name="skillProficiencies">Religon</label>
                <label><input type="checkbox" id="Sleight of Hand" name="skillProficiencies">Sleight of Hand</label>
                <label><input type="checkbox" id="Stealth" name="skillProficiencies">Stealth</label>
                <label><input type="checkbox" id="Survival" name="skillProficiencies">Survival</label>
            </details>
            
            <details id="weaponProficienciesDetails" class="grid">
                <summary>Weapon Proficiencies</summary>

                <h4>Simple Melee Weapons</h4>
                <label><input type="checkbox" id="Club" name="weaponProficiencies">Club</label>
                <label><input type="checkbox" id="Dagger" name="weaponProficiencies">Dagger</label>
                <label><input type="checkbox" id="Greatclub" name="weaponProficiencies">Greatclub</label>
                <label><input type="checkbox" id="Handaxe" name="weaponProficiencies">Handaxe</label>
                <label><input type="checkbox" id="Javelin" name="weaponProficiencies">Javelin</label>
                <label><input type="checkbox" id="Light Hammer" name="weaponProficiencies">Light Hammer</label>
                <label><input type="checkbox" id="Mace" name="weaponProficiencies">Mace</label>
                <label><input type="checkbox" id="Quarterstaff" name="weaponProficiencies">Quarterstaff</label>
                <label><input type="checkbox" id="Sickle" name="weaponProficiencies">Sickle</label>
                <label><input type="checkbox" id="Spear" name="weaponProficiencies">Spear</label>
                <label><input type="checkbox" id="Unarmed Strike" name="weaponProficiencies">Unarmed Strike</label>
                
                <h4>Simple Ranged Weapons</h4>
                <label><input type="checkbox" id="Crossbow Light" name="weaponProficiencies">Crossbow, Light</label>
                <label><input type="checkbox" id="Dart" name="weaponProficiencies">Dart</label>
                <label><input type="checkbox" id="Shortbow" name="weaponProficiencies">Shortbow</label>
                <label><input type="checkbox" id="Sling" name="weaponProficiencies">Sling</label>
                
                <h4>Martial Melee Weapons</h4>
                <label><input type="checkbox" id="Battleaxe" name="weaponProficiencies">Battleaxe</label>
                <label><input type="checkbox" id="Flail" name="weaponProficiencies">Flail</label>
                <label><input type="checkbox" id="Glaive" name="weaponProficiencies">Glaive</label>
                <label><input type="checkbox" id="Greataxe" name="weaponProficiencies">Greataxe</label>
                <label><input type="checkbox" id="Greatsword" name="weaponProficiencies">Greatsword</label>
                <label><input type="checkbox" id="Halberd" name="weaponProficiencies">Halberd</label>
                <label><input type="checkbox" id="Lance" name="weaponProficiencies">Lance</label>
                <label><input type="checkbox" id="Longsword" name="weaponProficiencies">Longsword</label>
                <label><input type="checkbox" id="Maul" name="weaponProficiencies">Maul</label>
                <label><input type="checkbox" id="Morningstar" name="weaponProficiencies">Morningstar</label>
                <label><input type="checkbox" id="Pike" name="weaponProficiencies">Pike</label>
                <label><input type="checkbox" id="Rapier" name="weaponProficiencies">Rapier</label>
                <label><input type="checkbox" id="Scimitar" name="weaponProficiencies">Scimitar</label>
                <label><input type="checkbox" id="Shortsword" name="weaponProficiencies">Shortsword</label>
                <label><input type="checkbox" id="Trident" name="weaponProficiencies">Trident</label>
                <label><input type="checkbox" id="War Pick" name="weaponProficiencies">War Pick</label>
                <label><input type="checkbox" id="Warhammer" name="weaponProficiencies">Warhammer</label>
                <label><input type="checkbox" id="Whip" name="weaponProficiencies">Whip</label>

                <h4>Martial Ranged Weapons</h4>
                <label><input type="checkbox" id="Blowgun" name="weaponProficiencies">Blowgun</label>
                <label><input type="checkbox" id="Crossbow Hand" name="weaponProficiencies">Crossbow, Hand</label>
                <label><input type="checkbox" id="Crossbow Heavy" name="weaponProficiencies">Crossbow, Heavy</label>
                <label><input type="checkbox" id="Longbow" name="weaponProficiencies">Longbow</label>
                <label><input type="checkbox" id="Net" name="weaponProficiencies">Net</label>

                <h4>Groups</h4>
                <label><input type="checkbox" id="Simple" name="weaponProficiencies">Simple</label>
                <label><input type="checkbox" id="Martial" name="weaponProficiencies">Martial</label>
                <label><input type="checkbox" id="All" name="weaponProficiencies">All</label>
            </details>

            <details id="armorProficienciesDetails" class="grid">
                <summary>Armor Proficiencies</summary>
                <fieldset id="armorProficienciesFieldset" class="grid">
                <label><input type="checkbox" id="Light" name="armorProficiencies">Light</label>
                <label><input type="checkbox" id="Medium" name="armorProficiencies">Medium</label>
                <label><input type="checkbox" id="Heavy" name="armorProficiencies">Heavy</label>
                <label><input type="checkbox" id="Shields" name="armorProficiencies">Shields</label>
                <label><input type="checkbox" id="All" name="armorProficiencies">All</label>
                </fieldset>
            </details>

            <!-- Expertise -->

            <details id="skillExpertiseDetails" class="grid"> 
                <summary>Expertise</summary>
                <label><input type="checkbox" id="Acrobatics" name="skillExpertise">Acrobatics</label>
                <label><input type="checkbox" id="Animal Handling" name="skillExpertise">Animal Handling</label>
                <label><input type="checkbox" id="Arcana" name="skillExpertise">Arcana</label>
                <label><input type="checkbox" id="Athletics" name="skillExpertise">Athletics</label>
                <label><input type="checkbox" id="Deception" name="skillExpertise">Deception</label>
                <label><input type="checkbox" id="History" name="skillExpertise">History</label>
                <label><input type="checkbox" id="Insight" name="skillExpertise">Insight</label>
                <label><input type="checkbox" id="Intimidation" name="skillExpertise">Intimidation</label>
                <label><input type="checkbox" id="Investigation" name="skillExpertise">Investigation</label>
                <label><input type="checkbox" id="Medicine" name="skillExpertise">Medicine</label>
                <label><input type="checkbox" id="Nature" name="skillExpertise">Nature</label>
                <label><input type="checkbox" id="Perception" name="skillExpertise">Perception</label>
                <label><input type="checkbox" id="Performance" name="skillExpertise">Performance</label>
                <label><input type="checkbox" id="Persuasion" name="skillExpertise">Persuasion</label>
                <label><input type="checkbox" id="Religon" name="skillExpertise">Religon</label>
                <label><input type="checkbox" id="Sleight of Hand" name="skillExpertise">Sleight of Hand</label>
                <label><input type="checkbox" id="Stealth" name="skillExpertise">Stealth</label>
                <label><input type="checkbox" id="Survival" name="skillExpertise">Survival</label>
            </details>

            
            <details id="languagesDetails" class="grid">
                <summary>Languages</summary>
                <label><input type="checkbox" id="" name="languages"></label>
            </details>

            <details id="" class="grid">
                <summary></summary>
                <label><input type="checkbox" id="" name=""></label>
            </details>

            <!-- Feats -->

            <details id="featsDetails">
                <summary>Feats</summary>

                <a id="addFeatLink">+ Add Feat</a>
            </details>

            <!-- Class Features -->

            <details id="classFeaturesDetails">
                <summary>Class Features</summary>

                <!-- <a id="addFeatureLink">+ Add Feature</a> -->
            </details>
        
            <!-- Racial Traits -->

            <details id="racialTraitsDetails">
                <summary>Racial Traits</summary>

                <!-- <a id="addTraitLink">+ Add Trait</a> -->
            </details>

            <!-- Equipment -->

            <details>
                <summary>Items</summary>

                <fieldset id="equipmentFieldset">
                    <legend>Equipment</legend>
                </fieldset>

                <fieldset id="lootFieldset">
                    <legend>Loot</legend>
                </fieldset>
                
                <a id="addItemLink">+ Add Item</a>         
            </details>

            <!-- Spells -->

            <details>
                <summary>Spells</summary>
                <fieldset id="level0Fieldset">
                    <legend>Cantrip (0 Level)</legend>
                </fieldset>

                <fieldset id="level1Fieldset">
                    <legend>1st Level</legend>
                </fieldset>

                <fieldset id="level2Fieldset">
                    <legend>2nd Level</legend>
                </fieldset>

                <fieldset id="level3Fieldset">
                    <legend>3rd Level</legend>
                </fieldset>

                <fieldset id="level4Fieldset">
                    <legend>4th Level</legend>
                </fieldset>

                <fieldset id="level5Fieldset">
                    <legend>5th Level</legend>
                </fieldset>

                <fieldset id="level6Fieldset">
                    <legend>6th Level</legend>
                </fieldset>

                <fieldset id="level7Fieldset">
                    <legend>7th Level</legend>
                </fieldset>

                <fieldset id="level8Fieldset">
                    <legend>8th Level</legend>
                </fieldset>

                <fieldset id="level9Fieldset">
                    <legend>9th Level</legend>
                </fieldset>
                
                <a id="addSpellLink">+ Add a Spell</a>
            </details>
        `;

        shadow.innerHTML = template;

        shadow.querySelector(`h2`).appendChild(document.createTextNode(json["Name"]));
        shadow.querySelector('i').appendChild(document.createTextNode(`${json["Size"]} ${json["Race"]} ${json["Alignment"]}`));
        shadow.getElementById("hitPointsMax").value = json["Hit Points Max"];
        shadow.getElementById("hitPoints").value = json["Hit Points"];
        
        /* Ability Scores */

        let abilityScoreInputs = shadow.querySelectorAll(["[name=\"abilityScores\"]"]);

        for (let node of abilityScoreInputs) {
            if (json["Ability Scores"][node.id]) {
                node.value = json["Ability Scores"][node.id];
            }
            
        }

        function UpdateSomethings(...keys) {
            keys.forEach(key => {
                UpdateSomething(key);
            });
        }

        function UpdateSomething(name) {
            let nodeList = shadow.querySelectorAll([`[name=\"${PropToVar(name)}\"]`]);
            let detailsVisibility = false;
    
            for (let node of nodeList) {
                if (json[name][node.id]) {
                    detailsVisibility = true;
                    node.value = json[name][node.id];
                }
            }

            if (!detailsVisibility) {
                ToggleDetailsVisibility(name);
            }
        }

        function PropToVar(prop) {
            if (prop === "Saving Throws") {
                return "savingThrows";
            } else if (prop === "Skills") {
                return "skillProficiencies";
            } else if (prop === "Weapon Proficiencies") {
                return "weaponProficiencies";
            } else if (prop === "Armor Proficiencies") {
                return "armorProficiencies";
            } else if (prop === "Tool Proficiencies") {
                return "toolProficiencies";
            } else if (prop === "Skill Expertise") {
                return "skillExpertise";
            } else if (prop === "Languages") {
                return "languages";
            } else if (prop === "Damage Resistances") {
                return "damageResistances";
            } else if (prop === "Damage Immunities") {
                return "damageImmunities";
            } else if (prop === "Condition Immunities") {
                return "conditionImmunitiess";
            }
        }

        function ToggleDetailsVisibility(details) {
            let element = shadow.querySelector(`#${details}Details`);

            if (element.style.visibility === "visible") {
                element.style.visibility = "collapse";
            } else {
                element.style.visibility = "visible";
            }
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

    if(cr === 0) {
        bonus = 2;
    } else if(cr === "1/8") {
        bonus = 2;
    } else if(cr === "1/4") {
        bonus = 2;
    } else if(cr === "1/2") {
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
    if (string === "Artificer") {
        
    } else if (string === "Barbarian") {
        return "Primal Paths"
    } else if (string === "Bard") {
        return "Bard Colleges"
    } else if (string === "Cleric") {
        return "Divine Domains"
    } else if (string === "Druid") {
        return "Druid Circles"
    } else if (string === "Fighter") {
        return "Martial Archetypes"
    } else if (string === "Monk") {
        return "Monastic Traditions"
    } else if (string === "Paladin") {
        return "Sacred Oaths"
    } else if (string === "Ranger") {
        return "Ranger Archetypes"
    } else if (string === "Rogue") {
        return "Roguish Archetypes"
    } else if (string === "Sorcerer") {
        return "Sorcerous Origins"
    } else if (string === "Warlock") {
        return "Otherworldly Patrons"
    } else if (string === "Wizard") {
        return "Arcane Traditions"
    }
}

function SkillToAbility(skill) {
    if (skill === "acrobatics") {
        return "Dexterity";
    } else if (skill === "animalHandling") {
        return "Wisdom";
    } else if (skill === "arcana") {
        return "Intelligence";
    } else if (skill === "athletics") {
        return "Strength";
    } else if (skill === "deception") {
        return "Charisma";
    } else if (skill === "history") {
        return "Intelligence";
    } else if (skill === "insight") {
        return "Wisdom";
    } else if (skill === "intimidation") {
        return "Charisma";
    } else if (skill === "investigation") {
        return "Intelligence";
    } else if (skill === "medicine") {
        return "Wisdom";
    } else if (skill === "nature") {
        return "Intelligence";
    } else if (skill === "perception") {
        return "Wisdom";
    } else if (skill === "performance") {
        return "Charisma";
    } else if (skill === "persuasion") {
        return "Charisma";
    } else if (skill === "religon") {
        return "Intelligence";
    } else if (skill === "sleightofHand") {
        return "Dexterity";
    } else if (skill === "stealth") {
        return "Dexterity";
    } else if (skill === "survival") {
        return "Wisdom";
    }
}
