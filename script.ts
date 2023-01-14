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
