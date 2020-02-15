let classes;
let feats;
let spells;

let classData;
let raceData;
let weaponData;

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
    "Character Level": 0,
    "Proficiency Bonus": 0,
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
        "Barbarian": "",
        "Bard": "",
        "Cleric": "",
        "Druid": "",
        "Fighter": "",
        "Monk": "",
        "Paladin": "",
        "Ranger": "",
        "Rogue": "",
        "Sorcerer": "",
        "Warlock": "",
        "Wizard": ""
    },
    "Ability Scores": {
        "Strength": 0,
        "Dexterity": 0,
        "Constitution": 0,
        "Intelligence": 0,
        "Wisdom": 0,
        "Charisma": 0
    },
    "Modifiers": {
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
    "Racial Traits": [

    ],
    "Class Features": [

    ],
    "Feats": [

    ],
    "Equipment": [

    ],
    "Spells": {
        "Level 0 (Captrip)": [],
        "Level 1": [],
        "Level 2": [],
        "Level 3": [],
        "Level 4": [],
        "Level 5": [],
        "Level 6": [],
        "Level 7": [],
        "Level 8": [],
        "Level 9": []
    },
    "Weapon Attacks": [

    ],
    "Spell Attacks": [

    ],
    "Money": {
        "CP": 0,
        "SP": 0,
        "EP": 0,
        "GP": 0,
        "PP": 0
    }
};

