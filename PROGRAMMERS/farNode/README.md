## 문제

https://school.programmers.co.kr/learn/courses/30/lessons/49189

### 문제 파악하기

위 문제는 프로그래머스 가장 먼 노드 문제이다.

n개의 노드가 있는 그래프에서 1번 노드로부터 가장 멀리 떨어진 노드의 개수를 구하는 문제다. 가장 멀리 떨어진 노드란 최단 경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 말한다.

> [!NOTE] > **BFS로 최단 거리 계산**: 가중치가 없는 그래프에서 최단 거리는 BFS로 구할 수 있다.
>
> - 1번 노드에서 시작해 모든 노드까지의 거리를 계산
> - 가장 큰 거리를 가진 노드들의 개수를 카운트

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: n + 1 }, () => []);
for (let i = 0; i < edge.length; i++) {
  const [a, b] = edge[i];
  graph[a].push(b);
  graph[b].push(a);
}
```

- 인접 리스트 방식으로 그래프 구성
- 양방향 간선이므로 양쪽에 모두 추가

### 2. BFS로 거리 계산

```javascript
const bfs = (n, graph) => {
  let q = [[n, 0]]; // [노드, 거리]
  let head = 0;
  const visited = Array.from({ length: n + 1 }).fill(false);
  visited[n] = true;

  while (head < q.length) {
    const [node, dist] = q[head++];
    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = true;
      q.push([next, dist + 1]);
    }
  }
  return q;
};
```

> [!TIP] > **BFS가 최단 거리를 보장하는 이유**
>
> - BFS는 가까운 노드부터 탐색 (레벨 단위)
> - 처음 방문할 때의 거리가 곧 최단 거리
> - 큐에 `[노드, 거리]` 형태로 저장해 각 노드까지의 거리 추적

### 3. 가장 먼 노드 카운트

```javascript
const result = bfs(1, graph);

let max = 0;
let answer = 0;
for (let i = 0; i < result.length; i++) {
  const value = Math.max(max, result[i][1]);
  if (max === value) {
    answer++;
  } else {
    answer = 1;
  }
  max = value;
}
return answer;
```

- BFS 결과를 순회하며 최대 거리 갱신
- 최대 거리가 갱신되면 answer를 1로 초기화
- 같은 최대 거리면 answer 증가

### 4. 예시

```
n = 6
edge = [[3,6], [4,3], [3,2], [1,3], [1,2], [2,4], [5,2]]

그래프:
1 - 2 - 5
|   |
3 - 4
|
6

BFS 결과 (1번에서 시작):
- 1: 거리 0
- 2, 3: 거리 1
- 4, 5, 6: 거리 2

최대 거리 2를 가진 노드: 4, 5, 6 → 3개
```
