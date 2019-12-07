fetch("../json/5e Data.json")
    .then(response => response.json())
    .then(json => {
        for (let key in json) {
            localStorage.setItem(`${key} Data`, JSON.stringify(json[key]));
        }
    })
fetch('../json/5e Reference.json')
    .then(response => response.json())
    .then(json => {
        for(let key in json) {
            localStorage.setItem(key, JSON.stringify(json[key]));
        }
    });

const races = JSON.parse(localStorage.getItem("Races"));
const classes = JSON.parse(localStorage.getItem("Classes"));
const feats = JSON.parse(localStorage.getItem("Feats"));
const spells = JSON.parse(localStorage.getItem("Spells"));

const raceData = JSON.parse(localStorage.getItem("Races Data"));
const classData = JSON.parse(localStorage.getItem("Classes Data"));

const character = {
    "Name": "",
    "Player Name": "",
    "Background": "",
    "Race": "",
    "Size": "",
    "Alignment": "",
    "Hit Points Max": "",
    "Hit Points": "",
    "Experience Points": 0,
    "Inspiration": 0,
    "Armor Class": 0,
    "Classes": {
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
        "Barbarian": {
            "Path of the Ancestral Guardian": false,
            "Path of the Battlerager": false,
            "Path of the Berserker": false,
            "Path of the Storm Herald": false,
            "Path of the Totem Warrior": false,
            "Path of the Zealot": false
        },
        "Bard": {
            "College of Glamour": false,
            "College of Lore": false,
            "College of Swords": false,
            "College of Valor": false,
            "College of Whispers": false
        },
        "Cleric": {
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
            "Zeal Domain": false
        },
        "Druid": {
            "Circle of Dreams": false,
            "Circle of Spores": false,
            "Circle of the Land": false,
            "Circle of the Moon": false,
            "Circle of the Sheperd": false
        },
        "Fighter": {
            "Arcane Archer": false,
            "Cavalier": false,
            "Champion": false,
            "Battle Master": false,
            "Eldritch Night": false,
            "Samurai": false
        },
        "Monk": {
            "Way of Shadow": false,
            "Way of the Drunken Master": false,
            "Way of the Four Elements": false,
            "Way of the Kensei": false,
            "Way of the Long Death": false,
            "Way of the Open Hand": false,
            "Way of the Sun Soul": false
        },
        "Paladin": {
            "Oath of Conquest": false,
            "Oath of Devotion": false,
            "Oath of Redemption": false,
            "Oath of Vengeance": false,
            "Oath of the Ancients": false,
            "Oath of the Crown": false
        },
        "Ranger": {
            "Beast Master": false,
            "Gloom Stalker": false,
            "Horizon Walker": false,
            "Hunter": false,
            "Monster Slayer": false
        },
        "Rogue": {
            "Arcane Trickster": false,
            "Assassin": false,
            "Inquisitive": false,
            "Mastermind": false,
            "Scout": false,
            "Swashbuckler": false,
            "Thief": false
        },
        "Sorcerer": {
            "Draconic Bloodline": false,
            "Divine Soul": false,
            "Shadow Magic": false,
            "Storm Sorcery": false,
            "Wild Magic": false
        },
        "Warlock": {
            "The Archfey": false,
            "The Celestial": false,
            "The Fiend": false,
            "The Great Old One": false,
            "The Hexblade": false,
            "The Undying": false
        },
        "Wizard": {
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
        }
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
        "Acrobatics": "none",
        "Animal Handling": "none",
        "Arcana": "none",
        "Athletics": "none",
        "Deception": "none",
        "History": "none",
        "Insight": "none",
        "Intimidation": "none",
        "Investigation": "none",
        "Medicine": "none",
        "Nature": "none",
        "Perception": "none",
        "Performance": "none",
        "Persuasion": "none",
        "Religion": "none",
        "Sleight of Hand": "none",
        "Stealth": "none",
        "Survival":  "none"
    },
    "Speeds": 0,
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
        "Unarmed Strike": false,
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
        "All Weapons": false
    },
    "Armor Proficiencies": {
        "Light": false,
        "Medium": false,
        "Heavy": false,
        "Shields": false,
        "All Armor": false
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
        "Aarakocra": false,
        "Auran": false,
        "Aven": false,
        "Celestial": false,
        "Common": false,
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

export function init() {
    let content = document.querySelector('#content');
        content.innerHTML = "";

        content.appendChild(new CharacterSheet(JSON.parse(JSON.stringify(character))));

    document.querySelector("#new").onclick = () => {
        let content = document.querySelector('#content');
        content.innerHTML = "";

        content.appendChild(new CharacterSheet(JSON.parse(JSON.stringify(character))));
    };
    
    document.querySelector("#open").onclick = () => {
        document.body.appendChild(new OpenModal());
    };

    document.querySelector("#save").onclick = () => {
        let sheet = document.querySelector("character-sheet");
        
        if (sheet.Character["Name"]) {
            localStorage.setItem(`character-${sheet.Character["Name"]}`, JSON.stringify(sheet.Character));

            console.log("Saved");
        } else {
            console.log("Sheet undefined");
        }
    };
}

class CharacterSheet extends HTMLElement {
    Character;

    ProficiencyBonus() {
        let bonus = 0;
        let characterLevel = this.CharacterLevels();
    
        if (characterLevel < 4) {
            bonus = 2;
        } else if (characterLevel < 9) {
            bonus = 3;
        } else if (characterLevel < 13) {
            bonus = 4;
        } else if (characterLevel < 17) {
            bonus = 5;
        } else if (characterLevel < 21) {
            bonus = 6;
        } else if (characterLevel < 25) {
            bonus = 7;
        } else if (characterLevel < 29) {
            bonus = 8;
        } else if (characterLevel < 31) {
            bonus = 9;
        }
    
        return parseInt(bonus);
    }

    CharacterLevels() {
        let total = 0;
    
        for (let key in this.Character["Classes"]) {
            total = total + this.Character["Classes"][key];
        }

        return total;
    }

    Expertise() {
        return (this.ProficiencyBonus() * 2);
    }

    Modifier(ability) {
        return Math.floor((parseInt(this.Character["Ability Scores"][ability]) - 10) / 2);
    }

    UpdateClasses() {
        let target = this.shadowRoot.querySelector("#classesLevels");
        target.innerHTML = "";

        for (let key in this.Character["Classes"]) {
            if (this.Character["Classes"][key] > 0) {
                let div = document.createElement('div');

                if (this.Character["Classes"][key] >= 3) {
                    let subclass;

                    for (let subkey in this.Character["Subclasses"][key]) {
                        if (this.Character["Subclasses"][key][subkey] === true) {
                            subclass = subkey;
                        }
                    }
                    
                    if (subclass) {
                        div.appendChild(document.createTextNode(`${key} (${subclass}), ${this.Character["Classes"][key]}`));
                    } else {
                        div.appendChild(document.createTextNode(`${key}, ${this.Character["Classes"][key]}`));
                    }
                    
                } else {
                    div.appendChild(document.createTextNode(`${key}, ${this.Character["Classes"][key]}`));
                }
                
                target.appendChild(div);
            }
        }
    }

    UpdateProficiencyBonus() {
        let proficiencyBonus = this.shadowRoot.querySelector("#proficiencyBonus");

        proficiencyBonus.value = this.ProficiencyBonus();
    }

    UpdatePassivePerception() {
        let passiveWisdom = this.shadowRoot.querySelector("#passivePerception");

        if (this.Character["Skills"]["Perception"] === "proficient") {
            passiveWisdom.value = 10 + this.Modifier("Wisdom") + this.ProficiencyBonus();
        } else if (this.Character["Skills"]["Perception"] === "expertise") {
            passiveWisdom.value = 10 + this.Modifier("Wisdom") + this.Expertise();
        } else if (this.Character["Skills"]["Perception"] === "none") {
            passiveWisdom.value = 10 + this.Modifier("Wisdom");
        }
    }

    UpdateProficiencies() {
        let skills = this.shadowRoot.querySelector("#skills");
        skills.innerHTML = "";

        let savingThrows = this.shadowRoot.querySelector("#savingThrows")
        savingThrows.innerHTML = "";


        /* Saving Throws */
        for (let key in this.Character["Saving Throws"]) {
            savingThrows.appendChild(new SavingThrow(key, this.Character));
        }

        /* Skills */
        for (let key in this.Character["Skills"]) {
            skills.appendChild(new Skill(key, this.Character));
        }
    }

    UpdateOtherProficiencies() {
        let array = [];

        let op = this.shadowRoot.querySelector("#otherProficiencies");

        op.innerHTML = "";

        for (let key in this.Character["Weapon Proficiencies"]) {
            if (this.Character["Weapon Proficiencies"][key] === true) {
                array.push(key);
            }
        }

        for (let key in this.Character["Armor Proficiencies"]) {
            if (this.Character["Armor Proficiencies"][key] === true) {
                array.push(key);
            }
        }

        for (let key in this.Character["Tool Proficiencies"]) {
            if (this.Character["Tool Proficiencies"][key] === true) {
                array.push(key);
            }
        }

        op.appendChild(document.createTextNode(array.join(", ")));
    }

    UpdateLanguages() {
        let array = [];

        let lang = this.shadowRoot.querySelector("#languages");

        lang.innerHTML = "";

        for (let key in this.Character["Languages"]) {
            if (this.Character["Languages"][key] === true) {
                array.push(key);
            }
        }

        lang.appendChild(document.createTextNode(array.join(", ")));
    }

    UpdateInitiative() {
        this.shadowRoot.querySelector("#initiative").value = this.Modifier("Dexterity");
    }

    UpdateRacialTraits() {
        let target = this.shadowRoot.querySelector("#traits");
        target.innerHTML = "";

        for (let key in raceData[this.Character["Race"]]) {
            let obj = raceData[this.Character["Race"]][key];

            if (this.CharacterLevels() >= obj["Level"]) {
                for (let trait in obj["Traits"]) {
                    target.appendChild(new RacialTrait(trait));
                }
            }
        }
    }

    UpdateClassFeatures() {
        let target = this.shadowRoot.querySelector("#features");
        target.innerHTML = "";


    }

    UpdateFeats() {

    }

    constructor(json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    
                }

                :host > div {
                    border: 0px solid black;
                    margin: 10px 0px 10px 0px;
                }

                :host > a {
                    color: blue;
                    cursor: pointer;
                }

                select {
                    max-width: 147px;
                }

                /* input {
                    border: 0px;
                    text-align: center;
                }

                input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                 
                input[type="number"] {
                    -moz-appearance: textfield;
                }

                label {
                    font-weight: bold;
                }

                #subheader {
                    display: grid;
                    grid-template-rows: 1fr 1fr;
                    grid-template-columns: 1fr 1fr 1fr;
                    grid-gap: 1em;
                } */
            </style>

            <div>
                <input type="text" id="characterName" value="${this.Character["Name"]}">
                <label for="characterName">Character Name</label>
            </div>

            <div>
                <input type="text" id="playerName" value="${this.Character["Player Name"]}">
                <label for="playerName">Player Name</label>
            </div>

            <h4>Race</h4>

            <div>
                <select id="race"></select>
                <label for="race">Race</label>
            </div>

            <h4>Classes & Levels</h4>

            <div id="classesLevels"></div>

            <a id="classEdit">+ Add/Edit Classes</a>

            <div>
                <input type="text" id="background" value="${this.Character["Background"]}">
                <label for="background">Background</label>
            </div>

            <div>
                <input type="text" id="alignment" value="${this.Character["Alignment"]}">
                <label for="alignment">Alignment</label>
            </div>

            <div>
                <input type="number" id="exp" value="${this.Character["Experience Points"]}">
                <label for="exp">Experience Points</label>
            </div>

            <div>
                <input type="number" id="Inspiration" value="${this.Character["Inspiration"]}">
                <label for="Inspiration">Inspiration</label>
            </div>

            <div>
                <input type="number" id="proficiencyBonus" readonly>
                <label for="proficiencyBonus">Proficiency Bonus</label>
            </div>

            <div>
                <input type="number" id="passivePerception" readonly>
                <label for="passivePerception">Passive Wisdom (Perception)</label>
            </div>

            <div>
                <input type="number" id="ac" value="${this.Character["Armor Class"]}">
                <label for="ac">Armor Class</label>
            </div>

            <div>
                <input type="number" id="initiative" value="${this.Modifier("Dexterity")}" readonly>
                <label for="initiative">Initiative</label>
            </div>
            
            <div>
                <input type="number" id="Speed" value="">
                <label for="Speed">Speed</label>
            </div>

            <h4>Hit Points</h4>

            <div>
                <div>
                    <input id="hpMax" type="number" value="${this.Character["Hit Points Max"]}">
                    <label for="hpMax">Hit Point Maximum</label>
                </div>
                <div>
                    <input id="hp" type="number" value="${this.Character["Hit Points Max"]}">
                    <label for="hp">Current Hit Points</label>
                </div>
            </div>

            <div id="tempHpDiv">
                <input id="tempHp" type="number">
                <label for="tempHp">Temporary Hit Points</label>
            </div>

            <h4>Hit Dice</h4>

            <div id="hitDiceDiv">
                <div>
                    <input id="totalHitDice" type="text" readonly>
                    <label for="totalHitDice">Total</label>
                </div>
                <div>
                    <input id="hitDice" type="text" readonly>
                    <label for="hitDice">Hit Dice</label>
                </div>
            </div>
            
            <h4>Ability Scores</h4>

            <div id="abilityScores"></div>

            <h4>Saving Throws</h4>

            <div id="savingThrows"></div>

            <h4>Skills</h4>

            <div id="skills"></div>

            <h4>Other Proficiencies & Languages</h4>

            <div id="profLang">
                <div id="otherProficiencies"></div>
                <div id="languages"></div>
            </div>

            <a id="addProficiency">+ Add Other Proficiency</a> <a id="addLanguage">+ Add Language</a>

            <h4>Features & Traits</h4>

            <div id="featsTraits">
                <div id="traits"></div>
                <div id="features"></div>
                <div id="feats"></div>
            </div>

            <a>+ Add Feat</a>
        `;

        shadow.innerHTML = template;
        
        this.UpdateClasses();
        this.UpdateProficiencyBonus();
        this.UpdatePassivePerception();
        this.UpdateOtherProficiencies();
        this.UpdateLanguages();

        let select = shadow.querySelector("#race");

        for (let key in raceData) {
            let option = document.createElement('option');
            option.value = key;
            option.appendChild(document.createTextNode(key));

            if (key === this.Character["Race"]) {
                option.selected = true;
            }

            select.appendChild(option);
        }

        select.onchange = () => {
            this.Character["Race"] = select.value;

            this.UpdateRacialTraits();
        }

        shadow.querySelector("#classEdit").onclick = () => {
            document.body.appendChild(new EditClassesModal(this.Character));
        }

        shadow.querySelector("#addProficiency").onclick = () => {
            document.body.appendChild(new EditProficienciesModal(this.Character));
        };

        shadow.querySelector("#addLanguage").onclick = () => {
            document.body.appendChild(new EditLanguagesModal(this.Character));
        };

        let inputs = shadow.querySelectorAll('input');

        for (let node of inputs) {
            if (!node.readOnly) {
                node.onchange = () => {
                    if (node.id === "ac") {
                        this.Character["Armor Class"] = node.valueAsNumber;
                    } else if (node.id === "inspiration") {
                        this.Character["Inspiration"] = node.valueAsNumber;
                    } else if (node.id === "characterName") {
                        this.Character["Name"] = node.value;
                    } else if (node.id === "background") {
                        this.Character["Background"] = node.value;
                    } else if (node.id === "alignment") {
                        this.Character["Alignment"] = node.value;
                    } else if (node.id === "playerName") {
                        this.Character["Player Name"] = node.value;
                    } else if (node.id === "experience") {
                        this.Character["Experience Points"] = node.valueAsNumber;
                    } else if (node.id === "speed") {
                        this.Character["Speed"] = node.valueAsNumber;
                    }
                }
            }
        }

        /* Ability Scores */
        for (let key in this.Character["Ability Scores"]) {
            shadow.querySelector('#abilityScores').appendChild(new AbilityScore(key, this.Character));
        }

        /* Saving Throws */
        for (let key in this.Character["Saving Throws"]) {
            shadow.querySelector('#savingThrows').appendChild(new SavingThrow(key, this.Character));
        }

        /* Skills */
        for (let key in this.Character["Skills"]) {
            shadow.querySelector('#skills').appendChild(new Skill(key, this.Character));
        }

        // Testing MutationObserver
        let MutationObserver = window.MutationObserver;
    
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === "attributes") {
                    console.log(mutation.target.id)

                    let toChange = shadow.querySelectorAll(`[attribute=\"${mutation.target.id}\"]`);
    
                    toChange.forEach(element => {
                        element.UpdateElement(element.id);
                    });
    
                    if (mutation.target.id === "Dexterity") {
                        this.UpdateInitiative();
                    }
    
                    if (mutation.target.id === "Wisdom") {
                        this.UpdatePassivePerception();
                    }
                }
            });
        })
    
        for (let node of shadow.querySelector("#abilityScores").children) {
            observer.observe(node, {
                attributes: true,
                childList: true,
                characterData: true
            });
        }
    }
}

