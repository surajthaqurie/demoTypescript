import { Backpack } from "./interface";

// Composing Types: Unions

type MyBool = true | false; // type MyBool = boolean

type StringLiteral = "open" | "closed" | "minimized";
type NumberLiteral = 1 | 3 | 5 | 7 | 9;

function getLength(obj: string | string[]) {
  return obj.length; // (parameter) obj: string | string[]
}

function wrapInArray(obj: string | string[]) {
  if (typeof obj === "string") {
    return [obj]; // (parameter) obj: string
  }

  return obj; // (parameter) obj: string[]
}

// Composing Types: Generics
type StringArray = Array<string>;
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;

declare const backpack: Backpack<string>;

const object = backpack.get();

// backpack.add(23)  //Argument of type 'number' is not assignable to parameter of type 'string'.

// Structural Type System (duck typing)
// If two objects have the same shape (exactly same)
interface Point {
  x: number;
  y: number;
}

function logPoint(p: Point) {
  console.log(`${p.x}, ${p.y}`);
}

// const point = { x: "string", y: 26 }; // Error
const point = { x: 12, y: 26 };
logPoint(point);

// The shape-matching only requires a subset of the object’s fields to match.
const point3 = { x: 12, y: 26, z: 89 };
logPoint(point3); // logs "12, 26"

// classes and objects conform to shapes:

class VirtualPoint {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

const newVPoint = new VirtualPoint(13, 25);
logPoint(newVPoint); // logs "13, 56"

// If the object or class has all the required properties, TypeScript will say they match, regardless of the implementation details.
