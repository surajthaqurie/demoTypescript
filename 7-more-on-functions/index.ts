// Function Type Expressions

function greeter(fn: (a: string) => void) {
  fn("Hello World");
}

function printToConsole(s: string) {
  console.log(s);
}

greeter(printToConsole);
type GreetFunction = (a: string) => void;
function greeterNew(fn: GreetFunction) {}

// Call Signatures
type DescribableFunction = {
  description: string;
  (someArg: number): boolean;
};

function doSomeThing(fn: DescribableFunction) {
  console.log(fn.description + " returned " + fn(6));
}

// Construct Signatures
interface CallOrConstruct {
  new (s: string): Date;
  (n?: number): number;
}

// Generic Functions
function firstElement(arr: any[]) {
  return arr[0];
}

function secondElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}

const s = secondElement(["a", "b", "c"]);
const n = secondElement([1, 2, 3]);
const u = secondElement([]);

// Inference
function map<Input, Output>(
  arr: Input[],
  func: (arg: Input) => Output
): Output[] {
  return arr.map(func);
}

const parsed = map(["1", "3", "2"], (n) => parseInt(n));

// Constraints
function longest<Type extends { length: number }>(a: Type, b: Type) {
  if (a.length >= b.length) {
    return a;
  } else {
    return b;
  }
}

// longerArray is of type 'number[]'
const longerArray = longest([1, 2], [1, 2, 3]);

// longerString is of type 'alice' | 'bob'
const longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100); // Argument of type 'number' is not assignable to parameter of type '{ length: number; }

// Specifying type Arguments
function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
  return arr1.concat(arr2);
}

// const arr = combine([1, 2, 3], ["hello"]); // Type 'string' is not assignable to type 'number'
const arr = combine<string | number>([1, 2, 3], ["hello"]);

// Optional Parameters  '?'
function f(n: number) {
  console.log(n.toFixed());
  console.log(n.toFixed(3));
}

// Function Overloads:
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
const d1 = makeDate(12345678);
const d2 = makeDate(5, 5, 5);
// const d3 = makeDate(1, 3); // No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.

function fn(x: string): void;
function fn() {
  // ...
}
// fn(); // Expected 1 arguments, but got 0.

function len(s: string): number;
function len(arr: any[]): number;
function len(x: any) {
  return x.length;
}

// Declaring "this" in a Function
const User = {
  id: 123,

  admin: false,
  becomeAdmin: function () {
    this.admin = true;
  },
};

// interface DB {
//   filterUsers(filter: (this: User) => boolean): User[];
// }
// const db = getDb();
// const admins = db.filterUsers(function(this:User))

// Rest Parameters and Arguments ---------------
// Rest Parameters
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

const a = multiply(10, 1, 2, 3, 4);
console.log(a);

// Rest Arguments
const arr1 = [1, 3, 2];
const arr2 = [4, 5, 6];
arr1.push(...arr2);

// Parameter Destructuring ----------------------------------

function sum({ a, b, c }: { a: number; b: number; c: number }) {
  console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });

type ABC = { a: number; b: number; c: number };
function sum2({ a, b, c }: ABC) {
  console.log(a + b + c);
}

// Assignability of Functions
