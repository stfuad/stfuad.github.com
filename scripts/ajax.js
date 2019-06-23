export function GetJSON(path) {
    let request = new XMLHttpRequest();
    request.onload = function() {
        
            let parsed = JSON.parse(request.responseText);
            console.log(parsed);
            for(let key in parsed) {
                localStorage.setItem(key, JSON.stringify(parsed[key]));
            }
        
    };
    request.open('GET', path, true);
    request.send();
}
