let vowel = ['a', 'e', 'i', 'o', 'u'];
let word = "hello";
let countOFvowel = (vowel, word) => {
    let count = 0;
    for (let i = 0; i < word.length; i++) {
        for (let j = 0; j < vowel.length; j++) {
            if (word[i] === vowel[j]) {
                count++;
            }
        }
    }
    return count;
}
console.log(countOFvowel(vowel, word));