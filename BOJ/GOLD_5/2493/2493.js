const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");

const N = Number(input[0]);
const tops = input[1].split(" ").map(Number);

const answer = Array(N).fill(0);

const stack = [];

for (let i = 0; i < N; i++) {
  while (stack.length && tops[stack[stack.length - 1]] <= tops[i]) {
    stack.pop();
  }
  answer[i] = stack.length ? stack[stack.length - 1] + 1 : 0;
  stack.push(i);
}

console.log(answer.join(" "));
