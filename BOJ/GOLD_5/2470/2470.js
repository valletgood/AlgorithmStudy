const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const cases = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);

let leftPoint = 0;
let rightPoint = N - 1;
let diff = Infinity;
let answer = [cases[0], cases[N - 1]];
while (leftPoint < rightPoint) {
  const sum = cases[leftPoint] + cases[rightPoint];
  if (Math.abs(sum) < diff) {
    answer[0] = cases[leftPoint];
    answer[1] = cases[rightPoint];
    diff = Math.abs(sum);
  }
  if (sum > 0) {
    rightPoint--;
  } else if (sum < 0) {
    leftPoint++;
  } else if (sum === 0) {
    break;
  }
}
console.log(answer.join(" "));
