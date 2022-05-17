// Function Type Expressions
function greeter(fn) {
    fn("Hello World");
}
function printToConsole(s) {
    console.log(s);
}
greeter(printToConsole);
function greeterNew(fn) { }
function doSomeThing(fn) {
    console.log(fn.description + " returned " + fn(6));
}
// Generic Functions
function firstElement(arr) {
    return arr[0];
}
function secondElement(arr) {
    return arr[0];
}
var s = secondElement(["a", "b", "c"]);
var n = secondElement([1, 2, 3]);
var u = secondElement([]);
// Inference
function map(arr, func) {
    return arr.map(func);
}
var parsed = map(["1", "3", "2"], function (n) { return parseInt(n); });
// Constraints
function longest(a, b) {
    if (a.length >= b.length) {
        return a;
    }
    else {
        return b;
    }
}
// longerArray is of type 'number[]'
var longerArray = longest([1, 2], [1, 2, 3]);
// longerString is of type 'alice' | 'bob'
var longerString = longest("alice", "bob");
// Error! Numbers don't have a 'length' property
// const notOK = longest(10, 100); // Argument of type 'number' is not assignable to parameter of type '{ length: number; }
// Specifying type Arguments
function combine(arr1, arr2) {
    return arr1.concat(arr2);
}
// const arr = combine([1, 2, 3], ["hello"]); // Type 'string' is not assignable to type 'number'
var arr = combine([1, 2, 3], ["hello"]);
// Optional Parameters  '?'
function f(n) {
    console.log(n.toFixed());
    console.log(n.toFixed(3));
}
function makeDate(mOrTimestamp, d, y) {
    if (d !== undefined && y !== undefined) {
        return new Date(y, mOrTimestamp, d);
    }
    else {
        return new Date(mOrTimestamp);
    }
}
var d1 = makeDate(12345678);
var d2 = makeDate(5, 5, 5);
function fn() {
    // ...
}
function len(x) {
    return x.length;
}
// Declaring "this" in a Function
var User = {
    id: 123,
    admin: false,
    becomeAdmin: function () {
        this.admin = true;
    }
};
// interface DB {
//   filterUsers(filter: (this: User) => boolean): User[];
// }
// const db = getDb();
// const admins = db.filterUsers(function(this:User))
// Rest Parameters and Arguments ---------------
// Rest Parameters
function multiply(n) {
    var m = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        m[_i - 1] = arguments[_i];
    }
    return m.map(function (x) { return n * x; });
}
var a = multiply(10, 1, 2, 3, 4);
console.log(a);
// Rest Arguments
var arr1 = [1, 3, 2];
var arr2 = [4, 5, 6];
arr1.push.apply(arr1, arr2);
// Parameter Destructuring ----------------------------------
function sum(_a) {
    var a = _a.a, b = _a.b, c = _a.c;
    console.log(a + b + c);
}
sum({ a: 10, b: 3, c: 9 });
