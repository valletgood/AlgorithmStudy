# 최소 스패닝 트리

[백준 1197번: 최소 스패닝 트리](https://www.acmicpc.net/problem/1197)

## 문제 파악하기

주어진 그래프에서 **모든 정점을 연결하는 최소 비용의 트리**를 구하는 문제입니다.

### MST (Minimum Spanning Tree)

- 모든 정점이 연결됨
- 사이클이 없음 (트리)
- 간선 가중치의 합이 최소

> [!NOTE] > **Prim 알고리즘**으로 해결합니다. 현재 트리에서 가장 저렴한 간선으로 확장!

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: V + 1 }, () => []);

for (let i = 0; i < E; i++) {
  const [s, e, c] = lines[i];
  graph[s].push([e, c]);
  graph[e].push([s, c]); // 양방향
}
```

### 2. MinHeap 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    /* 삽입 시 위로 */
  }
  _down(i) {
    /* 삭제 시 아래로 */
  }
  push(item) {
    /* O(log V) */
  }
  pop() {
    /* O(log V) */
  }
  get size() {
    return this.arr.length;
  }
}
```

### 3. Prim 알고리즘

```javascript
const visited = Array(V + 1).fill(false);
const pq = new MinHeap();
pq.push([1, 0]); // [노드, 비용]

let answer = 0;
let picked = 0;

while (pq.size && picked < V) {
  const [node, cost] = pq.pop();
  if (visited[node]) continue;

  visited[node] = true;
  answer += cost;
  picked++;

  for (const [next, w] of graph[node]) {
    if (!visited[next]) {
      pq.push([next, w]);
    }
  }
}
```

> [!TIP] > **Prim 동작 원리**
>
> 1. 임의의 노드(1번)에서 시작
> 2. 연결된 간선 중 **최소 비용** 선택 (MinHeap)
> 3. 새 노드 방문 처리, 비용 누적
> 4. V개 노드 모두 선택될 때까지 반복

## 동작 예시

```
정점: 1, 2, 3
간선: 1-2(1), 2-3(2), 1-3(3)

    1
   / \
  1   3
 /     \
2───2───3

Prim 과정:
1. 시작: 노드 1, 비용 0
2. 1→2 (비용 1) 선택, answer=1
3. 2→3 (비용 2) 선택, answer=3

MST 비용: 3
```

## 핵심 정리

| 개념        | 설명                           |
| ----------- | ------------------------------ |
| MST         | 최소 비용으로 모든 정점 연결   |
| Prim        | 노드 중심 확장, MinHeap 사용   |
| 종료조건    | picked === V (모든 노드 선택)  |
| 음수 가중치 | Prim은 음수 가중치도 처리 가능 |

### Prim vs Kruskal

| 알고리즘 | 방식              | 자료구조   | 적합한 경우 |
| -------- | ----------------- | ---------- | ----------- |
| Prim     | 노드 중심 확장    | MinHeap    | 밀집 그래프 |
| Kruskal  | 간선 정렬 후 선택 | Union-Find | 희소 그래프 |

### 시간 복잡도

- MinHeap 사용 시: **O(E log V)**
- E: 간선 수, V: 정점 수