customElements.define('character-sheet', CharacterSheet);

class AbilityScore extends HTMLElement {
    Character;

    Modifier(int) {
        return Math.floor((parseInt(int) - 10) / 2);
    }

    constructor(key, json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: inline-block;
                    border: 1px solid black;
                    padding: 10px;
                    text-align: center;
                }

                label {
                    font-weight: bold;
                    font-size: 1em;
                }

                input {
                    width: 4em;
                    border: 0px;
                    font-size: 1.5em;
                    text-align: center;
                }

                input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button {
                    -webkit-appearance: none;
                    margin: 0;
                }
                 
                input[type="number"] {
                    -moz-appearance: textfield;
                }
            </style>

            <div>
                <label for="abilityScore">${key}</label>
            </div>
            <div>
                <input type="number" id="abilityScore" value="${this.Character["Ability Scores"][key]}">
            </div>
            <div id="modifier">${this.Modifier(this.Character["Ability Scores"][key])}</div>
        `;

        let flat = `
            <style>
                :host {
                    display: grid;
                    justify-content: left;
                }

                input {
                    grid-column: 1;
                }

                span {
                    grid-column: 2;
                }

                label {
                    grid-column: 3;
                }
            </style>

            <input type="number" id="abilityScore" value="${this.Character["Ability Scores"][key]}">
            <span id="modifier">(${this.Modifier(this.Character["Ability Scores"][key])})</span>
            <label for="abilityScore">${key}</label>
        `;

        shadow.innerHTML = flat;

        // Set inital element attributes.
        this.setAttribute("id", key);
        this.setAttribute("value", this.Character["Ability Scores"][key])

        let input = shadow.querySelector('input');

        // When the input element value changes.
        input.onchange = () => {
            // Grab the value from the input and write to memory.
            this.Character["Ability Scores"][key] = input.valueAsNumber;

            // Update the elements "value" attribute.
            this.setAttribute("value", this.Character["Ability Scores"][key]);

            // Update the modifier div.
            shadow.querySelector("#modifier").innerHTML = `(${this.Modifier(this.Character["Ability Scores"][key])})`;
        }
    }
}

customElements.define('ability-score', AbilityScore);

class SavingThrow extends HTMLElement {
    Character;

    Modifier(int) {
        return Math.floor((parseInt(int) - 10) / 2);
    }

    ProficiencyBonus(characterLevel) {
        let bonus = 0;
    
        let levelTotal = this.CharacterLevels();

        if (characterLevel < 4) {
            bonus = 2;
        } else if (characterLevel < 9) {
            bonus = 3;
        } else if (characterLevel < 13) {
            bonus = 4;
        } else if (characterLevel < 17) {
            bonus = 5;
        } else if (characterLevel < 21) {
            bonus = 6;
        } else if (characterLevel < 25) {
            bonus = 7;
        } else if (characterLevel < 29) {
            bonus = 8;
        } else if (characterLevel < 31) {
            bonus = 9;
        }
    
        return parseInt(bonus);
    }

    CharacterLevels() {
        let total = 0;
    
        for (let key in this.Character["Classes"]) {
            total += this.Character["Classes"][key];
        }
        
        return total;
    }

    WriteMemory(key) {
        if (this.Character["Saving Throws"][key] === false) {
            this.Character["Saving Throws"][key] = true;
        } else if (this.Character["Saving Throws"][key] === true) {
            this.Character["Saving Throws"][key] = false;
        }
    }

    UpdateElement(key) {
        if (this.Character["Saving Throws"][key] === false) {
            this.shadowRoot.querySelector("#proficiency").innerHTML = "\u25cb";

            this.shadowRoot.querySelector("#modifier").innerHTML = this.Modifier(this.Character["Ability Scores"][key]);
        } else if (this.Character["Saving Throws"][key] === true) {
            this.shadowRoot.querySelector("#proficiency").innerHTML = "\u25c9";

            this.shadowRoot.querySelector("#modifier").innerHTML = this.Modifier(this.Character["Ability Scores"][key]) + this.ProficiencyBonus(this.CharacterLevels(this.Character["Classes"]));
        }
    }

    constructor(key, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: block;
                    font-size: 1em;
                }

                #proficiency {
                    display: inline-block;
                    width: 1em;
                    font-size: 1.5em;
                    text-align: center;
                    cursor: pointer;
                }

                #modifier {
                    display: inline-block;
                    width: 2em;
                    border-bottom: 1px solid black;
                    text-align: center;
                }
            </style>

            <span id="proficiency"></span><span id="modifier"></span><span id="savingThrow"></span>
        `;

