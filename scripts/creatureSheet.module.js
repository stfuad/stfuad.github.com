import {List, Paragraphs} from "./htmlElements.module.js";

export function CreatureSheet(name, json, parent) {

    // Header (Title/Subtitles)

    let header = document.createElement('div');
    header.id = "creatureSheetHeader";

    let h2 = document.createElement('h2');
    let stsa = document.createElement('div');

    let size = json["Size"];
    let type = json["Type"];
    let subType = json["SubType"];
    let alignment = json["Alignment"];

    let subTitle = document.createElement('i');
    if (subType != undefined) {
        subTitle.appendChild(document.createTextNode(`${size} ${type} (${subType}), ${alignment}`));
    } else {
        subTitle.appendChild(document.createTextNode(`${size} ${type}, ${alignment}`));
    }

    h2.appendChild(document.createTextNode(name));
    stsa.appendChild(subTitle);

    header.appendChild(h2);
    header.appendChild(stsa);

    parent.appendChild(header);

    // Upper block

    let upperBlock = document.createElement('div');
    upperBlock.id = "upperBlock";

    // Armor Class

    ArmorClass(json, upperBlock);

    // Hit Points

    HitPoints(json["Hit Dice"], json["Ability Scores"]["Constitution"], upperBlock);

    // Speed

    Speed(json["Speed"], upperBlock);

    parent.appendChild(upperBlock);

    // Ability Scores

    AbilityScores(json["Ability Scores"], parent);

    // Lower block

    let lowerBlock = document.createElement('div');
    lowerBlock.id = "lowerBlock";

    // Skills

    Skills(json, lowerBlock);

    // Saving Throws

    SavingThrows(json, lowerBlock);

    // Damage Vulnerabilities, Damage Resistances, Damage Immunities, Condition Immunities
    
    Arrays(json, lowerBlock, "Damage Vulnerabilities", "Damage Resistances", "Damage Immunities", "Condition Immunities");
    
    // Senses

    Senses(json, lowerBlock);

    // Languages

    Arrays(json, lowerBlock, "Languages")

    // Challenge

    Challenge(json, lowerBlock);

    parent.appendChild(lowerBlock);

    // Properties

    Properties(json, parent, "Features", "Actions", "Actions for Type 1", "Actions for Type 2", "Actions for Type 3", "Reactions", "Legendary Actions");

    // Footer (Book/Page)

    let footer = document.createElement('div');
    footer.id = "sheetFooter";
    footer.appendChild(document.createTextNode(`${json["Book"]}, Pg. ${json["Page"]}`));
    parent.appendChild(footer);
}

function ArmorClass(json, parent) {
    let div = document.createElement('div');

    let b = document.createElement('b');
    b.appendChild(document.createTextNode("Armor Class "));

    let ac = "";

    if(json["Armor Type"] !== undefined) {
        ac = `${json["Armor Class"]} (${json["Armor Type"]})`;
    } else {
        ac = json["Armor Class"];
    }
    
    div.appendChild(b);
    div.appendChild(document.createTextNode(ac));
    parent.appendChild(div);
}

function HitPoints(hitDice, conMod, parent) {
    let div = document.createElement('div');

    let split = hitDice.split(/d/);

    let split0 = parseInt(split[0]);
    let split1 = parseInt(split[1]);

    let modifier = Math.floor((conMod - 10) / 2);
    let average = (split1 + 1) / 2 * split0 + modifier;

    let max = (split0 * split1) + modifier;

    let b = document.createElement('b');

    b.appendChild(document.createTextNode("Hit Points "));

    div.appendChild(b);

    if(modifier < 0) {
        div.appendChild(document.createTextNode(`${hitDice} - ${modifier} (Average: ${average}, Max: ${max})`));
    } else if(modifier === 0) {
        div.appendChild(document.createTextNode(`${hitDice} (Average: ${average}, Max: ${max})`));
    } else {
        div.appendChild(document.createTextNode(`${hitDice} + ${modifier} (Average: ${average}, Max: ${max})`));
    }
    
    parent.appendChild(div);
}

function Speed(json, parent) {
    let div = document.createElement('div');
    let b = document.createElement('b');

    b.appendChild(document.createTextNode("Speed "));

    div.appendChild(b);
    div.appendChild(document.createTextNode(`${json["Walk"]} ft.`));

    if(json["Burrow"] !== 0) {
        div.appendChild(document.createTextNode(`, burrow ${json["Burrow"]} ft.`));
    }

    if(json["Climb"] !== 0) {
        div.appendChild(document.createTextNode(`, climb ${json["Climb"]} ft.`));
    }

    if(json["Fly"] !== 0) {
        if(json["Hover"] === true) {
            div.appendChild(document.createTextNode(`, fly ${json["Fly"]} ft. (hover)`));
        } else {
            div.appendChild(document.createTextNode(`, fly ${json["Fly"]} ft.`));
        }
    }

    if(json["Swim"] !== 0) {
        div.appendChild(document.createTextNode(`, swim ${json["Swim"]} ft.`));
    }

    parent.appendChild(div);
}

