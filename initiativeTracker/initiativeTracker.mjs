let bestiary;
let spells;

export async function load(creatureList, target, height, width) {
    bestiary = await (await fetch("../json/bestiary.reference.json")).json();
    spells = await (await fetch("../json/spells.reference.json")).json();

    target.appendChild(new InitiativeTracker(creatureList, height, width));
}

class InitiativeTracker extends HTMLElement {
    constructor(creatureList, height, width) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        const template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: auto 1fr;
                    grid-gap: 10px;
                    height: calc(${height}vh - 20px);
                    width: calc(${width}vw - 20px);
                    max-height: calc(100vh - 20px);
                    max-width: calc(100vw - 20px);
                    overflow: hidden;
                }

                #creatureList, #tracker {
                    height: 100%;
                    overflow: auto;
                }

                #creatureListControls {
                    grid-column: 1;
                    grid-row: 1;
                }

                #creatureListControls button {
                    font-size: 1.5em;
                }

                #creatureList {
                    grid-column: 1;
                    grid-row: 2;
                }

                #creatureList div h3 {
                    display: block;
                    border-top: 1px solid black;
                    border-bottom: 1px solid black;
                    text-indent: 1em;
                }

                #creatureList div a {
                    display: block;
                    color: blue;
                    cursor: pointer;
                    text-indent: 2em;
                }

                #trackerControls {
                    grid-column: 2;
                    grid-row: 1;
                }

                #trackerControls button {
                    font-size: 1.5em;
                }

                #tracker {
                    grid-column: 2;
                    grid-row: 2;
                }
            </style>

            <div id="creatureListControls">
                <button id="byName" title="Sort by Name">&#x1F520</button>
                <button id="byType" title="Sort by Type">&#x1F409</button>
                <button id="byCR" title="Sort by Challenge Rating">&#x1F522</button>
                <button id="byBook" title="Sort by Book">&#x1F4DA</button>
            </div>

            <div id="creatureList"></div>

            <div id="trackerControls">
                <button id="addPC" title="Add PC">&#x1F464</button>
                <button id="addGroup" title="Add PCs">&#x1F465</button>
                <button id="sort" title="Sort by Initiative (descending)">&#x1F53B</button>
                <button id="clear" title="Clear Tracker">&#9114</button>
            </div>

            <div id="tracker"></div>
        `;

        shadow.innerHTML = template;

        shadow.querySelector("#byName").onclick = () => wrapper(byName(bestiary));
        shadow.querySelector("#byType").onclick = () => wrapper(byType(bestiary))
        shadow.querySelector("#byCR").onclick = () => wrapper(byCR(bestiary));
        shadow.querySelector("#byBook").onclick = () => wrapper(byBook(bestiary));

        if (creatureList) {
            shadow.querySelector("#byName").remove();
            shadow.querySelector("#byType").remove();
            shadow.querySelector("#byCR").remove();
            shadow.querySelector("#byBook").remove();

            createList(byName(creatureList));
        } else {
            shadow.querySelector("#byName").onclick = () => wrapper(byName(bestiary));
            shadow.querySelector("#byType").onclick = () => wrapper(byType(bestiary));
            shadow.querySelector("#byCR").onclick = () => wrapper(byCR(bestiary));
            shadow.querySelector("#byBook").onclick = () => wrapper(byBook(bestiary));

            createList(byName(bestiary));
        }

        shadow.querySelector("#sort").onclick = () => {
            let host = shadow.querySelector("#tracker");

            let array = Array.prototype.slice.call(host.childNodes, 0);

            for (let node of array) {
                node.remove();
            }

            let sorted = array.sort( (a, b) => {
                return parseInt(b.getAttribute('init')) - parseInt(a.getAttribute('init'));
            });

            sorted.forEach(element => {
                host.appendChild(element);
            });
        }

        shadow.querySelector("#clear").onclick = () => {
            shadow.querySelector("#tracker").innerHTML = "";
        }

        function wrapper(obj) {
            shadow.querySelector("#creatureList").innerHTML = "";

            createList(obj);
        }

        function createList(obj) {
            for (let array in obj) {
                let div = document.createElement('div');
        
                if (obj[array].length > 0) {
                    let h3 = document.createElement('h3');
                    h3.appendChild(document.createTextNode(array));
        
                    div.appendChild(h3);
                }
                
                let sorted = obj[array].sort();
        
                sorted.forEach(item => {
                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(item));
                    a.onclick = () => {
                        shadow.querySelector("#tracker").appendChild(new CreatureListItem(item));
                    };
        
                    div.appendChild(a);
                });
        
                shadow.querySelector("#creatureList").appendChild(div);
            }
        }

        function byName(json) {
            // Declare empty arrays
        
            let obj = {
                "A": [],
                "B": [],
                "C": [],
                "D": [],
                "E": [],
                "F": [],
                "G": [],
                "H": [],
                "I": [],
                "J": [],
                "K": [],
                "L": [],
                "M": [],
                "N": [],
                "O": [],
                "P": [],
                "Q": [],
                "R": [],
                "S": [],
                "T": [],
                "U": [],
                "V": [],
                "W": [],
                "X": [],
                "Y": [],
                "Z": []
            }
        
            Object.keys(json).forEach(key => {
                if (key.startsWith("A")) {
                    obj["A"].push(key);
                } else if (key.startsWith("B")) {
                    obj["B"].push(key);
                } else if (key.startsWith("C")) {
                    obj["C"].push(key);
                } else if (key.startsWith("D")) {
                    obj["D"].push(key);
                } else if (key.startsWith("E")) {
                    obj["E"].push(key);
                } else if (key.startsWith("F")) {
                    obj["F"].push(key);
                } else if (key.startsWith("G")) {
                    obj["G"].push(key);
                } else if (key.startsWith("H")) {
                    obj["H"].push(key);
                } else if (key.startsWith("I")) {
                    obj["I"].push(key);
                } else if (key.startsWith("J")) {
                    obj["J"].push(key);
                } else if (key.startsWith("K")) {
                    obj["K"].push(key);
                } else if (key.startsWith("L")) {
                    obj["L"].push(key);
                } else if (key.startsWith("M")) {
                    obj["M"].push(key);
                } else if (key.startsWith("N")) {
                    obj["N"].push(key);
                } else if (key.startsWith("O")) {
                    obj["O"].push(key);
                } else if (key.startsWith("P")) {
                    obj["P"].push(key);
                } else if (key.startsWith("Q")) {
                    obj["Q"].push(key);
                } else if (key.startsWith("R")) {
                    obj["R"].push(key);
                } else if (key.startsWith("S")) {
                    obj["S"].push(key);
                } else if (key.startsWith("T")) {
                    obj["T"].push(key);
                } else if (key.startsWith("U")) {
                    obj["U"].push(key);
                } else if (key.startsWith("V")) {
                    obj["V"].push(key);
                } else if (key.startsWith("W")) {
                    obj["W"].push(key);
                } else if (key.startsWith("X")) {
                    obj["X"].push(key);
                } else if (key.startsWith("Y")) {
                    obj["Y"].push(key);
                } else if (key.startsWith("Z")) {
                    obj["Z"].push(key);
                }
            });
        
            // Merge arrays into a json object
        
            return obj;
        }
        
        function byBook(json) {
            let obj = {}
        
            for (let creature in json) {
                let book = json[creature]["Book"];
        
                if (!obj.hasOwnProperty(book)) {
                    obj[book] = [];
                }
        
                obj[book].push(creature);
            }
        
            return obj;
        }
        
        function byType(json) {
            let obj = {
                "Aberration": [],
                "Beast": [],
                "Beast (Dinosaur)": [],
                "Celestial": [],
                "Construct": [],
                "Dragon": [],
                "Elemental": [],
                "Fey": [],
                "Fiend": [],
                "Fiend (Demon)": [],
                "Fiend (Devil)": [],
                "Fiend (Yugoloth)": [],
                "Giant": [],
                "Humanoid": [],
                "Monstrosity": [],
                "Ooze": [],
                "Plant": [],
                "Undead": []
            }
        
            Object.keys(json).forEach(creature => {
                if (json[creature]["Type"] === "aberration") {
                    obj["Aberration"].push(creature);
                } else if (json[creature]["Type"] === "beast") {
                    obj["Beast"].push(creature);
                } else if (json[creature]["Type"] === "celestial") {
                    obj["Celestial"].push(creature);            
                } else if (json[creature]["Type"] === "construct") {
                    obj["Construct"].push(creature);
                } else if (json[creature]["Type"] === "dragon") {
                    obj["Dragon"].push(creature);
                } else if (json[creature]["Type"] === "elemental") {
                    obj["Elemental"].push(creature);
                } else if (json[creature]["Type"] === "fey") {
                    obj["Fey"].push(creature);
                } else if (json[creature]["Type"] === "fiend") {
                    if (json[creature]["SubType"]) {
                        if (json[creature]["SubType"] === "demon") {
                            obj["Fiend (Demon)"].push(creature);
                        } else if (json[creature]["SubType"] === "devil") {
                            obj["Fiend (Devil)"].push(creature);
                        } else if (json[creature]["SubType"] === "yugoloth") {
                            obj["Fiend (Yugoloth)"].push(creature);
                        }
                    } else {
                        obj["Fiend"].push(creature);
                    }
                } else if (json[creature]["Type"] === "giant") {
                    obj["Giant"].push(creature);
                } else if (json[creature]["Type"] === "humanoid") {
                    obj["Humanoid"].push(creature);
                } else if (json[creature]["Type"] === "monstrosity") {
                    obj["Monstrosity"].push(creature);
                } else if (json[creature]["Type"] === "ooze") {
                    obj["Ooze"].push(creature);
                } else if (json[creature]["Type"] === "plant") {
                    obj["Plant"].push(creature);
                } else if (json[creature]["Type"] === "undead") {
                    obj["Undead"].push(creature);
                }
            });
        
            return obj;
        }
        
        function byCR(json) {
            let obj = {
                "Zero": [],
                "One-Quarter": [],
                "One-Half": [],
                "One": [],
                "Two": [],
                "Three": [],
                "Four": [],
                "Five": [],
                "Six": [],
                "Seven": [],
                "Eight": [],
                "Nine": [],
                "Ten": [],
                "Eleven": [],
                "Twelve": [],
                "Thirteen": [],
                "Fourteen": [],
                "Fifteen": [],
                "Sixteen": [],
                "Seventeen": [],
                "Eighteen": [],
                "Nineteen": [],
                "Twenty": [],
                "Twenty-One": [],
                "Twenty-Two": [],
                "Twenty-Three": [],
                "Twenty-Four": [],
                "Twenty-Five": [],
                "Twenty-Six": [],
                "Twenty-Seven": [],
                "Twenty-Eight": [],
                "Twenty-Nine": [],
                "Thirty": []
            };
        
            Object.keys(json).forEach(element => {
                if (json[element]["Challenge"] === 0) {
                    obj["Zero"].push(element);
                } else if (json[element]["Challenge"] === "1/4") {
                    obj["One-Quarter"].push(element);
                } else if (json[element]["Challenge"] === "1/2") {
                    obj["One-Half"].push(element);
                } else if (json[element]["Challenge"] === 1) {
                    obj["One"].push(element);
                } else if (json[element]["Challenge"] === 2) {
                    obj["Two"].push(element);
                } else if (json[element]["Challenge"] === 3) {
                    obj["Three"].push(element);
                } else if (json[element]["Challenge"] === 4) {
                    obj["Four"].push(element);
                } else if (json[element]["Challenge"] === 5) {
                    obj["Five"].push(element);
                } else if (json[element]["Challenge"] === 6) {
                    obj["Six"].push(element);
                } else if (json[element]["Challenge"] === 7) {
                    obj["Seven"].push(element);
                } else if (json[element]["Challenge"] === 8) {
                    obj["Eight"].push(element);
                } else if (json[element]["Challenge"] === 9) {
                    obj["Nine"].push(element);
                } else if (json[element]["Challenge"] === 10) {
                    obj["Ten"].push(element);
                } else if (json[element]["Challenge"] === 11) {
                    obj["Eleven"].push(element);
                } else if (json[element]["Challenge"] === 12) {
                    obj["Twelve"].push(element);
                } else if (json[element]["Challenge"] === 13) {
                    obj["Thirteen"].push(element);
                } else if (json[element]["Challenge"] === 14) {
                    obj["Fourteen"].push(element);
                } else if (json[element]["Challenge"] === 15) {
                    obj["Fifteen"].push(element);
                } else if (json[element]["Challenge"] === 16) {
                    obj["Sixteen"].push(element);
                } else if (json[element]["Challenge"] === 17) {
                    obj["Seventeen"].push(element);
                } else if (json[element]["Challenge"] === 18) {
                    obj["Eighteen"].push(element);
                } else if (json[element]["Challenge"] === 19) {
                    obj["Nineteen"].push(element);
                } else if (json[element]["Challenge"] === 20) {
                    obj["Twenty"].push(element);
                } else if (json[element]["Challenge"] === 21) {
                    obj["Twenty-One"].push(element);
                } else if (json[element]["Challenge"] === 22) {
                    obj["Twenty-Two"].push(element);
                } else if (json[element]["Challenge"] === 23) {
                    obj["Twenty-Three"].push(element);
                } else if (json[element]["Challenge"] === 24) {
                    obj["Twenty-Four"].push(element);
                } else if (json[element]["Challenge"] === 25) {
                    obj["Twenty-Five"].push(element);
                } else if (json[element]["Challenge"] === 26) {
                    obj["Twenty-Six"].push(element);
                } else if (json[element]["Challenge"] === 27) {
                    obj["Twenty-Seven"].push(element);
                } else if (json[element]["Challenge"] === 28) {
                    obj["Twenty-Eight"].push(element);
                } else if (json[element]["Challenge"] === 29) {
                    obj["Twenty-Nine"].push(element);
                } else if (json[element]["Challenge"] === 30) {
                    obj["Thirty"].push(element);
                }
            });
        
            return obj;
        }
    }
}

customElements.define('initiative-tracker', InitiativeTracker);

class CreatureListItem extends HTMLElement {
    constructor(name) {
        super();

        let creature = bestiary[name];

        this.setAttribute('name', name);

        this.setAttribute('hp', averageHitPoints());

        this.setAttribute('init', modifier(creature["Ability Scores"]["Dexterity"]) + Math.floor(Math.random() * 20) + 1);

        let shadow = this.attachShadow({mode: 'open'});

        const template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr 100px 100px auto;
                    border: 1px solid black;
                }

                input {
                    border: 0px;
                }

                #name {
                    grid-column: 1;
                    text-indent: 1em;
                }

                #hp {
                    grid-column: 2;
                }

                #initiative {
                    grid-column: 3;
                }

                #buttons {
                    grid-column: 4;
                }

                #buttons > button {
                    background-color: white;
                    border-radius: 5px;
                }

                input[type="number"] {
                    width: 50px;
                }
            </style>
            
            <label for="name">Name</label>
            <label for="hp">HP</label>
            <label for="initiative">Init</label>

            <input type="text" id="name" value="${this.getAttribute("name")}">
            <input type="number" id="hp" value="${this.getAttribute("hp")}">
            <input type="number" id="initiative" value="${this.getAttribute("init")}">
            
            <div id="buttons">
                <button id="view">\uD83D\uDCC4</button>
                <button id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;

        // inputs

        shadow.querySelector("#name").onchange = () => this.setAttribute('name', shadow.querySelector("#name").value);
        shadow.querySelector("#hp").onchange = () => this.setAttribute('hp', shadow.querySelector("#hp").value);
        shadow.querySelector("#initiative").onchange = () => this.setAttribute('init', shadow.querySelector("#initiative").value);

        // buttons

        shadow.querySelector("#close").onclick = () => this.remove();
        shadow.querySelector("#view").onclick = () => document.body.appendChild(new CreatureModal(name));

        function modifier(ability) {
            return Math.floor((ability - 10) / 2);
        }

        function averageHitPoints() {
            let split = creature["Hit Dice"].split(/d/);

            return Math.floor(((parseInt(split[1]) + 1) / 2 * parseInt(split[0])) + (split[0] * modifier(creature["Ability Scores"]["Constitution"])));
        }
    }
}

customElements.define('creature-listitem', CreatureListItem);

class CreatureModal extends HTMLElement {
    constructor(name) {
        super();

        let creature = bestiary[name];

        let shadow = this.attachShadow({mode: 'open'});

        const template = `
            <style>
                :host {
                    position: fixed;
                    top: 0px;
                    left: 0px;
                    display: block;
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

                #abilityScores {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    margin-top: 10px;
                    margin-bottom: 10px;
                }
            </style>

            <div id="modal">
                <button type="button" id="close">\u2716</button>

                <div id="header">
                    <h3></h3>
                    <i></i>
                </div>

                <div id="upperBlock">
                    <div id="armorClass">
                        <b>Armor Class</b>
                    </div>
                    <div id="hitPoints">
                        <b>Hit Points</b>
                    </div>
                    <div id="speeds">
                        <b>Speed</b>
                    </div>
                </div>

                <div id="abilityScores">
                        <b>STR</b>
                        <b>DEX</b>
                        <b>CON</b>
                        <b>INT</b>
                        <b>WIS</b>
                        <b>CHA</b>
                </div>

                <div id="lowerBlock"></div>

                <div id="properties"></div>

                <div id="footer">
                    <i></i>
                </div>
            </div>
        `;

        shadow.innerHTML = template;

        shadow.querySelector("#close").onclick = () => this.remove();

        shadow.querySelector("#header h3").appendChild(document.createTextNode(name));
        shadow.querySelector("#header i").appendChild(document.createTextNode(`${creature["Size"]} ${creature["Type"]} ${creature["Subtype"] ? "(" + creature["Subtype"] + ")" : ""}, ${creature["Alignment"]}`));
        
        // Upper block
        shadow.querySelector("#armorClass").appendChild(document.createTextNode(`${creature["Armor Class"]} ${creature["Armor Type"] ? "(" + creature["Armor Type"] + ")" : ""}`));

        hitPoints();
        speeds();

        abilityScores();

        // Lower block
        savingThrows();
        skills();
        damageVulnerabilities();
        damageResistances();
        damageImmunities();
        conditionImmunities();
        senses();
        challenge();

        properties("Features", "Actions", "Legendary Actions", "Reactions");

        shadow.querySelector("#footer i").appendChild(document.createTextNode(`${creature["Book"]} Pg. ${creature["Page"]}`));

        function modifier(ability) {
            return Math.floor((ability - 10) / 2);
        }
    
        function proficiencyBonus(cr) {
            let bonus = 0;
        
            if (cr == 0) {
                bonus = 2;
            } else if (cr == "1/8") {
                bonus = 2;
            } else if (cr == "1/4") {
                bonus = 2;
            } else if (cr == "1/2") {
                bonus = 2;
            } else if (cr < 4) {
                bonus = 2;
            } else if (cr < 9) {
                bonus = 3;
            } else if (cr < 13) {
                bonus = 4;
            } else if (cr < 17) {
                bonus = 5;
            } else if (cr < 21) {
                bonus = 6;
            } else if (cr < 25) {
                bonus = 7;
            } else if (cr < 29) {
                bonus = 8;
            } else if (cr < 31) {
                bonus = 9;
            }
        
            return bonus;
        }
        
        function skilltoAbility(skill) {
            if (skill == "Athletics") {
                return "Strength";
            } else if ((skill == "Acrobatics") || (skill == "Sleight of Hand") || (skill == "Stealth")) {
                return "Dexterity";
            } else if ((skill == "Arcana") || (skill == "History" || (skill == "Investigation") || (skill == "Nature") || (skill == "Religion"))) {
                return "Intelligence";
            } else if ((skill == "Animal Handling") || (skill == "Insight") || (skill == "Medicine") || (skill == "Perception") || skill == "Survival") {
                return "Wisdom";
            } else if ((skill == "Deception") || (skill == "Intimidation") || (skill == "Performance") || (skill == "Persuasion")) {
                return "Charisma";
            }
        }

        function hitPoints() {
            let hitDice = creature["Hit Dice"];

            let modifier = Math.floor((creature["Ability Scores"]["Constitution"] - 10) / 2);
            
            let split = hitDice.split(/d/);
        
            let split0 = parseInt(split[0]);
            let split1 = parseInt(split[1]);
        
            let average = Math.floor(((split1 + 1) / 2 * split0) + (split0 * modifier));
            let max = Math.floor((split0 * split1) + (split0 * modifier));
        
            let hp;
        
            if (modifier < 0) {
                hp = `${hitDice} - ${modifier * split[0]} (Average: ${average}, Maximum: ${max})`;
            } else if (modifier === 0) {
                hp = `${hitDice} (Average: ${average}, Maximum: ${max})`
            } else {
                hp = `${hitDice} + ${modifier * split[0]} (Average: ${average}, Maximum: ${max})`
            }
            
            shadow.querySelector("#hitPoints").appendChild(document.createTextNode(hp));
        }

        function speeds() {
            let speeds = creature["Speed"];

            let array = [];

            array.push(`${speeds["Walk"]} ft.`);

            if (speeds["Burrow"] !== 0) {
                array.push(`burrow ${speeds["Burrow"]} ft.`);
            }

            if (speeds["Climb"] !== 0) {
                array.push(`climb ${speeds["Climb"]} ft.`);
            }

            if (speeds["Fly"] !== 0) {
                if(speeds["Hover"]) {
                    array.push(`fly ${speeds["Fly"]} ft. (hover)`);
                } else {
                    array.push(`fly ${speeds["Fly"]} ft.`);
                }
            }

            if (speeds["Swim"] !== 0) {
                array.push(`swim ${speeds["Swim"]} ft.`);
            }

            shadow.querySelector("#speeds").appendChild(document.createTextNode(array.join(", ")));
        }

        function abilityScores() {
            let abilityScores = creature["Ability Scores"];
            let target = shadow.querySelector("#abilityScores");

            for (let key in abilityScores) {
                let span = document.createElement('span');
                    span.appendChild(document.createTextNode(`${abilityScores[key]} (${modifier(abilityScores[key]) > 0 ? "+" + modifier(abilityScores[key]) : modifier(abilityScores[key])})`));

                target.appendChild(span);
            }
        }

        function savingThrows() {
            let savingThrows = creature["Saving Throws"];

            let div = document.createElement('div');
        
            let bool = false;
        
            let array = [];
        
            for (let key in savingThrows) {
                if (savingThrows[key] === true) {
                    bool = true;
        
                    let total = proficiencyBonus(creature["Challenge"]) + modifier(creature["Ability Scores"][key]);
        
                    if (total > 0) {
                        array.push(`${key.substring(0, 3)} +${total}`);
                    } else {
                        array.push(`${key.substring(0, 3)} ${total}`);
                    }
                }
            }
        
            if (bool) {
                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Saving Throws "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(array.join(", ")));
        
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function skills() {
            let skills = creature["Skills"];

            let div = document.createElement('div');
        
            let bool = false;
        
            let array = [];
        
            for(let key in skills) {
                if (skills[key] === true) {
                    bool = true;
        
                    let total = proficiencyBonus(creature["Challenge"]) + modifier(creature["Ability Scores"][skilltoAbility(key)]);
                    
                    if (total > 0) {
                        array.push(`${key} +${total}`);
                    } else {
                        array.push(`${key} ${total}`);
                    }
                }
            }
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Skills "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(array.join(", ")));
        
            if (bool) {
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function damageVulnerabilities() {
            let vulnerabilities = creature["Damage Vulnerabilities"];

            let div = document.createElement('div');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Damage Vulnerabilities "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(vulnerabilities.join(", ")));
        
            if (vulnerabilities.length > 0) {
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function damageResistances() {
            let resistances = creature["Damage Resistances"];

            let div = document.createElement('div');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Damage Resistances "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(resistances.join(", ")));
        
            if (resistances.length > 0) {
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function damageImmunities() {
            let immunities = creature["Damage Immunities"];

            let div = document.createElement('div');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Damage Immunities "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(immunities.join(", ")));
        
            if (immunities.length > 0) {
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function conditionImmunities() {
            let immunities = creature["Condition Immunities"];

            let div = document.createElement('div');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Condition Immunities "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(immunities.join(", ")));
        
            if (immunities.length > 0) {
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function senses() {
            let senses = creature["Senses"];

            let div = document.createElement('div');
        
            let array = [];
        
            if (senses["Blindsight"] > 0) {
                if (senses["Blind"]) {
                    array.push(`blindsight ${senses["Blindsight"]} ft. (blind beyond this radius)`);
                } else {
                    array.push(`blindsight ${senses["Blindsight"]} ft.`);
                }
            }
        
            if (senses["Darkvision"] > 0) {
                array.push(`darkvision ${senses["Darkvision"]} ft.`);
            }
        
            if (senses["Tremorsense"] > 0) {
                array.push(`tremorsense ${senses["Tremorsense"]} ft.`);
            }
        
            if (senses["Truesight"] > 0) {
                array.push(`truesight ${senses["Truesight"]} ft.`);
            }
        
            let passivePerception = 0;
        
            if (creature["Skills"]["Perception"] === true) {
                passivePerception = 10 + proficiencyBonus(creature["Challenege"]) + modifier(creature["Ability Scores"]["Wisdom"]);
            } else {
                passivePerception = 10 + modifier(creature["Ability Scores"]["Wisdom"]);
            }
        
            array.push(`passive Perception ${passivePerception}`)
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Senses "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(array.join(", ")));

            shadow.querySelector("#lowerBlock").appendChild(div);
        }

        function challenge() {
            let div = document.createElement('div');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode("Challenge "));
            
            div.appendChild(b);

            div.appendChild(document.createTextNode(`${creature["Challenge"]} (${creature["Experience"]} XP)`));

            shadow.querySelector("#lowerBlock").appendChild(div);
        }

        function properties(...sections) {
            sections.forEach(section => {
                if (creature[section] !== undefined) {
                    // Create the container
        
                    let div = document.createElement('div');
        
                    // Create the header
                    if (section != "Features") {
                        let h3 = document.createElement('h3');
                            h3.appendChild(document.createTextNode(section));

                        div.appendChild(h3);
                    }
                    
                    // Property first level
        
                    for (let key in creature[section]) {
                        //console.log(`${property}, key: ${key}`)
                        let div2 = document.createElement('div');
        
                        if (key.includes("Spellcasting")){
                            paragraphsPrependBold(key, creature[section][key]["Description"], div2);
        
                            spells(creature[section][key], div2);
                        } else if (key === "Description") {
                            paragraphs(creature[section][key], div2);
                        } else {
                            for(let subKey in creature[section][key]) {
                                //console.log(`${property}, key: ${key}, subKey: ${subKey}`)
                                if (subKey === "Description") {
                                    paragraphsPrependBold(key, creature[section][key][subKey], div2);
                                } else if (subKey === "Ordered List") {
                                    list(creature[section][key][subKey], "ol", div2);
                                } else if (subKey === "Unordered List") {
                                    list(creature[section][key][subKey], "ul", div2);
                                } else if (subKey.includes("Table")) {
                                    table(creature[section][key][subKey], div2);
                                } else {
                                    let div3 = document.createElement('div');
                                    div3.className = "subProperty";
        
                                    if (subKey !== "Properties") {
                                        paragraphsPrependBold(subKey, creature[section][key][subKey]["Description"], div3);
                                    }

                                    div2.appendChild(div3);
                                }
                            }
                        }

                        div.appendChild(div2)
                    }

                    shadow.querySelector("#properties").appendChild(div);
                }
            });
        }

        function spells(json, parent) {
            let div = document.createElement('div');
            div.className = "spellsBlock";
        
            for (let key in json) {
                if (key !== "Description") {
                    let div2 = document.createElement('div');
        
                    let array = json[key];
                    
                    div2.appendChild(document.createTextNode(`${key}: `))
                    
                    for (let i = 0; i < array.length; i++) {
                        let text;
                        let spell = array[i];
        
                        if(spell.includes(" (")) {
                            let split = spell.split(" (");
        
                            if(array.length - 1 != i) {
                                text = `${spell}, `;
                            } else {
                                text = spell;
                            }
        
                            let a = document.createElement('a');
                            a.appendChild(document.createTextNode(text));
                                a.onclick = () => {
                                    document.body.appendChild(new SpellModal(split[0]));
                                };

                            div2.appendChild(a);
                        } else {
                            if(array.length - 1 != i) {
                                text = `${spell}, `;
                            } else {
                                text = spell;
                            }

                            let a = document.createElement('a');
                            a.appendChild(document.createTextNode(text));
                                a.onclick = () => {
                                    document.body.appendChild(new SpellModal(spell));
                                };

                            div2.appendChild(a);
                        }
                    }

                    div.appendChild(div2);
                }
            }

            parent.appendChild(div);
        }

        function paragraphs(array, parent) {
            array.forEach(line => {
                let p = document.createElement('p');
        
                if(line.includes('#')) {
                    let split = line.split('#');
        
                    let b = document.createElement('b');
                    b.appendChild(document.createTextNode(`${split[0]}. `));
                    p.appendChild(b);
        
                    p.appendChild(document.createTextNode(split[1]));
                } else {
                    p.appendChild(document.createTextNode(line));
                }
        
                parent.appendChild(p);
            });
        }

        function paragraphsPrependBold(key, array, parent) {
            let temp = [];

            array.forEach(line => {
                let p = document.createElement('p');
                    p.appendChild(document.createTextNode(line));
                    
                temp.push(p);
            });
        
            let p = document.createElement('p');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode(`${key}. `));
        
            p.appendChild(b);
        
            p.appendChild(document.createTextNode(temp[0].textContent));
        
            // Remove the first item in the array
            temp.shift();
        
            // Insert the paragraph element with the bolded keyword into the first line of the array
            temp.unshift(p);
        
            temp.forEach(element => {
                parent.appendChild(element);
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

customElements.define('creature-modal', CreatureModal);

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
                    top: 20px;
                    right: 20px;
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
                paragraphs(spells[name][key], description);
            } else if(key == "Higher Levels") {
                paragraphsPrependBold(key, spells[name][key], description);
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
        
        function paragraphsPrependBold(key, array, parent) {
            let temp = [];

            array.forEach(line => {
                let p = document.createElement('p');
                    p.appendChild(document.createTextNode(line));
                    
                temp.push(p);
            });
        
            let p = document.createElement('p');
        
            let b = document.createElement('b');
                b.appendChild(document.createTextNode(`${key}. `));
        
            p.appendChild(b);
        
            p.appendChild(document.createTextNode(temp[0].textContent));
        
            // Remove the first item in the array
            temp.shift();
        
            // Insert the paragraph element with the bolded keyword into the first line of the array
            temp.unshift(p);
        
            temp.forEach(element => {
                parent.appendChild(element);
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
                            td.appendChild(document.createTextNode(row[key]));

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