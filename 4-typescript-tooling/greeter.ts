function greeterOne(person: string): string {
  return "Hello " + person;
}

let userOne = "Jane User";
console.log(greeterOne(userOne));

// interface --------------
interface Person {
  firstName: string;
  lastName: string;
}

function greeterTwo(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let userTwo = { firstName: "Jane", lastName: "User" };

console.log(greeterTwo(userTwo));

// Classes -----------------
class Student {
  fullName: string;
  constructor(
    public firstName: string,
    public middleInitial: string,
    public lastName: string
  ) {
    this.fullName = firstName + " " + middleInitial + " " + lastName;
  }
}

interface Person {
  firstName: string;
  lastName: string;
}

function greeterThird(person: Person) {
  return "Hello, " + person.firstName + " " + person.lastName;
}

let userThird = new Student("Jane", "M.", "User");

document.body.textContent = greeterThird(userThird);

console.log(greeterTwo(userThird));
