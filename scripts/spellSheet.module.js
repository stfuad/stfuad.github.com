import {Table, List} from "./htmlElements.module.js";

export function SpellSheet(name, json, parent) {
    let spell = JSON.parse(json);

    let header = document.createElement('div');
    header.id = "header";

    let stats = document.createElement('div');
    stats.id = "stats";

    let content = document.createElement('div');
    content.id = "content";

    let footer = document.createElement('div');
    footer.id = "footer";

    // Header
    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(name));

    let subTitle = document.createElement('i');
    
    let scrl = "";

    let school = spell["School"];
    let cantrip = spell["Cantrip"];
    let ritual = spell["Ritual"];
    let level = spell["Level"];

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

    KeyValue(spell, stats, "Casting Time", "Range", "Components", "Duration");

    for(let key in spell) {
        if(key.includes("Description")) {
            Paragraphs(spell[key], content);
        } else if(key == "Higher Levels") {
            Paragraphs(spell[key], content);
        } else if(key.includes("Unordered List")) {
            List(spell[key], "ul", content);
        } else if(key.includes("Ordered List")) {
            List(spell[key], "ol", content);
        } else if(key.includes("Table")) {
            Table(spell[key], content)
        }
    }

    let i = document.createElement('i');
    i.appendChild(document.createTextNode(`${spell["Book"]}, Pg. ${spell["Page"]}`));
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
        b.appendChild(document.createTextNode(key));

        div.appendChild(b);
        div.appendChild(document.createTextNode(json[key]));

        parent.appendChild(div);
    });
}