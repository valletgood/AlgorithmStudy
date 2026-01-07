const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const target = input[0];
const N = Number(input[1]);
const nums = input[2] ? input[2].split(" ").map(Number) : [];
const broken = Array(10).fill(false);

let answer = Math.abs(target - 100);

for (const num of nums) {
  broken[num] = true;
}

const canType = (num) => {
  if (num === 0) return !broken[0];
  while (num > 0) {
    const d = num % 10;
    if (broken[d]) return false;
    num = Math.floor(num / 10);
  }
  return true;
};

const len = (num) => (num === 0 ? 1 : String(num).length);

for (let i = 0; i < 1000001; i++) {
  if (!canType(i)) continue;
  const r = len(i) + Math.abs(target - i);
  if (r < answer) answer = r;
}
console.log(answer);
