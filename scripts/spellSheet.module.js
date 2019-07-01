import {Table, List, Paragraphs} from "./htmlElements.module.js";

export function SpellSheet(name, json, parent) {
    let header = document.createElement('div');
    header.id = "spellSheetHeader";

    let stats = document.createElement('div');
    stats.id = "spellSheetStats";

    let content = document.createElement('div');
    content.id = "spellSheetContent";

    let footer = document.createElement('div');
    footer.id = "spellSheetFooter";

    // Header
    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(name));

    let subTitle = document.createElement('i');
    
    let scrl = "";

    let school = json["School"];
    let cantrip = json["Cantrip"];
    let ritual = json["Ritual"];
    let level = json["Level"];

    if(level === 0) {
        level = "";
    } else if(level === 1) {
        level = "1st-level";
    } else if(level === 2) {
        level = "2nd-level";
    } else if(level === 3) {
        level = "3rd-level";
    } else if(level >= 4) {
        level = `${level}th-level`;
    }

    scrl = `${level} ${school}`;

    if(cantrip == true) {
        scrl += " cantrip";
    }

    if(ritual == true) {
        scrl += " (ritual)";
    }

    subTitle.appendChild(document.createTextNode(scrl));

    header.appendChild(h3);
    header.appendChild(subTitle);

    KeyValue(json, stats, "Casting Time", "Range", "Components", "Duration");

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

    let i = document.createElement('i');
    i.appendChild(document.createTextNode(`${json["Book"]}, Pg. ${json["Page"]}`));
    footer.appendChild(i);

    parent.appendChild(header);
    parent.appendChild(stats);
    parent.appendChild(content);
    parent.appendChild(footer);
}

function KeyValue(json, parent, ...keys) {
    keys.forEach(key => {
        let div = document.createElement('div');

        let b = document.createElement('b');
        b.appendChild(document.createTextNode(`${key} `));

        div.appendChild(b);
        div.appendChild(document.createTextNode(json[key]));

        parent.appendChild(div);
    });
}