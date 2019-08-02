import {Creature} from "../modules/creature.module.js"
import {Spell} from "../modules/spell.module.js"
import {Item} from "../modules/item.module.js"

export class CreatureSheet extends HTMLElement {
    constructor(name, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.innerHTML = `
            #creatureSheetHeader {
                margin-bottom: 10px;
            }

            #creatureSheetHeader > h2 {
                margin-top: 0px;
                margin-bottom: 0px;
            }

            #creatureSheetFooter {
                margin-top: 10px;
            }

            #upperBlock, #lowerBlock {
                border-top: 1px solid black;
                border-bottom: 1px solid black;
            }

            .abilityScores {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .property > div {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            .property div > p:first-of-type {
                display: inline;
            }
            
            .property > h3 {
                border-bottom: 1px solid black;
                margin-bottom: 0px;
            }

            .subProperty {
                margin-left: 22px;
            }

            .spellsBlock div > a {
                color: blue;
                cursor: pointer;
            }
        `;

        Creature(name, json, shadow);

        shadow.appendChild(style);
    }
}

customElements.define('creature-sheet', CreatureSheet);

export class SpellSheet extends HTMLElement {
    constructor(name) {
        super();
        
        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            #spellSheetHeader > h3 {
                margin-top: 0px;
                margin-bottom: 0px;
            }
        `;

        Spell(name, JSON.parse(localStorage.getItem("Spells"))[name], shadow);
        
        shadow.appendChild(style);
    }
}

customElements.define('spell-sheet', SpellSheet);

export class ItemSheet extends HTMLElement {
    constructor(name) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.innerHTML = `
            div > h3 {
                margin-top: 0px;
                margin-bottom: 0px;
            }
        `;

        Item(name, JSON.parse(localStorage.getItem("Magic Items"))[name], shadow);

        shadow.appendChild(style);
    }
}

customElements.define('item-sheet', ItemSheet);