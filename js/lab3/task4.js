let i = [1, 2, 3, 4, 5];
function sumArrayEven(arr) {
    let sum = 0;
    for (let j = 0; j < arr.length; j++) {
        if (arr[j] % 2 === 0) {
            sum += arr[j];
        }
    }
    return sum;
}
console.log(sumArrayEven(i));