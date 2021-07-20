let bestiary;

export async function load(target, height, width, list, source) {
    bestiary = await (await fetch(source)).json();

    target.appendChild(new InitiativeTracker(height, width, list));
}

class InitiativeTracker extends HTMLElement {
    constructor(height, width, list) {
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
                <button id="save" title="Save Encounter to LocalStorage">&#x1F4BE</button>
                <button id="load" title="Load Encounter from LocalStorage">&#x1F4C1</button>
                <button id="clear" title="Clear Tracker">&#9114</button>
            </div>

            <div id="tracker"></div>
        `;

        shadow.innerHTML = template;

        // TBD

        shadow.querySelector("#addGroup").remove();

        // If the list arg is true

        if (list) {
            shadow.querySelector("#creatureListControls").remove();
            shadow.querySelector("#creatureList").remove();
            shadow.querySelector("#save").remove();
            shadow.querySelector("#load").remove();
            shadow.querySelector("#clear").remove();

            list.forEach(creature => {
                shadow.querySelector("#tracker").appendChild(new CreatureListItem(creature, undefined, undefined));
            });
        } else {
            shadow.querySelector("#byName").onclick = () => wrapper(byName(bestiary));
            shadow.querySelector("#byType").onclick = () => wrapper(byType(bestiary))
            shadow.querySelector("#byCR").onclick = () => wrapper(byCR(bestiary));
            shadow.querySelector("#byBook").onclick = () => wrapper(byBook(bestiary));

            createList(byName(bestiary));
        }

        // Tracker controls

        shadow.querySelector("#addPC").onclick = () => shadow.querySelector("#tracker").appendChild(new PCListItem(undefined, undefined, undefined));

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

        shadow.querySelector("#save").onclick = () => document.body.appendChild(new SaveModal());

        shadow.querySelector("#load").onclick = () => document.body.appendChild(new LoadModal());

        shadow.querySelector("#clear").onclick = () => shadow.querySelector("#tracker").innerHTML = "";

        // Functions

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
                        shadow.querySelector("#tracker").appendChild(new CreatureListItem(item, undefined, undefined));
                    };
        
                    div.appendChild(a);
                });
        
                shadow.querySelector("#creatureList").appendChild(div);
            }
        }
        
        function wrapper(obj) {
            shadow.querySelector("#creatureList").innerHTML = "";

            createList(obj);
        }

        // Sorting functions

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
        
            for(let creature in json) {
                if (creature) {
                    obj[creature.charAt(0)].push(creature);
                }
            }
            
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
    constructor(name, hp, init) {
        super();

        let creature = bestiary[name];

        name ? this.setAttribute('name', name) : this.setAttribute('name', "Default PC");
        hp ? this.setAttribute('hp', hp) : this.setAttribute('hp', averageHitPoints());
        init ? this.setAttribute('init', init) : this.setAttribute('init', modifier(creature["Ability Scores"]["Dexterity"]) + Math.floor(Math.random() * 20) + 1);

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

class PCListItem extends HTMLElement {
    constructor(name, init) {
        super();

        name ? this.setAttribute('name', name) : this.setAttribute('name', "Default PC");
        init ? this.setAttribute('init', init) : this.setAttribute('init', 0);

        let shadow = this.attachShadow({mode: 'open'});

        const template = `
            <style>
                :host {
                    display: grid;
                    grid-template-columns: 1fr 100px auto;
                    border: 1px solid black;
                }

                input {
                    border: 0px;
                }

                #name {
                    grid-column: 1;
                    text-indent: 1em;
                }