function AbilityScores(json, parent) {
    let table = document.createElement('table');
    table.className = "abilityScores";

    let keys = document.createElement('tr');
    let values = document.createElement('tr');
    
    for(let key in json) {
        let modifier = Math.floor((json[key] - 10)/2);
        let th = document.createElement('th');

        let title = "";

        switch(key) {
            case "Strength":
                title = "STR";
                break;
            case "Dexterity":
                title = "DEX";
                break;
            case "Constitution":
                title = "CON";
                break;
            case "Intelligence":
                title = "INT";
                break;
            case "Wisdom":
                title = "WIS";
                break;
            case "Charisma":
                title = "CHA";
                break;
        }

        th.appendChild(document.createTextNode(title));

        keys.appendChild(th);

        let td = document.createElement('td');

        if(modifier > 0) {
            td.appendChild(document.createTextNode(`${json[key]} (+${modifier})`))
        } else {
            td.appendChild(document.createTextNode(`${json[key]} (${modifier})`))
        }

        values.appendChild(td);
    }
    
    table.appendChild(keys);
    table.appendChild(values);
    parent.appendChild(table);
}

function SavingThrows(json, parent) {
    let div = document.createElement('div');

    let b = document.createElement('b');
    b.appendChild(document.createTextNode("Saving Throws "))
    div.appendChild(b);

    let bool = false;

    let array = [];

    for(let key in json["Saving Throws"]) {
        if(json["Saving Throws"][key] === true) {
            bool = true;

            let text = "";

            switch(key) {
                case "Strength":
                    text = "Str";
                    break;
                case "Dexterity":
                    text = "Dex";
                    break;
                case "Constitution": 
                    text = "Con";
                    break;
                case "Intelligence": 
                    text = "Int";
                    break;
                case "Wisdom": 
                    text = "Wis";
                    break;
                case "Charisma": 
                    text = "Cha";
                    break;
            }

            let total = ProficiencyBonus(json["Challenge"]) + Modifier(json["Ability Scores"][key]);

            array.push(`${text} +${total}`);
        }
    }

    div.appendChild(document.createTextNode(array.join(", ")));

    if(bool) {
        parent.appendChild(div);
    }
}

function Skills(json, parent) {
    let div = document.createElement('div');

    let b = document.createElement('b');
    b.appendChild(document.createTextNode("Skills "))
    div.appendChild(b);

    let bool = false;

    let array = [];

    for(let key in json["Skills"]) {
        if(json["Skills"][key] === true) {
            bool = true;

            let ability = "";

            if(key == "Athletics") {
                ability = "Strength";
            } else if ((key == "Acrobatics") || (key == "Sleight of Hand") || (key == "Stealth")) {
                ability = "Dexterity";
            } else if ((key == "Arcana") || (key == "History" || (key == "Investigation") || (key == "Nature") || (key == "Religion"))) {
                ability = "Intelligence";
            } else if ((key == "Animal Handling") || (key == "Insight") || (key == "Medicine") || (key == "Perception") || key == "Survival") {
                ability = "Wisdom";
            } else if ((key == "Deception") || (key == "Intimidation") || (key == "Performance") || (key == "Persuasion")) {
                ability = "Charisma";
            }

            let total = ProficiencyBonus(json["Challenge"]) + Modifier(json["Ability Scores"][ability]);

            array.push(`${key} +${total}`);
        }
    }

    div.appendChild(document.createTextNode(array.join(", ")));

    if(bool) {
        parent.appendChild(div);
    }
}

