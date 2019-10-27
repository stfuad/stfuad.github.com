export function Button(text) {
    let button = document.createElement('button');
    button.appendChild(document.createTextNode(text));

    return button;
}

export function Div(id) {
    let div = document.createElement('div');

    if (id) {
        div.id = id;
    }
    
    return div;
}

export function Form(parent) {
    let form = document.createElement('form');

    parent.appendChild(form);

    return form;
}

export function Fieldset(id, parent) {
    let fieldset = document.createElement('fieldset')
    fieldset.id = id;

    parent.appendChild(fieldset);

    return fieldset;
}

export function Header(type, text) {
    let header = document.createElement(type);
    header.appendChild(document.createTextNode(text));

    return header;
}

export function Input(type, id) {
    let input = document.createElement('input');
    input.type = type;

    if (id) {
        input.id = id;                
    }

    return input;
}

export function Label(target, text) {
    let label = document.createElement('label');
    label.htmlFor = target;
    label.appendChild(document.createTextNode(text));

    return label;
}

export function Legend(text) {
    let legend = document.createElement('legend');
    legend.appendChild(document.createTextNode(text));

    return legend;
}

export function Option(value, text) {
    let option = document.createElement('option');
    option.value = value;
    option.text = text;

    return option;
}

export function Select(id) {
    let select = document.createElement('select');

    if (id) {
        select.id = id;
    }
    
    return select;
}

export function Span(id) {
    let span = document.createElement('span');

    if (id) {
        span.id = id;
    }
    
    return span;
}