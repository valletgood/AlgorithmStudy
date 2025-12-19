## 문제

https://www.acmicpc.net/problem/1753

### 문제 파악하기

위 문제는 백준 알고리즘 1753 최단경로 문제이다.

방향 그래프에서 시작점으로부터 모든 정점까지의 최단 경로를 구하는 문제다. 도달할 수 없는 정점은 INF를 출력한다.

> [!NOTE] > **다익스트라 알고리즘**: 가중치가 있는 그래프에서 단일 시작점으로부터 모든 정점까지의 최단 경로를 구한다.
>
> - 우선순위 큐(최소 힙)를 사용해 효율적으로 구현
> - 시간 복잡도: O((V + E) log V)
> - 음수 가중치가 없는 그래프에서만 사용 가능

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 0; i < lines.length; i++) {
  const [s, e, d] = lines[i];
  graph[s].push([e, d]); // [도착 정점, 가중치]
}
```

- 인접 리스트로 방향 그래프 구성
- `graph[s]`: s에서 출발하는 간선들의 목록

### 2. 최소 힙 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.arr[parent][1] <= this.arr[i][1]) break;
      [this.arr[parent], this.arr[i]] = [this.arr[i], this.arr[parent]];
      i = parent;
    }
  }
  _down(i) {
    const n = this.arr.length;
    while (true) {
      let l = 2 * i + 1,
        r = l + 1,
        m = i;
      if (l < n && this.arr[l][1] < this.arr[m][1]) m = l;
      if (r < n && this.arr[r][1] < this.arr[m][1]) m = r;
      if (m === i) break;
      [this.arr[m], this.arr[i]] = [this.arr[i], this.arr[m]];
      i = m;
    }
  }
  push(item) {
    this.arr.push(item);
    this._up(this.arr.length - 1);
  }
  pop() {
    /* ... */
  }
}
```

> [!TIP] > **힙 자료구조**
>
> - 완전 이진 트리 형태로 부모가 항상 자식보다 작음 (최소 힙)
> - `_up`: 삽입 시 위로 올리며 힙 속성 유지
> - `_down`: 삭제 시 아래로 내리며 힙 속성 유지
> - 배열 인덱스: 부모 `(i-1)/2`, 왼쪽 자식 `2i+1`, 오른쪽 자식 `2i+2`

### 3. 다익스트라 알고리즘

```javascript
const dijkstra = (start) => {
  const pq = new MinHeap();
  dists[start] = 0;
  pq.push([start, 0]);

  while (pq.size) {
    const [node, dist] = pq.pop();
    if (dist !== dists[node]) continue; // 이미 처리된 노드 스킵

    for (const [des, cost] of graph[node]) {
      const nd = dist + cost;
      if (nd < dists[des]) {
        dists[des] = nd;
        pq.push([des, nd]);
      }
    }
  }
};
```

- 시작 정점에서 거리 0으로 시작
- 가장 가까운 정점부터 처리 (그리디)
- 더 짧은 경로 발견 시 거리 갱신 후 큐에 추가

### 4. 결과 출력

```javascript
let out = "";
for (let i = 1; i <= V; i++) {
  out += dists[i] === Infinity ? "INF\n" : `${dists[i]}\n`;
}
console.log(out.trim());
```

- 도달 불가능한 정점은 `Infinity`이므로 "INF" 출력
- 문자열로 모아서 한 번에 출력 (성능 최적화)
