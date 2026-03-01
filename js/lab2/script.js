// TASK 1 FUNCTIONS
function findMaxElemnt(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
        }
    }
    return max;
}

function isTheSame(object1, object2) {
    if(object1.name === object2.name &&
        object1.age === object2.age) {
        return true;
    }
    return false;
}

// TASK 2 FUNCTIONS
function isInRange(value, start, end) {
    if(value >= start && value <= end) {
        return true;
    }
    return false;
}

// TASK 3 FUNCTIONS
function translateMark(mark) {
    if(mark === 4) {
        return "Відмінно";
    } else if(mark === 3) {
        return "Добре";
    } else if(mark === 2) {
        return "Задовільно";
    } else if(mark === 1) {
        return "Незадовільно";
    }
}

function translateMarkTernary(mark) {
    return mark === 4 ? "Відмінно" :
        mark === 3 ? "Добре" :
            mark === 2 ? "Задовільно" :
                mark === 1 ? "Незадовільно" : "Невідомо";
}

function monthToSeason(month) {
    if(month === 12 || month === 1 || month === 2) {
        return "Зима";
    } else if(month >= 3 && month <= 5) {
        return "Весна";
    } else if(month >= 6 && month <= 8) {
        return "Літо";
    } else if(month >= 9 && month <= 11) {
        return "Осінь";
    }
}

function monthToSeasonTernary(month) {
    return month === 12 || month === 1 || month === 2 ? "Зима" :
        month >= 3 && month <= 5 ? "Весна" :
            month >= 6 && month <= 8 ? "Літо" :
                month >= 9 && month <= 11 ? "Осінь" : "Невідомо";
}

// TASK 1
let object1 = {name: "Arsen", age: 30};
let object2 = {name: "Arsen", age: 30};

console.log("TASK 1");
console.log("task 1.1");
console.log(findMaxElemnt([1, 2, 3, 4, 5]));
console.log("task 1.2");
console.log(isTheSame(object1, object2));

// TASK 2
console.log("TASK 2");
let value = 5, start = 0, end = 10;
let flag = true;
flag = !flag;
console.log("task 2.1");
console.log(isInRange(value, start, end));
console.log("task 2.2");
console.log(flag);

// TASK 3
console.log("TASK 3");
let mark = 3;
let month = 5;
console.log(monthToSeason(month));
console.log(translateMark(mark));
// console.log(monthToSeasonTernary(month));
// console.log(translateMarkTernary(mark));






