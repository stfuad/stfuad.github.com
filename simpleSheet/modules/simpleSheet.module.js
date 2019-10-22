import * as module from "../classes/simpleSheet.classes.js";

const content = document.getElementById("content");

export function DoWork() {
    
    let newCharacter = document.getElementById("new");
    newCharacter.addEventListener("click", () => {
        content.innerHTML = "";

        content.appendChild(new module.CharacterTemplate(undefined));
    }, false);

    let openCharacter = document.getElementById("open");
    openCharacter.addEventListener("click", () => {
        document.body.appendChild(new module.OpenModal());
    }, false);

    let saveCharacter = document.getElementById("save");
    saveCharacter.onclick = () => {
        if (content.innerHTML) {
            let char = {
                "name": "",
                "race": "",
                "subrace": "",
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
                "spells1stLevel": [],
                "spells2ndLevel": [],
                "spells3rdLevel": [],
                "spells4thLevel": [],
                "spells5thLevel": [],
                "spells6thLevel": [],
                "spells7thLevel": [],
                "spells8thLevel": [],
                "spells9thLevel": []
            };

            let sheet = document.querySelector("character-template");
            let shadow = sheet.shadowRoot;

            char["name"] = shadow.getElementById("name").value;
            char["race"] = shadow.getElementById("race").value;
            char["subrace"] = shadow.getElementById("subrace").value;
            char["hitPointsMax"] = shadow.getElementById("hitPointsMax").value;
            char["hitPoints"] = shadow.getElementById("hitPoints").value;
            char["tempHitPoints"] = shadow.getElementById("tempHitPoints").value;

            ToObject(char, 
            shadow.querySelectorAll("[name=\"classes\"]"),
            shadow.querySelectorAll("[name=\"subclasses\"]"),
            shadow.querySelectorAll("[name=\"abilityScores\"]"),
            shadow.querySelectorAll("[name=\"savingThrows\""),
            shadow.querySelectorAll("[name=\"skillProficiencies\""),
            shadow.querySelectorAll("[name=\"weaponProficiencies\""),
            shadow.querySelectorAll("[name=\"armorProficiencies\""),
            shadow.querySelectorAll("[name=\"skillExpertise\"")
            )

            ToArray(char,
            shadow.getElementById("featsFieldset").querySelectorAll("link-element"),
            /* shadow.getElementById("classFeaturesFieldset").querySelectorAll("link-element"), */
            shadow.getElementById("racialTraitsFieldset").querySelectorAll("link-element"),
            shadow.getElementById("equipmentFieldset").querySelectorAll("link-element"),
            shadow.getElementById("lootFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells1stLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells2ndLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells3rdLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells4thLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells5thLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells6thLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells7thLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells8thLevelFieldset").querySelectorAll("link-element"),
            shadow.getElementById("spells9thLevelFieldset").querySelectorAll("link-element")
            )


            if (char["name"]) {
                localStorage.setItem(`character-${char["name"]}`, JSON.stringify(char));
                console.log(`Saved to character-${char["name"]} in localStorage`)
            } else {
                console.log("Enter a character name.");
            }
        }
    };
}

function ToObject(json, ...nodeList) {
    nodeList.forEach(nodes => {
        for (let node of nodes) {
            if (node.type === "checkbox") {
                json[node.name][node.id] = node.checked;
            } else if (node.type === "number") {
                if (node.value) {
                    json[node.name][node.id] = node.value;
                } else {
                    json[node.name][node.id] = 0;
                }
            } else {
                json[node.name][node.id] = node.value;
            }
        }
    });
}

function ToArray(json, ...nodeList) {
    nodeList.forEach(nodes => {
        for (let node of nodes) {
            json[node.title].push(node.id);
        }
    });
}