let l = 0;
let r = N - 1;
let diff = Infinity;
let answer = [];

while (r > 0 && l < N - 1) {
  const sum = cases[l] + cases[r];
  if (Math.abs(sum) < diff) {
    diff = Math.abs(sum);
    answer = [cases[l], cases[r]];
  }
  if (sum < 0) l++;
  else if (sum > 0) r--;
  else break;
}

console.log(answer);
