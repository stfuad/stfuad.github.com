// imports - classes

import {Classes} from "./classes.class.js";
import {Spells} from "./spells.class.js";
import {Bestiary} from "./creatures.class.js";
import {Items} from "./items.class.js";

// imports - modules

import {SortByName} from "../modules/sorting.module.js";
import {Level1} from "../modules/classData.module.js";
import {Element, Link} from "../modules/htmlElements.module.js";

// classes

export class NavLinks extends HTMLElement {
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
        
        let classes = Link("Classes", undefined, shadow);
        classes.addEventListener('click', () => {
            Check(Classes);
        }, false);

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

            let temp = new newElement();
            content.appendChild(temp);
        }
    }
}

// functions

function CreateList(json, callback, element, parent) {
    for (let array in json) {
        let div = document.createElement('div');

        let span = document.createElement('span');
        span.className = "header";
        span.appendChild(document.createTextNode(array));
        
        div.appendChild(span);

        json[array].sort().forEach(item => {

            let a = document.createElement('a');
            a.appendChild(document.createTextNode(item));
            a.addEventListener('click', () => {
                let host = document.querySelector("#subContent");
                let target = host.querySelector(element);

                if (target !== null) {
                    target.remove()
                }
                
                let sheet = new callback(item);
                host.appendChild(sheet);
            });

            div.appendChild(a);
        });

        parent.appendChild(div);
    }
}