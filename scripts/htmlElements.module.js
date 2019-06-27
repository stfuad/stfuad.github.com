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
            li.appendChild(document.createTextNode(item));
        }

        list.appendChild(li);
    });

    parent.appendChild(list);

    return list;
}

export function Table(json, parent) {
    let table = document.createElement("table");

    // Caption

    if(json["Title"] != undefined) {
        let caption = document.createElement('caption');
        caption.appendChild(document.createTextNode(json["Title"]));
        parent.appendChild(caption);
    }

    // Headers

    let row0 = InsertElement('tr', undefined, table);

    if(json["Headers"] !== undefined) {
        json["Headers"].forEach(header => {
            let th = document.createElement('th');
            th.appendChild(document.createTextNode(header));
            table.appendChild(th);
        });
    }

    table.appendChild(row0);

    // Rows

    if(json["Rows"] !== undefined) {

        // Top Level
        
        json["Rows"].forEach(row => {
            let rowX = document.createElement('tr');

            for(let key in row) {
                let temp = document.createElement('td');

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
                temp.appendChild(document.createTextNode(row[key]));
                rowX.appendChild(temp);
            }

            table.appendChild(rowX);
        });
    }
    
    parent.appendChild(table);

    return table;
}

export function Paragraphs(array, parent) {
    array.forEach(line => {
        if(line.includes('#')) {
            let split = line.split('#');

            let p = document.createElement('p');
            let b = document.createElement('b');

            b.appendChild(document.createTextNode(`${split[0]}. `));
            p.appendChild(b);
            p.appendChild(document.createTextNode(split[1]))

            parent.appendChild(p);
        } else {
            let p = document.createElement('p');
            p.appendChild(document.createTextNode(line));
            parent.appendChild(p);
        }
    });
}