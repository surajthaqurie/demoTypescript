function identity<Type>(arg: Type): Type {
  return arg;
}

let output = identity<string>("myString");
let output1 = identity("myString"); // compiler set the value of Type

function loggingIdentity<Type>(arg: Type): Type {
  // console.log(arg.length); // Property 'length' does not exist on type 'Type'.
  return arg;
}

function loggingIdentity1<Type>(arg: Array<Type>): Array<Type> {
  console.log(arg.length); // Array has a .length, so no more error
  return arg;
}

// Generic type ----------------------------
function identity1<Type>(arg: Type): Type {
  return arg;
}

let myIdentity: <Type>(arg: Type) => Type = identity1;
let myIdentity1: <Input>(arg: Input) => Input = identity1;

interface GenericIdentityFn {
  <Type>(arg: Type): Type;
}

function identity2<Type>(arg: Type): Type {
  return arg;
}

let myIdentity2: GenericIdentityFn = identity2;

// Generic Classes
class GenericNumber<NumType> {
  zeroValue: NumType;
  add: (x: NumType, y: NumType) => NumType;
}

let myGenericNumber = new GenericNumber<number>();

myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

let stringNumeric = new GenericNumber<string>();
stringNumeric.zeroValue = "";
stringNumeric.add = function (x, y) {
  return x + y;
};

console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));

// Generic Constraints --------------------------------
interface LengthWise {
  length: number;
}

function loggingIdentity2<Type extends LengthWise>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

// loggingIdentity2(3) // Argument of type 'number' is not assignable to parameter of type 'LengthWise'.
loggingIdentity2({ length: 10, value: 3 });

// Using Class Types in Generics -------------------------------
function create<Type>(c: { new (): Type }): Type {
  return new c();
}

class BeeKeeper {
  hashMask: boolean = true;
}

class ZooKeeper {
  nameTag: string = "Mikle";
}

class Animal {
  numLegs: number = 4;
}

class Bee extends Animal {
  keeper: BeeKeeper = new BeeKeeper();
}

class Loin extends Animal {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal>(c: new () => A): A {
  return new c();
}

createInstance(Loin).keeper.nameTag;
createInstance(Bee).keeper.hashMask;
