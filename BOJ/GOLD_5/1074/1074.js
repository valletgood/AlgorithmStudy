const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim();

const [N, r, c] = input.split(" ").map(Number);

let total = Math.pow(2, N * 2);
let answer = 0;

const getResult = (r, c, N, cur) => {
  const length = Math.pow(2, N);
  const half = length / 2;
  if (N === 1) {
    // 연산
    if (r >= half && c >= half) {
      // 4구역
      answer = cur - 1;
      return;
    } else if (r >= half && c < half) {
      // 3구역
      answer = cur - 2;
      return;
    } else if (r < half && c >= half) {
      // 2구역
      answer = cur - 3;
      return;
    } else {
      // 1rndur
      answer = cur - 4;
      return;
    }
  }
  const sum = Math.pow(2, 2 * (N - 1));
  if (r >= half && c >= half) {
    // 4구역
    getResult(r % half, c % half, N - 1, cur);
  } else if (r >= half && c < half) {
    // 3구역
    getResult(r % half, c % half, N - 1, cur - sum);
  } else if (r < half && c >= half) {
    // 2구역
    getResult(r % half, c % half, N - 1, cur - 2 * sum);
  } else {
    // 1rndur
    getResult(r % half, c % half, N - 1, cur - 3 * sum);
  }
};

getResult(r, c, N, total);
console.log(answer);
