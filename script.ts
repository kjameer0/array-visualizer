function $(id: string) {
  return document.getElementById(id);
}
const lo = (s: unknown) => console.log(s);
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
function strArrayToLiElements(arr: string[]) {
  return arr.map((elem, idx) => {
    const listElement = document.createElement('li');
    const arrayElementTag = document.createElement('p');
    arrayElementTag.textContent = elem;
    listElement.textContent = String(idx);
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
      const elementArray = strArrayToLiElements(randomArray);
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
      outputElement.textContent = '';
      const textArr = stringToArray(inputElement?.value);
      const elementArray = strArrayToLiElements(textArr);
      elementArray.forEach((arrEl) => {
        outputElement.appendChild(arrEl);
      });
    });
  } catch (errorId: unknown) {
    produceErrorMessage(errorId);
  }
}
makeArrayButton('submit-arr', 'array-input', 'array-list');
makeClearButton();
makeRandomButton();
//concat //push //pop //unshift //shift
