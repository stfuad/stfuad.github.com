function CreateSpellsTable(json) {
    let t = document.querySelector("#spellRow");

    let tb = document.querySelector("tbody");

    for(let spell in json) {

        let spellJSON = JSON.stringify(json[spell]);

        let link = document.createElement("a");
        link.appendChild(document.createTextNode(spell));
        link.href = `javascript:CreateSpellSheet("${spell}", ${spellJSON})`;

        let clone = document.importNode(t.content, true);
        td = clone.querySelectorAll("td");
        td[0].appendChild(link);
        td[1].textContent = json[spell]["School"];
        td[2].textContent = CheckMark(json[spell]["Cantrip"]);
        td[3].textContent = CheckMark(json[spell]["Ritual"]);
        td[4].textContent = json[spell]["Level"];
        td[5].textContent = json[spell]["Casting Time"];
        /* td[6].textContent = CheckMark(json[spell]["Classes"]["Bard"]);
        td[7].textContent = CheckMark(json[spell]["Classes"]["Cleric"]);
        td[8].textContent = CheckMark(json[spell]["Classes"]["Druid"]);
        td[9].textContent = CheckMark(json[spell]["Classes"]["Paladin"]);
        td[10].textContent = CheckMark(json[spell]["Classes"]["Ranger"]);
        td[11].textContent = CheckMark(json[spell]["Classes"]["Sorcerer"]);
        td[12].textContent = CheckMark(json[spell]["Classes"]["Warlock"]);
        td[13].textContent = CheckMark(json[spell]["Classes"]["Wizard"]); */

        tb.appendChild(clone);
    }

    $("#spellList").tablesorter({
        theme: 'jui',
        headerTemplate : '{content} {icon}',
        widgets: ['uitheme', 'zebra'],
        widgetOptions: {
            zebra: ['even', 'odd']
        }
    });
}

function CreateSpellSheet(name, json) {

    let sheet = Div(name, "spellSheet", undefined);
    
    let header = Div("header", undefined, sheet);
    let stats = Div("stats", undefined, sheet);
    let content = Div("content", undefined, sheet);
    let footer = Div("footer", undefined, sheet);

    // Header
    InsertElement("h3", name, header);

    // School, cantrip, ritual, level
    let subTitle = document.createElement('i');
    header.appendChild(subTitle);

    let scrl = "";

    let school = json["School"];
    let cantrip = json["Cantrip"];
    let ritual = json["Ritual"];
    let level = json["Level"];

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

    KeyValue(json, stats, false, "Casting Time", "Range", "Components", "Duration");

    for(let key in json) {
        if(key.includes("Description")) {
            Paragraphs(json[key], content);
        } else if(key == "Higher Levels") {
            Paragraphs(json[key], content);
        } else if(key.includes("Unordered List")) {
            List(json[key], "ul", content);
        } else if(key.includes("Ordered List")) {
            List(json[key], "ol", content);
        } else if(key.includes("Table")) {
            Table(json[key], content)
        }
    }

    InsertElement("i", json["Book"], footer);
    
    CloseButton(name, header)

    if(document.getElementById(name) == null) {
        document.body.appendChild(sheet);

        $( function() {
            $( ".spellSheet" ).draggable({
                scroll: false
            });
        } );

        $('.spellSheet').click(function() {
            // set ohters element to the initial level
            $(this).siblings('.spellSheet').css('z-index', 10);
            // set clicked element to a higher level
            $(this).css('z-index', 11);
        });
    }
}