import * as module from "../classes/simpleSheet.classes.js";
import * as misc from "./misc.module.js";

export function DoWork() {
        let content = document.getElementById("content");
    let newCharacter = document.getElementById("new");
    newCharacter.addEventListener("click", () => {
        /* Do something if the content div has children */

        if (content.childElementCount > 0) {
            content.innerHTML = "";
        }

        /* Check for template support and clone the template to the content div. */

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
                "classes": {},
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

            misc.ToObject(char, 
            shadow.querySelectorAll("[name=\"classes\"]"),
            shadow.querySelectorAll("[name=\"classes\"]"),
            shadow.querySelectorAll("[name=\"abilityScores\"]"),
            shadow.querySelectorAll("[name=\"savingThrows\""),
            shadow.querySelectorAll("[name=\"skillProficiencies\""),
            shadow.querySelectorAll("[name=\"weaponProficiencies\""),
            shadow.querySelectorAll("[name=\"armorProficiencies\""),
            shadow.querySelectorAll("[name=\"skillExpertise\"")
            )

            misc.ToArray(char,
            shadow.getElementById("featsFieldset").querySelectorAll("link-element"),
            shadow.getElementById("classFeaturesFieldset").querySelectorAll("link-element"),
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
            } else {
                console.log("Enter a character name.");
            }
        }
    };
}
