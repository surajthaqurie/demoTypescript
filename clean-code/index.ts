// Bad
const GENRE_BAD = {
  ROMANTIC: "romantic",
  DRAMA: "drama",
  COMEDY: "comedy",
  DOCUMENTARY: "documentary",
};

// Good
enum GENRE {
  ROMANTIC,
  DRAMA,
  COMEDY,
  DOCUMENTARY,
}

// projector.configureFilm(GENRE.COMEDY);

class Projector {
  // declaration of Projector
  configureFilm(genre) {
    switch (genre) {
      case GENRE.ROMANTIC:
      // some logic to be executed
    }
  }
}

// Functions ----------------
// Function arguments (2 or fewer ideally): destructuring syntax

// bad
function createMenu_bad(
  title: string,
  body: string,
  buttonText: string,
  cancellable: boolean
) {}

createMenu_bad("Foo", "Bar", "Baz", true);
// good

function createMenu_good(options: {
  title: string;
  body: string;
  buttonText: string;
  cancellable: boolean;
}) {}

createMenu_good({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});

type MenuOptions = {
  title: string;
  body: string;
  buttonText: string;
  cancellable: boolean;
};

function createMenu(options: MenuOptions) {}
createMenu({
  title: "Foo",
  body: "Bar",
  buttonText: "Baz",
  cancellable: true,
});

// function should do one thing: returns something

// Set default objects with Object.assign or destructuring
type MenuConfig = {
  title?: string;
  body?: string;
  buttonText?: string;
  cancellable?: boolean;
};

// Bad
function createBadMenu(config: MenuConfig) {
  config.title = config.title || "Foo";
  config.body = config.body || "Bar";
  config.buttonText = config.buttonText || "Baz";
  config.cancellable =
    config.cancellable !== undefined ? config.cancellable : true;
}
createBadMenu({ body: "Bar" });

// good
function createGoodMenu(config: MenuConfig) {
  const menuConfig = Object.assign(
    {
      title: "Foo",
      body: "Bar",
      buttonText: "Baz",
      cancellable: true,
    },
    config
  );
}
createGoodMenu({ body: "Bar" });

// Objects and Data Structures
// User getters and setters

// bad
type BankAccount_bad = {
  balance: number;
  // ....
};

const value = 100;
const account_bad: BankAccount_bad = {
  balance: 0,
  // ...
};

if (value < 0) {
  throw new Error("Cannot set negative balance");
}

// Good
class BankAccount {
  private accountBalance: number = 0;

  get balance(): number {
    return this.accountBalance;
  }

  set balance(value: number) {
    if (value < 0) {
      throw new Error("Cannot set negative balance");
    }
    this.accountBalance = value;
  }

  // ...
}

const account = new BankAccount();
account.balance = 100;

// Make objects have private/protected members
// Bad
class Circle_bad {
  radius: number;

  constructor(radius: number) {
    this.radius = radius;
  }
  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}

// Good
class Circle {
  constructor(private readonly radius: number) {}
  perimeter() {
    return 2 * Math.PI * this.radius;
  }

  surface() {
    return Math.PI * this.radius * this.radius;
  }
}

// Prefer Immutability ---------------
interface Config_bad {
  host: string;
  port: string;
  db: string;
}

interface Config {
  readonly host: string;
  readonly port: string;
  readonly db: string;
}

// Declaring read-only arguments
function hoge(args: readonly string[]) {
  //   args.push(1); // error
}

// Prefer const assertions for literal values.
const config_bad = {
  hello: "world",
};

config_bad.hello = "world"; // valuer is changed

const array_bad = [1, 2, 3, 5];
array_bad[0] = 10; // valuer is changed

// writable object is returned
function readonlyData_bad(value: number) {
  return { value };
}

const result_bad = readonlyData_bad(100);
result_bad.value = 200; // value change

// Good

const config = {
  hello: "world",
} as const;

// config.hello = "world"; // Cannot assign to 'hello' because it is a read-only property.

const array = [1, 2, 3, 4] as const;
// array[0] = 10; // error

function readonlyData(value: number) {
  return { value } as const;
}

const result = readonlyData(100);
// result.value = 200; // error

// Classes ----------------------------------
// classes should be small
// Prefer composition over inheritance
// -- Your inheritance represents an "is-a" relationship and not a "has-a" relationship (Human->Animal vs. User->UserDetails).

// Use method chaining -----------------

class QueryBuilder_bad {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): void {
    this.collection = collection;
  }

  page(number: number, itemsPerPage: number = 100): void {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
  }

  orderBy(...fields: string[]): void {
    this.orderByFields = fields;
  }

  // build(): Query {
  //   // ...
  // }
}

// ...
const queryBuilder_bad = new QueryBuilder_bad();
queryBuilder_bad.from("users");
queryBuilder_bad.page(1, 100);
queryBuilder_bad.orderBy("firstName", "lastName");

// Good
class QueryBuilder {
  private collection: string;
  private pageNumber: number = 1;
  private itemsPerPage: number = 100;
  private orderByFields: string[] = [];

  from(collection: string): this {
    this.collection = collection;
    return this;
  }

  page(number: number, itemsPerPage: number = 100): this {
    this.pageNumber = number;
    this.itemsPerPage = itemsPerPage;
    return this;
  }

  orderBy(...fields: string[]): this {
    this.orderByFields = fields;
    return this;
  }
}

const quey = new QueryBuilder()
  .from("users")
  .page(1, 100)
  .orderBy("firstName", "lastName");

// SOLID
// Single Responsibility Principle (SRP)

// Open/Closed Principle (OCP)
// - This principle basically states that you should allow users to add new functionalities without changing existing code.

// Liskov Substitution Principle (LSP)

// Interface Segregation Principle (ISP)

// Bad
interface SmartPrinter {
  print();
  fax();
  scan();
}

class AllInOnePrinter implements SmartPrinter {
  print() {
    // ...
  }
  fax() {
    // ..
  }

  scan() {
    // ...
  }
}

class EconomicPrinter implements SmartPrinter {
  print() {
    // .....
  }
  fax() {
    throw new Error("Fax not supported");
  }
  scan() {
    throw new Error("Scan not supported");
  }
}

// Good
interface Printer {
  print();
}

interface Fax {
  fax();
}

interface Scanner {
  scan();
}

class AllInOnePrinter_good implements Printer, Fax, Scanner {
  print() {
    // ...
  }
  fax() {
    // ..
  }

  scan() {
    // ...
  }
}
class EconomicPrinter_goog implements Printer {
  print() {
    // ...
  }
}

// Dependency Inversion Principle (DIP)
// 1. High-level modules should not depend on low-level modules. Both should depend on abstractions.
// 2. Abstractions should not depend upon details. Details should depend on abstractions.


// Function callers and callees should be close
