# 여행 가자

[백준 1976번: 여행 가자](https://www.acmicpc.net/problem/1976)

## 문제 파악하기

여행 계획에 포함된 도시들이 모두 **연결되어 있는지** 확인하는 문제입니다.

### 핵심

- 직접 연결되지 않아도 다른 도시를 거쳐서 갈 수 있으면 OK
- 여행 계획의 모든 도시가 같은 연결 요소에 있는지 확인

> [!NOTE] > **DFS/BFS** 또는 **Union-Find**로 해결할 수 있습니다. 이 풀이는 DFS 사용!

## 풀이

### 1. 인접 행렬 → 인접 리스트 변환

```javascript
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < N; i++) {
  const temp = [];
  for (let j = 0; j < N; j++) {
    if (lines[i][j] === 1) {
      temp.push(j + 1);
    }
  }
  graph[i + 1].push(...temp);
}
```

### 2. DFS로 연결된 도시 탐색

```javascript
const visited = Array(N + 1).fill(false);

const dfs = (start) => {
  const stack = [];
  stack.push(start);
  visited[start] = true;
  while (stack.length) {
    const node = stack.pop();
    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = true;
      stack.push(next);
    }
  }
};

dfs(plans[0]); // 첫 번째 여행 도시에서 시작
```

### 3. 여행 계획 검증

```javascript
let out = "YES";
for (let i = 0; i < M; i++) {
  if (!visited[plans[i]]) {
    out = "NO";
    break;
  }
}
console.log(out);
```

> [!TIP] > **핵심 아이디어**
>
> 첫 번째 여행 도시에서 DFS를 돌면 연결된 모든 도시가 visited됩니다.
> 여행 계획의 모든 도시가 visited면 → 모두 같은 연결 요소!

## 동작 예시

```
도시: 1, 2, 3
연결: 1-2, 2-3
여행 계획: [1, 2, 3]

DFS(1):
  1 방문 → visited[1] = true
  1→2 → visited[2] = true
  2→3 → visited[3] = true

계획 검증:
  plans[0]=1: visited[1]=true ✓
  plans[1]=2: visited[2]=true ✓
  plans[2]=3: visited[3]=true ✓

결과: YES
```

## 핵심 정리

| 단계        | 동작                              |
| ----------- | --------------------------------- |
| 그래프 구성 | 인접 행렬 → 인접 리스트           |
| DFS 탐색    | 첫 여행 도시에서 연결된 도시 탐색 |
| 계획 검증   | 모든 여행 도시가 visited인지 확인 |

### 다른 풀이: Union-Find

```javascript
// 모든 연결된 도시를 같은 집합으로
// 여행 계획 도시들의 부모가 모두 같은지 확인
```

### 시간 복잡도

- 그래프 구성: O(N²)
- DFS: O(N + E)
- **총: O(N²)**
