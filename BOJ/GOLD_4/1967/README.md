## 문제

https://www.acmicpc.net/problem/1967

### 문제 파악하기

위 문제는 백준 알고리즘 1967 트리의 지름 문제이다.

트리에서 **가장 먼 두 노드 사이의 거리**(트리의 지름)를 구하는 문제다. 간선에는 가중치가 있다.

> [!NOTE] > **트리의 지름을 구하는 알고리즘**
>
> 1. 임의의 노드에서 DFS로 가장 먼 노드 A를 찾는다
> 2. 노드 A에서 다시 DFS로 가장 먼 노드 B를 찾는다
> 3. A와 B 사이의 거리가 트리의 지름이다
>
> **왜 이게 맞나?**
>
> - 임의의 노드에서 가장 먼 노드는 반드시 지름의 한쪽 끝점이다

## 풀이

### 1. 그래프 구성

```javascript
const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 0; i < lines.length; i++) {
  const [parent, child, dist] = lines[i];
  graph[parent].push([child, dist]);
  graph[child].push([parent, dist]); // 양방향
}
```

- 트리를 양방향 그래프로 구성
- `[연결된 노드, 거리]` 형태로 저장

### 2. DFS로 가장 먼 노드 찾기

```javascript
const dfs = (start) => {
  const dist = Array(N + 1).fill(-1);
  const stack = [[start, 0]];
  dist[start] = 0;

  while (stack.length) {
    const [node, d] = stack.pop();
    for (const [des, cost] of graph[node]) {
      if (dist[des] !== -1) continue; // 이미 방문
      dist[des] = d + cost;
      stack.push([des, d + cost]);
    }
  }

  // 가장 먼 노드와 거리 찾기
  let farNode = start,
    farDist = 0;
  for (let i = 1; i <= N; i++) {
    if (dist[i] > farDist) {
      farNode = i;
      farDist = dist[i];
    }
  }
  return [farNode, farDist];
};
```

> [!TIP] > **스택 기반 DFS**
>
> - `dist[i] = -1`: 미방문, 양수: 시작점에서의 거리
> - 모든 노드를 순회하며 가장 먼 노드와 그 거리를 반환

### 3. DFS 두 번 실행

```javascript
if (N === 1) {
  console.log(0);
} else {
  const [node, dist] = dfs(1); // 1번에서 가장 먼 노드 찾기
  const [n, d] = dfs(node); // 그 노드에서 가장 먼 노드까지 거리
  console.log(d);
}
```

- 노드가 1개면 지름은 0
- 첫 번째 DFS: 1번 노드에서 가장 먼 노드 (지름의 한쪽 끝)
- 두 번째 DFS: 그 노드에서 가장 먼 거리 = 트리의 지름

### 4. 예시

```
     1
    /|\
   2 3 4
  /|   |
 5 6   7

간선: 1-2(5), 1-3(3), 1-4(7), 2-5(2), 2-6(4), 4-7(6)

1번째 DFS (1에서 시작):
- 거리: 1→2→5 = 7, 1→2→6 = 9, 1→4→7 = 13
- 가장 먼 노드: 7 (거리 13)

2번째 DFS (7에서 시작):
- 거리: 7→4→1→2→6 = 6+7+5+4 = 22
- 가장 먼 노드: 6 (거리 22)

트리의 지름: 22
```

### 5. 시간 복잡도

- O(N): DFS를 두 번 실행해도 각각 O(N)
