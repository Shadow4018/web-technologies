let base = 5;
let exponent = 2;
let result = 1;
function power(base, exponent) {
    for (let i = 1; i <= exponent; i++) {
        result *= base;
    }
    return result;
}
console.log(power(base, exponent));