// Object literal type syntax
// let o: { n: number; xs: object[] } = { n: 1, xs: [] };

// Boxed types ---------------------------------
(1).toExponential();
console.log((1).toExponential());

// Gradual typing: "any" whenever it can’t tell what the type of an expression should be
// with "noImplicitAny": false in tsconfig.json, anys: any[]
const anys = [];
anys.push(1);
anys.push("oh no");
anys.push({ anything: "goes" });
// console.log(
//   anys.map(anys[1]) // oh no, "oh no" is not a function
// );

// let sepsis = anys[0] + anys[1]; // this could mean anything

// Structural Typing ---------------------------------
let o = { x: "hi", extra: 1 }; // ok
// let o2: { x: string } = o; // ok

type One = { p: string };
interface Two {
  p: string;
}

class Three {
  p = "hello";
}

let x: One = { p: "hi" };
let two: Two = x;
two = new Three();

// Unions ---------------------------------
function start(
  arg: string | string[] | (() => string) | { s: string }
): string {
  if (typeof arg === "string") {
    return commonCase(arg);
  } else if (Array.isArray(arg)) {
    return arg.map(commonCase).join(",");
  } else if (typeof arg === "function") {
    return commonCase(arg());
  } else {
    return commonCase(arg.s);
  }
}

function commonCase(s: string): string {
  return s;
}

// Intersections ---------------------------------
type Combined = { a: number } & { b: string };
type Conflicting = { a: number } & { a: string };

// Unit types: that contain exactly one primitive value.
declare function pad(s: string, n: number, direction: "left" | "right"): string;
// pad("hi", 10, "left");

// let s = "right";
// pad("hi", 10, s); // Argument of type 'string' is not assignable to parameter of type '"left" | "right"'

// let s: "left" | "right" = "right";
// pad("hi", 10, s);

// Contextual typing ---------------------------------
let s = "I'm a string";

// declare function run<T>(thunk: (t: T) => void): T;
// let i: { interface: string } = run((o) => {
//   o.interface = "Insert State Here";
// });

type FString = string & { __compileTimeOnly: any }; // actually this __compileTimeOnly value is not exits

// Discriminated Unions
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; x: number }
  | { kind: "triangle"; x: number; y: number };

function area(s: Shape) {
  if (s.kind === "circle") {
    return Math.PI * s.radius * s.radius;
  } else if (s.kind === "square") {
    return s.x * s.x;
  } else {
    return (s.x * s.y) / 2;
  }
}

// common properties show up in any union
function height(s: Shape) {
  if (s.kind === "circle") {
    return 2 * s.radius;
  } else {
    // s.kind:'triangle' | 'triangle'
    return s.x;
  }
}

// Type Parameters ------------------------------------
function liftArray<T>(t: T): Array<T> {
  // return t // Type 'T' is not assignable to type 'T[]'.
  return [t];
}

// Type parameters can also be constrained to a type, which behaves a bit like type class constraints:
function firstish<T extends { length: number }>(t1: T, t2: T): T {
  return t1.length > t2.length ? t1 : t2;
}

// Module system --------------------------------------------
export { f };

function f() {
  return g();
}
function g() {} // g is not exported

export function fn() {
  return gn();
}
function gn() {}

// Readonly And Const --------------------------
const a = [1, 2, 3];
a.push(102); // ):
a[0] = 101; // D:

console.log(a); //[ 101, 2, 3, 102 ]

interface Rx {
  readonly x: number;
}

let rx: Rx = { x: 1 };
// rx.x = 12; // Cannot assign to 'x' because it is a read-only property.

interface X {
  x: number;
}

// mapped type Readonly<T>
let ry: Readonly<X> = { x: 1 };
// ry.x = 12; // Cannot assign to 'x' because it is a read-only property

// ReadonlyArray<T>
let aa: ReadonlyArray<number> = [1, 2, 3];
let bb: readonly number[] = [1, 2, 3];

// aa.push(102); // Property 'push' does not exist on type 'readonly number[]'
// bb[0] = 101; // Index signature in type 'readonly number[]' only permits reading.

let aaa = [1, 2, 3] as const;
// aaa.push(102); // Property 'push' does not exist on type 'readonly [1, 2, 3]'
// aaa[0] = 101; // Cannot assign to '0' because it is a read-only property.
