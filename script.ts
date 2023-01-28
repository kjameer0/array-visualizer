import { lot } from './utilities/utils.mjs';
function $(id: string) {
  return document.getElementById(id);
}
console.log(lot(1, 2));
//create array of random numbers
function generateRandomArray(len: number) {
  const res = Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = String(Math.floor(Math.random() * 2 * len + 1));
  }
  return res;
}
function produceErrorMessage(err: unknown) {
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
    const inputElement = $('array-input') as HTMLInputElement;
    const arr = $('array-list');
    if (!(buttonClear && inputElement && arr)) {
      throw new Error('missing element in clearButton');
    }
    buttonClear?.addEventListener('click', () => {
      inputElement.value = '';
      arr.innerHTML = '';
    });
  } catch (errorId: unknown) {
    produceErrorMessage(errorId);
  }
}
//converts user string array to actual array
const stringToArray = (str: string): string[] => {
  let start = 0;
  let end = str.length;
  if (str[0] === '[') start++;
  if (str[end - 1] === ']') end--;
  return str.slice(start, end).split(',');
};
//create an array of list elements from input array string
function strArrayToLiElements(arr: string[], existingLen: number) {
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
    const inputElement = $('submit-len') as HTMLInputElement;
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
  } catch (error) {
    produceErrorMessage(error);
  }
}
function makeArrayButton(butId: string, inputId: string, outputId: string) {
  try {
    const button = $(butId);
    const inputElement = $(inputId) as HTMLInputElement;
    const outputElement = $(outputId);
    if (button === null) throw new Error('non-button');
    if (inputElement === null) throw new Error('no input element');
    if (outputElement === null) throw new Error('no output element');
    button.addEventListener('click', () => {
      if (inputElement.value.length === 0) throw new Error('no input value');
      outputElement.textContent = '';
      const textArr = stringToArray(inputElement?.value);
      const elementArray = strArrayToLiElements(textArr, 0);
      elementArray.forEach((arrEl) => {
        outputElement.appendChild(arrEl);
      });
    });
  } catch (errorId: unknown) {
    produceErrorMessage(errorId);
  }
}
function makeConcatButton() {
  try {
    const button = $('concat-arr');
    const inputElement = $('concat-maker') as HTMLInputElement;
    const outputElement = $('array-list');
    if (button === null) throw new Error('non-concat button');
    if (inputElement === null) throw new Error('no input element concat');
    if (outputElement === null) throw new Error('no output element concat');
    button.addEventListener('click', () => {
      const lastArrElem = outputElement.lastChild?.firstChild?.textContent;
      if (outputElement.childElementCount === 0)
        throw new Error('no array in concat');
      if (lastArrElem === null) throw new Error('no existing arr');
      const textArr = stringToArray(inputElement?.value);
      if (inputElement.value === '') throw new Error('no value to concat');
      const elementArray = strArrayToLiElements(
        textArr,
        Number(lastArrElem) + 1
      );
      elementArray.forEach((arrEl) => {
        outputElement.appendChild(arrEl);
      });
      inputElement.value = '';
    });
  } catch (errorId: unknown) {
    produceErrorMessage(errorId);
  }
}
function pushToArrayList() {
  const button = $('push-arr');
  const inputElement = $('push-input') as HTMLInputElement;
  const arrList = $('array-list');
  if (!(button && inputElement && arrList))
    throw new Error(`missing element in push function`);
  button.addEventListener('click', () => {
    if (arrList.childElementCount === 0) throw new Error('no array');
    const lastArrElem = arrList.lastChild?.firstChild?.textContent;
    if (lastArrElem === null) throw new Error('no existing arr');
    const newVal = strArrayToLiElements(
      [inputElement.value],
      Number(lastArrElem) + 1
    )[0];
    arrList.appendChild(newVal);
    inputElement.value = '';
  });
}
function unShiftToArrayList() {
  try {
    const button = $('unshift-arr');
    const inputElement = $('push-input') as HTMLInputElement;
    const arrList = $('array-list');
    if (!(button && inputElement && arrList))
      throw new Error(`missing element in push function`);
    button.addEventListener('click', () => {
      const firstArrElem = arrList.firstChild;
      if (firstArrElem === null) throw new Error('no existing arr');
      if (inputElement.value === '') throw new Error('no unshift val');
      const newVal = strArrayToLiElements([inputElement.value], 0)[0];
      const oldArr = arrList.children;
      if (!oldArr) throw new Error('no old array');
      for (const node of oldArr) {
        if (node == null || node.firstChild == null) break;
        node.firstChild.textContent = String(
          Number(node.firstChild?.textContent) + 1
        );
      }
      arrList.insertBefore(newVal, firstArrElem);
      inputElement.value = '';
    });
  } catch (error) {
    produceErrorMessage(error);
  }
}
function popArray() {
  try {
    const button = $('pop-arr');
    if (button === null) throw new Error('no button pop');
    button.addEventListener('click', () => {
      const arr = $('array-list');
      if (arr === null || arr.childElementCount === 0)
        throw new Error('no array');
      arr.lastChild?.remove();
    });
  } catch (error) {
    produceErrorMessage(error);
  }
}
function shiftArray() {
  try {
    const button = $('shift-arr');
    const arrList = $('array-list');
    if (!(button && arrList))
      throw new Error(`missing element in push function`);
    button.addEventListener('click', () => {
      const firstArrElem = arrList.firstChild;
      if (firstArrElem === null) throw new Error('no existing arr');
      firstArrElem.remove();
      const oldArr = arrList.children;
      if (!oldArr) throw new Error('no old array');
      for (const node of oldArr) {
        if (node == null || node.firstChild == null) break;
        node.firstChild.textContent = String(
          Number(node.firstChild?.textContent) - 1
        );
      }
    });
  } catch (error) {
    produceErrorMessage(error);
  }
}
makeArrayButton('submit-arr', 'array-input', 'array-list');
makeClearButton();
makeRandomButton();
makeConcatButton();
pushToArrayList();
unShiftToArrayList();
popArray();
shiftArray();
