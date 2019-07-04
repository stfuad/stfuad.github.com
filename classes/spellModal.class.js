import {Spell} from "../modules/spell.module.js";

export class SpellModal extends HTMLElement {
    constructor(name) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let div = document.createElement('div');
        div.id = "spellModal";

        let style = document.createElement('style');
        style.textContent = `
            #spellModal {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: auto;
                max-height: 700px;
                width: 400px;
                background-color: white;
                border: 1px solid black;
                border-radius: 5px;
                padding: 10px;
                overflow: auto; 
            }

            #spellSheetHeader > h3 {
                margin-top: 0px;
                margin-bottom: 0px;
            }

            #spellSheetStats {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            #spellSheetClose {
                position: absolute;
                top: 0px;
                right: 0px;
            }
        `;

        Spell(name, JSON.parse(localStorage.getItem("Spells"))[name], div);

        let button = document.createElement('button');
        button.id = "spellSheetClose";
        button.textContent = "\u2716";
        button.onclick = () => {
            let item = shadow.getElementById("spellModal");
            item.remove();
        };

        div.appendChild(button);

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

customElements.define('spell-modal', SpellModal);