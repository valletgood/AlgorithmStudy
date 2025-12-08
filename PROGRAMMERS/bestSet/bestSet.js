function solution(n, s) {
  if (s < n) return [-1];

  const d = Math.floor(s / n);
  let r = s % n;

  let dArr = Array.from({ length: n }).fill(d);

  if (r === 0) {
    return dArr;
  }

  let index = n - 1;

  while (r > 0) {
    dArr[index] = dArr[index] + 1;
    r--;
    if (index === 0) {
      index = n - 1;
    } else {
      index--;
    }
  }

  return dArr;
}
