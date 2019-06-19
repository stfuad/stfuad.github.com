const def = x => typeof x !== 'undefined';
const tail = ([, ...x]) => x;

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

Storage.prototype.set = function(key, value) {
    this.setItem(key, JSON.stringify(value));
};

Storage.prototype.get = function(key) {
    return JSON.parse(this.getItem(key));
};

function KeyValue(json, parent, prependPlus, ...keys) {
    keys.forEach(key => {
        if(def(json[key])) {
            let div = CreateDiv(undefined, undefined, parent);


            InsertElement('b', `${key} `, div);

            if(prependPlus) {
                let array = [];

                for(let subKey in json[key]) {
                    array.push(`${subKey} +${json[key][subKey]}`)
                }

                div.appendChild(document.createTextNode(array.join(', ')))
            } else {
                if(Array.isArray(json[key])) {
                    div.appendChild(document.createTextNode(json[key].join(", ")));
                } else {
                    div.appendChild(document.createTextNode(json[key]));
                }
            }
        }       
    });
}

function CreateList(array, listType, parent) {
    let list = InsertElement(listType, undefined, parent);

    array.forEach(item => {
        let li = InsertElement('li', undefined, list);

        if(item.includes("#")) {
            let split = item.split("#");

            let b = document.createElement('b');
            b.appendChild(document.createTextNode(`${split[0]}. `));

            li.appendChild(b);
            li.appendChild(document.createTextNode(split[1]));
        } else {
            li.appendChild(document.createTextNode(item));
        }
    });
}

function CreateTable(json, style, parent) {
    let table = InsertElement('table', undefined, parent);

    if(style !== undefined) {
        table.className = style;
    }

    if(json["Title"] != undefined) {
        InsertElement('caption', json["Title"], table);
    }

    let row0 = InsertElement('tr', undefined, table);

    json["Headers"].forEach(header => {
        InsertElement('th', header, row0);
    });

    json["Rows"].forEach(row => {
        let rowX = InsertElement('tr', undefined, table);

        for(let key in row) {
            InsertElement('td', row[key], rowX);
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

function InsertElement(element, string, parent) {
    let temp = document.createElement(element);

    if(string !== undefined) {
        temp.appendChild(document.createTextNode(string));
    }

    parent.appendChild(temp);

    return temp;
}

function CreateDiv(id, style, parent) {
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
            InsertElement("p", line, parent);
        }
    });
}

function GetJSON(path) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let parsed = JSON.parse(request.responseText);

            for(let key in parsed) {
                localStorage.set(key, parsed[key]);
            }
        }
    };
    request.open('GET', path, true);
    request.send();
}

function StoreJSON(key, string) {
    localStorage.setItem(key, string);
}