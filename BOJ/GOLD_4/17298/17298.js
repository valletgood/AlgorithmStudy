const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

let answer = Array(N).fill(-1);
const stack = []; // 인덱스 저장
for (let i = 0; i < N; i++) {
  while (stack.length && nums[stack[stack.length - 1]] < nums[i]) {
    answer[stack.pop()] = nums[i];
  }
  stack.push(i);
}

console.log(answer.join(" "));
