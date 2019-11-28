fetch("../json/5e Data.json")
    .then(response => response.json)
    .then(json => {
        for (let key in json) {
            localStorage.setItem(`${key} Data`, JSON.stringify(json[key]));
        }
    })  

const races = JSON.parse(localStorage.getItem("Races"));
const classes = JSON.parse(localStorage.getItem("Classes"));
const feats = JSON.parse(localStorage.getItem("Feats"));
const spells = JSON.parse(localStorage.getItem("Spells"));

const raceData = JSON.parse(localStorage.getItem("Races Data"));
const classData = JSON.parse(localStorage.getItem("Classes Data"));

const character = {
    "Name": "",
    "Race": "",
    "Size": "",
    "Alignment": "",
    "Hit Points Max": "",
    "Hit Points": "",
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
    "Speeds": {
        "Walk": 0,
        "Burrow": 0,
        "Climb": 0,
        "Fly": 0,
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

let newCharacter = {
    "Name": "",
    "Race": "",
    "Size": "",
    "Alignment": "",
    "Hit Points Max": "",
    "Hit Points": "",
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
    "Speeds": {
        "Walk": 0,
        "Burrow": 0,
        "Climb": 0,
        "Fly": 0,
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
    document.querySelector('#content').appendChild(new CharacterSheet(newCharacter));
}

class CharacterSheet extends HTMLElement {
    constructor(json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: flex;
                }
            </style>
        `;

        shadow.innerHTML = template;

        shadow.appendChild(new AbilityScores(json));
        shadow.appendChild(new Skills(json));
    }
}

customElements.define('character-sheet', CharacterSheet);

class AbilityScores extends HTMLElement {
    constructor(json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    margin: 10px;
                    padding: 10px;
                    border: 1px solid black;
                }
            </style>
        `;

        shadow.innerHTML = template;

        const abilityScores = [
            "Strength",
            "Dexterity",
            "Constitution",
            "Intelligence",
            "Wisdom",
            "Charisma"
        ];
        
        abilityScores.forEach(key => {
            shadow.appendChild(new AbilityScore(key, json));
        });
    }
}

customElements.define('ability-scores', AbilityScores);

class AbilityScore extends HTMLElement {
    Modifier(int) {
        return Math.floor((parseInt(int) - 10) / 2);
    }

    constructor(key, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    display: grid;
                    font-size: 1em;
                }

                label {
                    font-weight: bold;
                }

                input {
                    width: 3em;
                }
            </style>

            <label for="abilityScore"></label>
            <input type="number" id="abilityScore" value="0">
            <div id="modifier">0</div>
        `;

        shadow.innerHTML = template;

        // Set inital element attributes.
        this.setAttribute("id", key);
        this.setAttribute("value", json["Ability Scores"][key])

        // Set the Ability Score name.
        shadow.querySelector('label').appendChild(document.createTextNode(key));

        // Set the values for the input element and the modifier div from memory.
        let input = shadow.querySelector('input')
        let target = shadow.querySelector("#modifier");

        input.value = json["Ability Scores"][key];

        target.innerHTML = this.Modifier(json["Ability Scores"][key]);

        // When the input element value changes.
        input.onchange = () => {
            // Grab the value from the input and write to memory.
            json["Ability Scores"][key] = input.valueAsNumber;

            // Update the elements "value" attribute.
            this.setAttribute("value", json["Ability Scores"][key]);

            // Update the modifier div.
            target.innerHTML = this.Modifier(input.value);
        }

        
    }
}

customElements.define('ability-score', AbilityScore);

class Skills extends HTMLElement {
    constructor(json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let template = `
            <style>
                :host {
                    margin: 10px;
                    padding: 10px;
                    border: 1px solid black;
                }

                #skills {
                    display: grid;
                }

                h4 {
                    text-align: center;
                }
            </style>

            <div id="skills"></div>
            <h4>Skills</h4>
        `;

        shadow.innerHTML = template;

        const skills = [
            "Acrobatics",
            "Animal Handling",
            "Arcana",
            "Athletics",
            "Deception",
            "History",
            "Insight",
            "Intimidation",
            "Investigation",
            "Medicine",
            "Nature",
            "Perception",
            "Performance",
            "Persuasion",
            "Religion",
            "Sleight of Hand",
            "Stealth",
            "Survival"
        ]

        skills.forEach(key => {
            shadow.querySelector("#skills").appendChild(new Skill(key, json));
        });
    }
}

customElements.define('skills-element', Skills);

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

    UpdateElements(key) {
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

            <span id="proficiency"></span><span id="modifier"></span><span id="skill"></span>
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

        shadow.querySelector("#skill").appendChild(document.createTextNode(key));

        proficiencySpan.onclick = () => {
            this.WriteMemory(key);

            this.UpdateElements(key);
        }
    }
}

customElements.define('skill-element', Skill);

window.addEventListener('load', event => {
    // Testing MutationObserver
    let MutationObserver = window.MutationObserver;

    let sheet = document.querySelector("character-sheet");
    let shadow = sheet.shadowRoot;
    let skills = shadow.querySelector("skills-element");
    let scores = shadow.querySelector("ability-scores");

    let observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === "attributes") {
                let toChange = skills.shadowRoot.querySelectorAll(`[attribute=\"${mutation.target.id}\"]`);

                for (let node of toChange) {
                    node.UpdateElements(node.id);
                }
            }
        });
    })

    for (let node of scores.shadowRoot.children) {
        observer.observe(node, {
            attributes: true,
            childList: true,
            characterData: true
        });
    }
});

