class CreatureTabs extends HTMLElement {
    constructor(name, json) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let div = document.createElement('div');
        let style = document.createElement('style');



        shadow.appendChild(style);
        shadow.appendChild(div);

    }
}

customElements.define('creature-tabs', CreatureTabs);