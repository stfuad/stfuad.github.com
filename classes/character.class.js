class Character {
    constructor(json) {
        this.name = json["Name"];
        this.race = json["Race"];
        this.characterLevel = json["Character Level"];
        this.classes = new Classes(json["Classes"]);
        this.abilityScores = new AbilityScores(json["Ability Scores"]);
    }
}

class Classes {
    constructor(json) {
        this.artificer = json["Artificer"];
        this.barbarian = json["Barbarian"];
        this.bard = json["Bard"];
        this.cleric = json["Cleric"];
        this.fighter = json["Fighter"];
        this.monk = json["Monk"];
        this.paladin = json["Paladin"];
        this.sorcerer = json["Sorcerer"];
        this.warlock = json["Warlock"];
        this.wizard = json["Wizard"];
    }
}

class AbilityScores {
    constructor(json) {
        this.strength = json["Strength"];
        this.dexterity = json["Dexterity"];
        this.constitution = json["Constitution"];
        this.wisdom = json["Wisdom"];
        this.intelligence = json["Intelligence"];
        this.charisma = json["Charisma"];
    }
}