export async function init() {
    classes = await (await fetch("../json/classes.reference.json")).json();
    feats = await (await fetch("../json/feats.reference.json")).json();
    spells = await (await fetch("../json/spells.reference.json")).json();

    classData = await (await fetch("../json/classes.data.json")).json();
    raceData = await (await fetch("../json/races.data.json")).json();
    weaponData = await (await fetch("../json/weapons.data.json")).json();

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
    ClassToSubclass(string) {
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

    /* Update */

    UpdateClasses() {
        let target = this.shadowRoot.querySelector("#classesLevels");
        target.innerHTML = "";

        for (let key in this.Character["Classes"]) {
            if (this.Character["Classes"][key] > 0) {
                let a = document.createElement('a');

                if (this.Character["Subclasses"][key]) {
                    let subclass = this.Character["Subclasses"][key];

                    if (subclass) {
                        a.appendChild(document.createTextNode(`${key} (${subclass}), ${this.Character["Classes"][key]}`));
                    } else {
                        a.appendChild(document.createTextNode(`${key}, ${this.Character["Classes"][key]}`));
                    }
                    
                } else {
                    a.appendChild(document.createTextNode(`${key}, ${this.Character["Classes"][key]}`));
                }
                
                a.onclick = () => document.body.appendChild(new TableModal(classes[key]["Table"]));

                target.appendChild(a);
            }
        }

        this.UpdateRacialTraits();
    }

    UpdateProficiencyBonus() {
        this.shadowRoot.querySelector("#proficiencyBonus").value = this.Character["Proficiency Bonus"];
    }

    UpdatePassivePerception() {
        let passiveWisdom = this.shadowRoot.querySelector("#passivePerception");

        let wisdomModifier = this.Character["Modifiers"]["Wisdom"];

        if (this.Character["Skills"]["Perception"] === "proficient") {
            passiveWisdom.value = 10 + wisdomModifier + this.Character["Proficiency Bonus"];
        } else if (this.Character["Skills"]["Perception"] === "expertise") {
            passiveWisdom.value = 10 + wisdomModifier + this.Character["Proficiency Bonus"] * 2;
        } else if (this.Character["Skills"]["Perception"] === "none") {
            passiveWisdom.value = 10 + wisdomModifier;
        }
    }

    UpdateProficiencies() {
        let skills = this.shadowRoot.querySelector("#skills");
        skills.innerHTML = "<h4>Skills</h4>";

        let savingThrows = this.shadowRoot.querySelector("#savingThrows")
        savingThrows.innerHTML = "<h4>Saving Throws</h4>";


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
        this.shadowRoot.querySelector("#initiative").value = this.Character["Modifiers"]["Dexterity"];
    }

    UpdateRacialTraits() {
        let target = this.shadowRoot.querySelector("#traits");
        target.innerHTML = "";

        /* if (this.Character["Race"]) {
            let fieldset = document.createElement('fieldset');

            let legend = document.createElement('legend');
            legend.appendChild(document.createTextNode(`${this.Character["Race"]} - Racial Traits`));

            fieldset.appendChild(legend);

            for (let key in raceData[this.Character["Race"]]) {
                let obj = raceData[this.Character["Race"]][key];

                if (this.Character["Character Level"] >= obj["Level"]) {
                    for (let trait in obj["Traits"]) {
                        let a = document.createElement('a');
                        a.appendChild(document.createTextNode(trait));
                        a.onclick = () => document.body.appendChild(new TraitModal(trait, obj["Traits"][trait]));

                        fieldset.appendChild(a);
                    }
                }
            }

            target.appendChild(fieldset);
        } */

        if (this.Character["Racial Traits"].length > 0) {
            let fieldset = document.createElement('fieldset');

            let legend = document.createElement('legend');
            legend.appendChild(document.createTextNode(`Racial Traits`));

            fieldset.appendChild(legend);

            for (let obj of this.Character["Racial Traits"]) {
                fieldset.appendChild(new SummaryDetail(obj, "Racial Traits", this.Character));
            }

            target.appendChild(fieldset);
        }
    }

    UpdateClassFeatures() {
        let target = this.shadowRoot.querySelector("#features");
        target.innerHTML = "";

        let fieldset = document.createElement('fieldset');

        let legend = document.createElement('legend');
        legend.appendChild(document.createTextNode(`Class Features`));

        fieldset.appendChild(legend);

        for (let obj of this.Character["Class Features"]) {
            fieldset.appendChild(new SummaryDetail(obj, "Class Features", this.Character));
        }

        target.appendChild(fieldset);
    }

    UpdateFeats() {
        let target = this.shadowRoot.querySelector("#feats");
        target.innerHTML = "";

        let fieldset = document.createElement('fieldset');

        let legend = document.createElement('legend');
        legend.appendChild(document.createTextNode(`Feats`));

        fieldset.appendChild(legend);

        for (let feat of this.Character["Feats"]) {
            let a = document.createElement('a');
                a.appendChild(document.createTextNode(feat));
                a.onclick = () => document.body.appendChild(new FeatModal(feat, feats[feat]));

            fieldset.appendChild(a);
        }

        target.appendChild(fieldset);
    }

    UpdateSpells() {
        let target = this.shadowRoot.querySelector("#spells");
        target.innerHTML = "";

        let h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode("Spells"));

        target.appendChild(h4);


        for (let key in this.Character["Spells"]) {
            if (this.Character["Spells"][key].length > 0) {
                let fieldset = document.createElement('fieldset');

                let legend = document.createElement('legend');
                    legend.appendChild(document.createTextNode(key))

                fieldset.appendChild(legend);

                for (let spell of this.Character["Spells"][key]) {
                    fieldset.appendChild(new Spell(spell, this.Character));
                }

                target.appendChild(fieldset);
            }
        }
    }

    UpdateWeaponAttacks() {
        let target = this.shadowRoot.querySelector("#weaponAttacks");
            target.innerHTML = "";

        for (let obj of this.Character["Weapon Attacks"]) {
            target.appendChild(new WeaponAttack(obj, this.Character));
        }
    }

    constructor(json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: block;
                    columns: 5 20em;
                }

                :host > div {
                    border: 0px solid black;
                    margin: 10px 0px 10px 0px;
                    break-inside: avoid;
                }

                a {
                    display: block;
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

            <a id="json">Character JSON</a>

            <div>
                <input type="text" id="characterName" value="${this.Character["Name"]}">
                <label for="characterName">Character Name</label>
            </div>

            <div>
                <input type="text" id="playerName" value="${this.Character["Player Name"]}">
                <label for="playerName">Player Name</label>
            </div>

            <div>
                <h4>Race</h4>

                <select id="race"></select>
                <label for="race">Race</label>
            </div>

            <div id="classesLevels">
                <h4>Classes & Levels</h4>
            </div>

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
                <input type="number" id="initiative" value="${this.Character["Modifiers"]["Dexterity"]}" readonly>
                <label for="initiative">Initiative</label>
            </div>
            
            <div>
                <input type="number" id="Speed" value="">
                <label for="Speed">Speed</label>
            </div>

            <div>
                <h4>Hit Points</h4>

                <div>
                    <input id="hpMax" type="number" value="${this.Character["Hit Points Max"]}">
                    <label for="hpMax">Hit Point Maximum</label>
                </div>

                <div>
                    <input id="hp" type="number" value="${this.Character["Hit Points Max"]}">
                    <label for="hp">Current Hit Points</label>
                </div>
                    
                <div id="tempHpDiv">
                    <input id="tempHp" type="number">
                    <label for="tempHp">Temporary Hit Points</label>
                </div>
            </div>

            <div id="hitDiceDiv">
                <h4>Hit Dice</h4>

                <div>
                    <input id="totalHitDice" type="text" readonly>
                    <label for="totalHitDice">Total</label>
                </div>

                <div>
                    <input id="hitDice" type="text" readonly>
                    <label for="hitDice">Hit Dice</label>
                </div>
            </div>
            
            <div id="abilityScores">
                <h4>Ability Scores</h4>
            </div>

            <div id="savingThrows">
                <h4>Saving Throws</h4>
            </div>

            <div id="skills">
                <h4>Skills</h4>
            </div>

            <div id="attacksSpellcasting">
                <h4>Attacks & Spellcasting</h4>
                <div id="weaponAttacks"></div>
            </div>

            <a id="addWeaponAttack">+ Add Weapon Attack</a>
            <a id="addSpellAttack">+ Add Spell Attack</a>

            <div id="profLang">
                <h4>Other Proficiencies & Languages</h4>

                <div id="otherProficiencies"></div>
                <div id="languages"></div>
            </div>

            <a id="addProficiency">+ Add Other Proficiency</a> <a id="addLanguage">+ Add Language</a>

            <div id="featsTraits">
                <h4>Features & Traits</h4>

                <div id="traits"></div>
                <div id="features"></div>
                <div id="feats"></div>
            </div>

            <a id="addRacialTrait">+ Add Racial Trait</a>
            <a id="addClassFeature">+ Add Class Feature</a>
            <a id="addFeat">+ Add Feat</a>

            <div id="spells">
                <h4>Spells</h4>
            </div>

            <a id="addSpell">+ Add Spell</a>
        `;

        shadow.innerHTML = template;
        
        shadow.querySelector("#json").onclick = () => console.log(this.Character);

        this.UpdateClasses();
        this.UpdateProficiencyBonus();
        this.UpdatePassivePerception();
        this.UpdateOtherProficiencies();
        this.UpdateLanguages();
        this.UpdateSpells();
        this.UpdateWeaponAttacks();

        let select = shadow.querySelector("#race");

        let option = document.createElement('option');
        option.value = "";
        option.appendChild(document.createTextNode("Select a race"));

        select.appendChild(option);

        /* Racial Stuff */

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

            /* Write to memory */

            for (let obj of raceData[this.Character["Race"]]) {
                for (let key in obj) {
                    if (key === "Saving Throws") {
                        for (let savingThrow in obj[key]) {
                            if (obj[key][savingThrow] === true) {
                                this.Character["Saving Throws"][savingThrow] = obj[key][savingThrow];
                            }
                        }
                    } else if (key === "Skills") {
                        for (let skill in obj[key]) {
                            if (obj[key][skill] !== "none") {
                                this.Character["Skills"][skill] = obj[key][skill];
                            }
                        }
                    } else if (key === "Weapon Proficiencies") {
                        for (let weapon in obj[key]) {
                            if (obj[key][weapon] === true) {
                                this.Character["Weapon Proficiencies"][weapon] = obj[key][weapon];
                            }
                        }
                    } else if (key === "Armor Proficiencies") {
                        for (let armor in obj[key]) {
                            if (obj[key][armor] === true) {
                                this.Character["Armor Proficiencies"][armor] = obj[key][armor];
                            }
                        }
                    } else if (key === "Tool Proficiencies") {
                        for (let tool in obj[key]) {
                            if (obj[key][tool] === true) {
                                this.Character["Tool Proficiencies"][tool] = obj[key][tool];
                            }
                        }
                    } else if (key === "Languages") {
                        for (let language in obj[key]) {
                            if (obj[key][language] === true) {
                                this.Character["Languages"][language] = obj[key][language];
                            }
                        }
                    }
                }
            }

            /* Update the UI */

            let savingThrows = shadow.querySelectorAll('saving-throw');

            for (let node of savingThrows) {
                node.UpdateElement(node.id);
            }

            let skills = shadow.querySelectorAll('skill-element');

            for (let node of skills) {
                node.UpdateElement(node.id);
            }

            this.UpdateOtherProficiencies();
            this.UpdateRacialTraits();
            this.UpdateLanguages();
        }

        shadow.querySelector("#classEdit").onclick = () => document.body.appendChild(new EditClassesModal(this.Character));
        shadow.querySelector("#addProficiency").onclick = () => document.body.appendChild(new EditProficienciesModal(this.Character));
        shadow.querySelector("#addLanguage").onclick = () => document.body.appendChild(new EditLanguagesModal(this.Character));
        shadow.querySelector("#addRacialTrait").onclick = () => document.body.appendChild(new GenericAddEditModal(undefined, "Racial Traits", this.Character));
        shadow.querySelector("#addClassFeature").onclick = () => document.body.appendChild(new GenericAddEditModal(undefined, "Class Features", this.Character));
        shadow.querySelector("#addFeat").onclick = () => document.body.appendChild(new AddFeatModal(this.Character));
        shadow.querySelector("#addSpell").onclick = () => document.body.appendChild(new AddSpellModal(this.Character));
        shadow.querySelector("#addWeaponAttack").onclick = () => document.body.appendChild(new GenericAddEditModal(undefined, "Weapon Attacks", this.Character));

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
                    /* console.log(mutation.target.id) */

                    let toChange = shadow.querySelectorAll(`[attribute=\"${mutation.target.id}\"]`);
    
                    toChange.forEach(element => {
                        element.UpdateElement(element.id);
                    });
    
                    if (mutation.target.id === "Strength") {
                        this.UpdateWeaponAttacks();
                    }
    
                    if (mutation.target.id === "Dexterity") {
                        this.UpdateInitiative();
                        this.UpdateWeaponAttacks();
                    }
    
                    if (mutation.target.id === "Wisdom") {
                        this.UpdatePassivePerception();
                    }
                } else if (mutation.type === "characterData") {
                    console.log(mutation.target.id);
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

/* Elements */

class AbilityScore extends HTMLElement {
    UpdateElement(key) {
        this.setAttribute("value", this.Character["Ability Scores"][key]);

        this.shadowRoot.querySelector("#modifier").innerHTML = `(${this.Character["Modifiers"][key]})`;
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
            <div id="modifier">${modifier(this.Character["Ability Scores"][key])}</div>
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
            <span id="modifier">(${this.Character["Modifiers"][key]})</span>
            <label for="abilityScore">${key}</label>
        `;

        shadow.innerHTML = flat;

        this.setAttribute("id", key);
        this.setAttribute("value", this.Character["Ability Scores"][key])

        let input = shadow.querySelector('input');

        input.onchange = () => {
            this.Character["Ability Scores"][key] = input.valueAsNumber;
            this.Character["Modifiers"][key] = modifier(this.Character["Ability Scores"][key]);

            this.UpdateElement(key);
        }
        
        function modifier(int) {
            return Math.floor((int - 10) / 2);
        }
    }
}

customElements.define('ability-score', AbilityScore);

class SavingThrow extends HTMLElement {
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

            this.shadowRoot.querySelector("#modifier").innerHTML = this.Character["Modifiers"][key];
        } else if (this.Character["Saving Throws"][key] === true) {
            this.shadowRoot.querySelector("#proficiency").innerHTML = "\u25c9";

            this.shadowRoot.querySelector("#modifier").innerHTML = this.Character["Modifiers"][key] + this.Character["Proficiency Bonus"];
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

            modifierSpan.appendChild(document.createTextNode(this.Character["Modifiers"][key]));
        } else if (this.Character["Saving Throws"][key] === true) {
            proficiencySpan.appendChild(document.createTextNode("\u25c9"));

            modifierSpan.appendChild(document.createTextNode(this.Character["Modifiers"][key])) + this.Character["Proficiency Bonus"];
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

        let pBonus = this.Character["Proficiency Bonus"];
        let modifier = this.Character["Modifiers"][this.SkillToAbility(key)];

        // Update the proficiency type and bonus span elements.
        if (this.Character["Skills"][key] === "proficient") {
            proficiencySpan.innerHTML = proficient;

            modifierSpan.innerHTML = modifier + pBonus;
        } else if (this.Character["Skills"][key] === "expertise") {
            proficiencySpan.innerHTML = expertise;

            modifierSpan.innerHTML = modifier + pBonus * 2;
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
        
        let pBonus = this.Character["Proficiency Bonus"];
        let modifier = this.Character["Modifiers"][this.SkillToAbility(key)];

        if (this.Character["Skills"][key] === "proficient") {
            proficiencySpan.appendChild(document.createTextNode(proficient));

            modifierSpan.appendChild(document.createTextNode(modifier + pBonus));
        } else if (this.Character["Skills"][key] === "expertise") {
            proficiencySpan.appendChild(document.createTextNode(expertise));

            modifierSpan.appendChild(document.createTextNode(modifier + pBonus * 2));
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

class Spell extends HTMLElement {
    constructor(title, json) {
        super();

        this.Character = json;

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    font-size: 1em;
                    justify-content: left;
                }

                a {
                    grid-column: 1;
                    color: blue;
                    cursor: pointer;
                }

                button {
                    grid-column: 2;
                }
            </style>

            <a>${title}</a>
            <button>\u2716</button>
        `;

        shadow.innerHTML = template;

        shadow.querySelector('a').onclick = () => document.body.appendChild(new SpellModal(title));

        let spellLevel = spells[title]["Level"];

        shadow.querySelector('button').onclick = () => {
            if (spellLevel === 0) {
                this.Character["Spells"]["Level 0 (Captrip)"].pop(title);
            } else if (spellLevel === 1) {
                this.Character["Spells"]["Level 1"].pop(title);
            } else if (spellLevel === 2) {
                this.Character["Spells"]["Level 2"].pop(title);
            } else if (spellLevel === 3) {
                this.Character["Spells"]["Level 3"].pop(title);
            } else if (spellLevel === 4) {
                this.Character["Spells"]["Level 4"].pop(title);
            } else if (spellLevel === 5) {
                this.Character["Spells"]["Level 5"].pop(title);
            } else if (spellLevel === 6) {
                this.Character["Spells"]["Level 6"].pop(title);
            } else if (spellLevel === 7) {
                this.Character["Spells"]["Level 7"].pop(title);
            } else if (spellLevel === 8) {
                this.Character["Spells"]["Level 8"].pop(title);
            } else if (spellLevel === 9) {
                this.Character["Spells"]["Level 9"].pop(title);
            }

            this.remove();
        };
    }
}

customElements.define('spell-element', Spell);

class WeaponAttack extends HTMLElement {
    constructor(obj, character) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr auto;
                }

                span {
                    grid-column: 1;
                }

                button {
                    grid-column: 2;
                }

            </style>

            <span><b>${obj["Name"]}.</b> ${obj["Description"]}</span>
            
            <button type="button" id="remove">\u2716</button>
        `;

        shadow.innerHTML = template;

        shadow.querySelector("#remove").onclick = () => {
            for (let obj2 of character["Weapon Attacks"]) {
                if (obj["Name"] === obj2["Name"]) {
                    let index = character["Weapon Attacks"].indexOf(obj2);
                    
                    character["Weapon Attacks"].splice(index, 1);

                    this.remove();
                }
            }
        }
    }
}

customElements.define('weapon-attack', WeaponAttack);

class RacialTrait extends HTMLElement {
    constructor(obj, character) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr auto;
                }

                details {
                    margin: .25em;
                }

                button {
                    grid-column: 2;
                    grid-row: 1;
                    display: inline-block;
                    height: 2em;
                    width: 2em;
                    padding: 2px;
                }

            </style>

            <details><summary><b>${obj["Name"]}</b></summary> ${obj["Description"]}</details>
            
            <button type="button" id="remove">\u2716</button>
        `;

        shadow.innerHTML = template;

        shadow.querySelector('button').onclick = () => {
            for (let obj2 of character["Racial Traits"]) {
                if (obj["Name"] === obj2["Name"]) {
                    let index = character["Racial Traits"].indexOf(obj2);
                    
                    character["Racial Traits"].splice(index, 1);

                    this.remove();
                }
            }
        }
    }
}

customElements.define('racial-trait', RacialTrait);

class ClassFeature extends HTMLElement {
    constructor(obj, character) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr auto;
                }

                details {
                    margin: .25em;
                }

                button {
                    grid-column: 2;
                    grid-row: 1;
                    display: inline-block;
                    height: 2em;
                    width: 2em;
                    padding: 2px;
                }

            </style>

            <details><summary><b>${obj["Name"]}</b></summary> ${obj["Description"]}</details>
            
            <button type="button" id="remove">\u2716</button>
        `;

        shadow.innerHTML = template;

        shadow.querySelector('button').onclick = () => {
            for (let obj2 of character["Class Features"]) {
                if (obj["Name"] === obj2["Name"]) {
                    let index = character["Class Features"].indexOf(obj2);
                    
                    character["Class Features"].splice(index, 1);

                    this.remove();
                }
            }
        }
    }
}

customElements.define('class-feature', ClassFeature);

class SummaryDetail extends HTMLElement {
    constructor(obj, category, character) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr auto auto;
                }

                details {
                    margin: .25em;
                }

                #edit {
                    grid-column: 2;
                    grid-row: 1;
                    display: inline-block;
                    height: 2em;
                    width: 2em;
                    padding: 2px;
                }

                #remove {
                    grid-column: 3;
                    grid-row: 1;
                    display: inline-block;
                    height: 2em;
                    width: 2em;
                    padding: 2px;
                }

            </style>

            <details>
                <summary>
                    <b>${obj["Name"]}</b>
                </summary>

                ${obj["Description"]}
            </details>
            
            <button type="button" id="edit">Edit</button>
            <button type="button" id="remove">\u2716</button>
        `;

        shadow.innerHTML = template;

        shadow.querySelector('#edit').onclick = () => {
            document.body.appendChild(new GenericAddEditModal(obj["Name"], category, character));
        }

        shadow.querySelector('#remove').onclick = () => {
            for (let obj2 of character[category]) {
                if (obj["Name"] === obj2["Name"]) {
                    let index = character[category].indexOf(obj2);
                    
                    character[category].splice(index, 1);

                    this.remove();
                }
            }
        }
    }
}

