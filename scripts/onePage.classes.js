class NavLinks extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            a {
                display: block;
                color: blue;
                cursor: pointer;
            }
        `;
        
        let classes = document.createElement('a');
        classes.appendChild(document.createTextNode("Classes"));
        classes.addEventListener('click', () => {
            Check(PCClasses);
        }, false);

        shadow.appendChild(classes);

        let bestiary = document.createElement('a');
        bestiary.appendChild(document.createTextNode("Bestiary"));
        bestiary.addEventListener('click', () => {
            Check(Bestiary);
        }, false);

        shadow.appendChild(bestiary);

        let spells = document.createElement('a');
        spells.appendChild(document.createTextNode("Spells"));
        spells.addEventListener('click', () => {
            Check(Spells);
        }, false);

        shadow.appendChild(spells);

        let magicItems = document.createElement('a');
        magicItems.appendChild(document.createTextNode("Magic Items"));
        magicItems.addEventListener('click', () => {
            Check(MagicItems);
        }, false);

        shadow.appendChild(magicItems);

        shadow.appendChild(style);

        function Check(newElement) {
            let content = document.querySelector("#content");

            if (content.children.length > 0) {
                for (let child of content.children) {
                    child.remove();
                }
            }

            let temp = new newElement();
            content.appendChild(temp);
        }
    }
}

customElements.define('nav-links', NavLinks);

class PCClasses extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});
        let style = document.createElement('style');
        style.textContent = `
        
        `;

        shadow.appendChild(style);

        import("./classData.module.js")
            .then(module => {
                module.Level1(JSON.parse(localStorage.getItem("Classes")), shadow);
            });
    }
}

customElements.define('pc-classes', PCClasses);

class Bestiary extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            
        `;

        let gridContainer = document.createElement('div');
        gridContainer.className = "subGrid";

        let list = document.createElement('div');
        let tabs = document.createElement('div');
        let subContent = document.createElement('div');

        shadow.appendChild(style);
    }
}

customElements.define('bestiary', Bestiary);

/* class Spells extends HTMLElement {
    constructor() {
        super();

    }
}

customElements.define('spells', Spells);

class MagicItems extends HTMLElement {
    constructor() {
        super();

    }
}

customElements.define('magic-items', MagicItems); */