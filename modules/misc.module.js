export function GatherInputValues(fieldset) {
    let target = document.getElementById(fieldset);
    let inputs = target.querySelectorAll("input");

    let array = [];

    for (let input of inputs) {
        if (input.value === "checked") {
            array.push(input.id);
        }
    }

    return array;
}

export function ChangeSummary(details, array) {
    let target = document.getElementById(details);
    let summary = target.querySelector("summary");

    summary.textContent = `${summary.textContent} - ${array.join(", ")}`;
}

export function AddListeners(details) {
    let target = document.getElementById(details);
    let fieldset = target.querySelector("fieldset");
    let inputs = fieldset.querySelectorAll("input");

    for (let input of inputs) {
        input.addEventListener('click', () => {

        }, false);
    }
}

export function ToObject(json, ...nodeList) {
    nodeList.forEach(nodes => {
        for (let node of nodes) {
            if (node.type === "checkbox") {
                json[node.name][node.id] = node.checked;
            } else if (node.type === "number") {
                json[node.name][node.id] = node.value;
            }
        }
    });
}

export function ToArray(json, ...nodeList) {
    nodeList.forEach(nodes => {
        for (let node of nodes) {
            json[node.title].push(node.id);
        }
    });
}

export function ObjectToSheet(json, ...nodeLists) {
    nodeLists.forEach(nodeList => {
        for (let node of nodeList) {
            node.value = json[node.name][node.id];
        }
    });
}

export function ArrayToSheet(shadowRoot, json, ...arrays) {
    arrays.forEach(array => {
        json[array].forEach(item => {
            let target = shadowRoot.querySelector(`#${array}Fieldset`);

            target.appendChild(new LinkElement(`${array}Fieldset`, item));
        });
    });
}