import { add, divide } from "./utils";

const runApp = () => {
  const result1 = add(5, 10);
  console.log("Add Result: ", result1);

  const result2 = divide(10, 0); // intentional bug: divide by zero
  console.log("Divide Result: ", result2);
};

runApp();
