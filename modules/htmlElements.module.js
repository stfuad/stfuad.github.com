import {SpellModal} from "../classes/spellModal.class.js";

export function List(array, listType, parent) {
    let list = document.createElement(listType);

    array.forEach(item => {
        let li = document.createElement('li');

        if(item.includes("#")) {
            let split = item.split("#");

            let b = document.createElement('b');
            b.appendChild(document.createTextNode(`${split[0]}. `));
            li.appendChild(b);

            li.appendChild(document.createTextNode(split[1]));
        } else {
            Text(item, li);
        }

        list.appendChild(li);
    });

    parent.appendChild(list);

    return list;
}

export function Table(json, parent) {
    let table = Element('table', parent);

    // Caption

    if(json["Title"] != undefined) {
        let caption = Element('caption', table);

        Text(json["Title"], caption);
    }

    // Headers

    let row0 = Element('tr', table);

    if(json["Headers"] !== undefined) {
        json["Headers"].forEach(header => {
            let th = Element('th', row0);

            Text(header, th);
        });
    }
    
    // Rows

    if(json["Rows"] !== undefined) {
        json["Rows"].forEach(row => {
            let tr = Element('tr', table);

            for(let key in row) {
                let td = Element('td', tr);

                if(key === "Spell" || key === "Spells" || key === "Circle Spells") {
                    let spells = JSON.parse(localStorage.getItem("Spells"));

                    let length = row[key].length

                    for(var i = 0; i < length; i++) {
                        let spell = row[key][i];

                        if(i > 0) {
                            let a = Link(`, ${spell}`, undefined, td);
                            a.addEventListener('click', () => {
                                parent.appendChild(new SpellModal(spell, spells[spell]));
                            }, false);
                        } else {
                            let a = Link(spell, undefined, td);
                            a.addEventListener('click', () => {
                                parent.appendChild(new SpellModal(spell, spells[spell]));
                            }, false);
                        }
                    }
                } else {
                    Text(row[key], td);
                }
            }
        });
    }

    return table;
}

function ParaParaParagraphs(array) {
        let temp = [];

        array.forEach(line => {
            let p = document.createElement('p');

            if(line.includes('#')) {
                let split = line.split('#');

                let b = document.createElement('b');
                b.appendChild(document.createTextNode(`${split[0]}. `));
                p.appendChild(b);

                p.appendChild(document.createTextNode(split[1]));
            } else if (line.includes('=')) {
                let split = line.split('=');

                let b = document.createElement('b');
                b.appendChild(document.createTextNode(`${split[0]} `));
                p.appendChild(b);

                p.appendChild(document.createTextNode(`= ${split[1]} `));
            } else {
                p.appendChild(document.createTextNode(line));
            }

            temp.push(p);
        });

        return temp;
}

export function Paragraphs(array, parent) {
    let temp = ParaParaParagraphs(array);

    temp.forEach(element => {
        parent.appendChild(element);
    });
}

export function ParagraphsPrependBold(key, array, parent) {
    let temp = ParaParaParagraphs(array);

    let text = temp[0].textContent;

    let p = document.createElement('p');

    let b = document.createElement('b');
    b.appendChild(document.createTextNode(`${key}. `));

    p.appendChild(b);

    p.appendChild(document.createTextNode(text));

    temp.shift();

    temp.unshift(p);

    temp.forEach(element => {
        parent.appendChild(element);
    });
}

export function Text(text, parent) {
    parent.appendChild(document.createTextNode(text));
}

export function Element(element, parent) {
    let temp = document.createElement(element);
    parent.appendChild(temp);

    return temp;
}

export function Header(element, text, parent) {
    let header = document.createElement(element);
    header.appendChild(document.createTextNode(text));

    parent.appendChild(header);

    return header;
}

export function Button(text, parent) {
    let button = document.createElement('button');
    button.appendChild(document.createTextNode(text));
    button.type = 'button';

    parent.appendChild(button);

    return button;
}

export function TextElement(element, text, parent) {
    let temp = Element(element, parent);

    if (text !== undefined) {
        Text(text, temp);
    }

    return temp;
}

export function Link(text, href, parent) {
    let a = Element('a', parent);
    
    if (href !== undefined) {
        a.href = href;
    }
    
    Text(text, a);

    return a;
}