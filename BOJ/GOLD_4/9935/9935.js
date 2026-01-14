const fs = require("fs");
const [string, bomb] = fs.readFileSync(0, "utf8").trim().split("\n");

const stack = [];
let head = 0;

for (let i = 0; i < string.length; i++) {
  stack.push(string[i]);
  if (stack.length >= bomb.length) {
    let index = 0;
    while (index < bomb.length) {
      if (stack[stack.length - index - 1] === bomb[bomb.length - index - 1]) {
        index++;
      } else {
        break;
      }
    }
    if (index === bomb.length) {
      for (let i = 0; i < bomb.length; i++) {
        stack.pop();
      }
    }
  }
}

console.log(stack.length === 0 ? "FRULA" : stack.join(""));
