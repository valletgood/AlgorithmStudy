# 네트워크 연결

[백준 1922번: 네트워크 연결](https://www.acmicpc.net/problem/1922)

## 문제 파악하기

N개의 컴퓨터를 모두 연결하는 데 필요한 **최소 비용**을 구하는 문제입니다.

### 핵심

- 모든 컴퓨터가 연결되어야 함 (직접 또는 간접)
- 연결 비용의 합을 최소화

> [!NOTE] > **최소 신장 트리 (MST)** 문제입니다! Prim 알고리즘으로 해결합니다.

## 풀이

### Prim 알고리즘

"현재까지 연결된 노드들에서 가장 저렴한 간선으로 새 노드 추가"를 반복합니다.

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [s, e, d] = cases[i];
  graph[s].push([e, d]);
  graph[e].push([s, d]); // 양방향
}
```

### 2. MinHeap 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    /* 삽입 시 위로 올리기 */
  }
  _down(i) {
    /* 삭제 시 아래로 내리기 */
  }
  push(item) {
    /* O(log N) */
  }
  pop() {
    /* O(log N) */
  }
}
```

### 3. Prim 알고리즘 실행

```javascript
const visited = Array(N + 1).fill(false);
const pq = new MinHeap();
pq.push([1, 0]); // 시작 노드, 비용 0

let answer = 0;
let picked = 0;

while (pq.size && picked < N) {
  const [node, cost] = pq.pop();
  if (visited[node]) continue;

  visited[node] = true;
  picked++;
  answer += cost;

  for (const [next, w] of graph[node]) {
    if (!visited[next]) {
      pq.push([next, w]);
    }
  }
}
```

> [!TIP] > **Prim 동작 원리**
>
> 1. 시작 노드에서 출발
> 2. 연결된 간선 중 최소 비용 선택 (MinHeap)
> 3. 새 노드 방문 처리 후 비용 누적
> 4. N개 노드 모두 연결될 때까지 반복

## 동작 예시

```
노드: 1, 2, 3, 4
간선: 1-2(5), 1-3(4), 2-3(2), 2-4(7), 3-4(6)

    1
   /|\
  5 4
 /   \
2--2--3
 \   /
  7 6
   \|
    4

Prim 과정:
1. 시작: 노드 1, 비용 0
2. 1→3 (비용 4) 선택, answer=4
3. 3→2 (비용 2) 선택, answer=6
4. 2→4 (비용 7) 선택, answer=13

최소 비용: 13
```

## 핵심 정리

| 개념     | 설명                             |
| -------- | -------------------------------- |
| MST      | 모든 노드를 최소 비용으로 연결   |
| Prim     | 노드 중심, 가장 저렴한 간선 선택 |
| MinHeap  | 최소 비용 간선을 O(log N)에 추출 |
| 종료조건 | picked === N (모든 노드 연결)    |

### Prim vs Kruskal

| 알고리즘 | 방식              | 자료구조   |
| -------- | ----------------- | ---------- |
| Prim     | 노드 중심 확장    | MinHeap    |
| Kruskal  | 간선 정렬 후 선택 | Union-Find |

### 시간 복잡도

- MinHeap 사용 시: **O(E log V)**
- E: 간선 수, V: 노드 수
