export function newElement(element, id, node=false, content=false) {
    //create new element and append to node
    let el = document.createElement(element);
    el.setAttribute('id', id);
    if (content) {
        //if content is passed, set it as textContent
        el.textContent = content;
    }
    if (node) {
        //if node is passed, append element to node
        node.appendChild(el);
    }
    return el;
}

export function clearNode(node) {
    //remove all children from node
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
    return node;
}
//present tempeture in celsius
let celsius = true;
//Toggle tempeture unit
const toggleCelsius = () => celsius = !celsius;
export function toggleTemp (c, f) {
    //Toggle the tempeture that is showing
    toggleCelsius();
    let temputure = clearNode(document.getElementById("tempeture"));
    if (celsius) {
        temputure.innerText = c + " °C";
        return [c, f]
    } else {
        temputure.innerText = f + " °F";
        [f, c]
    }   
}
export function changeBackground(tempInC) {
    //Change background and font color depending on the tempeture
    if (tempInC < 17.5) {
        document.body.style.backgroundColor = "#6699CC";
        document.body.style.color = "##1A1A2E";
    } else {
        document.body.style.backgroundColor = "#FFB347";
        document.body.style.color = "#000000";
    }
}
