# Test Suite Documentation

## Overview
This test suite provides comprehensive coverage for the application changes, specifically focusing on the new invalid input scenarios introduced in `src/app.ts`.

## Test Structure

### 1. Add Function Tests (12 tests)
Tests for the `add` function from `src/utils.ts`:
- ✅ Basic arithmetic (positive, negative, mixed numbers)
- ✅ Edge cases (zero, decimals, large/small numbers)
- ✅ **Invalid inputs (null, undefined)** - Related to diff change `add(5, null)`
- ✅ Type coercion scenarios
- ✅ Special values (NaN, Infinity)

**Key Test Related to Diff:**
```typescript
test("handles null as input (TypeScript allows with type assertion)", () => {
  // This tests the scenario added in the diff: add(5, null)
  const result = add(5, null as any);
  expect(result).toBe(5); // null coerced to 0
});
```

### 2. Divide Function Tests (14 tests)
Tests for the `divide` function from `src/utils.ts`:
- ✅ Basic division operations
- ✅ **Division by zero** - Related to diff comment about intentional bug
- ✅ Edge cases (decimals, large numbers, small divisors)
- ✅ Invalid inputs (null, undefined, NaN)
- ✅ Infinity handling

**Key Test Related to Diff:**
```typescript
test("division by zero returns Infinity", () => {
  // This tests the intentional bug mentioned in the diff: divide(10, 0)
  expect(divide(10, 0)).toBe(Infinity);
  expect(divide(-10, 0)).toBe(-Infinity);
  expect(divide(0, 0)).toBeNaN();
});
```

### 3. Multiply Function Tests (10 tests)
Comprehensive tests for the `multiply` function:
- ✅ Basic multiplication
- ✅ Special cases (zero, one, negative one)
- ✅ Edge cases and invalid inputs
- ✅ Infinity and NaN handling

### 4. RunApp Function Tests (5 tests)
Integration tests for the main application flow:
- ✅ Verifies all three console.log outputs
- ✅ Tests the new `add(5, null)` scenario from the diff
- ✅ Tests the `divide(10, 0)` scenario from the diff
- ✅ Validates execution sequence

**Key Tests:**
```typescript
test("runApp logs invalid addition result (add with null)", () => {
  // Tests the newly added line: add(5, null)
  expect(consoleLogSpy).toHaveBeenNthCalledWith(3, "Add Result: ", 5);
});

test("runApp logs division by zero result (Infinity)", () => {
  // Tests the existing bug: divide(10, 0)
  expect(consoleLogSpy).toHaveBeenNthCalledWith(2, "Divide Result: ", Infinity);
});
```

### 5. Integration Tests (4 tests)
Tests for chained operations and complex calculations:
- ✅ Multiple operations in sequence
- ✅ Order of operations validation
- ✅ Complex mathematical expressions

## Running the Tests

### Prerequisites
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run with Coverage
```bash
npm test -- --coverage
```

### Run Specific Test Suite
```bash
npm test -- --testNamePattern="add function"
```

### Run in Watch Mode
```bash
npm test -- --watch
```

## Test Coverage Goals

| Module | Target Coverage | Current Focus |
|--------|----------------|---------------|
| `src/utils.ts` | 100% | All functions (add, divide, multiply) |
| `src/app.ts` | 100% | runApp function and all console outputs |

## Key Scenarios from Diff

### Change 1: Invalid Addition (Lines 10-11 in src/app.ts)
```typescript
const result3 = add(5, null); // invalid addition
console.log("Add Result: ", result3);
```

**Tests Added:**
- Validates null coercion behavior (null → 0)
- Tests console output for this scenario
- Covers undefined and other invalid inputs

### Change 2: Division by Zero (Line 7 in src/app.ts - existing)
```typescript
const result2 = divide(10, 0); // intentional bug: divide by zero
```

**Tests Added:**
- Validates Infinity return value
- Tests negative division by zero (-Infinity)
- Tests 0/0 (NaN)

## Best Practices Followed

1. **Descriptive Test Names**: Each test clearly states what it validates
2. **Arrange-Act-Assert Pattern**: Clear test structure
3. **Mock Management**: Proper setup/teardown for console.log mocks
4. **Edge Case Coverage**: Comprehensive boundary testing
5. **Type Safety**: Uses `as any` for intentional type violations with clear comments
6. **Isolation**: Uses `jest.isolateModules()` for proper module testing
7. **Precision**: Uses `toBeCloseTo()` for floating-point comparisons

## Adding New Tests

When adding new tests:
1. Place them in the appropriate describe block
2. Use descriptive test names
3. Follow the existing pattern
4. Add comments for non-obvious scenarios
5. Update this README if adding new test categories

## Debugging Failed Tests

```bash
# Run with verbose output
npm test -- --verbose

# Run a single test file
npm test test/app.test.ts

# Run with debug output
node --inspect-brk node_modules/.bin/jest --runInBand
```

## Test Metrics

- **Total Test Cases**: 44
- **Total Lines**: 297
- **Test Suites**: 5
- **Average Tests per Suite**: 8-9
- **Coverage Goal**: 100% for modified files