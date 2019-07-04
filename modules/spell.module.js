import {Table, List, Paragraphs, Text, Element, TextElement} from "./htmlElements.module.js";

export function Spell(name, json, parent) {
    let header = Element('div', parent);
    header.id = "spellSheetHeader";

    let content = Element('div', parent);
    content.id = "spellSheetContent";

    let footer = Element('div', parent);
    footer.id = "spellSheetFooter";

    // Header
    TextElement('h3', name, header);

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

    TextElement('i', scrl, header);

    KeyValue(json, content, "Casting Time", "Range", "Components", "Duration");

    for(let key in json) {
        if(key.includes("Description")) {
            Paragraphs(json[key], content);
        } else if(key == "Higher Levels") {
            Paragraphs(json[key], content);
        } else if(key.includes("Unordered List")) {
            List(json[key], "ul", content);
        } else if(key.includes("Ordered List")) {
            List(json[key], "ol", content);
        } else if(key.includes("Table")) {
            Table(json[key], content)
        }
    }

    TextElement('i', `${json["Book"]}, Pg. ${json["Page"]}`, footer);
}

function KeyValue(json, parent, ...keys) {
    keys.forEach(key => {
        let div = Element('div', parent);

        TextElement('b', `${key} `, div);
        Text(json[key], div);
    });
}