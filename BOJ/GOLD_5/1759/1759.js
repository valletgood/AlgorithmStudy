const fs = require("fs");
const input = fs.readFileSync(0, "utf8").trim().split("\n");
const [L, C] = input[0].split(" ").map(Number);
const chars = input[1].split(" ").sort((a, b) => a.localeCompare(b));

const ms = ["a", "e", "i", "o", "u"];

const getCombi = (arr, n) => {
  let result = [];
  let selected = [];

  const dfs = (start) => {
    if (selected.length === n) {
      let isM = 0;
      for (let i = 0; i < selected.length; i++) {
        const char = selected[i];
        for (const m of ms) {
          if (char === m) {
            isM++;
          }
        }
      }
      if (isM >= 1 && selected.length - isM >= 2) {
        result.push(selected.join(""));
      }
      return;
    }

    for (let i = start; i < arr.length; i++) {
      selected.push(arr[i]);
      dfs(i + 1);
      selected.pop();
    }
  };

  dfs(0);
  return result;
};

console.log(getCombi(chars, L).join("\n"));
