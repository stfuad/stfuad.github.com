import {Creature} from "../modules/creature.module.js";

export class CreatureSheet extends HTMLElement {
    constructor(name) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.innerHTML = `
            #creatureSheetHeader {
                margin-bottom: 10px;
            }

            #creatureSheetHeader > h2 {
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

        Creature(name, JSON.parse(localStorage.getItem("Bestiary"))[name], shadow);

        shadow.appendChild(style);
    }
}

customElements.define('creature-sheet', CreatureSheet);