import {Paragraphs, List, Table, Element, TextElement} from "./htmlElements.module.js";

export function ItemSheet(name, json, parent) {
    let itemHeader = Element('div', parent);

    TextElement('h3', name, itemHeader);

    let subString = `${json["Type"]}, ${json["Rarity"]}`;

    if(json["Attunement"] !== false) {
        if(json["Add-Attunement"] !== undefined) {
            subString += ` (requires attunement ${json["Add-Attunement"]})`;
        } else {
            subString += ` (requires attunement)`;
        }
    }

    TextElement('i', subString, itemHeader);

    let itemContent = Element('div', parent);

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

    let itemFooter = Element('div', parent);

    TextElement('i', `${json["Book"]}, Pg. ${json["Page"]}`, itemFooter);
}