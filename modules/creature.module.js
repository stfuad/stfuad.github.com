import {List, Paragraphs, Text, Element, TextElement, Link} from "./htmlElements.module.js";

export function Creature(name, json, parent) {

    // Header (Title/Subtitles)

    let header = Element('div', parent);
    header.id = "creatureSheetHeader";

    TextElement('h2', name, header);

    let subTitle = Element('i', header);

    if (json["SubType"] != undefined) {
        Text(`${json["Size"]} ${json["Type"]} (${json["SubType"]}), ${json["Alignment"]}`, subTitle);
    } else {
        Text(`${json["Size"]} ${json["Type"]}, ${json["Alignment"]}`, subTitle);
    }

    // Upper block

    let upperBlock = Element('div', parent);
    upperBlock.id = "upperBlock";

    ArmorClass(json, upperBlock);

    HitPoints(json["Hit Dice"], json["Ability Scores"]["Constitution"], upperBlock);

    Speed(json["Speed"], upperBlock);

    // Ability Scores block

    AbilityScores(json["Ability Scores"], parent);

    // Lower block

    let lowerBlock = Element('div', parent);
    lowerBlock.id = "lowerBlock";

    Skills(json, lowerBlock);

    SavingThrows(json, lowerBlock);

    Arrays(json, lowerBlock, "Damage Vulnerabilities", "Damage Resistances", "Damage Immunities", "Condition Immunities");
    
    Senses(json, lowerBlock);

    Arrays(json, lowerBlock, "Languages")

    Challenge(json, lowerBlock);

    // Properties block(s)

    Properties(json, parent, "Features", "Actions", "Actions for Type 1", "Actions for Type 2", "Actions for Type 3", "Reactions", "Legendary Actions");

    // Footer (Book/Page)

    let footer = Element('div', parent);
    footer.id = "sheetFooter";

    Text(`${json["Book"]}, Pg. ${json["Page"]}`, footer);
}

function ArmorClass(json, parent) {
    let div = Element('div', parent);

    TextElement('b', "Armor Class ", div);

    let ac = "";

    if(json["Armor Type"] !== undefined) {
        ac = `${json["Armor Class"]} (${json["Armor Type"]})`;
    } else {
        ac = json["Armor Class"];
    }
    
    Text(ac, div);
}

function HitPoints(hitDice, conMod, parent) {
    let div = Element('div', parent);

    let split = hitDice.split(/d/);

    let split0 = parseInt(split[0]);
    let split1 = parseInt(split[1]);

    let modifier = Math.floor((conMod - 10) / 2);
    
    let average = (split1 + 1) / 2 * split0 + modifier;
    let max = (split0 * split1) + modifier;

    TextElement('b', "Hit Points ", div);

    let hp = "";

    if(modifier < 0) {
        hp = `${hitDice} - ${modifier} (Average: ${average}, Max: ${max})`;
    } else if(modifier === 0) {
        hp = `${hitDice} (Average: ${average}, Max: ${max})`
    } else {
        hp = `${hitDice} + ${modifier} (Average: ${average}, Max: ${max})`
    }

    Text(hp, div);
}

function Speed(json, parent) {
    let div = Element('div', parent);

    TextElement('b', "Speed ", div);

    let array = [];
    array.push(`${json["Walk"]} ft.`);

    if(json["Burrow"] !== 0) {
        array.push(`burrow ${json["Burrow"]} ft.`);
    }

    if(json["Climb"] !== 0) {
        array.push(`climb ${json["Climb"]} ft.`);
    }

    if(json["Fly"] !== 0) {
        if(json["Hover"]) {
            array.push(`fly ${json["Fly"]} ft. (hover)`);
        } else {
            array.push(`fly ${json["Fly"]} ft.`);
        }
    }

    if(json["Swim"] !== 0) {
        array.push(`swim ${json["Swim"]} ft.`);
    }

    Text(array.join(", "), div);
}

