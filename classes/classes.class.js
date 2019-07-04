// imports - classes

// imports - modules

import {Level1} from "../modules/classData.module.js";
import {Element} from "../modules/htmlElements.module.js";

class Classes extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});
        
        let style = Element('style', shadow);
        style.textContent = `
            table {
                width: 100%;
            }

            table th {
                text-align: left;
            }

            .level5 p:first-of-type {
                display: inline;
            }
        `;

        Level1(JSON.parse(localStorage.getItem("Classes")), shadow);
    }
}

customElements.define('classes-page', Classes);