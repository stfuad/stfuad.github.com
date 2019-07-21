// imports - classes

import {Races} from "./races.class.js";
import {Classes} from "./classes.class.js";
import {Spells} from "./spells.class.js";
import {Bestiary} from "./bestiary.class.js";
import {Items} from "./items.class.js";

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
        
        let races = Link("Races", undefined, shadow);
        races.addEventListener('click', () => {
            Check(Races);
        }, false);

        let classes = Link("Classes", undefined, shadow);
        classes.addEventListener('click', () => {
            Check(Classes);
        }, false);

        Element('hr', shadow);

        let bestiary = Link("Bestiary", undefined, shadow);
        bestiary.addEventListener('click', () => {
            Check(Bestiary);
        }, false);

        let spells = Link("Spells", undefined, shadow);
        spells.addEventListener('click', () => {
            Check(Spells);
        }, false);

        let magicItems = Link("Magic Items", undefined, shadow);
        magicItems.addEventListener('click', () => {
            Check(Items);
        }, false);

        Element('hr', shadow);

        let initiative = Link("Initiative Tracker", "./initiative.html", shadow);
        initiative.target = "_blank";

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