customElements.define('summary-detail', SummaryDetail);

/* Info Modals */

class TableModal extends HTMLElement {
    constructor(json) {
        super();

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
                    max-height: 80vh;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }

                button {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
            </style>

            <div id="modal">
            <button type="button" id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;

        let modal = shadow.querySelector("#modal");
        
        table(json, modal);

        shadow.querySelector('button').onclick = () => {
            this.remove();
        };

        function table(json, parent) {
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

                for (let header of json["Headers"]) {
                    let th = document.createElement('th');
                        th.appendChild(document.createTextNode(header));
                    
                    headers.appendChild(th);
                }

                table.appendChild(headers);
            }
            
            // Rows

            if(json["Rows"] !== undefined) {
                for (let row of json["Rows"]) {
                    let tr = document.createElement('tr');

                    for(let key in row) {
                        let td = document.createElement('td');
                            td.appendChild(document.createTextNode(row[key]));

                        tr.appendChild(td);
                    }

                    table.appendChild(tr);
                }
            }

            parent.appendChild(table);
        }
    }
}

customElements.define("table-modal", TableModal);

class FeatModal extends HTMLElement {
    constructor(title, json) {
        super();

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
                    max-height: 80vh;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }

                button {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
            </style>

            <div id="modal">
            <h3>${title}</h3>
            <button type="button" id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;

        let modal = shadow.querySelector("#modal");
        
        for (let key in json) {
            if (key.includes("Description")) {
                paragraphs(json[key], modal);
            } else if (key.includes("Unordered List")) {
                list(json[key], "ul", modal);
            } else if (key.includes("Table")) {
                table(json[key], modal);
            }
        }

        shadow.querySelector('button').onclick = () => {
            this.remove();
        };

        function paragraphs(array, parent) {
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

        function list(array, listType, parent) {
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

        function table(json, parent) {
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
    }
}

customElements.define("feat-modal", FeatModal);

class TraitModal extends HTMLElement {
    constructor(title, json) {
        super();

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
                    max-height: 80vh;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }

                button {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
            </style>

            <div id="modal">
            <h3>${title}</h3>
            <button type="button" id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;

        let modal = shadow.querySelector("#modal");
        
        paragraphs(json, modal);

        shadow.querySelector('button').onclick = () => this.remove();

        function paragraphs(array, parent) {
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
    }
}

customElements.define("trait-modal", TraitModal);

class FeatureModal extends HTMLElement {
    constructor(title, json) {
        super();

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
                    max-height: 80vh;
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }

                button {
                    position: absolute;
                    top: 20px;
                    right: 20px;
                }
            </style>

            <div id="modal">
            <h3>${title}</h3>
            <button type="button" id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;

        let modal = shadow.querySelector("#modal");
        
        let newTitle = title;

        if (title.includes("(")) {
            let split = title.split(" (");
            
            newTitle = split[0];
        }

        if (json[newTitle]) {
            if (Array.isArray(json[newTitle])) {
                paragraphs(json[newTitle], modal);
            } else {
                for (let key in json[newTitle]) {
                    if (key.includes("Description")) {
                        paragraphs(json[newTitle][key], modal);
                    } else if (key === "Unordered List") {
                        list(json[newTitle][key], "ul", modal);
                    } else if (key.includes("Table")) {
                        table(json[newTitle][key], modal);
                    } else if (Array.isArray(json[newTitle][key])) {
                        let b = document.createElement('b');
                        b.appendChild(document.createTextNode(key));

                        modal.appendChild(b);

                        paragraphs(json[newTitle][key], modal)
                    }
                }
            }
        }

        shadow.querySelector('button').onclick = () => this.remove();

        function paragraphs(array, parent) {
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
        
        function list(array, listType, parent) {
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
        
        function table(json, parent) {
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
    }
}

customElements.define("feature-modal", FeatureModal);

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
                    max-height: 80vh;
                    width: 80vw;
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

        shadow.querySelector('button').onclick = () => this.remove();

        let description = shadow.querySelector('#description');

        for(let key in spells[name]) {
            if(key.includes("Description")) {
                paragraphs(spells[name][key], description);
            } else if(key == "Higher Levels") {
                paragraphs(spells[name][key], description);
            } else if(key.includes("Unordered List")) {
                list(spells[name][key], "ul", description);
            } else if(key.includes("Ordered List")) {
                list(spells[name][key], "ol", description);
            } else if(key.includes("Table")) {
                table(spells[name][key], description)
            }
        }

        shadow.querySelector('#footer i').appendChild(document.createTextNode(`${spells[name]["Book"]}, Pg. ${spells[name]["Page"]}`));

        function paragraphs(array, parent) {
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
        
        function list(array, listType, parent) {
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
        
        function table(json, parent) {
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
    }
}

customElements.define('spell-modal', SpellModal);

/* Add Modals */

class AddWeaponAttackModal extends HTMLElement {
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
                    width: max-content;
                    transform: translate(-50%, -50%);
                    display: grid;
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                }
            </style>

            <div id="modal">
                <div>
                    <input type="text" id="name">

                    <select id="base">
                        <option value="">Select a Weapon Base</option>
                    </select>

                    <select id="modifier">
                        <option value="">Attack/Damage Modifier</option>
                        <option value="0">0</option>
                        <option value="1">+1</option>
                        <option value="2">+2</option>
                        <option value="3">+3</option>
                    </select>

                    <input id="miscAttack" type="number">
                    <input id="miscDamage" type="number">
                </div>
                <div>
                    <button type="button" id="add">Add Weapon Attack</button>
                    <button type="button" id="cancel">Cancel</button>
                </div>
            </div>
        `;

        let template2 = `
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
                    width: max-content;
                    transform: translate(-50%, -50%);
                    display: grid;
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                }
            </style>

            <div id="modal">
                <div>
                    <label for="name">Weapon Name</label>
                    <input type="text" id="name">
                </div>
                <div>
                    <textarea id="description"></textarea>
                </div>
                <div>
                    <button type="button" id="add">Add Weapon Attack</button>
                    <button type="button" id="cancel">Cancel</button>
                </div>
            </div>
        `;

        shadow.innerHTML = template2;

        let obj = {
            "Name": "",
            "Description": ""
        }

        shadow.querySelector("#add").onclick = () => {
            if (shadow.querySelector("#name").value) {
                obj["Name"] = shadow.querySelector("#name").value;
                obj["Description"] = shadow.querySelector("#description").value;

                this.Character["Weapon Attacks"].push(obj);

                document.querySelector('character-sheet').UpdateWeaponAttacks();

                this.remove();
            }
        }

        shadow.querySelector("#cancel").onclick = () => {
            this.remove();
        }
    }
}

customElements.define("addweaponattack-modal", AddWeaponAttackModal);

class AddClassFeatureModal extends HTMLElement {
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
                    width: max-content;
                    transform: translate(-50%, -50%);
                    display: grid;
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                }
            </style>

            <div id="modal">
                <div>
                    <label for="name">Feature Name</label>
                    <input type="text" id="name">
                </div>
                <div>
                    <textarea id="description"></textarea>
                </div>
                <div>
                    <button type="button" id="add">Add Class Feature</button>
                    <button type="button" id="cancel">Cancel</button>
                </div>
            </div>
        `;

        shadow.innerHTML = template;

        let obj = {
            "Name": "",
            "Description": ""
        }

        shadow.querySelector("#add").onclick = () => {
            if (shadow.querySelector("#name").value) {
                obj["Name"] = shadow.querySelector("#name").value;
                obj["Description"] = shadow.querySelector("#description").value;

                this.Character["Class Features"].push(obj);

                document.querySelector('character-sheet').UpdateClassFeatures();

                this.remove();
            }
        }

        shadow.querySelector("#cancel").onclick = () => {
            this.remove();
        }
    }
}

customElements.define("addclassfeature-modal", AddClassFeatureModal);

class GenericAddEditModal extends HTMLElement {
    constructor(name, category, character) {
        super();

        this.Character = character;

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

                label {
                    display: block;
                }

                #modal {
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    height: auto;
                    width: max-content;
                    transform: translate(-50%, -50%);
                    display: grid;
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                }
            </style>

            <div id="modal">
                <div>
                    <label for="name">Name</label>
                    <input type="text" id="name">
                </div>
                <div>
                    <label for="description">Description</label>
                    <textarea id="description"></textarea>
                </div>
                <div>
                    <button type="button" id="add">Add</button>
                    <button type="button" id="cancel">Cancel</button>
                </div>
            </div>
        `;

        shadow.innerHTML = template;

        let obj = {
            "Name": "",
            "Description": ""
        }

        let input = shadow.querySelector('input');
        let textarea = shadow.querySelector('textarea');

        let index;

        if (name) {
            this.Character[category].forEach(element => {
                if (element["Name"] === name) {
                    index = this.Character[category].indexOf(element, 0);

                    input.value = element["Name"];
                    textarea.value = element["Description"];
                }
            });
        }

        shadow.querySelector("#add").onclick = () => {
            if (input.value) {
                if (name) {
                    this.Character[category][index]["Name"] = input.value;
                    this.Character[category][index]["Description"] = textarea.value;
                } else {
                    obj["Name"] = input.value;
                    obj["Description"] = textarea.value;

                    this.Character[category].push(obj);
                }

                if (category === "Racial Traits") {
                    document.querySelector('character-sheet').UpdateRacialTraits();
                } else if (category === "Class Features") {
                    document.querySelector('character-sheet').UpdateClassFeatures();
                } else if (category === "Weapon Attacks") {
                    document.querySelector('character-sheet').UpdateWeaponAttacks();
                }
                
                this.remove();
            }
        }

        shadow.querySelector("#cancel").onclick = () => {
            this.remove();
        }
    }
}

customElements.define("genericaddedit-modal", GenericAddEditModal);

class AddFeatModal extends HTMLElement {
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
                <select>
                    <option value="">Select a Feat</option>
                </select>
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

                document.querySelector('character-sheet').UpdateFeats();

                this.remove();
            }
        }

        shadow.getElementById('cancel').onclick = () => this.remove();
    }
}

customElements.define("addfeat-modal", AddFeatModal);

class AddSpellModal extends HTMLElement {
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
                <h3>Add a spell...</h3>
                <select>
                    <option value="">Select a Spell</option>
                </select>
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

        let spellLevel;

        select.onchange = () => {
            spellLevel = spells[select.value]["Level"];
        };

        shadow.getElementById('add').onclick = () => {
            if (spellLevel === 0) {
                this.Character["Spells"]["Level 0 (Captrip)"].push(select.value);
            } else if (spellLevel === 1) {
                this.Character["Spells"]["Level 1"].push(select.value);
            } else if (spellLevel === 2) {
                this.Character["Spells"]["Level 2"].push(select.value);
            } else if (spellLevel === 3) {
                this.Character["Spells"]["Level 3"].push(select.value);
            } else if (spellLevel === 4) {
                this.Character["Spells"]["Level 4"].push(select.value);
            } else if (spellLevel === 5) {
                this.Character["Spells"]["Level 5"].push(select.value);
            } else if (spellLevel === 6) {
                this.Character["Spells"]["Level 6"].push(select.value);
            } else if (spellLevel === 7) {
                this.Character["Spells"]["Level 7"].push(select.value);
            } else if (spellLevel === 8) {
                this.Character["Spells"]["Level 8"].push(select.value);
            } else if (spellLevel === 9) {
                this.Character["Spells"]["Level 9"].push(select.value);
            }
            
            document.body.querySelector('character-sheet').UpdateSpells();

            this.remove();
        }

        shadow.getElementById('cancel').onclick = () => {
            this.remove();
        }
    }
}

customElements.define("addspell-modal", AddSpellModal);

/* Edit Modals */

class EditClassesModal extends HTMLElement {
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
                    width: 80vw;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                }

                #controls {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    position: sticky;
                    top: 0px;
                    left: 0px;
                    border-bottom: 1px solid black;
                }

                #controls h4 {
                    grid-column: 1;
                    display: inline;
                    margin: 0px;
                }

                #controls button {
                    grid-column: 2;
                }

                #content {
                    display: grid;
                    height: 97%;
                    width: 100%;
                    overflow: auto;
                }

                #content label {
                    grid-column: 1;
                }

                #content input {
                    grid-column: 2;
                    width: 3em;
                }

                #content select {
                    grid-column: 3;
                }
                
            </style>

            <div id="modal">
                <div id="controls">
                    <h4>Classes & Levels</h4>
                    <button>\u2716</button>
                </div>
                <div id="content"></div>
            </div>
        `;

        shadow.innerHTML = template;

        let target = shadow.querySelector("#content");

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
            };

            target.appendChild(input);

            let select = document.createElement('select');
            select.id = `${key}Subclass`;

            let option = document.createElement('option');
            option.appendChild(document.createTextNode("Select a subclass"));
            option.value = "";

            select.appendChild(option);

            for (let subclass in classData[key]["Subclasses"]) {
                let option = document.createElement('option');
                option.appendChild(document.createTextNode(subclass));
                option.value = subclass;

                select.appendChild(option);
            }

            select.onchange = () => {
                this.Character["Subclasses"][key] = [select.value];
            }

            target.appendChild(select);
        }

        shadow.querySelector('button').onclick = () => {
            
            /* Character Levels */

            let total = 0;
        
            for (let key in this.Character["Classes"]) {
                total = total + this.Character["Classes"][key];
            }

            this.Character["Character Level"] = total;

            /* Proficiency Bonus */

            let bonus = 0;

            if (total < 4) {
                bonus = 2;
            } else if (total < 9) {
                bonus = 3;
            } else if (total < 13) {
                bonus = 4;
            } else if (total < 17) {
                bonus = 5;
            } else if (total < 21) {
                bonus = 6;
            } else if (total < 25) {
                bonus = 7;
            } else if (total < 29) {
                bonus = 8;
            } else if (total < 31) {
                bonus = 9;
            }
        
            this.Character["Proficiency Bonus"] = parseInt(bonus);

            document.querySelector('character-sheet').UpdateClasses();
            document.querySelector('character-sheet').UpdateProficiencies();
            document.querySelector('character-sheet').UpdateProficiencyBonus();

            this.remove();
        }
    }
}

customElements.define("editclasses-modal", EditClassesModal);

class EditProficienciesModal extends HTMLElement {
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
                }

