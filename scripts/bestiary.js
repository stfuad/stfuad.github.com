function CreateCreatureTable(json) {
    let t = document.querySelector("#creatureRow");

    let tb = document.querySelector("tbody");

    for(let creature in json) {

        let creatureJSON = JSON.stringify(json[creature]);

        let creatureSheet = document.createElement("a");
        creatureSheet.appendChild(document.createTextNode(creature));
        creatureSheet.href = `javascript:CreateCreatureSheet("${creature}", ${creatureJSON})`;

        let clone = document.importNode(t.content, true);
        td = clone.querySelectorAll("td");
        td[0].appendChild(creatureSheet);
        td[1].textContent = json[creature]["Type"];
        td[2].textContent = json[creature]["SubType"];
        td[3].textContent = json[creature]["Challenge"];
        td[4].textContent = json[creature]["Book"];

        /* let pdfLink = document.createElement('a');
        pdfLink.appendChild(document.createTextNode(json[creature]["Page"]));
        pdfLink.href = `pdfs/${json[creature]["Book"]}.pdf#page=${json[creature]["Page"] + 1}`
        pdfLink.target = "_blank";
        td[5].appendChild(pdfLink); */

        tb.appendChild(clone);
    }

    
    $("#creatureList").tablesorter({
        theme: 'jui',
        headerTemplate : '{content} {icon}',
        widgets: ['uitheme', 'zebra'],
        widgetOptions: {
            zebra: ['even', 'odd']
        }
    });
}

function CreateCreatureSheet(name, json) {
    let div = Div(name, "draggableSheet", undefined);
    
    // Title

    InsertElement("h2", name, div);

    // Size, Type, SubType, Alignment

    let stsa = Div(undefined, undefined, div);

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

    stsa.appendChild(subTitle);

    // Armor Class, Hit Points, Speeds

    let ahs = Div(undefined, "statBlock", div);

    ArmorClass(json, ahs);

    HitPoints(json["Hit Points"], ahs);

    Speeds(json["Speed"], ahs);

    // Ability Scores

    AbilityScores(json["Ability Scores"], div);
    
    // Stuff
    
    let stuff = Div(undefined, "statBlock", div);

    KeyValue(json, stuff, true, "Saving Throws", "Skills");
    KeyValue(json, stuff, false, "Damage Vulnerabilities", "Damage Resistances", "Damage Immunities", "Condition Immunities", "Senses", "Languages");
    Challenge(json, stuff);

    // Features, Actions, Reactions, Legendary Actions
    
    Properties(json, div, "Features", "Actions", "Actions for Type 1", "Actions for Type 2", "Actions for Type 3", "Reactions", "Legendary Actions");

    // Close

    CloseButton(name, div);

    if(document.getElementById(name) == null) {
        document.body.appendChild(div);

        $( function() {
            $( ".draggableSheet" ).draggable({
                scroll: false
            });
        } );

        $('.draggableSheet').click(function() {
            // set ohters element to the initial level
            $(this).siblings('.draggableSheet').css('z-index', 10);
            // set clicked element to a higher level
            $(this).css('z-index', 11);
        });
    }
}

function ArmorClass(json, parent) {
    let div = Div(undefined, undefined, parent);

    InsertElement("b", "Armor Class ", div);

    let acValue = "";

    if(def(json["Armor Type"])) {
        acValue = `${json["Armor Class"]} (${json["Armor Type"]})`;
    } else {
        acValue = json["Armor Class"];
    }
    
    div.appendChild(document.createTextNode(acValue));
}

function HitPoints(json, parent) {
    let div = Div(undefined, undefined, parent);

    let hum = json;

    let hem = hum.split(/d/);

    var total = 0;

    if(hem[1].includes("+")) {
        let hah = hem[1].split(/\+/);
        total = parseInt(hem[0]) * parseInt(hah[0]) + parseInt(hah[1]);
    } else if(hem[1].includes("-")) {
        let hah = hem[1].split(/\-/);
        total = parseInt(hem[0]) * parseInt(hah[0]) - parseInt(hah[1]);
    } else {
        total = parseInt(hem[0]) * parseInt(hem[1])
    }

    InsertElement("b", "Hit Points ", div);

    div.appendChild(document.createTextNode(`${total} (${hum})`));
}

function Speeds(json, parent) {
    let div = Div(undefined, undefined, parent);

    InsertElement("b", "Speed  ", div);

    let walk = "";

    if(typeof(json["Walk"]) == "number") {
        walk = `${json["Walk"]} ft.`;
    } else {
        walk += json["Walk"];
    }
    

    if(def(json["Burrow"])) {
        walk += `, burrow ${json["Burrow"]} ft.`;
    }

    if(def(json["Climb"])) {
        walk += `, climb ${json["Climb"]} ft.`;
    }

    if(def(json["Fly"])) {
        walk += `, fly ${json["Fly"]} ft.`;
    }

    if(def(json["Hover"])) {
        walk += " (hover)";
    }

    if(def(json["Swim"])) {
        walk += `, swim ${json["Swim"]} ft.`;
    }
    
    div.appendChild(document.createTextNode(walk));
}

