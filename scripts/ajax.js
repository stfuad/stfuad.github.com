export default function GetJSON(...paths) {
    paths.forEach(file => {
        let request = new XMLHttpRequest();
        request.onload = function() {
            
                let parsed = JSON.parse(request.responseText);

                for(let key in parsed) {
                    localStorage.setItem(key, JSON.stringify(parsed[key]));
                }
            
            
        };
        request.open('GET', paths, true);
        request.send();
    });
}
