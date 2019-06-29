class SpellSheet extends HTMLElement {
    constructor(name, json) {
        super();
        
        let shadow = this.attachShadow({mode: 'open'});

        let div = document.createElement('div');
        div.id = "spellSheet";

        let style = document.createElement('style');
        style.textContent = `
            #spellSheetHeader > h3 {
                margin-top: 0px;
                margin-bottom: 0px;
            }

            #spellSheetStats {
                margin-top: 10px;
                margin-bottom: 10px;
            }
        `;

        import("./spellSheet.module.js")
            .then(module => {
                module.SpellSheet(name, json, div);
            });
        
        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

customElements.define('spell-sheet', SpellSheet);