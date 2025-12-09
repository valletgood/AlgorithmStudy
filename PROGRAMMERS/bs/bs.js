function solution(n, stations, w) {
  let answer = 0;

  for (let i = 0; i < stations.length; i++) {
    const exist = stations[i];
    let start = 0;
    let end = 0;
    if (i === 0) {
      start = 1;
      end = exist - w - 1;
    } else {
      start = stations[i - 1] + w + 1;
      end = exist - w - 1;
    }
    const p = (end - start + 1) / (w * 2 + 1);
    const r = (end - start + 1) % (w * 2 + 1);
    answer += r === 0 ? p : Math.ceil(p);
    if (i === stations.length - 1) {
      const start = exist + w + 1;
      const end = n;
      const p = (end - start + 1) / (w * 2 + 1);
      const r = (end - start + 1) % (w * 2 + 1);
      answer += r === 0 ? p : Math.ceil(p);
    }
  }

  return answer;
}
