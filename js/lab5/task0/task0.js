// TASK 1
function unique(arr) {
  let set = new Set(arr);
  return Array.from(set);
}

let values = ["Hare", "Krishna", "Hare", "Krishna",
  "Krishna", "Krishna", "Hare", "Hare", ":-O"
];

alert( unique(values) ); // Hare, Krishna, :-O

// TASK 2
function aclean(arr) {
  let map = new Map();

  for (let word of arr) {
    let sorted = word.toLowerCase().split("").sort().join("");
    map.set(sorted, word);
  }

  return Array.from(map.values());
}

let arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];
alert( aclean(arr) );

// TASK 3
let map = new Map();
map.set("name", "John");

let keys = Array.from(map.keys());
keys.push("more");

alert(keys); // name, more