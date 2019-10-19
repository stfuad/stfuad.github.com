import {Table, List, Paragraphs, Element, BoldKeyValue} from "./htmlElements.module.js";

export function Spell(name, json, parent) {
    /* Header */
    
    let title = document.createElement('h3');
    title.appendChild(document.createTextNode(name));

    parent.appendChild(title);

    /* Sub-Header */

    let scrl = "";

    let school = json["School"];
    let cantrip = json["Cantrip"];
    let ritual = json["Ritual"];
    let level = json["Level"];

    if(level === 0) {
        scrl = "";
    } else if(level === 1) {
        scrl = "1st-level";
    } else if(level === 2) {
        scrl = "2nd-level";
    } else if(level === 3) {
        scrl = "3rd-level";
    } else if(level >= 4) {
        scrl = `${level}th-level`;
    }

    scrl += ` ${school}`;

    if(cantrip == true) {
        scrl += " cantrip";
    }

    if(ritual == true) {
        scrl += " (ritual)";
    }

    let subHeader = document.createElement('i');
    subHeader.appendChild(document.createTextNode(scrl));

    parent.appendChild(subHeader);
    
    /* Properties */

    KeyValue(json, parent, "Casting Time", "Range", "Components", "Duration");

    for(let key in json) {
        if(key.includes("Description")) {
            Paragraphs(json[key], parent);
        } else if(key == "Higher Levels") {
            Paragraphs(json[key], parent);
        } else if(key.includes("Unordered List")) {
            List(json[key], "ul", parent);
        } else if(key.includes("Ordered List")) {
            List(json[key], "ol", parent);
        } else if(key.includes("Table")) {
            Table(json[key], parent)
        }
    }

    /* Footer */

    let footer = document.createElement('i');
    footer.appendChild(document.createTextNode(`${json["Book"]}, Pg. ${json["Page"]}`));
    
    parent.appendChild(footer);
}

function KeyValue(json, parent, ...keys) {
    keys.forEach(key => {
        let div = Element('div', parent);

        BoldKeyValue(key, json[key], div);
    });
}