                #controls {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    position: sticky;
                    top: 0px;
                    left: 0px;
                    border-bottom: 1px solid black;
                }

                #controls h4 {
                    grid-column: 1;
                    display: inline;
                    margin: 0px;
                }

                #controls button {
                    grid-column: 2;
                }

                #lists {
                    height: 97%;
                    width: 100%;
                    overflow: auto;
                }
            </style>

            <div id="modal">
                <div id="controls">
                    <h4>Other Proficiencies</h4>
                    <button>\u2716</button>
                </div>
                <div id="lists">
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

            if (this.Character["Weapon Proficiencies"][key]) {
                input.checked = true;
            }

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

            if (this.Character["Armor Proficiencies"][key]) {
                input.checked = true;
            }

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

            if (this.Character["Tool Proficiencies"][key]) {
                input.checked = true;
            }

            div.appendChild(input);

            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            div.appendChild(label);

            tool.appendChild(div);
        }
        
        shadow.querySelector('button').onclick = () => {
            document.querySelector('character-sheet').UpdateOtherProficiencies();
            document.querySelector('character-sheet').UpdateWeaponAttacks();

            this.remove();
        }
    }
}

customElements.define("editproficiencies-modal", EditProficienciesModal);

class EditLanguagesModal extends HTMLElement {
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
                }

                #controls {
                    display: grid;
                    grid-template-columns: 1fr auto;
                    position: sticky;
                    top: 0px;
                    left: 0px;
                    border-bottom: 1px solid black;
                }

                #controls h4 {
                    grid-column: 1;
                    display: inline;
                    margin: 0px;
                }

                #controls button {
                    grid-column: 2;
                }

                #lists {
                    height: 97%;
                    width: 100%;
                    overflow: auto;
                }
            </style>

            <div id="modal">
                <div id="controls">
                    <h4>Languages</h4>
                    <button>\u2716</button>
                </div>
                <div id="list"></div>
            </div>

            button {
                position: absolute;
                top: 0px;
                right: 0px;
            }
        `;

        shadow.innerHTML = template;

        let lang = shadow.querySelector("#list");

        for (let key in this.Character["Languages"]) {
            let div = document.createElement('div');

            let input = document.createElement('input');
            input.id = key;
            input.type = "checkbox";
            input.onchange = () => {
                this.Character["Languages"][key] = input.checked;
            };

            if (this.Character["Languages"][key]) {
                input.checked = true;
            }

            div.appendChild(input);

            let label = document.createElement('label');
            label.htmlFor = key;
            label.appendChild(document.createTextNode(key));

            div.appendChild(label);

            lang.appendChild(div);
        }
        
        shadow.querySelector('button').onclick = () => {
            document.querySelector('character-sheet').UpdateLanguages();

            this.remove();
        }
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