import {Spell} from "../modules/spell.module.js"

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