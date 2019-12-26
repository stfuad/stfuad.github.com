import * as sort from "./sorting.module.js";
import * as sheet from "../classes/sheets.classes.js";

let spells;

export function Spells(json) {
    spells = json;
    
    let buttons = document.getElementById("sortButtons");

    let sortedByName = sort.ByName(spells);
    let sortedBySchool = sort.BySchool(spells);
    let sortedByClass = sort.ByClass(spells);
    let sortedByLevel = sort.ByLevel(spells);

    let byName = document.createElement('button');
    byName.appendChild(document.createTextNode("by Name"));
    byName.onclick = () => {
        Wrapper(CreateList, sortedByName);
    };

    buttons.appendChild(byName);

    let bySchool = document.createElement('button');
    bySchool.appendChild(document.createTextNode("by School"));
    bySchool.onclick = () => {
        Wrapper(CreateList, sortedBySchool);
    };

    buttons.appendChild(bySchool);

    let byClass = document.createElement('button');
    byClass.appendChild(document.createTextNode("by Class"));
    byClass.onclick = () => {
        Wrapper(CreateClassList, sortedByClass);
    };

    buttons.appendChild(byClass);

    let byLevel = document.createElement('button');
    byLevel.appendChild(document.createTextNode("by Level"));
    byLevel.onclick = () => {
        Wrapper(CreateList, sortedByLevel);
    };

    buttons.appendChild(byLevel);

    CreateList(sortedByName);
}

function Wrapper(callback, obj) {
    let list = document.getElementById("list");

    if (list.childElementCount > 0) {
        while (list.firstChild) {
            list.firstChild.remove();
        }
    }

    callback(obj);
}

function CreateList(obj) {
    let list = document.getElementById("list");
    let content = document.getElementById("sheet");

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
                let target = document.querySelector("spell-sheet");

                if (target !== null) {
                    target.remove()
                }
                
                content.appendChild(new sheet.SpellSheet(item, spells[item]));
            };

            div.appendChild(a);
        });

        list.appendChild(div);
    }
}

function CreateClassList(obj) {
    let list = document.getElementById("list");
    let content = document.getElementById("sheet");

    for (let var1 in obj) {
        let h2 = document.createElement('h2');
        h2.appendChild(document.createTextNode(var1));

        list.appendChild(h2);
        
        for (let var2 in obj[var1]) {
            let div = document.createElement('div');

            if (obj[var1][var2].length > 0) {
                let span = document.createElement('span');
                span.appendChild(document.createTextNode(var2));

                div.appendChild(span);
            }
            
            obj[var1][var2].sort().forEach(item => {
                let a = document.createElement('a');
                a.appendChild(document.createTextNode(item));
                a.onclick = () => {
                    let target = document.querySelector("spell-sheet");
    
                    if (target !== null) {
                        target.remove()
                    }
                    
                    content.appendChild(new sheet.SpellSheet(item, spells[item]));
                };

                div.appendChild(a);
            });

            list.appendChild(div);
        }
    }
}