function AbilityScores(json, parent) {
    let table = InsertElement('table', undefined, parent);
    let keys = InsertElement('tr', undefined, table);
    let values = InsertElement('tr', undefined, table);
    
    table.className = "statBlock";

    for(let key in json) {
        let modifier = Math.floor((json[key] - 10)/2);
        InsertElement('th', key, keys);

        if(modifier > 0) {
            InsertElement('td', `${json[key]} (+${modifier})`, values);
        } else {
            InsertElement('td', `${json[key]} (${modifier})`, values);
        }
    }
}

function Challenge(json, parent) {
    if(def(json)) {
        let div = Div(undefined, undefined, parent);

        let cr = json["Challenge"];
        let exp = json["Experience"];

        InsertElement("b", "Challenge ", div);

        div.appendChild(document.createTextNode(`${cr} (${exp} XP)`));
    }
}

function Properties(json, parent, ...keys) {
    keys.forEach(key => {
        if(def(json[key])) {
            // Create the container

            var div = Div(undefined, "property", parent);

            // Create the header
            if(key != "Features") {
                InsertElement("h3", key, div);
            }
            
            // Parse the data

            Object.keys(json[key]).forEach(element => {
                let div2 = Div(undefined, undefined, div);

                if(element == "Description") {
                    // If the object containers descriptor text

                    Paragraphs(json[key][element], div2);
                } else  { 
                    // Create a bold keyword and descriptor text

                    let b = document.createElement('b');
                    b.appendChild(document.createTextNode(`${element}. `));
                    div2.appendChild(b);

                    Paragraphs(json[key][element]["Description"], div2);

                    let length = Object.keys(json[key][element]).length;

                    if(length > 1) {

                        // If the keyword contains the word Spellcasting or contains spell abilities

                        if(element.includes("Spellcasting") || element.includes("Shadow Arts")) { 
                            EnumerateSpells(json[key][element], div2);
                        } else {
                            let keys = tail(Object.keys(json[key][element]));

                            keys.forEach(item => {
                                if(item == "Ordered List") {
                                    List(json[key][element][item], "ol", div2);
                                } else if(item == "Unordered List") {
                                    List(json[key][element][item], "ul", div2);
                                } else if(item == "Properties") {
                                    /* let aBonus = json[key][element][item]["Attack Bonus"];
                                    let dBonus = json[key][element][item]["Damage Bonus"]
                                    let versatile = json[key][element][item]["Versatile"]
                                    let roll1 = json[key][element][item]["Roll1"]
                                    let roll2 = json[key][element][item]["Roll2"]
                                    let roll3 = json[key][element][item]["Roll3"]

                                    b.className = "clickLink";
                                    b.onclick = function() {
                                        RollType(aBonus, dBonus, versatile, roll1, roll2, roll3);
                                    } */
                                } else {
                                    // If "item" doesn't meet any of the above criteria

                                    let div3 = Div(undefined, "subProperty", div);

                                    InsertElement('b', `${item}. `, div3);
                                    Paragraphs(json[key][element][item]["Description"], div3);
                                }
                            });
                        }
                    }
                }
            });
        }
    });
}

function EnumerateSpells(json, parent) {
    let spellJson = localStorage.get("Spells");

    let keys = tail(Object.keys(json));
    
    let div = Div(undefined, "spellsBlock", parent);

    keys.forEach(item => {
        let div2 = Div(undefined, undefined, div);

        let key = document.createTextNode(`${item}: `);
        div2.appendChild(key);

        let array = json[item];

        for(let i = 0; i < array.length; i++) {
            let a = document.createElement('a');
            
            let name = json[item][i];

            if(name.includes(" (")) {

                let split = name.split(" (");
                let spellObj = JSON.stringify(spellJson[split[0]]);
                
                if(array.length - 1 != i) {
                    a.appendChild(document.createTextNode(`${name}, `));
                } else {
                    a.appendChild(document.createTextNode(name));
                }

                a.href = `javascript:CreateSpellSheet("${name}", ${spellObj})`;
            } else {

                let spellObj = JSON.stringify(spellJson[name]);

                if(array.length - 1 != i) {
                    a.appendChild(document.createTextNode(`${name}, `));
                } else {
                    a.appendChild(document.createTextNode(name));
                }

                a.href = `javascript:CreateSpellSheet("${name}", ${spellObj})`;
            }

            div2.appendChild(a);

        }
    });
}