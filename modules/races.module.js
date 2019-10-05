import { Paragraphs, ParagraphsPrependBold, List, Table } from "./htmlElements.module.js";

const races = JSON.parse(localStorage.getItem("Races"));

const list = document.getElementById("list");
const content = document.getElementById("sheet");

export function Races() {
    for (let race in races) {
        let listLink = document.createElement('a');
        listLink.appendChild(document.createTextNode(race));
        listLink.onclick = () => {
            Load(race, races[race]);
        };

        list.appendChild(listLink);
    }
}

function Load(name, race) {
    content.innerHTML = "";

    let raceHeader = document.createElement('h2');
    raceHeader.appendChild(document.createTextNode(name));

    content.appendChild(raceHeader);

    for (let key in race) {
        if (Array.isArray(race[key])) {
            if (key.includes("Description")) {
                Paragraphs(race[key], content);
            } else {
                let h3 = document.createElement('h3');
                h3.appendChild(document.createTextNode(key));

                content.appendChild(h3);

                Paragraphs(race[key], content);
            }
        } else {
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(key));

            content.appendChild(h3);

            for (let subKey in race[key]) {
                if (subKey.includes("Description")) {
                    Paragraphs(race[key][subKey], content);
                } else if (subKey.includes("List")) {
                    List(race[key][subKey], "ul", content);
                } else if (subKey.includes("Table")) {
                    Table(race[key][subKey], content);
                } else {
                    ParagraphsPrependBold(subKey, race[key][subKey], content);
                }
            }
        }
    }
}