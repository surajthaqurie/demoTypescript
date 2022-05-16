function greeterOne(person) {
    return "Hello " + person;
}
var userOne = "Jane User";
console.log(greeterOne(userOne));
function greeterTwo(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var userTwo = { firstName: "Jane", lastName: "User" };
console.log(greeterTwo(userTwo));
// Classes -----------------
var Student = /** @class */ (function () {
    function Student(firstName, middleInitial, lastName) {
        this.firstName = firstName;
        this.middleInitial = middleInitial;
        this.lastName = lastName;
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
    return Student;
}());
function greeterThird(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var userThird = new Student("Jane", "M.", "User");
document.body.textContent = greeterThird(userThird);
console.log(greeterTwo(userThird));
