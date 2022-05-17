// Object types ---------------------------

// The parameter's type annotation is an object type
function printCoord(pt: { x: number; y: number }) {
  console.log("this coordinate's x value is " + pt.x);
  console.log("this coordinate's y value is " + pt.y);
}

printCoord({ x: 3, y: 7 });

// optional properties
function printName(obj: { firstName: string; lastName?: string }) {
  console.log("The first name is " + obj.firstName);
  console.log("The last name is " + obj.lastName);
}

printName({ firstName: "Bob" });
printName({ firstName: "Bob", lastName: "Alisson" });

function printNameTwo(obj: { first: string; last?: string }) {
  // Error - might crash if 'obj.last' wasn't provided!

  // console.log(obj.last.toUpperCase());
  // Object is possibly 'undefined'.
  if (obj.last !== undefined) {
    // OK
    console.log(obj.last.toUpperCase());
  }

  // A safe alternative using modern JavaScript syntax:
  console.log(obj.last?.toUpperCase());
}

// Anonymous Functions ---------------
// TypeScript used the types of the One above function

// Union Types ------------------------------
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}
printId(101);
printId("202");
// printId({ myID: 22342 }); // Argument of type '{ myID: number; }' is not assignable to parameter of type 'string | number'.

// Type Aliases ------------------------------
// A type alias is exactly that - a name for any type. The syntax for a type alias is:

type Point = {
  x: number | string;
  y: number;
};

// Exactly the same as the earlier example
function printCoordTwo(pt: Point) {
  console.log("The coordinate's x value is " + pt.x);
  console.log("The coordinate's y value is " + pt.y);
}

printCoordTwo({ x: "100", y: 100 });

// Interfaces ----------------------------------------------

// Literal Types --------------------------------------------
function printText(s: string, alignment: "left" | "right" | "center") {
  // ...
}
printText("Hello, world", "left");
// printText("G'day, mate", "centre"); // Argument of type '"centre"' is not assignable to parameter of type '"left" | "right" | "center"'.

interface Options {
  width: number;
}

function configure(x: Options | "auto") {}

configure({ width: 100 });
configure("auto");
// configure("automatic");  // Argument of type '"automatic"' is not assignable to parameter of type 'Options | "auto"'

// Literal Inference -----------------------------------------
const obj = { counter: 0 };
if ("someCondition") {
  obj.counter = 1;
}


