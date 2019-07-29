// modules

import {Paragraphs, ParagraphsPrependBold, Table, Element, Header, Link} from "../modules/htmlElements.module.js";

export class Races extends HTMLElement {
    constructor() {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = Element('style', shadow);
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

            #subContent h2 {
                margin-bottom: 0px;
                border-bottom: 1px solid black;
            }

            b + p {
                display: inline;
            }

            table {
                width: 100%;
            }

            .level2 {
                background-color: #d6eaf8 ;
            }

            .level3 {
                background-color: #85c1e9;
            }

            .level4 {
                background-color: #3498db;
            }

            .level5 {
                background-color: #2874a6;
            }
        `;

        let container = Element('div', shadow);
        container.className = "grid";

        let list = Element('div', container);
        list.id = "list";

        let subContent = Element('div', container);
        subContent.id = "subContent";

        let races = JSON.parse(localStorage.getItem('Races'));

        let racesSorted = Object.keys(races).sort();

        racesSorted.forEach(race => {
            let raceContainer = Element('div', subContent);
            raceContainer.id = race;

            Header('h1', race, raceContainer);

            Header('h3', race, list);

            for (let category in races[race]) {

                let categoryContainer = Element('div', raceContainer);
                categoryContainer.id = category;
                //categoryContainer.className = "level2";

                Header('h2', category, categoryContainer);

                if (category.includes("Traits")) {
                    let cfLink = Link(category, undefined, list);
                    cfLink.addEventListener('click', () => {
                        level2.scrollIntoView();
                    }, false);
                } else {
                    Header('h4', category, list);
                }

                if (category.includes("Traits")) {
                    let json;

                    for (let trait in races[race][category]) {
                        json = races[race][category][trait];

                        if (trait.includes("Table")) {
                            Table(json, categoryContainer);
                        } else {
                            ParagraphsPrependBold(trait, json, categoryContainer);
                        }
                    }
                }

                // due to the way the json is structured you need to perform a recursive like function. If the key is for an array check using Array.isArray() otherwise go one level deeper using for ... in ...

                if (category === "Sub Races") {
                    let subRacesSorted = Object.keys(races[race][category]).filter(word => word !== "Description").sort();

                    if (races[race][category]["Description"] !== undefined) {
                        Paragraphs(races[race][category]["Description"], categoryContainer);
                    }

                    subRacesSorted.forEach(subRace => {
                        let h3 = Header('h3', subRace, categoryContainer);
                        h3.id = `${race}-${subRace}`;
                        
                        let srLink = Link(subRace, undefined, list);
                        srLink.addEventListener('click', () => {
                            let target = shadow.getElementById(h3.id);

                            target.scrollIntoView();
                        }, false);

                        for (let trait in races[race][category][subRace]) {
                            if (Array.isArray(races[race][category][subRace][trait])) {
                                if (trait === "Description") {
                                    Paragraphs(races[race][category][subRace][trait], categoryContainer);
                                } else {
                                    ParagraphsPrependBold(trait, races[race][category][subRace][trait], categoryContainer);
                                }
                            } else {
                                for (let subTrait in races[race][category][subRace][trait]) {
                                    if (subTrait === "Description") {
                                        ParagraphsPrependBold(trait, races[race][category][subRace][trait][subTrait], categoryContainer);
                                    } else {
                                        ParagraphsPrependBold(subTrait, races[race][category][subRace][trait][subTrait], categoryContainer);
                                    }
                                }
                            }
                        }
                    });
                }
            }
        });
    }
}

customElements.define('races-page', Races);