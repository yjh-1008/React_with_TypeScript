function add(n1, n2) {
    if (typeof (n1) !== 'number' || typeof (n2) !== 'number') {
        throw new Error('Mismatch Type Error!');
    }
    return n1 + n2;
}
var number1 = '5';
var number2 = 2.8;
var result = add(number1, number2);
console.log(result);