        shadow.innerHTML = template;

        this.Character = json;

        this.setAttribute("id", key);
        this.setAttribute("attribute", key);

        let proficiencySpan = shadow.querySelector("#proficiency")
        let modifierSpan = shadow.querySelector("#modifier");

        if (this.Character["Saving Throws"][key] === false) {
            proficiencySpan.appendChild(document.createTextNode("\u25cb"))

            modifierSpan.appendChild(document.createTextNode(this.Modifier(json["Ability Scores"][key])));
        } else if (this.Character["Saving Throws"][key] === true) {
            proficiencySpan.appendChild(document.createTextNode("\u25c9"));

            modifierSpan.appendChild(document.createTextNode(this.Modifier(json["Ability Scores"][key]))) + this.ProficiencyBonus(this.CharacterLevels(json["Classes"]));
        }

        shadow.querySelector("#savingThrow").appendChild(document.createTextNode(key));

        shadow.querySelector("#proficiency").onclick = () => {
            this.WriteMemory(key);
            this.UpdateElement(key)
        }
    }
}

customElements.define('saving-throw', SavingThrow);

class Skill extends HTMLElement {
    Character;

    Modifier(int) {
        return Math.floor((parseInt(int) - 10) / 2);
    }

    Expertise(int) {
        return (parseInt(int) * 2);
    }

