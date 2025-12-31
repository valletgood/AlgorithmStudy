# 플로이드

[백준 11404번: 플로이드](https://www.acmicpc.net/problem/11404)

## 문제 파악하기

N개의 도시와 M개의 버스 노선이 있을 때, **모든 도시 쌍 (i, j)에 대해 i에서 j로 가는 최소 비용**을 구하는 문제입니다.

### 특징

- 방향 그래프 (단방향)
- 같은 출발-도착 쌍에 여러 노선이 있을 수 있음
- 도달 불가능하면 0 출력

## 풀이

이 풀이에서는 **각 도시에서 다익스트라**를 실행하여 모든 쌍의 최단 거리를 구합니다.

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < lines.length; i++) {
  const [start, stop, cost] = lines[i];
  graph[start].push([stop, cost]);
}
```

인접 리스트로 그래프를 구성합니다. 같은 경로에 여러 노선이 있어도 모두 저장합니다.

### 2. MinHeap 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  push(item) {
    /* 삽입 후 up-heapify */
  }
  pop() {
    /* 최솟값 추출 후 down-heapify */
  }
  get size() {
    return this.arr.length;
  }
}
```

다익스트라에서 최소 비용 노드를 효율적으로 꺼내기 위해 사용합니다.

### 3. 다익스트라 함수

```javascript
const dijkstra = (start) => {
  const dists = Array(N + 1).fill(Infinity);
  const pq = new MinHeap();
  pq.push([start, 0]);
  dists[start] = 0;

  while (pq.size) {
    const [bus, cost] = pq.pop();
    if (cost !== dists[bus]) continue; // 이미 처리된 노드 스킵

    for (const [des, dist] of graph[bus]) {
      const nd = cost + dist;
      if (nd < dists[des]) {
        dists[des] = nd;
        pq.push([des, nd]);
      }
    }
  }
  return dists;
};
```

시작 도시에서 모든 도시까지의 최단 거리 배열을 반환합니다.

### 4. 모든 도시에서 다익스트라 실행

```javascript
let out = "";
for (let i = 1; i <= N; i++) {
  const r = dijkstra(i);
  let routes = "";
  for (let i = 1; i < r.length; i++) {
    routes += r[i] === Infinity ? "0 " : `${r[i]} `;
  }
  out += `${routes.trim()}\n`;
}
console.log(out.trim());
```

## 핵심 아이디어

1. **모든 쌍 최단 경로**: 각 도시를 시작점으로 다익스트라 실행
2. **MinHeap**: 우선순위 큐로 최소 비용 노드 우선 처리
3. **도달 불가**: Infinity인 경우 0으로 출력

### 시간 복잡도

- 다익스트라 1회: O(E log V)
- N번 실행: **O(N × E log V)**
- 이 문제에서: O(N × M log N)
