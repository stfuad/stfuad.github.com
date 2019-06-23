export default function GetJSON(...paths) {
    let request = new XMLHttpRequest();
    request.onload = function() {
        paths.forEach(file => {
            let parsed = JSON.parse(request.responseText);

            for(let key in parsed) {
                localStorage.setItem(key, JSON.stringify(parsed[key]));
            }
        });
        
    };
    request.open('GET', path, true);
    request.send();
}
