import {Paragraphs, List, Table, Text, Element, TextElement} from "./htmlElements.module.js";

export function ItemSheet(name, json, parent) {
    let itemHeader = document.createElement('div');

    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(name));
    itemHeader.appendChild(h3);

    let subString = `${json["Type"]}, ${json["Rarity"]}`;

    if(json["Attunement"] !== false) {
        if(json["Add-Attunement"] !== undefined) {
            subString += ` (requires attunement ${json["Add-Attunement"]})`;
        } else {
            subString += ` (requires attunement)`;
        }
    }

    let i = document.createElement('i');
    i.appendChild(document.createTextNode(subString));
    itemHeader.appendChild(i);

    let itemContent = document.createElement('div');

    for(let key in json) {
        if(key.includes("Description")) {
            Paragraphs(json[key], itemContent);
        } else if(key.includes("Unordered List")) {
            List(json[key], "ul", itemContent);
        } else if(key.includes("Ordered List")) {
            List(json[key], "ol", itemContent);
        } else if(key.includes("Table")) {
            Table(json[key], itemContent)
        }
    }

    let itemFooter = document.createElement('div');

    let i2 = document.createElement('i');
    i2.appendChild(document.createTextNode(`${json["Book"]}, Pg. ${json["Page"]}`));
    itemFooter.appendChild(i2);
    
    parent.appendChild(itemHeader);
    parent.appendChild(itemContent);
    parent.appendChild(itemFooter);
}