    ProficiencyBonus(characterLevel) {
        let bonus = 0;
    
        if (characterLevel < 4) {
            bonus = 2;
        } else if (characterLevel < 9) {
            bonus = 3;
        } else if (characterLevel < 13) {
            bonus = 4;
        } else if (characterLevel < 17) {
            bonus = 5;
        } else if (characterLevel < 21) {
            bonus = 6;
        } else if (characterLevel < 25) {
            bonus = 7;
        } else if (characterLevel < 29) {
            bonus = 8;
        } else if (characterLevel < 31) {
            bonus = 9;
        }
    
        return parseInt(bonus);
    }

    CharacterLevels(json) {
        let total = 0;
    
        for (let key in json) {
            total += json[key];
        }
        
        return total;
    }

    SkillToAbility(skill) {
        if (skill === "Acrobatics") {
            return "Dexterity";
        } else if (skill === "Animal Handling") {
            return "Wisdom";
        } else if (skill === "Arcana") {
            return "Intelligence";
        } else if (skill === "Athletics") {
            return "Strength";
        } else if (skill === "Deception") {
            return "Charisma";
        } else if (skill === "History") {
            return "Intelligence";
        } else if (skill === "Insight") {
            return "Wisdom";
        } else if (skill === "Intimidation") {
            return "Charisma";
        } else if (skill === "Investigation") {
            return "Intelligence";
        } else if (skill === "Medicine") {
            return "Wisdom";
        } else if (skill === "Nature") {
            return "Intelligence";
        } else if (skill === "Perception") {
            return "Wisdom";
        } else if (skill === "Performance") {
            return "Charisma";
        } else if (skill === "Persuasion") {
            return "Charisma";
        } else if (skill === "Religion") {
            return "Intelligence";
        } else if (skill === "Sleight of Hand") {
            return "Dexterity";
        } else if (skill === "Stealth") {
            return "Dexterity";
        } else if (skill === "Survival") {
            return "Wisdom";
        }
    }

