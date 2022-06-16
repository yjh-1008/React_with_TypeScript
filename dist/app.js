"use strict";
let appId = 'abc';
const button = document.querySelector('button');
function add1(n1, n2) {
    if (n1 + n2 > 0) {
        return n1 + n2;
    }
    return;
}
function clickHandler(message) {
    console.log('clcked' + message);
}
if (button) {
    button.addEventListener('click', () => {
        clickHandler('click message!');
    });
}
//# sourceMappingURL=app.js.map