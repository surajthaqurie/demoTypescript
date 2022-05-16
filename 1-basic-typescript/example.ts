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
