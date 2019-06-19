function CreateItemsTable(json) {
    let t = document.querySelector("#itemRow");

    let tb = document.querySelector("tbody");

    for(let item in json) {

        let itemJSON = JSON.stringify(json[item]);

        let link = document.createElement("a");
        link.appendChild(document.createTextNode(item));
        link.href = `javascript:CreateItemSheet("${item}", ${itemJSON})`;

        let clone = document.importNode(t.content, true);
        td = clone.querySelectorAll("td");
        td[0].appendChild(link);
        td[1].textContent = json[item]["Type"];
        td[2].textContent = json[item]["Rarity"];
        td[3].textContent = CheckMark(json[item]["Attunement"]);

        tb.appendChild(clone);
    }

    $("#itemList").tablesorter({
        theme: 'jui',
        headerTemplate : '{content} {icon}',
        widgets: ['uitheme', 'zebra'],
        widgetOptions: {
            zebra: ['even', 'odd']
        }
    });
}

function CreateItemSheet(name, json) {
    /* let base = CreateDiv(name, "itemSheet", undefined); */
    let hum = document.querySelector("#itemDesc");
    hum.innerHTML = "";

    if(hum.style.display === "none"); {
        hum.style.display = "block";
    }

    let header = CreateDiv("header", undefined, hum);

    InsertElement('h3', name, header);

    let subString = `${json["Type"]}, ${json["Rarity"]}`;

    if(json["Attunement"] !== false) {
        if(json["Add-Attunement"] !== undefined) {
            subString += ` (requires attunement ${json["Add-Attunement"]})`;
        } else {
            subString += ` (requires attunement)`;
        }
    }

    InsertElement('i', subString, header);

    let deleteButton = document.createElement('input');
    deleteButton.type = "button";
    deleteButton.value = "X";
    deleteButton.className = "closeButton";
    deleteButton.onclick = function() {
        hum.style.display = "none";
    };
    header.appendChild(deleteButton);

    let content = CreateDiv("content", undefined, hum);

    for(let key in json) {
        if(key.includes("Description")) {
            Paragraphs(json[key], content);
        } else if(key.includes("Unordered List")) {
            CreateList(json[key], "ul", content);
        } else if(key.includes("Ordered List")) {
            CreateList(json[key], "ol", content);
        } else if(key.includes("Table")) {
            CreateTable(json[key], undefined, content)
        }
    }

    let footer = CreateDiv("footer", undefined, hum);

    InsertElement('i', `${json["Book"]}, Pg. ${json["Page"]}`, footer);

    /* if(document.getElementById(name) == null) {
        document.body.appendChild(base);
    } */
}