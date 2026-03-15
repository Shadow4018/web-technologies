function task1 (fruit_array) {
    console.log("TASK-1");
    // task1
    let last_fruit = fruit_array.pop();
    console.log("Task 1.1:", last_fruit);

    //task2
    fruit_array.push("painapple");
    console.log("Task 1.2: ", fruit_array);

    //task3
    fruit_array.sort().reverse();
    console.log("Task 1.3: ", fruit_array);

    //task4
    // array.indexof(item)
    for(let i = 0; i < fruit_array.length; i++) {
        if(fruit_array[i] === "apple") {
            console.log("Task 1.4: ", i + 1);
            break;
        }
    }
}

function task2 (color_array) {
    console.log("TASK-2");
    //task1
    let longest = color_array[0];
    for(let i = 0; i < color_array.length; i++) {
        if(color_array[i].length > longest.length) {
            longest = color_array[i];
        }
    }
    console.log("Task 2.1: ", longest);

    //task2
    console.log("Task 2.2: ", color_array.filter(color => color.includes("blue")));

    //task3
    let result = color_array.join(", ");
    console.log("Task 2.3: ", result);
}

function task3 (object_array) {
    console.log("TASK-3");
    //task1
    object_array.sort((a, b) => a.name.localeCompare(b.name));
    console.log("Task 3.1: ", object_array);

    //task2
    console.log("Task 3.2: ", object_array.filter(obj => obj.position === "developer"));

    //task3
    console.log("Task 3.3: ", object_array.filter(obj => obj.age > 30));

    //task4
    object_array.push({name: "Smith", age: 28, position: "tester"});
    console.log("Task 3.4: ", object_array);
}

function task4 (student_array) {
    console.log("TASK-4");
    //task1
    console.log("Task 4.1: ", student_array.filter(student => student.name !== "Alex"));

    //task2
    student_array.push({name: "Bob", age: 18, course: 1});
    console.log("Task 4.2: ", student_array);

    //task3
    student_array.sort((a, b) => b.age - a.age);
    console.log("Task 4.3: ", student_array);

    //task4
    console.log("Task 4.4: ", student_array.filter(student => student.course === 3));
}

function task5 (array) {
    console.log("TASK-5");
    //task1
    console.log("Task 5.1: ", array.map(num => num * num));

    //task2
    console.log("Task 5.2: ", array.filter(num => num % 2 === 0));

    //task3
    console.log("Task 5.3: ", array.reduce((acc, num) => acc + num, 0));

    //task4
    let new_array = [10, 20, 30, 40, 50];
    console.log("Task 5.4: ", array.concat(new_array));

    //task5
    console.log("Task 5.5: ", array.splice(3, 4));
}

function addBook(books, title, author, genre, pages) {
    books.push({ title: title, author: author, genre: genre, pages: pages, isAvailable: true });
    return books;
}

function removeBook(books, title) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].title === title) {
            books.splice(i, 1);
            break;
        }
    }
    return books;
}

function findBooksByAuthor(books, author) {
    return books.filter(book => book.author === author);
}

function toggleBookAvailability(books, title, isBorrowed) {
    for (let i = 0; i < books.length; i++) {
        if (books[i].title === title) {
            books[i].isAvailable = !isBorrowed;
            break;
        }
    }
    return books;
}

function sortBooksByPages(books) {
    books.sort((a, b) => a.pages - b.pages);
    return books;
}

function getBooksStatistics(books) {
    let total = books.length;
    let available = books.filter(b => b.isAvailable).length;
    let borrowed = total - available;
    let totalPages = books.reduce((sum, b) => sum + b.pages, 0);
    let avgPages = total === 0 ? 0 : totalPages / total;
    
    return {
        In_total: total,
        Available: available,
        Borrowed: borrowed,
        Average_pages: avgPages
    };
}

function libraryManagemnet () {
    console.log("TASK-6");
    let library = [{title: "Book 1", author: "Author 1", genre: "Fiction", pages: 300, isAvailable: true},
                {title: "Book 2", author: "Author 2", genre: "Non-Fiction", pages: 250, isAvailable: false},
                {title: "Book 3", author: "Author 3", genre: "Fiction", pages: 400, isAvailable: true}];
    //task2            
    library = addBook(library, "Book 4", "Author 1", "Fiction", 350);
    console.log("Library after adding a book: ", library);

    //task3
    library = removeBook(library, "Book 2");
    console.log("Library after removing a book: ", library);

    //task4
    library = toggleBookAvailability(library, "Book 1", true);
    console.log("Library after toggling availability: ", library);

    //task5
    library = sortBooksByPages(library);
    console.log("Library after sorting by pages: ", library);

    //task6
    let stats = getBooksStatistics(library);
    console.log("Library statistics: ", stats);
}

function addSubjectsToStudent(studentObj, subjectsArr) {
    studentObj.subjects = subjectsArr;
    return studentObj;
}

function deleteAgeFromStudent(studentObj) {
    delete studentObj.age;
    return studentObj;
}

// MAIN
//TASK1
let fruit_array = ["apple", "strawberry", "blueberry", "cherry"];
task1(fruit_array);

//TASK2
let color_array = ["yellow", "blue-crimson", "cyan", "red", "dark-blue"];
task2(color_array);

//TASK3
let object_array = [
    {name: "John", age: 30, position: "developer"},
    {name: "Jane", age: 25, position: "designer"},
    {name: "Doe", age: 35, position: "manager"}
];
task3(object_array);

//TASK4
let student_array = [
    {name: "Alice", age: 19, course: 2},
    {name: "Alex", age: 20, course: 3},
    {name: "Charlie", age: 17, course: 1}
];
task4(student_array);

//TASK5
let array = [1, 2, 3, 4, 5];
task5(array);

//TASK6
libraryManagemnet();

//TASK7
console.log("TASK-7");
let targetStudent = { name: "Johny Silverhand", age: 19, course: 2 };
let subjectsList = ["math", "programming"];
console.log("Student object before modifications:");
console.log(targetStudent);
console.log("\nAdding subjects to student object");
addSubjectsToStudent(targetStudent, subjectsList);
console.log(targetStudent);
console.log("\nDeleting age property");
deleteAgeFromStudent(targetStudent);
console.log(targetStudent);

