function solution(user_id, banned_id) {
  var answer = 0;
  let t = [];
  for (let i = 0; i < banned_id.length; i++) {
    const n = banned_id[i].length;
    let target = [];
    for (let j = 0; j < user_id.length; j++) {
      const m = user_id[j].length;
      if (n !== m) continue;
      let userPos = 0;
      let banPos = 0;
      while (banPos < n) {
        if (
          user_id[j][userPos] === banned_id[i][banPos] ||
          banned_id[i][banPos] === "*"
        ) {
          userPos++;
          banPos++;
        } else {
          break;
        }
      }
      if (userPos > 0 && banPos > 0 && userPos === m && banPos === n) {
        target.push(user_id[j]);
      }
    }
    t.push(target);
  }

  const set = new Set();

  const dfs = (idx, chosen) => {
    if (idx === t.length) {
      const key = [...chosen].sort().join(",");
      set.add(key);
      return;
    }

    for (const user of t[idx]) {
      if (chosen.has(user)) continue;
      chosen.add(user);
      dfs(idx + 1, chosen);
      chosen.delete(user);
    }
  };
  dfs(0, new Set());
  return set.size;
}
