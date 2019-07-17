

export function SortByName(json) {
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

export function SortByType(json) {
    let obj = {
        "Aberration": [],
        "Beast": [],
        "Celestial": [],
        "Construct": [],
        "Dragon": [],
        "Elemental": [],
        "Fey": [],
        "Fiend": [],
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
            obj["Fiend"].push(creature);
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

export function SortByCR(json) {
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

export function SortBySchool(json) {
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

export function SortByClass(json) {
    let obj = {
        "Bard": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []
        },
        "Cleric": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        },
        "Druid": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        },
        "Paladin": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        },
        "Ranger": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        },
        "Sorcerer": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        },
        "Warlock": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        },
        "Wizard": {
            "0": [],
            "1": [],
            "2": [],
            "3": [],
            "4": [],
            "5": [],
            "6": [],
            "7": [],
            "8": [],
            "9": []            
        }
    }

    for (let spell in json) {
        let spellLevel = json[spell]["Level"];

        for (let sClass in json[spell]["Classes"]) {
            if (json[spell]["Classes"][sClass] === true) {
                if (spellLevel === 0) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 1) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 2) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 3) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 4) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 5) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 6) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 7) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 8) {
                    obj[sClass][spellLevel].push(spell);
                } else if (spellLevel === 9) {
                    obj[sClass][spellLevel].push(spell);
                }
            }
        }
    }

    return obj;
}