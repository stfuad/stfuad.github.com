export function List(array, listType, parent) {
    let list = Element(listType, parent);

    array.forEach(item => {
        let li = Element('li', list);

        if(item.includes("#")) {
            let split = item.split("#");

            TextElement('b', `${split[0]}. `, li);
            
            Text(split[1], li);
        } else {
            Text(item, li);
        }
    });

    return list;
}

export function Table(json, parent) {
    let table = Element('table', parent);

    // Caption

    if(json["Title"] != undefined) {
        TextElement('caption', json["Title"], table);
    }

    // Headers

    let row0 = Element('tr', table);

    if(json["Headers"] !== undefined) {
        json["Headers"].forEach(header => {
            TextElement('th', header, row0);
        });
    }
    
    // Rows

    if(json["Rows"] !== undefined) {
        json["Rows"].forEach(row => {
            let tr = Element('tr', table);

            for(let key in row) {
                TextElement('td', row[key], tr);

                /* if(key == "Spells") {
                    let spells = JSON.parse(localStorage.getItem("Spells"));

                    let length = row[key].length

                    for(var i = 0; i < length; i++) {
                        let spell = row[key][i];

                        let spellJSON = JSON.stringify(spells[spell]);

                        let a = document.createElement('a');

                        a.href = `javascript:CreateSpellSheet("${spell}", ${spellJSON})`;

                        if(i > 0) {
                            a.appendChild(document.createTextNode(`, ${spell}`));
                        } else {
                            a.appendChild(document.createTextNode(spell));
                        }

                        temp.appendChild(a);
                    }
                } else {
                    temp.appendChild(document.createTextNode(row[key]));
                } */
            }
        });
    }

    return table;
}

export function Paragraphs(array, parent) {
    if (array !== undefined) {
        array.forEach(line => {
            let p = TextElement('p', undefined, parent);

            if(line.includes('#')) {
                let split = line.split('#');

                TextElement('b', `${split[0]}. `, p);

                Text(split[1], p);
            } else {
                Text(line, p);
            }
        });
    }
}

export function Text(text, parent) {
    parent.appendChild(document.createTextNode(text));
}

export function Element(element, parent) {
    let temp = document.createElement(element);
    parent.appendChild(temp);

    return temp;
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