function Senses(json, parent) {
    let array = [];

    let div = document.createElement('div');

    let b = document.createElement('b');
    b.appendChild(document.createTextNode("Senses "));

    if(json["Senses"]["Blindsight"] > 0) {
        if(json["Senses"]["Blind"]) {
            array.push(`blindsight ${json["Senses"]["Blindsight"]} ft. (blind beyond this radius)`);
        } else {
            array.push(`blindsight ${json["Senses"]["Blindsight"]} ft.`);
        }
        
    }

    if(json["Senses"]["Darkvision"] > 0) {
        array.push(`darkvision ${json["Senses"]["Darkvision"]} ft.`);
    }

    if(json["Senses"]["Tremorsense"] > 0) {
        array.push(`tremorsense ${json["Senses"]["Tremorsense"]} ft.`);
    }

    if(json["Senses"]["Truesight"] > 0) {
        array.push(`truesight ${json["Senses"]["Truesight"]} ft.`);
    }

    let passivePerception = 0;

    if (json["Skills"]["Perception"] === true) {
        passivePerception = 10 + ProficiencyBonus(json["Challenge"]) + Modifier(json["Ability Scores"]["Wisdom"]);
    } else {
        passivePerception = 10 + Modifier(json["Ability Scores"]["Wisdom"]);
    }

    array.push(`passive Perception ${passivePerception}`)

    div.appendChild(b);
    div.appendChild(document.createTextNode(array.join(", ")))
    parent.appendChild(div);
}

function Challenge(json, parent) {
    let div = document.createElement('div');

    let b = document.createElement('b');
    b.appendChild(document.createTextNode("Challenge "));

    div.appendChild(b);
    div.appendChild(document.createTextNode(`${json["Challenge"]} (${json["Experience"]} XP)`));

    parent.appendChild(div);
}

function Properties(json, parent, ...properties) {
    properties.forEach(property => {
        if (json[property] !== undefined) {
            // Create the container

            let div = document.createElement('div');
            div.className = "property";

            // Create the header
            if (property != "Features") {
                let h3 = document.createElement('h3');
                h3.appendChild(document.createTextNode(property));
                div.appendChild(h3);
            }
            
            // Property first level

            for (let key in json[property]) {
                    let div2 = document.createElement('div');

                    if (key === "Description") {
                        Paragraphs(json[property][key], div2);
                    } else if (key.includes("Spellcasting")){
                        let b = document.createElement('b');
                        b.appendChild(document.createTextNode(`${key}. `));
                        div2.appendChild(b);

                        Paragraphs(json[property][key]["Description"], div2);

                        EnumerateSpells(json[property][key], div2);
                    } else {
                        for(let subKey in json[property][key]) {
                            if (subKey === "Description") {
                                let b = document.createElement('b');
                                b.appendChild(document.createTextNode(`${key}. `));
                                div2.appendChild(b);

                                Paragraphs(json[property][key][subKey], div2);
                            } else if (subKey === "Ordered List") {
                                List(json[property][key][subKey], "ol", div2);
                            } else if (subKey === "Unordered List") {
                                List(json[property][key][subKey], "ul", div2);
                            } else {
                                let div3 = document.createElement('div');
                                div3.className = "subProperty";

                                let b = document.createElement('b');
                                b.appendChild(document.createTextNode(`${subKey}. `));
                                div3.appendChild(b);

                                Paragraphs(json[property][key][subKey], div3);
                            }
                        }
                    }

                    div.appendChild(div2);
            }

            parent.appendChild(div);
        }
    });
}

function EnumerateSpells(json, parent) {
    let spellJson = JSON.parse(localStorage.getItem("Spells"));

    let div = document.createElement('div');
    div.className = "spellsBlock";

    for (let key in json) {
        if(key !== "Description") {
            let div2 = document.createElement('div');

            let array = json[key];
            div2.appendChild(document.createTextNode(`${key}: `));

            for (let i = 0; i < array.length; i++) {
                let a = document.createElement('a');
                let spellObj;

                let spell = array[i];

                if(spell.includes(" (")) {
                    let split = spell.split(" (");

                    spellObj = JSON.stringify(spellJson[split[0]]);
                    
                    if(array.length - 1 != i) {
                        a.appendChild(document.createTextNode(`${spell}, `));
                    } else {
                        a.appendChild(document.createTextNode(spell));
                    }
                } else {
                    spellObj = JSON.stringify(spellJson[spell]);
    
                    if(array.length - 1 != i) {
                        a.appendChild(document.createTextNode(`${spell}, `));
                    } else {
                        a.appendChild(document.createTextNode(spell));
                    }
                }

                a.addEventListener('click', () => {
                    let modal = new SpellModal(spell, spellObj);
                    document.body.appendChild(modal);
                }, false);

                div2.appendChild(a);
            }
            
            div.appendChild(div2);
        }
    }

    parent.appendChild(div);
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

function Modifier(json) {
    return Math.floor((json - 10) / 2);
}

function Arrays(json, parent, ...keys) {
    keys.forEach(key => {
        if(json[key].length > 0) {
            let div = document.createElement('div');

            let b = document.createElement('b');
            b.appendChild(document.createTextNode(`${key} `));

            div.appendChild(b);
            div.appendChild(document.createTextNode(json[key].join(", ")));

            parent.appendChild(div);
        }
    });
}