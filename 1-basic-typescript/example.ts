console.info(
  "Im typescript.TypeScript is JavaScript’s runtime with a compile-time type checker."
);

import { User } from "./user.interface";

const user: User = {
  name: "Hayes", // name: 120, - Type 'number' is not assignable to type 'string'.
  id: 0,
  age: 15,
  email: "hayes@email.com",
};

// const newUser: User = {
//   username: "Hayes",  // Type '{ username: string; }' is not assignable to type 'User'.
// };

// interface declaration with classes
class UserAccount {
  name: string;
  id: number;
  age: number;
  email: string;

  constructor(name: string, id: number, age: number, email: string) {
    this.name = name;
    this.id = id;
    this.age = age;
    this.email = email;
  }
}

// const newUser: User = new UserAccount("Murphy", 1); //Expected 4 arguments, but got 2.
// const newUer: User = new UserAccount("Murphy", 1, 15, 2); //Argument of type 'number' is not assignable to parameter of type 'string'

const newUer: User = new UserAccount("Murphy", 1, 15, "murphy@email.com");

// Annotate parameters
function deleteUser(user: User) {}

// return values to functions:
function getAdminUser(): User {
  return;
}
