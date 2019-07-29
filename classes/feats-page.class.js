// modules

import {Paragraphs, List, Table, Element, Header, Link} from "../modules/htmlElements.module.js";

export class Feats extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.textContent = `
            .grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: calc(100vh - 20px);
                grid-gap: 10px;
            }

            #list {
                grid-column: 1;
                overflow: auto;
            }

            #list > a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-indent: 1em;
                text-overflow: ellipsis;
                color: blue;
                cursor: pointer;
            }

            #subContent {
                grid-column: 2/3;
                overflow: auto;
            }

            #subContent div {
                margin-top: 10px;
                margin-bottom: 10px;
            }

            b + p {
                display: inline;
            }

            table {
                width: 100%;
            }
        `;

        shadow.appendChild(style);

        let container = document.createElement('div');
        container.className = "grid";

        let list = document.createElement('div');
        list.id = "list";

        container.appendChild(list);

        let subContent = document.createElement('div');
        subContent.id = "subContent";

        container.appendChild(subContent);
        
        shadow.appendChild(container);

        let feats = JSON.parse(localStorage.getItem("Feats"));

        let sorted = Object.keys(feats).sort();

        for (let feat in feats) {
            let header = Header('h2', feat, subContent);
            header.id = feat;

            if (feats[feat]["Prerequisite"] !== undefined) {
                let i = Element('i', subContent);
                i.appendChild(document.createTextNode(`Prerequisite: ${feats[feat]["Prerequisite"]}`));
            }

            Paragraphs(feats[feat]["Description"], subContent);

            if (feats[feat]["Unordered List"] !== undefined) {
                List(feats[feat]["Unordered List"], 'ul', subContent);
            }

            let a = Link(feat, undefined, list);
            a.addEventListener('click', () => {
                let target = shadow.getElementById(feat);

                target.scrollIntoView();
            }, false);

            let footer = Element('i', subContent);
            footer.appendChild(document.createTextNode(`${feats[feat]["Book"]}, Pg. ${feats[feat]["Page"]}`));
        }
    }
}

customElements.define('feats-page', Feats);