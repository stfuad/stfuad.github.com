class SpellModal extends HTMLElement {
    constructor(name, json) {
        super();

        var shadow = this.attachShadow({mode: 'open'});

        let div = document.createElement('div');
        div.id = "sheet";

        let style = document.createElement('style');
        style.textContent = `
            #sheet {
                position: fixed;
                top: 100px;
                left: 100px;
                height: auto;
                width: 400px;
                background-color: white;
                border: 1px solid black;
                border-radius: 5px;
                padding: 10px;
            }

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
                module.SpellSheet(name, json, div)
            });

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

customElements.define('spell-modal', SpellModal);