    WriteMemory(key) {
        // Write new proficiency type to memory.
        if (this.Character["Skills"][key] === "proficient") {
            this.Character["Skills"][key] = "expertise";
        } else if (this.Character["Skills"][key] === "expertise") {
            this.Character["Skills"][key] = "none";
        } else if (this.Character["Skills"][key] === "none") {
            this.Character["Skills"][key] = "proficient";
        }
    }

    UpdateElement(key) {
        let shadow = this.shadowRoot;

        let proficiencySpan = shadow.querySelector("#proficiency");
        let modifierSpan = shadow.querySelector("#modifier");

        // Define the proficiency types, unicode.
        const normal = "\u25cb";
        const half = "\u24bd";
        const proficient = "\u24c5";
        const expertise = "\u24ba";

        let pBonus = this.ProficiencyBonus(this.CharacterLevels(this.Character["Classes"]));
        let modifier = this.Modifier(this.Character["Ability Scores"][this.SkillToAbility(key)]);

        // Update the proficiency type and bonus span elements.
        if (this.Character["Skills"][key] === "proficient") {
            proficiencySpan.innerHTML = proficient;

            modifierSpan.innerHTML = modifier + pBonus;
        } else if (this.Character["Skills"][key] === "expertise") {
            proficiencySpan.innerHTML = expertise;

            modifierSpan.innerHTML = modifier + this.Expertise(pBonus);
        } else if (this.Character["Skills"][key] === "none") {
            proficiencySpan.innerHTML = normal;

            modifierSpan.innerHTML = modifier;
        }
    }

