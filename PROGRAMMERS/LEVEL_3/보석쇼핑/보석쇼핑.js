function solution(gems) {
  const allSize = new Set(gems).size;
  if (allSize === 1) return [1, 1];
  const buyMap = new Map();
  let pos = 0;
  let cur = 1;
  let best = [];
  let bestLen = Infinity;
  buyMap.set(gems[0], 1);
  while (cur < gems.length) {
    const gem = gems[cur];
    const v = buyMap.get(gem);
    buyMap.set(gem, v ? v + 1 : 1);
    while (buyMap.size === allSize) {
      const g = gems[pos];
      const v1 = buyMap.get(g);
      if (bestLen > cur - pos || (bestLen === cur - pos && best[0] > pos + 1)) {
        best = [pos + 1, cur + 1];
        bestLen = cur - pos;
      }
      if (v1 === 1) {
        buyMap.delete(g);
      } else {
        buyMap.set(g, v1 - 1);
      }
      pos++;
    }
    cur++;
  }
  return best;
}
