const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);
const trueth = input[1].split(" ").slice(1).map(Number);
const party = input
  .slice(2)
  .map((item) => item.split(" ").slice(1).map(Number));
const trueArr = Array(N + 1).fill(false);

const dfs = (start) => {
  let stack = [start];
  trueArr[start] = true;
  while (stack.length) {
    const person = stack.pop();
    for (const p of party) {
      if (p.includes(person)) {
        for (let i = 0; i < p.length; i++) {
          if (p[i] === person) continue;
          if (trueArr[p[i]]) continue;
          trueArr[p[i]] = true;
          stack.push(p[i]);
        }
      }
    }
  }
};

for (let i = 0; i < trueth.length; i++) {
  if (trueArr[trueth[i]]) continue;
  dfs(trueth[i]);
}

let answer = 0;

outer: for (const p of party) {
  for (const person of p) {
    if (trueArr[person]) continue outer;
  }
  answer++;
}
console.log(answer);