    constructor(key, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: block;
                    font-size: 1em;
                    justify-content: left;
                }

                #proficiency {
                    display: inline-block;
                    width: 1em;
                    font-size: 1.5em;
                    text-align: center;
                    cursor: pointer;
                }

                #modifier {
                    display: inline-block;
                    width: 2em;
                    border-bottom: 1px solid black;
                    text-align: center;
                }
            </style>

            <span id="proficiency"></span>
            <span id="modifier"></span>
            <span id="skill"></span>
        `;

        shadow.innerHTML = template;

        // Set fields
        this.Character = json;

        // Set inital element attributes.
        this.setAttribute("id", key);
        this.setAttribute("attribute", this.SkillToAbility(key));

        // Define the proficiency types, unicode.
        const normal = "\u25cb";
        const half = "\u24bd";
        const proficient = "\u24c5";
        const expertise = "\u24ba";

        // Set the proficiency type and bonus from memory.
        let proficiencySpan = shadow.querySelector("#proficiency");
        let modifierSpan = shadow.querySelector("#modifier");
        
        let pBonus;
        let modifier;

        pBonus = this.ProficiencyBonus(this.CharacterLevels(this.Character["Classes"]));
        modifier = this.Modifier(this.Character["Ability Scores"][this.SkillToAbility(key)]);
        
        if (this.Character["Skills"][key] === "proficient") {
            proficiencySpan.appendChild(document.createTextNode(proficient));

            modifierSpan.appendChild(document.createTextNode(modifier + pBonus));
        } else if (this.Character["Skills"][key] === "expertise") {
            proficiencySpan.appendChild(document.createTextNode(expertise));

            modifierSpan.appendChild(document.createTextNode(modifier + this.Expertise(pBonus)));
        } else if (this.Character["Skills"][key] === "none") {
            proficiencySpan.appendChild(document.createTextNode(normal));

            modifierSpan.appendChild(document.createTextNode(modifier));
        }

        shadow.querySelector("#skill").appendChild(document.createTextNode(`${key} (${this.SkillToAbility(key)})`));

        proficiencySpan.onclick = () => {
            this.WriteMemory(key);

            this.UpdateElement(key);
        }
    }
}

customElements.define('skill-element', Skill);

class RacialTrait extends HTMLElement {
    constructor(trait) {
        super();

        let shadow = this.attachShadow({mode: "open"});

        let template = `
            <style>
                :host {
                    display: block;
                }
            </style>

            <a>${trait}</a>
        `;

        shadow.innerHTML = template;

        shadow.querySelector('a').onclick = () => {

        }
    }
}

customElements.define("racial-trait", RacialTrait);

/* Add Modals */

class AddFeatModal extends HTMLElement {
    Character;

    constructor(json) {
        super();

        this.Character = json;

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
                <button type="button" id="add">Add Feat</button>
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
                this.Character["Feats"].push(select.value);

                this.remove();
            }
        }

        shadow.getElementById('cancel').onclick = () => {
            this.remove();
        }
    }
}

customElements.define("addfeat-modal", AddFeatModal);

/* Edit Modals */

class EditClassesModal extends HTMLElement {
    Character;
    
    constructor(json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: "open"});

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
                    display: grid;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    height: auto;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                }

                #modal label {
                    grid-column: 1;
                }

                #modal input {
                    grid-column: 2;
                    width: 3em;
                }

                #modal select {
                    grid-column: 3;
                }
            </style>

            <div id="modal"></div>
        `;

        shadow.innerHTML = template;

        let target = shadow.querySelector("#modal");

        for (let key in this.Character["Classes"]) {
            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            target.appendChild(label);

            let input = document.createElement('input');
            input.id = key;
            input.type = "number";
            input.value = this.Character["Classes"][key];
            input.onchange = () => {
                this.Character["Classes"][key] = input.valueAsNumber;

                if (this.Character["Classes"][key] >= 3) {
                    shadow.querySelector(`#${key}Subclass`).disabled = false;
                }
            };

            target.appendChild(input);

            let select = document.createElement('select');
            select.id = `${key}Subclass`;

            if (this.Character["Classes"][key] < 3) {
                select.disabled = true;
            }

            for (let subclass in this.Character["Subclasses"][key]) {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(subclass));
                option.value = subclass;

                if (this.Character["Classes"][key] >= 3) {
                    option.selected = true;
                }

                select.appendChild(option);
            }

            select.onchange = () => {
                this.Character["Subclasses"][key][select.value] = true;
            }

            target.appendChild(select);
        }

        let close = document.createElement('button');
        close.appendChild(document.createTextNode("Close"));
        close.onclick = () => {
            document.querySelector('character-sheet').UpdateClasses();
            document.querySelector('character-sheet').UpdateProficiencies();
            document.querySelector('character-sheet').UpdateProficiencyBonus();

            this.remove();
        }

        target.appendChild(close);
    }
}

