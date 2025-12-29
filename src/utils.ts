export const add = (a: number, b: number) => {
  return a + b; // missing semicolon
};

export const divide = (a: number, b: number) => {
  return a / b; // no check for division by zero
};

// unused function
export const multiply = (a: number, b: number) => {
  return a * b;
};
