function solution(n, works) {
  const sum = works.reduce((acc, v) => acc + v, 0);
  if (sum < n) return 0;
  if (sum === n) return 1;
  const map = new Map();
  const set = new Set(works);
  let answer = 0;
  const sorted = works.sort((a, b) => b - a);
  let max = sorted[0];

  for (let i = 0; i < works.length; i++) {
    const num = works[i];
    const value = map.get(num);
    map.set(works[i], value ? value + 1 : 1);
  }
  for (let i = 0; i < n; i++) {
    const maxCount = map.get(max);
    const v = map.get(max - 1);
    map.set(max - 1, v ? v + 1 : 1);
    if (maxCount === 1) {
      set.delete(max);
      set.add(max - 1);
      map.delete(max);
      max--;
    } else {
      map.set(max, map.get(max) - 1);
    }
  }

  for (const [key, values] of map) {
    answer += Math.pow(key, 2) * values;
  }

  return answer;
}
