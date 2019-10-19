import { Paragraphs, ParagraphsPrependBold, Table, List } from "../modules/htmlElements.module.js";

const json = JSON.parse(localStorage.getItem("Classes"));

const classList = document.getElementById("classList");
const subList = document.getElementById("subList");
const content = document.getElementById("content");

export function Classes() {
    //Select a class

    for (let name in json) {
        let link = document.createElement('a');
        link.appendChild(document.createTextNode(name));
        link.onclick = () => {
            content.innerHTML = "";
            subList.innerHTML = "";

            Load(name);

            classList.style.zIndex = 1;
            subList.style.zIndex = 10;
        };

        classList.appendChild(link);
    }
}

function Load(name) {
    // Sub List

    let back = document.createElement('a');
    back.appendChild(document.createTextNode("Back"));
    back.onclick = () => {
        classList.style.zIndex = 10;
        subList.style.zIndex = 1;
    }

    subList.appendChild(back);

    subList.appendChild(document.createElement('hr'));

    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(`The ${name}`));

    subList.appendChild(h2);

    for (let key in json[name]) {
        if (key === "Table") {
            let a = document.createElement('a');
            a.appendChild(document.createTextNode("Class Table"));
            a.onclick = () => {
                content.innerHTML = "";

                Table(json[name][key], content);
            }

            subList.appendChild(a);
        } else if (key === "Class Features") {
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(key));

            subList.appendChild(h3);

            for (let feature in json[name][key]) {
                if (feature !== "Ability Score Improvement") {
                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(feature));
                    a.onclick = () => {
                        content.innerHTML = "";
        
                        Content(feature, json[name][key][feature]);
                    }

                    subList.appendChild(a);
                }
            }
        } else if (key === "Eldritch Invocations") {
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(key));

            subList.appendChild(h3);

            for (let invocation in json[name][key]) {
                let a = document.createElement('a');
                a.appendChild(document.createTextNode(invocation));
                a.onclick = () => {
                    content.innerHTML = "";
    
                    Invocation(invocation, json[name][key][invocation]);
                }

                subList.appendChild(a);
            }
        } else if (key !== "Books") {
            let h3 = document.createElement('h3');
            h3.appendChild(document.createTextNode(key));

            subList.appendChild(h3);

            for (let sub in json[name][key]) {
                let a = document.createElement('a');
                a.appendChild(document.createTextNode(sub));
                a.onclick = () => {
                    content.innerHTML = "";
    
                    Content(sub, json[name][key][sub]);
                }

                subList.appendChild(a);
            }
        }
    }
}

function Content(name, json) {
    let h2 = document.createElement('h2');
    h2.appendChild(document.createTextNode(name));

    content.appendChild(h2);

    if (Array.isArray(json)) {
        Paragraphs(json, content);
    } else {
        for (let key in json) {
            if ((!key.includes("Description")) && (key !== "Unordered List") && (key !== "Ordered List") && (!key.includes("Table"))) {
                let h3 = document.createElement('h3');
                h3.appendChild(document.createTextNode(key));
            
                content.appendChild(h3);
            }
            
            if (Array.isArray(json[key])) {
                if ((key === "Unordered List") || (key === "Ordered List")) {
                    if (key === "Unordered List") {
                        List(json[key], "ul", content);
                    } else {
                        List(json[key], "ol", content);
                    }
                } else {
                    Paragraphs(json[key], content);
                }
            } else {
                if (key.includes("Table")) {
                    Table(json[key], content);
                } else {
                    for (let subKey in json[key]) {
                        if (Array.isArray(json[key][subKey])) {
                            if (subKey === "Unordered List") {
                                List(json[key][subKey], "ul", content);
                            } else if (!subKey.includes("Description")) {
                                ParagraphsPrependBold(subKey, json[key][subKey], content);
                            } else {
                                Paragraphs(json[key][subKey], content);
                            }
                        }
                    }
                }
            }
            
        }
    }
}

function Invocation(name, json) {
    let h3 = document.createElement('h3');
    h3.appendChild(document.createTextNode(name));

    content.appendChild(h3);

    if(json["Prerequisite"]) {
        let i = document.createElement('i');
        i.appendChild(document.createTextNode(`Prerequisite: ${json["Prerequisite"]}`));

        content.appendChild(i);
    }

    Paragraphs(json["Description"], content);
}