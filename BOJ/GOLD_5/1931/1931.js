const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);

const meetings = input
  .slice(1)
  .map((item) => item.split(" ").map(Number))
  .sort((a, b) => {
    if (a[1] === b[1]) {
      return a[0] - b[0];
    }
    return a[1] - b[1];
  });

let count = 1;
let doing = meetings[0];

for (let i = 1; i < meetings.length; i++) {
  const [beforeStart, beforeEnd] = doing;
  const [currentStart, currentEnd] = meetings[i];

  if (beforeEnd <= currentStart) {
    count++;
    doing = meetings[i];
  }
}

console.log(count);
