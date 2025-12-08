## 문제

https://www.acmicpc.net/problem/15686

### 문제 파악하기

위 문제는 백준 알고리즘 15686 치킨 배달 문제이다.

N x N 크기의 도시에서 M개의 치킨집을 선택했을 때, 도시의 치킨 거리(모든 집에서 가장 가까운 치킨집까지의 거리 합)의 최솟값을 구하는 문제다.

<aside>
💡

이 문제는 조합(Combination)을 활용한 완전 탐색 문제이다. 모든 치킨집 중에서 M개를 선택하는 모든 경우의 수를 구한 뒤, 각 경우에 대해 치킨 거리를 계산하여 최솟값을 찾는다.

</aside>

## 풀이

### 1. 치킨집과 집의 좌표 수집

```javascript
const cs = [];
const hs = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 2) cs.push([i, j]);
    else if (board[i][j] === 1) hs.push([i, j]);
  }
}
```

- 보드를 순회하면서 치킨집(`2`)과 집(`1`)의 좌표를 각각 배열에 저장한다.

### 2. 조합 생성 (DFS)

```javascript
const getcsCombi = (arr, M) => {
  let result = [];
  let selected = [];

  function dfs(start) {
    if (selected.length === M) {
      result.push([...selected]);
      return;
    }

    for (let i = start; i < arr.length; i++) {
      selected.push(arr[i]);
      dfs(i + 1);
      selected.pop();
    }
  }

  dfs(0);
  return result;
};
```

- DFS를 활용하여 치킨집 배열에서 M개를 선택하는 모든 조합을 생성한다.
- `start` 인덱스를 활용하여 중복 없이 조합을 만든다.

<aside>
💡

조합은 순서가 중요하지 않기 때문에 `start` 인덱스부터 탐색을 시작하여 이미 선택한 원소 이전의 원소들은 고려하지 않는다.

</aside>

### 3. 치킨 거리 계산

```javascript
for (let i = 0; i < csArr.length; i++) {
  const c = csArr[i];
  let count = 0;
  for (let j = 0; j < hs.length; j++) {
    let min = 651;
    const [hx, hy] = hs[j];
    for (let z = 0; z < c.length; z++) {
      const [x, y] = c[z];
      min = Math.min(min, Math.abs(x - hx) + Math.abs(y - hy));
    }
    count += min;
  }
  answer = Math.min(answer, count);
}
```

- 각 치킨집 조합에 대해 모든 집의 치킨 거리를 계산한다.
- 각 집에서 선택된 치킨집들 중 가장 가까운 치킨집까지의 거리(맨해튼 거리)를 구한다.
- 모든 집의 치킨 거리를 합산한 값이 해당 조합의 도시 치킨 거리가 된다.
- 모든 조합 중 최솟값을 `answer`에 저장한다.

<aside>
💡

맨해튼 거리: 두 점 (x1, y1)과 (x2, y2) 사이의 거리를 |x1 - x2| + |y1 - y2|로 계산한다.

</aside>
