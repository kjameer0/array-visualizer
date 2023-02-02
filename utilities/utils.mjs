export function $(id) {
    return document.getElementById(id);
}
//create random array of values between 0 and len
//may contain duplicates
export function generateRandomArray(len) {
    const res = Array(len);
    for (let i = 0; i < len; i++) {
        res[i] = String(Math.floor(Math.random() * 2 * len + 1));
    }
    return res;
}
//basic error message handler
export function produceErrorMessage(err) {
    let message = 'Unknown Error';
    if (err instanceof Error) {
        message = err.message;
    }
    reportError({ message });
}
export function inputKeyHandle(e) {
    if (/[a-z]/.test(e.key)) {
        console.log(e.key);
        e.preventDefault();
    }
    try {
        let input = '';
        if (e.key === 'm')
            input = 'array-input';
        else if (e.key === '1')
            input = 'array-input';
        else if (e.key === 'c')
            input = 'array-input';
        else if (e.key === 'p')
            input = 'array-input';
        else if (e.key === 'u')
            input = 'array-input';
        const element = $(input);
        if (!element)
            return;
        element?.focus();
        element.value = '';
    }
    catch (error) {
        produceErrorMessage(error);
    }
    finally {
    }
}
