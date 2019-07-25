// imports - classes

import {Races} from "./races-page.class.js";
import {Classes} from "./classes-page.class.js";
import {Feats} from "./feats-page.class.js";
import {Spells} from "./spells-page.class.js";
import {Bestiary} from "./bestiary-page.class.js";
import {Items} from "./items-page.class.js";

// imports - modules

import {Element, Link} from "../modules/htmlElements.module.js";

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
        `;
        
        let races = document.createElement('a');
        races.appendChild(document.createTextNode("Races"));
        races.addEventListener('click', () => {
            Check(Races);
        }, false);

        shadow.appendChild(races);

        let classes = document.createElement('a');
        classes.appendChild(document.createTextNode("Classes"));
        classes.addEventListener('click', () => {
            Check(Classes);
        }, false);

        shadow.appendChild(classes);

        let feats = document.createElement('a');
        feats.appendChild(document.createTextNode("Feats"));
        feats.addEventListener('click', () => {
            Check(Feats);
        }, false);

        shadow.appendChild(feats);

        shadow.appendChild(document.createElement('hr'));

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
            Check(Items);
        }, false);

        shadow.appendChild(magicItems);

        shadow.appendChild(document.createElement('hr'));

        let initiative = document.createElement('a');
        initiative.appendChild(document.createTextNode("Initiative Tracker"));
        initiative.href = "./initiative.html";
        initiative.target = "_blank";

        shadow.appendChild(initiative);

        shadow.appendChild(style);

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