                #initiative {
                    grid-column: 2;
                }

                #buttons {
                    grid-column: 3;
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
            <label for="initiative">Init</label>

            <input type="text" id="name" value="${this.getAttribute("name")}">
            <input type="number" id="initiative" value="${this.getAttribute("init")}">
            
            <div id="buttons">
                <button id="view">\uD83D\uDCC4</button>
                <button id="close">\u2716</button>
            </div>
        `;

        shadow.innerHTML = template;


        // inputs

        shadow.querySelector("#name").onchange = () => this.setAttribute('name', shadow.querySelector("#name").value);
        shadow.querySelector("#initiative").onchange = () => this.setAttribute('init', shadow.querySelector("#initiative").value);

        // buttons

        shadow.querySelector("#close").onclick = () => this.remove();
    }
}

customElements.define('pc-listitem', PCListItem);

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
                    <i>${creature["Book"]} Pg. ${creature["Page"]}</i>
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

        function modifier(ability) {
            return Math.floor((ability - 10) / 2);
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

            if (speeds) {
                shadow.querySelector("#speeds").appendChild(document.createTextNode(speeds.join(", ")));
            }
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

            if (savingThrows) {
                let div = document.createElement('div');

                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Saving Throws "));

                div.appendChild(b);

                div.appendChild(document.createTextNode(savingThrows.join(", ")));

                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function skills() {
            let skills = creature["Skills"];

            if (skills) {
                let div = document.createElement('div');
            
                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Skills "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(skills.join(", ")));
            
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function damageVulnerabilities() {
            let vulnerabilities = creature["Damage Vulnerabilities"];

            if (vulnerabilities) {
                let div = document.createElement('div');
            
                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Damage Vulnerabilities "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(vulnerabilities.join(", ")));
            
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function damageResistances() {
            let resistances = creature["Damage Resistances"];

            if (resistances) {
                let div = document.createElement('div');

                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Damage Resistances "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(resistances.join(", ")));
            
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function damageImmunities() {
            let immunities = creature["Damage Immunities"];

            if (immunities) {
                let div = document.createElement('div');
            
                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Damage Immunities "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(immunities.join(", ")));
            
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function conditionImmunities() {
            let immunities = creature["Condition Immunities"];

            if (immunities) {
                let div = document.createElement('div');
            
                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Condition Immunities "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(immunities.join(", ")));
            
                shadow.querySelector("#lowerBlock").appendChild(div);
            }
        }

        function senses() {
            let senses = creature["Senses"];

            if (senses) {
                let div = document.createElement('div');
            
                let b = document.createElement('b');
                    b.appendChild(document.createTextNode("Senses "));
                
                div.appendChild(b);

                div.appendChild(document.createTextNode(senses.join(", ")));

                shadow.querySelector("#lowerBlock").appendChild(div);
            }
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
                if (creature[section]) {
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
                                /* a.onclick = () => {
                                    document.body.appendChild(new SpellModal(split[0]));
                                }; */

                            div2.appendChild(a);
                        } else {
                            if(array.length - 1 != i) {
                                text = `${spell}, `;
                            } else {
                                text = spell;
                            }

                            let a = document.createElement('a');
                            a.appendChild(document.createTextNode(text));
                                /* a.onclick = () => {
                                    document.body.appendChild(new SpellModal(spell));
                                }; */

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
                                    /* a.addEventListener('click', () => {
                                        parent.appendChild(new SpellModal(spell));
                                    }, false); */
        
        
                                } else {
                                    a.appendChild(document.createTextNode(spell))
                                    /* a.addEventListener('click', () => {
                                        parent.appendChild(new SpellModal(spell));
                                    }, false); */
        
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

class SaveModal extends HTMLElement {
    constructor() {
        super();

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
                    width: auto;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }
            </style>

            <div id="modal">
                <input type="text" id="textInput" required />
                <button type="button" id="saveButton">Save</button>
                <button type="button" id="cancelButton">Cancel</button>
            </div>
        `;

        shadow.innerHTML = template;

        shadow.querySelector("#saveButton").onclick = () => {
            let input = shadow.querySelector("#textInput")

            if (!input.value) return;

            let initTracker = document.body.querySelector("initiative-tracker");
            let tracker = initTracker.shadowRoot.querySelector("#tracker");

            let array = [];

            for (let listItem of tracker.childNodes) {
                let obj = {
                    "Type": undefined,
                    "Name": undefined,
                    "HitPoints": 0,
                    "Initiative": 0
                }

                if (listItem.nodeName === "CREATURE-LISTITEM") obj.Type = "creature";
                if (listItem.nodeName === "PC-LISTITEM") obj.Type = "pc";

                obj.Name = listItem.getAttribute("name");
                obj.HitPoints = listItem.getAttribute("hp");
                obj.Initiative = listItem.getAttribute("init");

                array.push(obj);
            }

            localStorage.setItem(`${input.value} save`, JSON.stringify(array));

            this.remove();
        };

        shadow.querySelector("#cancelButton").onclick = () => this.remove();
    }
}

customElements.define('save-modal', SaveModal);

class LoadModal extends HTMLElement {
    constructor() {
        super();

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
                    width: auto;
                    transform: translate(-50%, -50%);
                    border: 1px solid black;
                    padding: 10px;
                    background-color: white;
                    overflow: auto;
                }
            </style>

            <div id="modal">
                <select id="savesSelect"></select>
                <button type="button" id="loadButton">Load</button>
                <button type="button" id="cancelButton">Cancel</button>
            </div>
        `;

        shadow.innerHTML = template;

        let select = shadow.querySelector("#savesSelect");

        for (let key in localStorage) {
            if (key.includes("save")) {
                let split = key.split("save");

                let option = document.createElement('option');
                    option.value = key;
                    option.appendChild(document.createTextNode(split[0]));

                select.appendChild(option);
            }
        }

        shadow.querySelector("#loadButton").onclick = () => {
            let array = JSON.parse(localStorage.getItem(select.value));

            for (let obj of array) {
                let initTracker = document.body.querySelector("initiative-tracker");
                let tracker = initTracker.shadowRoot.querySelector("#tracker");

                if (obj.Type === "pc") tracker.appendChild(new PCListItem(obj.Name, obj.Initiative));
                if (obj.Type === "creature") tracker.appendChild(new CreatureListItem(obj.Name, obj.HitPoints, obj.Initiative));
            }

            this.remove();
        };

        shadow.querySelector("#cancelButton").onclick = () => this.remove();
    }
}

customElements.define('load-modal', LoadModal);