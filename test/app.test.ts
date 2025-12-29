import { add, divide, multiply } from "../src/utils";

// ==================== ADD FUNCTION TESTS ====================
describe("add function", () => {
  test("adds two positive numbers correctly", () => {
    expect(add(1, 2)).toBe(3);
  });

  test("adds two negative numbers correctly", () => {
    expect(add(-5, -3)).toBe(-8);
  });

  test("adds positive and negative numbers correctly", () => {
    expect(add(10, -5)).toBe(5);
    expect(add(-10, 5)).toBe(-5);
  });

  test("adds zero to a number", () => {
    expect(add(5, 0)).toBe(5);
    expect(add(0, 5)).toBe(5);
    expect(add(0, 0)).toBe(0);
  });

  test("handles decimal numbers correctly", () => {
    expect(add(1.5, 2.3)).toBeCloseTo(3.8);
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test("handles very large numbers", () => {
    expect(add(Number.MAX_SAFE_INTEGER - 1, 1)).toBe(Number.MAX_SAFE_INTEGER);
  });

  test("handles very small numbers", () => {
    expect(add(Number.MIN_SAFE_INTEGER + 1, -1)).toBe(Number.MIN_SAFE_INTEGER);
  });

  test("handles null as input (TypeScript allows with type assertion)", () => {
    // This tests the scenario added in the diff: add(5, null)
    // In JavaScript/TypeScript, null is coerced to 0 in arithmetic operations
    const result = add(5, null as any);
    expect(result).toBe(5);
  });

  test("handles undefined as input", () => {
    // undefined is coerced to NaN in arithmetic operations
    const result = add(5, undefined as any);
    expect(result).toBeNaN();
  });

  test("handles string inputs (type coercion)", () => {
    // TypeScript would prevent this, but JavaScript allows it
    const result = add("5" as any, "3" as any);
    expect(result).toBe("53"); // String concatenation
  });

  test("handles NaN inputs", () => {
    expect(add(NaN, 5)).toBeNaN();
    expect(add(5, NaN)).toBeNaN();
    expect(add(NaN, NaN)).toBeNaN();
  });

  test("handles Infinity", () => {
    expect(add(Infinity, 5)).toBe(Infinity);
    expect(add(5, Infinity)).toBe(Infinity);
    expect(add(Infinity, Infinity)).toBe(Infinity);
    expect(add(-Infinity, -Infinity)).toBe(-Infinity);
  });
});

// ==================== DIVIDE FUNCTION TESTS ====================
describe("divide function", () => {
  test("divides two positive numbers correctly", () => {
    expect(divide(10, 2)).toBe(5);
    expect(divide(15, 3)).toBe(5);
  });

  test("divides negative numbers correctly", () => {
    expect(divide(-10, 2)).toBe(-5);
    expect(divide(10, -2)).toBe(-5);
    expect(divide(-10, -2)).toBe(5);
  });

  test("divides by one returns the same number", () => {
    expect(divide(42, 1)).toBe(42);
    expect(divide(-42, 1)).toBe(-42);
  });

  test("dividing zero by a number returns zero", () => {
    expect(divide(0, 5)).toBe(0);
    expect(divide(0, -5)).toBe(-0);
  });

  test("handles decimal division correctly", () => {
    expect(divide(5, 2)).toBe(2.5);
    expect(divide(1, 3)).toBeCloseTo(0.333333, 5);
  });

  test("division by zero returns Infinity", () => {
    // This tests the intentional bug mentioned in the diff: divide(10, 0)
    expect(divide(10, 0)).toBe(Infinity);
    expect(divide(-10, 0)).toBe(-Infinity);
    expect(divide(0, 0)).toBeNaN();
  });

  test("handles very large numbers", () => {
    expect(divide(Number.MAX_SAFE_INTEGER, 2)).toBe(Number.MAX_SAFE_INTEGER / 2);
  });

  test("handles very small divisors", () => {
    const result = divide(1, 0.0001);
    expect(result).toBe(10000);
  });

  test("handles null as input", () => {
    // null is coerced to 0
    expect(divide(10, null as any)).toBe(Infinity);
    expect(divide(null as any, 10)).toBe(0);
  });

  test("handles undefined as input", () => {
    // undefined is coerced to NaN
    expect(divide(10, undefined as any)).toBeNaN();
    expect(divide(undefined as any, 10)).toBeNaN();
  });

  test("handles NaN inputs", () => {
    expect(divide(NaN, 5)).toBeNaN();
    expect(divide(5, NaN)).toBeNaN();
  });

  test("handles Infinity", () => {
    expect(divide(Infinity, 5)).toBe(Infinity);
    expect(divide(5, Infinity)).toBe(0);
    expect(divide(Infinity, Infinity)).toBeNaN();
  });
});

// ==================== MULTIPLY FUNCTION TESTS ====================
describe("multiply function", () => {
  test("multiplies two positive numbers correctly", () => {
    expect(multiply(5, 3)).toBe(15);
    expect(multiply(7, 8)).toBe(56);
  });

  test("multiplies negative numbers correctly", () => {
    expect(multiply(-5, 3)).toBe(-15);
    expect(multiply(5, -3)).toBe(-15);
    expect(multiply(-5, -3)).toBe(15);
  });

  test("multiplies by zero returns zero", () => {
    expect(multiply(5, 0)).toBe(0);
    expect(multiply(0, 5)).toBe(0);
    expect(multiply(0, 0)).toBe(0);
  });

  test("multiplies by one returns the same number", () => {
    expect(multiply(42, 1)).toBe(42);
    expect(multiply(1, 42)).toBe(42);
  });

  test("multiplies by negative one inverts the number", () => {
    expect(multiply(5, -1)).toBe(-5);
    expect(multiply(-5, -1)).toBe(5);
  });

  test("handles decimal multiplication correctly", () => {
    expect(multiply(2.5, 4)).toBe(10);
    expect(multiply(0.1, 0.2)).toBeCloseTo(0.02);
  });

  test("handles very large numbers", () => {
    expect(multiply(1000000, 1000000)).toBe(1000000000000);
  });

  test("handles null as input", () => {
    // null is coerced to 0
    expect(multiply(5, null as any)).toBe(0);
    expect(multiply(null as any, 5)).toBe(0);
  });

  test("handles undefined as input", () => {
    // undefined is coerced to NaN
    expect(multiply(5, undefined as any)).toBeNaN();
    expect(multiply(undefined as any, 5)).toBeNaN();
  });

  test("handles NaN inputs", () => {
    expect(multiply(NaN, 5)).toBeNaN();
    expect(multiply(5, NaN)).toBeNaN();
  });

  test("handles Infinity", () => {
    expect(multiply(Infinity, 5)).toBe(Infinity);
    expect(multiply(5, Infinity)).toBe(Infinity);
    expect(multiply(Infinity, 0)).toBeNaN();
    expect(multiply(0, Infinity)).toBeNaN();
    expect(multiply(Infinity, Infinity)).toBe(Infinity);
    expect(multiply(-Infinity, Infinity)).toBe(-Infinity);
  });
});

// ==================== RUNAPP FUNCTION TESTS ====================
describe("runApp function from app.ts", () => {
  let consoleLogSpy: jest.SpyInstance;

  beforeEach(() => {
    // Mock console.log to capture output
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    // Restore console.log after each test
    consoleLogSpy.mockRestore();
  });

  test("runApp executes and logs all three results", () => {
    // Import and run the app
    jest.isolateModules(() => {
      require("../src/app");
    });

    // Verify console.log was called 3 times
    expect(consoleLogSpy).toHaveBeenCalledTimes(3);
  });

  test("runApp logs correct addition result", () => {
    jest.isolateModules(() => {
      require("../src/app");
    });

    // Check the first call: add(5, 10) = 15
    expect(consoleLogSpy).toHaveBeenNthCalledWith(1, "Add Result: ", 15);
  });

  test("runApp logs division by zero result (Infinity)", () => {
    jest.isolateModules(() => {
      require("../src/app");
    });

    // Check the second call: divide(10, 0) = Infinity
    expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "Divide Result: ", Infinity);
  });

  test("runApp logs invalid addition result (add with null)", () => {
    jest.isolateModules(() => {
      require("../src/app");
    });

    // Check the third call: add(5, null) = 5 (null coerced to 0)
    expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "Add Result: ", 5);
  });

  test("runApp handles all operations in sequence", () => {
    jest.isolateModules(() => {
      require("../src/app");
    });

    // Verify all three operations were logged in order
    const calls = consoleLogSpy.mock.calls;
    expect(calls[0]).toEqual(["Add Result: ", 15]);
    expect(calls[1]).toEqual(["Divide Result: ", Infinity]);
    expect(calls[2]).toEqual(["Add Result: ", 5]);
  });
});

// ==================== INTEGRATION TESTS ====================
describe("Integration tests for utility functions", () => {
  test("chaining operations: add then divide", () => {
    const sum = add(10, 5);
    const result = divide(sum, 3);
    expect(result).toBe(5);
  });

  test("chaining operations: multiply then add", () => {
    const product = multiply(5, 3);
    const result = add(product, 10);
    expect(result).toBe(25);
  });

  test("complex calculation: (a + b) * c / d", () => {
    const a = 5, b = 10, c = 3, d = 5;
    const sum = add(a, b);
    const product = multiply(sum, c);
    const result = divide(product, d);
    expect(result).toBe(9);
  });

  test("order of operations matters", () => {
    // (5 + 10) / 3 vs 5 + (10 / 3)
    const result1 = divide(add(5, 10), 3);
    const result2 = add(5, divide(10, 3));
    expect(result1).toBe(5);
    expect(result2).toBeCloseTo(8.333333, 5);
    expect(result1).not.toBe(result2);
  });
});
