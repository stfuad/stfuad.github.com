import * as sort from "./sorting.module.js";
import * as sheet from "../classes/sheets.classes.js";

let one = JSON.parse(localStorage.getItem("Bestiary 1"));
let two = JSON.parse(localStorage.getItem("Bestiary 2"));
let three = JSON.parse(localStorage.getItem("Bestiary 3"));
let four = JSON.parse(localStorage.getItem("Bestiary 4"));
let five = JSON.parse(localStorage.getItem("Bestiary 5"));
let six = JSON.parse(localStorage.getItem("Bestiary 6"));
let seven = JSON.parse(localStorage.getItem("Bestiary 7"));
let eight = JSON.parse(localStorage.getItem("Bestiary 8"));
let nine = JSON.parse(localStorage.getItem("Bestiary 9"));

const bestiary = {...one, ...two, ...three, ...four, ...five, ...six, ...seven, ...eight, ...nine};

const buttons = document.getElementById("sortButtons");
const list = document.getElementById("list");
const content = document.getElementById("sheet");


export function Bestiary() {

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