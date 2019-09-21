

export function ByName(json) {
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

export function ByBook(json) {
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

// creatures

export function ByType(json) {
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

export function ByCR(json) {
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

// spells

export function BySchool(json) {
    let obj = {
        "Abjuration": [],
        "Conjuration": [],
        "Divination": [],
        "Enchantment": [],
        "Evocation": [],
        "Illusion": [],
        "Necromancy": [],
        "Transmutation": []
    };

    Object.keys(json).forEach(element => {
        if (json[element]["School"].toLowerCase() === "abjuration") {
            obj["Abjuration"].push(element);
        } else if (json[element]["School"].toLowerCase() === "conjuration") {
            obj["Conjuration"].push(element);
        } else if (json[element]["School"].toLowerCase() === "divination") {
            obj["Divination"].push(element);
        } else if (json[element]["School"].toLowerCase() === "enchantment") {
            obj["Enchantment"].push(element);
        } else if (json[element]["School"].toLowerCase() === "evocation") {
            obj["Evocation"].push(element);
        } else if (json[element]["School"].toLowerCase() === "illusion") {
            obj["Illusion"].push(element);
        } else if (json[element]["School"].toLowerCase() === "necromancy") {
            obj["Necromancy"].push(element);
        } else if (json[element]["School"].toLowerCase() === "transmutation") {
            obj["Transmutation"].push(element);
        }
    });

    return obj;
}

export function ByClass(json) {
    let obj = {
        "Bard": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Cleric": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Druid": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Paladin": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Ranger": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Sorcerer": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Warlock": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        },
        "Wizard": {
            "Cantrips (0 Level)": [],
            "1st Level": [],
            "2nd Level": [],
            "3rd Level": [],
            "4th Level": [],
            "5th Level": [],
            "6th Level": [],
            "7th Level": [],
            "8th Level": [],
            "9th Level": []
        }
    }

    for (let spell in json) {
        let spellLevel = json[spell]["Level"];

        for (let sClass in json[spell]["Classes"]) {
            if (json[spell]["Classes"][sClass] === true) {
                if (spellLevel === 0) {
                    obj[sClass]["Cantrips (0 Level)"].push(spell);
                } else if (spellLevel === 1) {
                    obj[sClass]["1st Level"].push(spell);
                } else if (spellLevel === 2) {
                    obj[sClass]["2nd Level"].push(spell);
                } else if (spellLevel === 3) {
                    obj[sClass]["3rd Level"].push(spell);
                } else if (spellLevel === 4) {
                    obj[sClass]["4th Level"].push(spell);
                } else if (spellLevel === 5) {
                    obj[sClass]["5th Level"].push(spell);
                } else if (spellLevel === 6) {
                    obj[sClass]["6th Level"].push(spell);
                } else if (spellLevel === 7) {
                    obj[sClass]["7th Level"].push(spell);
                } else if (spellLevel === 8) {
                    obj[sClass]["8th Level"].push(spell);
                } else if (spellLevel === 9) {
                    obj[sClass]["9th Level"].push(spell);
                }
            }
        }
    }

    return obj;
}

export function ByLevel(json) {
    let obj = {
        "Cantrips (0 Level)": [],
        "1st Level": [],
        "2nd Level": [],
        "3rd Level": [],
        "4th Level": [],
        "5th Level": [],
        "6th Level": [],
        "7th Level": [],
        "8th Level": [],
        "9th Level": []
    }

    for (let spell in json) {
        let level = json[spell]["Level"];

        if (level === 0) {
            obj["Cantrips (0 Level)"].push(spell);
        } else if (level === 1) {
            obj["1st Level"].push(spell);
        } else if (level === 2) {
            obj["2nd Level"].push(spell);
        } else if (level === 3 ) {
            obj["3rd Level"].push(spell);
        } else if (level === 4) {
            obj["4th Level"].push(spell);
        } else if (level === 5){
            obj["5th Level"].push(spell);
        } else if (level === 6) {
            obj["6th Level"].push(spell);
        } else if (level === 7) {
            obj["7th Level"].push(spell);
        } else if (level === 8) {
            obj["8th Level"].push(spell);
        } else if (level === 9) {
            obj["9th Level"].push(spell);
        }
    }

    return obj;
}

// items

export function ByRarity(json) {
    let obj = {
        "Common": [],
        "Uncommon": [],
        "Rare": [],
        "Very Rare": [],
        "Legendary": []
    }

    for (let item in json) {
        if (json[item]["Rarity"] === "common") {
            obj["Common"].push(item);
        } else if (json[item]["Rarity"] === "uncommon") {
            obj["Uncommon"].push(item);
        } else if (json[item]["Rarity"] === "rare") {
            obj["Rare"].push(item);
        } else if (json[item]["Rarity"] === "very rare") {
            obj["Very Rare"].push(item);
        } else if (json[item]["Rarity"] === "legendary") {
            obj["Legendary"].push(item);
        }
    }

    return obj;
}