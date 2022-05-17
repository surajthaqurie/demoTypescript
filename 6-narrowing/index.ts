// truthiness narrowing ------------------------

function printAll(strs: string | string[] | null) {
  if (strs && typeof strs === "object") {
    // check here it value is available or not
    for (const s of strs) {
      console.log(s);
    }
  } else if (typeof strs === "string") {
    console.log(strs);
  }
}

// Equality narrowing --------------------------------
interface Container {
  value: number | null | undefined;
}

function multiplyValue(container: Container, factor: number) {
  // Remove both 'null' and 'undefined' from the type.
  if (container.value != null) {
    console.log(container.value);

    // (property) Container.value: number

    // Now we can safely multiply 'container.value'.
    container.value *= factor;
  }
}

// The in Operator narrowing
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  if ("swim" in animal) {
    return animal.swim();
  }

  return animal.fly();
}

// Assignments

let x = Math.random() < 0.5 ? 10 : "Hello World";

x = 1;

console.log(x);

x = "goodby!";
console.log(x);

// x = true; // Type 'boolean' is not assignable to type 'string | number'.

// Using type predicates
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Discriminated unions

interface Shape {
  kind: "circle" | "square";
  radius?: number;
  sideLength?: number;
}

// ! non-null assertion
function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}

// The Never type
// Exhaustiveness checking

interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type NewShape = Circle | Square;
function getNewArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default: 
      // const _exhaustiveCheck: never = shape; // Type 'Shape' is not assignable to type 'never'.
      // return _exhaustiveCheck;
  }
}
