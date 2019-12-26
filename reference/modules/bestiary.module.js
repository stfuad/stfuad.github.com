import * as sort from "./sorting.module.js";
import * as sheet from "../classes/sheets.classes.js";

const buttons = document.getElementById("sortButtons");
const list = document.getElementById("list");
const content = document.getElementById("sheet");

let bestiary;

export function Bestiary(json) {
    bestiary = json;

    let sortedByName = sort.ByName(bestiary);
    let sortedByType = sort.ByType(bestiary);
    let sortedByCR = sort.ByCR(bestiary);
    let sortedByBook = sort.ByBook(bestiary);

    // buttons

    let byName = document.createElement('button');
    byName.appendChild(document.createTextNode("by Name"));
    byName.onclick = () => Wrapper(sortedByName);

    buttons.appendChild(byName);

    let byType = document.createElement('button');
    byType.appendChild(document.createTextNode("by Type"));
    byType.onclick = () => Wrapper(sortedByType);

    buttons.appendChild(byType);

    let byCR = document.createElement('button');
    byCR.appendChild(document.createTextNode("by CR"));
    byCR.onclick = () => Wrapper(sortedByCR);

    buttons.appendChild(byCR);

    let byBook = document.createElement('button');
    byBook.appendChild(document.createTextNode("by Book"));
    byBook.onclick = () => Wrapper(sortedByBook);

    buttons.appendChild(byBook);

    CreateList(sortedByName);
}

function Wrapper(obj) {
    if (list.childElementCount > 0) {
        while (list.firstChild) {
            list.firstChild.remove();
        }
    }

    CreateList(obj);
}

function CreateList(obj) {
    for (let array in obj) {
        let div = document.createElement('div');

        if (obj[array].length > 0) {
            let span = document.createElement('span');
            span.appendChild(document.createTextNode(array));

            div.appendChild(span);
        }
        
        let sorted = obj[array].sort();

        sorted.forEach(item => {
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(item));
            a.onclick = () => {
                let target = document.querySelector("creature-sheet");

                if (target !== null) {
                    target.remove()
                }
                
                content.appendChild(new sheet.CreatureSheet(item, bestiary[item]));
            };

            div.appendChild(a);
        });

        list.appendChild(div);
    }
}