const def = x => typeof x !== 'undefined';
const tail = ([, ...x]) => x;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

// LocalStorage

Storage.prototype.set = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.get = function(key) {
    return JSON.parse(this.getItem(key));
};

// HTMLElement

function List(array, listType, parent) {
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

function Table(json, parent) {
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

function InsertElement(element, string, parent) {
    let temp = document.createElement(element);

    if(string !== undefined) {
        temp.appendChild(document.createTextNode(string));
    }

    parent.appendChild(temp);

    return temp;
}

function Div(id, style, parent) {
    let div = document.createElement('div');

    if(id !== undefined) {
        div.id = id;
    }

    if(style !== undefined) {
        div.className = style;
    }

    if(parent !== undefined) {
        parent.appendChild(div);
    }
    
    return div;
}

function CloseButton(id, parent) {
    let deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "X";
    deleteButton.className = "closeButton";
    deleteButton.onclick = function() {
        let item = document.getElementById(id);
        document.body.removeChild(item);
    };
    parent.appendChild(deleteButton);
}

function Paragraphs(array, parent) {
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

function CheckMark(bool) {
    if(bool === true) {
        return "\u2713"
    } else {
        return ""
    }
}
