// truthiness narrowing ------------------------
function printAll(strs) {
    if (strs && typeof strs === "object") {
        // check here it value is available or not
        for (var _i = 0, strs_1 = strs; _i < strs_1.length; _i++) {
            var s = strs_1[_i];
            console.log(s);
        }
    }
    else if (typeof strs === "string") {
        console.log(strs);
    }
}
function multiplyValue(container, factor) {
    // Remove both 'null' and 'undefined' from the type.
    if (container.value != null) {
        console.log(container.value);
        // (property) Container.value: number
        // Now we can safely multiply 'container.value'.
        container.value *= factor;
    }
}
function move(animal) {
    if ("swim" in animal) {
        return animal.swim();
    }
    return animal.fly();
}
// Assignments
var x = Math.random() < 0.5 ? 10 : "Hello World";
x = 1;
console.log(x);
x = "goodby!";
console.log(x);
