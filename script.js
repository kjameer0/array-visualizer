"use strict";
function $(id) {
    return document.getElementById(id);
}
const stringToArray = (str) => {
    let start = 0;
    let end = str.length;
    if (str[0] === '[')
        start++;
    if (str[end - 1] === ']')
        end--;
    return str.slice(start, end).split(',');
};
//create an array of list elements
function strArrayToLiElements(arr) {
    return arr.map((elem, idx) => {
        const listElement = document.createElement('li');
        const arrayElementTag = document.createElement('p');
        arrayElementTag.textContent = elem;
        listElement.textContent = String(idx);
        listElement.appendChild(arrayElementTag);
        return listElement;
    });
}
function makeArrayButton(butId, inputId, outputId) {
    try {
        const button = $(butId);
        const inputElement = $(inputId);
        const outputElement = $(outputId);
        if (button === null)
            throw new Error('non-button');
        if (inputElement === null)
            throw new Error('no input element');
        if (outputElement === null)
            throw new Error('no output element');
        button.addEventListener('click', () => {
            outputElement.textContent = '';
            const textArr = stringToArray(inputElement === null || inputElement === void 0 ? void 0 : inputElement.value);
            const elementArray = strArrayToLiElements(textArr);
            elementArray.forEach((arrEl) => {
                outputElement.appendChild(arrEl);
            });
        });
    }
    catch (errorId) {
        let message = 'Unknown Error';
        if (errorId instanceof Error) {
            message = errorId.message;
        }
        reportError({ message });
    }
}
makeArrayButton('submit-arr', 'array-input', 'array-list');
