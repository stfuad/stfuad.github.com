import {Paragraphs, List, Table} from "./htmlElements.module.js";

export function Level1(json, parent) {
    for(let key in json) {
        // console.log(`Level 1 - ${key}`);
        let div = document.createElement('div');
        div.id = key;

        let h1 = document.createElement('h1');
        h1.appendChild(document.createTextNode(key));
        h1.id = key;
        div.appendChild(h1);

        NavigationHeader("h3", key);

        Level2(json[key], div, h1.id);

        parent.appendChild(div);
    }
}

function Level2(json, parent, linkTarget) {
    for (let key in json) {
        let div = document.createElement('div');
        div.id = key;
        // div.className = "level2";

        // console.log(`Level 2 - ${key}`);

        if(!key.includes("Table")) {
            let h2 = document.createElement('h2');
            h2.appendChild(document.createTextNode(key));
            h2.id = `${linkTarget} ${key}`;
            div.appendChild(h2);

            NavigationHeader("h4", key);
        }

        if (key.includes("Table")) {
            Table(json[key], div);
        } else if (key === "Eldritch Invocations") {
            EldritchInvocations(json[key], div);
        } else {
            Level3(json[key], div, linkTarget);
        }

        parent.appendChild(div);
    }
}

function Level3(json, parent, linkTarget) {
    for (let key in json) {
        let div = document.createElement('div');
        div.id = key;
        // div.className = "level3";

        // console.log(`Level 3 - ${key}`);

        let h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(key));
        h3.id = `${linkTarget} ${key}`;
        div.appendChild(h3);

        if (key !== "Description") {
            NavigationLink(h3.id, `- ${key}`)
        }
        
        if (Array.isArray(json[key])) {
            Paragraphs(json[key], div);
        } else {
            Level4(json[key], div);
        }

        parent.appendChild(div);
    }
}

function Level4(json, parent) {
    for (let key in json) {
        let div = document.createElement('div');
        div.id = key;
        // div.className = "level3";

        // console.log(`Level 4 - ${key}`);

        if(!key.includes("Table") && !key.includes("Description") && !key.includes("Calc") && !key.includes("Unordered List")) {
            let h4 = document.createElement('h4');
            h4.appendChild(document.createTextNode(key));
            div.appendChild(h4);
        }

        if(key.includes("Table")) {
            Table(json[key], div);
        } else if (key.includes("Unordered List")) {
            List(json[key], 'ul', div)
        } else if (Array.isArray(json[key])) {
            Paragraphs(json[key], div);
        } else {
            Level5(json[key], div);
        }

        parent.appendChild(div);
    }
}

function Level5(json, parent) {
    for(let key in json) {
        let div = document.createElement('div');
        div.id = key;
        div.className = "level5";

        console.log(`Level 5 - ${key}`);

        if(!key.includes("Calc") && !key.includes("Table") && !key.includes("Description") && !key.includes("Unordered List")) {
            /* let h5 = document.createElement('h5');
            h5.appendChild(document.createTextNode(key));
            parent.appendChild(h5); */

            let b = document.createElement('b');
            b.appendChild(document.createTextNode(`${key}. `));
            div.appendChild(b);
        }

        if(key.includes("Table")) {
            Table(json[key], div);
        } else if (key.includes("Unordered List")) {
            List(json[key], 'ul', div);
        } else if (Array.isArray(json[key])){
            Paragraphs(json[key], div);
        } else {
            Level6(json[key], div);
        }

        parent.appendChild(div);
    }
}

function Level6(json, parent) {
    for(let key in json) {
        let div = document.createElement('div');
        div.id = key;
        // div.className = "level6";
        
        console.log(`Level 6 - ${key}`);
        
        if(key.includes("Table")) {
            Table(json[key], div);
        } else {
            Paragraphs(json[key], div);
        }

        parent.appendChild(div);
    }
}

function EldritchInvocations(json, parent) {
    for(let invocation in json) {
        let div = document.createElement('div');
        div.id = invocation;
        div.className = "invocation";

        let h3 = document.createElement('h3');
        h3.appendChild(document.createTextNode(invocation));
        div.appendChild(h3);

        if(json[invocation]["Prerequisite"] !== undefined) {
            let i = document.createElement('i');
            i.appendChild(document.createTextNode(`Prerequisite: ${json[invocation]["Prerequisite"]}`));
            div.appendChild(i);
        }

        Paragraphs(json[invocation]["Description"], div);
        
        parent.appendChild(div);
    }
}

function NavigationHeader(header, text) {
    let target = document.querySelector("#pageNav");

    let hX = document.createElement(header);
    hX.appendChild(document.createTextNode(text));

    target.appendChild(hX);
}

function NavigationLink(href, text) {
    let target = document.querySelector("#pageNav");

    let a = document.createElement('a');
    a.appendChild(document.createTextNode(text));
    a.href = `#${href}`;

    target.appendChild(a);
}