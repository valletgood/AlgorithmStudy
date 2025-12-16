function solution(A, B) {
  let answer = 0;
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  let i = 0;
  let j = 0;

  while (i < A.length && j < B.length) {
    if (A[i] < B[j]) {
      answer++;
      i++;
      j++;
    } else {
      j++;
    }
  }
  return answer;
}
