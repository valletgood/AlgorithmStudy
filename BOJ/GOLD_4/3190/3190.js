const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const N = Number(input[0]);
const K = Number(input[1]);
const apples = new Set(
  input.slice(2, K + 2).map((item) => item.split(" ").map(Number))
);
const L = Number(input[K + 2]);
const changes = input.slice(K + 3).map((item) => item.split(" "));

let head = [0, 0];
let answer = 0;
let changesIndex = 0;
let bodyQueue = [[0, 0]];
let length = 1;
let direction = 0; // 0: 오른쪽, 1: 아래, 2: 왼쪽, 3: 위쪽

outer: while (head[0] >= 0 && head[1] >= 0 && head[0] < N && head[1] < N) {
  answer++; // 1초 증가
  // 이동
  if (direction === 0) {
    head[1] += 1;
  } else if (direction === 1) {
    head[0] += 1;
  } else if (direction === 2) {
    head[1] -= 1;
  } else if (direction === 3) {
    head[0] -= 1;
  }
  for (const [bx, by] of bodyQueue) {
    if (head[0] === bx && head[1] === by) break outer;
  }
  if (
    changesIndex < changes.length &&
    answer === Number(changes[changesIndex][0])
  ) {
    const [t, d] = changes[changesIndex];
    if (d === "D") {
      direction = (direction + 1) % 4;
    } else if (d === "L") {
      direction = (direction + 3) % 4;
    }
    changesIndex++;
  }

  // 헤드 추가
  bodyQueue.push([head[0], head[1]]);
  let isApple = false;
  for (const pos of apples) {
    const [ax, ay] = pos;
    if (ax - 1 === head[0] && ay - 1 === head[1]) {
      length++;
      isApple = true;
      apples.delete(pos);
      break;
    }
  }
  if (!isApple) {
    bodyQueue.shift();
  }
}
console.log(answer);
