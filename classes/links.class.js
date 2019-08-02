// imports - classes

import * as page from "./pages.classes.js";

// classes

export class Links extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            a {
                display: block;
                color: blue;
                cursor: pointer;
                text-decoration: none;
            }

            div {
                border: 1px solid black;
            }
        `;
        
        shadow.appendChild(style);

        let div1 = document.createElement('div');

            let races = document.createElement('a');
            races.appendChild(document.createTextNode("Races"));
            races.onclick = () => Check(page.Races);

            div1.appendChild(races);

            let classes = document.createElement('a');
            classes.appendChild(document.createTextNode("Classes"));
            classes.onclick = () => Check(page.Classes);

            div1.appendChild(classes);

            let feats = document.createElement('a');
            feats.appendChild(document.createTextNode("Feats"));
            feats.onclick = () => Check(page.Feats);

            div1.appendChild(feats);

        shadow.appendChild(div1);

        let div2 = document.createElement('div');

            let bestiary = document.createElement('a');
            bestiary.appendChild(document.createTextNode("Bestiary"));
            bestiary.onclick = () => Check(page.Bestiary);

            div2.appendChild(bestiary);

            let spells = document.createElement('a');
            spells.appendChild(document.createTextNode("Spells"));
            spells.onclick = () => Check(page.Spells);

            div2.appendChild(spells);

            let magicItems = document.createElement('a');
            magicItems.appendChild(document.createTextNode("Magic Items"));
            magicItems.onclick = () => Check(page.Items);

            div2.appendChild(magicItems);

        shadow.appendChild(div2);

        let div3 = document.createElement('div');

            let initiative = document.createElement('a');
            initiative.appendChild(document.createTextNode("Initiative Tracker"));
            initiative.href = "./initiative.html";
            initiative.target = "_blank";

            div3.appendChild(initiative);

        shadow.appendChild(div3);

        function Check(newElement) {
            let content = document.querySelector("#content");

            if (content.children.length > 0) {
                for (let child of content.children) {
                    child.remove();
                }
            }

            content.appendChild(new newElement());
        }
    }
}

customElements.define('nav-links', Links);