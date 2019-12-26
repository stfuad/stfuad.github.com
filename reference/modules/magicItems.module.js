import * as sort from "./sorting.module.js";
import * as sheet from "../classes/sheets.classes.js";

const buttons = document.getElementById("sortButtons");
const list = document.getElementById("list");
const content = document.getElementById("sheet");

let items;

export function MagicItems(json) {
    items = json;

    let sortedByName = sort.ByName(items);
    let sortedByRarity = sort.ByRarity(items);

    let byName = document.createElement('button');
    byName.appendChild(document.createTextNode("by Name"));
    byName.onclick = () => Wrapper(sortedByName);

    buttons.appendChild(byName);

    let byRarity = document.createElement('button');
    byRarity.appendChild(document.createTextNode("by Rarity"));
    byRarity.onclick = () => Wrapper(sortedByRarity);

    buttons.appendChild(byRarity);

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
        
        obj[array].sort().forEach(item => {
            let a = document.createElement('a');
            a.appendChild(document.createTextNode(item));
            a.onclick = () => {
                let target = document.querySelector("item-sheet");

                if (target !== null) {
                    target.remove()
                }
                
                content.appendChild(new sheet.ItemSheet(item, items[item]));
            }

            div.appendChild(a);
        });

        list.appendChild(div);
    }
}