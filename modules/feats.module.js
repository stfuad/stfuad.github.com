import * as sort from "./sorting.module.js";
import * as sheet from "../classes/sheets.classes.js";
import { Paragraphs, List } from "./htmlElements.module.js";

const feats = JSON.parse(localStorage.getItem("Feats"));

const list = document.getElementById("list");
const content = document.getElementById("sheet");

export function Feats() {
    let sorted = Object.keys(feats).sort();

    sorted.forEach(feat => {
        let header = document.createElement('h2');
        header.appendChild(document.createTextNode(feat));
        header.id = feat;

        content.appendChild(header);

        for (let key in feats[feat]) {
            if (key === "Prerequisite") {
                let i = document.createElement('i');
                i.appendChild(document.createTextNode(`Prerequisite: ${feats[feat]["Prerequisite"]}`));

                content.appendChild(i);
            } else if (key.includes("Description")) {
                Paragraphs(feats[feat]["Description"], content);
            } else if (key === "Unordered List") {
                List(feats[feat]["Unordered List"], 'ul', content);
            }
        }
        
        let footer = document.createElement('i');
        footer.appendChild(document.createTextNode(`${feats[feat]["Book"]}, Pg. ${feats[feat]["Page"]}`));

        content.appendChild(footer);
    });

    // list

    let headers = content.querySelectorAll('h2');

    for (let header of headers) {
        let link = document.createElement('a');
        link.appendChild(document.createTextNode(header.id));
        link.onclick = () => {
            let target = document.getElementById(header.id);

            target.scrollIntoView();
        };

        list.appendChild(link);
    }
}