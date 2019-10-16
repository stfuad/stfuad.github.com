export function ProficiencyBonus(cr) {
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

export function Modifier(int) {
    return Math.floor((int - 10) / 2);
}