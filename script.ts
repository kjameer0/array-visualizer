//create a function that takes a button id and
// adds a event listener corresponding to a particular field
//take string and turn it into array elements
function $(id: string){
  return document.getElementById(id);
}
const stringToArray = (str: string): string[] => {
  let start = 0, end = str.length;
  if(str[0] === '[') start++;
  if(str[end-1] === ']') end--;
  return str.slice(start, end).split(',');
};
//create an array of list elements
function strArrayToLiElements(arr: string[]) {
  return arr.map(elem => {
    const listElement = document.createElement('li');
    listElement.innerText = elem;
    return listElement;
  })
}
function makeArrayButton(butId, inputId, outputId) {
  const button = $(butId);
  try {
  if(button === null) throw 'oh ras';
    button.addEventListener('click' , () => {
      const inputElement = document.getElementById(inputId);
      const outputElement = document.getElementById(outputId);
      let textArr = stringToArray(inputElement?.innerText || '');
      let elementArray = strArrayToLiElements(textArr);
      if(outputElement) {
        elementArray.forEach(arrEl => {
          outputElement.appendChild(arrEl);
        })
      }
    })
  } catch(errorId) {
    alert(errorId.message)
  }
}
const arr = [4,6,3,33,6];
const displayArray = arr.map((e : number) => {
  const arrEl =  document.createElement('p');
  arrEl.textContent = String(e);
  return arrEl;
})
displayArray.forEach(e => {
  document.body.appendChild(e);
})
//write function that takes array and returns array of html elements
 /*what kinds of elements
 okay i think i should be able to do:
 1. pop
 2. push
 3. length
 im thinking i should just do horizontal divs maybe
 i wanna keep the array elements in the same line
 i want a form to decide what to put in the array elements wise
 i could do:
 1. horizontal li elements
 2. horizontal divs

 */
 let temp = Array.from(document.getElementsByTagName('script')).find(e => {
  let text = e.innerText;
  const regex = /hideArticle/
  return regex.test(text) === true
})
console.log(temp)
