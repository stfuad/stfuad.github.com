class ItemSheet extends HTMLElement {
    constructor(name, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let div = document.createElement('div');
        let style = document.createElement('style');
        style.innerHTML = `
            div > h3 {
                margin-bottom: 0px;
            }
        `;

        import("./itemSheet.module.js")
            .then(module => {
                module.ItemSheet(name, json, div);
            })

        shadow.appendChild(style);
        shadow.appendChild(div);
    }
}

customElements.define('item-sheet', ItemSheet);