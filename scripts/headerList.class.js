class HeaderList extends HTMLElement {
    constructor(json, callback) {
        super();

        let shadow = this.attachShadow({mode: 'open'});

        let style = document.createElement('style');
        style.innerHTML = `
            div {
                overflow-x: hidden;
                overflow-y: auto;
            }

            .header {
                display: block;
                font-weight: bold;
                background-color: gray;
                padding-left: 10px;
                border-top: 1px solid black;
                border-bottom: 1px solid black;
            }

            div > a {
                display: block;
                white-space: nowrap;
                overflow: hidden;
                text-indent: 1em;
                text-overflow: ellipsis;
                color: blue;
                cursor: pointer;
            }
        `;

        SortByName(json);

        shadow.appendChild(style);

        function SortByName(json) {
            // Declare empty arrays

            let a = [];
            let b = [];
            let c = [];
            let d = [];
            let e = [];
            let f = [];
            let g = [];
            let h = [];
            let i = [];
            let j = [];
            let k = [];
            let l = [];
            let m = [];
            let n = [];
            let o = [];
            let p = [];
            let q = [];
            let r = [];
            let s = [];
            let t = [];
            let u = [];
            let v = [];
            let w = [];
            let x = [];
            let y = [];
            let z = [];

            // Sort each key into array by first letter

            let keys = Object.keys(json);

            keys.forEach(key => {
                if (key.startsWith("A")) {
                    a.push(key);
                } else if (key.startsWith("B")) {
                    b.push(key);
                } else if (key.startsWith("C")) {
                    c.push(key);
                } else if (key.startsWith("D")) {
                    d.push(key);
                } else if (key.startsWith("E")) {
                    e.push(key);
                } else if (key.startsWith("F")) {
                    f.push(key);
                } else if (key.startsWith("G")) {
                    g.push(key);
                } else if (key.startsWith("H")) {
                    h.push(key);
                } else if (key.startsWith("I")) {
                    i.push(key);
                } else if (key.startsWith("J")) {
                    j.push(key);
                } else if (key.startsWith("K")) {
                    k.push(key);
                } else if (key.startsWith("L")) {
                    l.push(key);
                } else if (key.startsWith("M")) {
                    m.push(key);
                } else if (key.startsWith("N")) {
                    n.push(key);
                } else if (key.startsWith("O")) {
                    o.push(key);
                } else if (key.startsWith("P")) {
                    p.push(key);
                } else if (key.startsWith("Q")) {
                    q.push(key);
                } else if (key.startsWith("R")) {
                    r.push(key);
                } else if (key.startsWith("S")) {
                    s.push(key);
                } else if (key.startsWith("T")) {
                    t.push(key);
                } else if (key.startsWith("U")) {
                    u.push(key);
                } else if (key.startsWith("V")) {
                    v.push(key);
                } else if (key.startsWith("W")) {
                    w.push(key);
                } else if (key.startsWith("X")) {
                    x.push(key);
                } else if (key.startsWith("Y")) {
                    y.push(key);
                } else if (key.startsWith("Z")) {
                    z.push(key);
                }
            });

            // Merge arrays into a json object

            let obj = ArraysToObject(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z)

            // Create the list and append to shadow
            
            if (callback === "spell") {
                CreateSpellList(json, obj);
            } else if (callback === "creature") {
                CreateCreatureList(json, obj);
            } else if (callback === "magicItems") {
                CreateItemsList(json, obj);
            }
        }

        function ArraysToObject(a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z) {
            let merged = {};
            let keys = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

            keys.forEach(key => {
                if (key === "A") {
                    if (a.length !== 0) {
                        merged[key] = a;
                    }
                } else if (key === "B") {
                    if (b.length !== 0) {
                        merged[key] = b;
                    }
                }  else if (key === "C") {
                    if (c.length !== 0) {
                        merged[key] = c;
                    }
                    
                } else if (key === "D") {
                    if (d.length !== 0) {
                        merged[key] = d;
                    }
                } else if (key === "E") {
                    if (e.length !== 0) {
                        merged[key] = e;
                    }
                } else if (key === "F") {
                    if (f.length !== 0) {
                        merged[key] = f;
                    }
                } else if (key === "G") {
                    if (g.length !== 0) {
                        merged[key] = g;
                    }
                } else if (key === "H") {
                    if (h.length !== 0) {
                        merged[key] = h;
                    }
                } else if (key === "I") {
                    if (i.length !== 0) {
                        merged[key] = i;
                    }
                } else if (key === "J") {
                    if (j.length !== 0) {
                        merged[key] = j;
                    }
                } else if (key === "K") {
                    if (k.length !== 0) {
                        merged[key] = k;
                    }
                } else if (key === "L") {
                    if (l.length !== 0) {
                        merged[key] = l;
                    }
                } else if (key === "M") {
                    if (m.length !== 0) {
                        merged[key] = m;
                    }
                } else if (key === "N") {
                    if (n.length !== 0) {
                        merged[key] = n;
                    }
                } else if (key === "O") {
                    if (o.length !== 0) {
                        merged[key] = o;
                    }
                } else if (key === "P") {
                    if (p.length !== 0) {
                        merged[key] = p;
                    }
                } else if (key === "Q") {
                    if (q.length !== 0) {
                        merged[key] = q;
                    }
                } else if (key === "R") {
                    if (r.length !== 0) {
                        merged[key] = r;
                    }
                } else if (key === "S") {
                    if (s.length !== 0) {
                        merged[key] = s;
                    }
                } else if (key === "T") {
                    if (t.length !== 0) {
                        merged[key] = t;
                    }
                } else if (key === "U") {
                    if (u.length !== 0) {
                        merged[key] = u;
                    }
                } else if (key === "V") {
                    if (v.length !== 0) {
                        merged[key] = v;
                    }
                } else if (key === "W") {
                    if (w.length !== 0) {
                        merged[key] = w;
                    }
                } else if (key === "X") {
                    if (x.length !== 0) {
                        merged[key] = x;
                    }
                } else if (key === "Y") {
                    if (y.length !== 0) {
                        merged[key] = y;
                    }
                } else if (key === "Z") {
                    if (z.length !== 0) {
                        merged[key] = z;
                    }
                }
            });

            return merged;
        }

        function CreateItemsList(json, object) {
            for (let array in object) {
                let div = document.createElement('div');

                let span = document.createElement('span');
                span.className = "header";
                span.appendChild(document.createTextNode(array));
                
                div.appendChild(span);

                object[array].sort().forEach(item => {
                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(item));
                    a.addEventListener('click', () => {
                        let host = document.querySelector("#content");
                        let target = document.querySelector("item-sheet");

                        if (target !== null) {
                            target.remove()
                        }
                        
                        let itemSheet = new ItemSheet(item, json[item]);
                        host.appendChild(itemSheet);
                    });

                    div.appendChild(a);
                });

                shadow.appendChild(div);
            }
        }

        function CreateSpellList(json, object) {
            for (let array in object) {
                let div = document.createElement('div');

                let span = document.createElement('span');
                span.className = "header";
                span.appendChild(document.createTextNode(array));
                
                div.appendChild(span);

                object[array].sort().forEach(spell => {
                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(spell));
                    a.addEventListener('click', () => {
                        let host = document.querySelector("#content");
                        let target = document.querySelector("spell-sheet");

                        if (target !== null) {
                            target.remove()
                        }
                        
                        let spellSheet = new SpellSheet(spell, json[spell]);
                        host.appendChild(spellSheet);
                    });

                    div.appendChild(a);
                });

                shadow.appendChild(div);
            }
        }

        function CreateCreatureList(json, object) {
            for (let array in object) {
                let div = document.createElement('div');

                let span = document.createElement('span');
                span.className = "header";
                span.appendChild(document.createTextNode(array));
                
                div.appendChild(span);

                object[array].sort().forEach(creature => {

                    let a = document.createElement('a');
                    a.appendChild(document.createTextNode(creature));
                    a.addEventListener('click', () => {
                        let host = document.querySelector("#sheet");
                        let target = document.querySelector("creature-sheet");

                        if (target !== null) {
                            target.remove()
                        }
                        
                        CreateTab(creature, json[creature]);
                        CreateSheet(creature, json[creature], host);
                    });

                    div.appendChild(a);
                });

                shadow.appendChild(div);
            }
        }

        function CreateTab(name, json) {
            let contentTabs = document.querySelector("#tabs");
            
            let container = document.createElement('span');
            container.id = name;
    
            let button = document.createElement('button');
            button.textContent = name;
            button.className = "tab";
            button.onclick = () => {
                CreateSheet(name, json, sheet);
            };
    
            let close = document.createElement('button');
            close.textContent = "\u2716";
            close.className = "tab";
            close.onclick = () => {
                document.getElementById(name).remove();
    
                if (contentTabs.innerHTML == "") {
                    document.querySelector("creature-sheet").remove();
                }
            };
    
            container.appendChild(button);
            container.appendChild(close);
    
            contentTabs.appendChild(container);
        }
    
        function CreateSheet(name, json, parent) {
            let target = document.querySelector("creature-sheet");
    
            if (target !== null) {
                target.remove();
            }
            
            let creatureSheet = new CreatureSheet(name, json);
    
            parent.appendChild(creatureSheet);
        }
    }
}

customElements.define('header-list', HeaderList);