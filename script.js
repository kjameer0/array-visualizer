"use strict";
function $(id) {
    return document.getElementById(id);
}
const lo = (s) => console.log(s);
//create array of random numbers
function generateRandomArray(len) {
    const res = Array(len);
    for (let i = 0; i < len; i++) {
        res[i] = String(Math.floor(Math.random() * 2 * len + 1));
    }
    return res;
}
function produceErrorMessage(err) {
    let message = 'Unknown Error';
    if (err instanceof Error) {
        message = err.message;
    }
    reportError({ message });
}
//clear button clears text inputs and array display
function makeClearButton() {
    try {
        const buttonClear = $('make-empty');
        const inputElement = $('array-input');
        const arr = $('array-list');
        if (!(buttonClear && inputElement && arr)) {
            throw new Error('missing element in clearButton');
        }
        buttonClear === null || buttonClear === void 0 ? void 0 : buttonClear.addEventListener('click', () => {
            inputElement.value = '';
            arr.innerHTML = '';
        });
    }
    catch (errorId) {
        produceErrorMessage(errorId);
    }
}
//converts user string array to actual array
const stringToArray = (str) => {
    let start = 0;
    let end = str.length;
    if (str[0] === '[')
        start++;
    if (str[end - 1] === ']')
        end--;
    return str.slice(start, end).split(',');
};
//create an array of list elements from input array string
function strArrayToLiElements(arr, existingLen) {
    return arr.map((elem, idx) => {
        const listElement = document.createElement('li');
        const arrayElementTag = document.createElement('p');
        arrayElementTag.className += 'arr-element';
        const idxElem = document.createElement('p');
        arrayElementTag.textContent = elem;
        idxElem.textContent = String(idx + existingLen);
        listElement.appendChild(idxElem);
        listElement.appendChild(arrayElementTag);
        return listElement;
    });
}
function makeRandomButton() {
    try {
        const buttonRandom = $('make-random');
        const inputElement = $('submit-len');
        const arrList = $('array-list');
        if (!(buttonRandom && inputElement && arrList))
            throw new Error(`missing element in random array function`);
        buttonRandom.addEventListener('click', () => {
            let lenStr = inputElement.value || '10';
            const lenNum = Number(lenStr);
            const randomArray = generateRandomArray(lenNum);
            arrList.textContent = '';
            const elementArray = strArrayToLiElements(randomArray, 0);
            elementArray.forEach((arrEl) => {
                arrList.appendChild(arrEl);
            });
        });
    }
    catch (error) {
        produceErrorMessage(error);
    }
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
            if (inputElement.value.length === 0)
                throw new Error('no input value');
            outputElement.textContent = '';
            const textArr = stringToArray(inputElement === null || inputElement === void 0 ? void 0 : inputElement.value);
            const elementArray = strArrayToLiElements(textArr, 0);
            elementArray.forEach((arrEl) => {
                outputElement.appendChild(arrEl);
            });
        });
    }
    catch (errorId) {
        produceErrorMessage(errorId);
    }
}
function makeConcatButton() {
    try {
        const button = $('concat-arr');
        const inputElement = $('concat-maker');
        const outputElement = $('array-list');
        if (button === null)
            throw new Error('non-concat button');
        if (inputElement === null)
            throw new Error('no input element concat');
        if (outputElement === null)
            throw new Error('no output element concat');
        button.addEventListener('click', () => {
            var _a, _b;
            const lastArrElem = (_b = (_a = outputElement.lastChild) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.textContent;
            if (outputElement.childElementCount === 0)
                throw new Error('no array in concat');
            if (lastArrElem === null)
                throw new Error('no existing arr');
            const textArr = stringToArray(inputElement === null || inputElement === void 0 ? void 0 : inputElement.value);
            if (inputElement.value === '')
                throw new Error('no value to concat');
            const elementArray = strArrayToLiElements(textArr, Number(lastArrElem) + 1);
            elementArray.forEach((arrEl) => {
                outputElement.appendChild(arrEl);
            });
            inputElement.value = '';
        });
    }
    catch (errorId) {
        produceErrorMessage(errorId);
    }
}
function pushToArrayList() {
    const button = $('push-arr');
    const inputElement = $('push-input');
    const arrList = $('array-list');
    if (!(button && inputElement && arrList))
        throw new Error(`missing element in push function`);
    button.addEventListener('click', () => {
        var _a, _b;
        if (arrList.childElementCount === 0)
            throw new Error('no array');
        const lastArrElem = (_b = (_a = arrList.lastChild) === null || _a === void 0 ? void 0 : _a.firstChild) === null || _b === void 0 ? void 0 : _b.textContent;
        if (lastArrElem === null)
            throw new Error('no existing arr');
        const newVal = strArrayToLiElements([inputElement.value], Number(lastArrElem) + 1)[0];
        arrList.appendChild(newVal);
        inputElement.value = '';
    });
}
function unShiftToArrayList() {
    try {
        const button = $('unshift-arr');
        const inputElement = $('push-input');
        const arrList = $('array-list');
        if (!(button && inputElement && arrList))
            throw new Error(`missing element in push function`);
        button.addEventListener('click', () => {
            var _a;
            const firstArrElem = arrList.firstChild;
            if (firstArrElem === null)
                throw new Error('no existing arr');
            const newVal = strArrayToLiElements([inputElement.value], 0)[0];
            const oldArr = arrList.children;
            if (!oldArr)
                throw new Error('no old array');
            for (const node of oldArr) {
                if (node == null || node.firstChild == null)
                    break;
                node.firstChild.textContent = String(Number((_a = node.firstChild) === null || _a === void 0 ? void 0 : _a.textContent) + 1);
            }
            arrList.insertBefore(newVal, firstArrElem);
            inputElement.value = '';
        });
    }
    catch (error) {
        produceErrorMessage(error);
    }
}
makeArrayButton('submit-arr', 'array-input', 'array-list');
makeClearButton();
makeRandomButton();
makeConcatButton();
pushToArrayList();
unShiftToArrayList();
/*
push
  input field to take element to add to array
  button to submit value
  create li element with idx
  append to array-list
 //pop //unshift //shift
*/
