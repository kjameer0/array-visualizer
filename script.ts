function $(id: string) {
  return document.getElementById(id);
}
const lo = (s: unknown) => console.log(s);
function produceErrorMessage(err: unknown) {
  let message = 'Unknown Error';
  if (err instanceof Error) {
    message = err.message;
  }
  reportError({ message });
}
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
const stringToArray = (str: string): string[] => {
  let start = 0;
  let end = str.length;
  if (str[0] === '[') start++;
  if (str[end - 1] === ']') end--;
  return str.slice(start, end).split(',');
};
//create an array of list elements
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
