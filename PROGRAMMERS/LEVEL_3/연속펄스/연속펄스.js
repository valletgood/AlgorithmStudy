function solution(sequence) {
  const dp1 = Array(sequence.length).fill(0);
  const dp2 = Array(sequence.length).fill(0);
  const startPlus = [];
  const startMinus = [];

  for (let i = 0; i < sequence.length; i++) {
    if (i % 2 === 0) {
      startPlus.push(1);
      startMinus.push(-1);
    } else {
      startPlus.push(-1);
      startMinus.push(1);
    }
  }

  dp1[0] = sequence[0];
  dp2[0] = -1 * sequence[0];

  let max = Math.max(dp1[0], dp2[0]);

  for (let i = 1; i < sequence.length; i++) {
    dp1[i] = Math.max(
      sequence[i] * startPlus[i] + dp1[i - 1],
      sequence[i] * startPlus[i]
    );
    dp2[i] = Math.max(
      sequence[i] * startMinus[i] + dp2[i - 1],
      sequence[i] * startMinus[i]
    );
    max = Math.max(max, dp1[i], dp2[i]);
  }

  return max;
}
