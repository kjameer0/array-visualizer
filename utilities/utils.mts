export function $(id: string) {
  return document.getElementById(id);
}
//create random array of values between 0 and len
//may contain duplicates
export function generateRandomArray(len: number) {
  const res = Array(len);
  for (let i = 0; i < len; i++) {
    res[i] = String(Math.floor(Math.random() * 2 * len + 1));
  }
  return res;
}
//basic error message handler
export function produceErrorMessage(err: unknown) {
  let message = 'Unknown Error';
  if (err instanceof Error) {
    message = err.message;
  }
  reportError({ message });
}
export function inputKeyHandle(e: KeyboardEvent, button: HTMLElement) {
  if (e.key === 'Enter') {
    button.click();
  }
}