customElements.define("editclasses-modal", EditClassesModal);

class EditProficienciesModal extends HTMLElement {
    Character;

    constructor(json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: "open"});

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
                    grid-template-columns: 2em 1fr;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    height: 80vh;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }
            </style>

            <div id="modal">
                <fieldset id="weapon">
                    <legend>Weapon Proficiencies</legend>
                </fieldset>

                <fieldset id="armor">
                    <legend>Armor Proficiencies</legend>
                </fieldset>

                <fieldset id="tool">
                    <legend>Tool Proficiencies</legend>   
                </fieldset>
            </div>
        `;

        shadow.innerHTML = template;

        let weapon = shadow.querySelector("#weapon");
        let armor = shadow.querySelector("#armor");
        let tool = shadow.querySelector("#tool");

        for (let key in this.Character["Weapon Proficiencies"]) {
            let div = document.createElement('div');

            let input = document.createElement('input');
            input.id = key;
            input.type = "checkbox";
            input.onchange = () => {
                this.Character["Weapon Proficiencies"][key] = input.checked;
            };

            div.appendChild(input);

            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            div.appendChild(label);

            weapon.appendChild(div);
        }
        
        for (let key in this.Character["Armor Proficiencies"]) {
            let div = document.createElement('div');

            let input = document.createElement('input');
            input.id = key;
            input.type = "checkbox";
            input.onchange = () => {
                this.Character["Armor Proficiencies"][key] = input.checked;
            };

            div.appendChild(input);

            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            div.appendChild(label);

            armor.appendChild(div);
        }
        
        for (let key in this.Character["Tool Proficiencies"]) {
            let div = document.createElement('div');

            let input = document.createElement('input');
            input.id = key;
            input.type = "checkbox";
            input.onchange = () => {
                this.Character["Tool Proficiencies"][key] = input.checked;
            };

            div.appendChild(input);

            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            div.appendChild(label);

            tool.appendChild(div);
        }
        
        let close = document.createElement('button');
        close.appendChild(document.createTextNode("Close"));
        close.onclick = () => {
            document.querySelector('character-sheet').UpdateOtherProficiencies();

            this.remove();
        }

        shadow.querySelector("#modal").appendChild(close);
    }
}

customElements.define("editproficiencies-modal", EditProficienciesModal);

class EditLanguagesModal extends HTMLElement {
    Character;

    constructor(json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: "open"});

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
                    grid-template-columns: 2em 1fr;
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    height: 80vh;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }
            </style>

            <div id="modal">
                <fieldset id="languages">
                    <legend>Languages</legend>
                </fieldset>
            </div>
        `;

        shadow.innerHTML = template;

        let lang = shadow.querySelector("#languages");

        for (let key in this.Character["Languages"]) {
            let div = document.createElement('div');

            let input = document.createElement('input');
            input.id = key;
            input.type = "checkbox";
            input.onchange = () => {
                this.Character["Languages"][key] = input.checked;
            };

            div.appendChild(input);

            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            div.appendChild(label);

            lang.appendChild(div);
        }
        
        let close = document.createElement('button');
        close.appendChild(document.createTextNode("Close"));
        close.onclick = () => {
            document.querySelector('character-sheet').UpdateLanguages();

            this.remove();
        }

        shadow.querySelector("#modal").appendChild(close);
    }
}

customElements.define("editlanguages-modal", EditLanguagesModal);

/* App Modals */

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
                content.innerHTML = "";

                content.appendChild(new CharacterSheet(JSON.parse(localStorage.getItem(select.value))));

                this.remove();
            };
        }
        
        shadow.querySelector("#file-input").onchange = e => {
            let file = e.target.files[0];

            if (!file) { return; }

            let reader = new FileReader();
            reader.readAsText(file,'UTF-8');

            reader.onload = readerEvent => {
                /* Do something if the content div has children */

                content.innerHTML = "";

                /* Check for template support and clone the template to the content div. */

                content.appendChild(new CharacterSheet(JSON.parse(readerEvent.target.result)));

                this.remove();
            }
        }

        shadow.querySelector("#cancel").onclick = () => {
            this.remove();
        };
    }
}

customElements.define("open-modal", OpenModal);


/* 
    Modal Template

    class  extends HTMLElement {
        Character;

        constructor(json) {
            super();

            this.Character = json;

            let shadow = this.attachShadow({mode: "open"});

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
                </style>

                <div id="modal"></div>
            `;

            shadow.innerHTML = template;
        }
    }

    customElements.define("", );
*/