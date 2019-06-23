export function GetJSON(path) {
    console.log(path);

    let request = new XMLHttpRequest();
    request.onload = function() {
        console.log("Loaded");

        let parsed = JSON.parse(request.responseText);
        console.log(parsed);

        for(let key in parsed) {
            localStorage.setItem(key, JSON.stringify(parsed[key]));
        }
        
    };
    request.open('GET', path, true);
    request.send();
}
