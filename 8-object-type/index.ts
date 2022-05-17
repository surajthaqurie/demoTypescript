function greet(person: { name: string; age: number }) {
  return "Hello " + person.name;
}

interface Person {
  name: string;
  age: number;
}

function greet2(person: Person) {
  return "Hello " + person.name;
}

type Person1 = {
  name: string;
  age: number;
};

function greet3(person: Person1) {
  return "Hello " + person.name;
}

// Property Modifiers -----------------

// Index Signature
interface StringArray {
  [index: number]: string;
}

// const myArray: StringArray = getStringArray();
// const secondItem = myArray[1]

interface NumberDictionary {
  [index: string]: number;

  length: number;
  //   name: string; // Property 'name' of type 'string' is not assignable to 'string' index type 'number'
}

// Extending Types -----------------------------
interface BasicAddress {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends BasicAddress {
  unit: string;
}
// multiple
interface Colorful {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColorfulCircle extends Colorful, Circle {}

const cc: ColorfulCircle = {
  color: "red",
  radius: 42,
};

// Intersection Types
type ColorfulCircle1 = Colorful & Circle;

function draw(circle: Colorful & Circle) {
  console.log(`Color was ${circle.color}`);
  console.log(`Radius was ${circle.radius}`);
}

// okay
draw({ color: "blue", radius: 42 });
// draw({ color: "red", raidus: 42 }); // error

// Interfaces vs. Intersections ----------------------
// Generic Object Types

interface Box<Type> {
  // type parameter
  contents: Type;
}

interface StringBox {
  contents: string;
}
let boxA: Box<string> = { contents: "hello" };
boxA.contents;

let boxB: StringBox = { contents: "World" };
boxB.contents;

interface Apple {
  // ...
}

// Same as '{contents:Apple}'.
type AppleBox = Box<Apple>;

// Generic Function
function setContents<Type>(box: Box<Type>, newContents: Type) {
  box.contents = newContents;
}

// The Array Type ---------------------------
function doSomething(value: Array<string>) {
  // ...
}

let myArray: string[] = ["hello", "world"];

// either of these work!
doSomething(myArray);
doSomething(new Array("hello", "world"));

// The ReadonlyArray Type
function doStuff(values: ReadonlyArray<string>) {
  // we can read from 'values'
  const copy = values.slice();
  console.log(`The first value is ${values[0]}`);

  // ... but we can't mutate 'values'
  //   values.push("hello!");
}

let x: readonly string[] = [];
let y: string[] = [];

x = y;
// y = x; // The type 'readonly string[]' is 'readonly' and cannot be assigned to the mutable type 'string[]'

// Tuple Types ---------------------------------
type StringNumberPair = [string, number];

function doSomething1(pair: [string, number]) {
  const a = pair[0];

  const b = pair[1];

  //   const c = pair[2];  // Tuple type '[string, number]' of length '2' has no element at index '2'
}

doSomething1(["hello", 42]);

function doSomething2(stringHash: [string, number]) {
  const [inputSting, hash] = stringHash;

  console.log(inputSting);

  console.log(hash);
}

interface StringNumberPair1 {
  // specialized properties
  length: 2;
  0: string;
  1: number;

  // Other 'Array<string | number>' members...
  slice(start?: number, end?: number): Array<string | number>;
}

type Either2dOr3d = [number, number, number?]; // number | undefined

// Use REST elements
type StringNumberBooleans = [string, number, ...boolean[]];
type StringBooleansNumber = [string, ...boolean[], number];
type BooleansStringNumber = [...boolean[], string, number];

const a: StringNumberBooleans = ["hello", 1];
const b: StringNumberBooleans = ["beautiful", 2, true];
const c: StringNumberBooleans = ["world", 3, true, false, true, false, true];

// readonly Tuple Types -----------------------------
function doSomething3(pair: readonly [string, number]) {
  //   pair[0] = "hello"; // Cannot assign to '0' because it is a read-only property
}

let point = [3, 4] as const;
function distanceFromOrigin([x, y]: [number, number]) {
  return Math.sqrt(x ** 2 + y ** 2);
}

// distanceFromOrigin(point); // error