function AbilityScores(json, parent) {
    let table = Element('table', parent);
    table.className = "abilityScores";

    let keys = Element('tr', table);
    let values = Element('tr', table);
    
    for(let key in json) {
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

        TextElement('th', title, keys);

        let modifier = Modifier(json[key]);
        
        let score = "";

        if(modifier > 0) {
            score += `${json[key]} (+${modifier})`;
        } else {
            score += `${json[key]} (${modifier})`;
        }

        TextElement('td', score, values);
    }
}

function SavingThrows(json, parent) {
    let div = document.createElement('div');

    TextElement('b', "Saving Throws ", div);

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

    Text(array.join(", "), div);

    if(bool) {
        parent.appendChild(div);
    }
}

function Skills(json, parent) {
    let div = document.createElement('div');

    TextElement('b', "Skills ", div);

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

    Text(array.join(", "), div);

    if(bool) {
        parent.appendChild(div);
    }
}

function Senses(json, parent) {
    let div = Element('div', parent);

    TextElement('b', "Senses ", div);

    let array = [];

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

    Text(array.join(", "), div);
}

function Challenge(json, parent) {
    let div = Element('div', parent);

    TextElement('b', "Challenge ", div);

    Text(`${json["Challenge"]} (${json["Experience"]} XP)`, div);
}

function Properties(json, parent, ...properties) {
    properties.forEach(property => {
        if (json[property] !== undefined) {
            // Create the container

            let div = Element('div', parent);
            div.className = "property";

            // Create the header
            if (property != "Features") {
                TextElement('h3', property, div);
            }
            
            // Property first level

            for (let key in json[property]) {
                //console.log(`${property}, key: ${key}`)
                let div2 = Element('div', div);

                if (key !== "Description") {
                    TextElement('b', `${key}. `, div2);
                }

                if (key.includes("Spellcasting")){
                    Paragraphs(json[property][key]["Description"], div2);

                    Spells(json[property][key], div2);
                } else if (key === "Description") {
                    Paragraphs(json[property][key], div2);
                } else {
                    for(let subKey in json[property][key]) {
                        //console.log(`${property}, key: ${key}, subKey: ${subKey}`)
                        if (subKey === "Description") {
                            Paragraphs(json[property][key][subKey], div2);
                        } else if (subKey === "Ordered List") {
                            List(json[property][key][subKey], "ol", div2);
                        } else if (subKey === "Unordered List") {
                            List(json[property][key][subKey], "ul", div2);
                        } else {
                            let div3 = Element('div', div2);
                            div3.className = "subProperty";

                            TextElement('b', `${subKey}. `, div3);

                            Paragraphs(json[property][key][subKey]["Description"], div3);
                        }
                    }
                }
            }
        }
    });
}

function Spells(json, parent) {
    let spellJson = JSON.parse(localStorage.getItem("Spells"));

    let div = Element('div', parent);
    div.className = "spellsBlock";

    for (let key in json) {
        if(key !== "Description") {
            let div2 = Element('div', div);

            let array = json[key];

            Text(`${key}: `, div2);

            for (let i = 0; i < array.length; i++) {
                let spellObj;
                let text;
                let spell = array[i];

                if(spell.includes(" (")) {
                    let split = spell.split(" (");

                    spellObj = spellJson[split[0]];
                    
                    if(array.length - 1 != i) {
                        text = `${spell}, `;
                    } else {
                        text = spell;
                    }
                } else {
                    spellObj = spellJson[spell];
    
                    if(array.length - 1 != i) {
                        text = `${spell}, `;
                    } else {
                        text = spell;
                    }
                }

                let a = Link(text, undefined, div2);

                a.addEventListener('click', () => {
                    let modal = new SpellModal(spell, spellObj);
                    document.body.appendChild(modal);
                }, false);
            }
        }
    }
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
        if (json[key] !== undefined) {
            if(json[key].length > 0) {
                let div = Element('div', parent);

                TextElement('b', `${key} `, div);
                
                Text(json[key].join(", "), div);
            }
        }
    });
}