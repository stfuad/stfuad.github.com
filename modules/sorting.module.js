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

    // Sort each key into array by first letter

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