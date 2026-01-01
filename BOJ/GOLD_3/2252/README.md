# 줄 세우기

[백준 2252번: 줄 세우기](https://www.acmicpc.net/problem/2252)

## 문제 파악하기

N명의 학생들을 키 순서대로 줄을 세우는 문제입니다. 일부 학생들의 키 비교 결과만 주어지고, 이 조건을 만족하는 순서를 출력합니다.

### 특징

- "A가 B보다 앞에 선다" 형태의 비교 정보 M개
- 조건을 만족하는 순서가 여러 개일 수 있음 (아무거나 출력)
- 사이클이 없음이 보장됨

> [!NOTE]
> 선후 관계가 주어지고 이를 만족하는 순서를 구하는 문제는 **위상 정렬(Topological Sort)** 문제입니다!

## 풀이

**위상 정렬 (Kahn's Algorithm)** 으로 해결합니다.

### 1. 그래프 및 진입 차수 초기화

```javascript
const graph = Array.from({ length: N + 1 }, () => []);
const indegree = Array(N + 1).fill(0);

for (let i = 0; i < M; i++) {
  const [small, big] = cases[i];
  graph[small].push(big); // small → big 간선
  indegree[big] += 1; // big의 진입 차수 증가
}
```

- `graph[a]`: a보다 뒤에 와야 하는 학생들
- `indegree[b]`: b보다 앞에 와야 하는 학생 수

### 2. 진입 차수 0인 노드 찾기

```javascript
let queue = [];
for (let i = 1; i < indegree.length; i++) {
  if (indegree[i] === 0) queue.push(i);
}
```

자신보다 앞에 올 학생이 없는 학생들을 먼저 큐에 넣습니다.

### 3. 위상 정렬 수행

```javascript
let answer = [];

while (queue.length) {
  let check = queue.shift();
  answer.push(check);

  for (const next of graph[check]) {
    indegree[next] -= 1;
    if (indegree[next] === 0) queue.push(next);
  }
}

console.log(answer.join(" "));
```

> [!TIP] > **위상 정렬 동작 원리**
>
> 1. 진입 차수가 0인 노드를 결과에 추가
> 2. 해당 노드에서 나가는 간선 제거 (연결된 노드의 진입 차수 -1)
> 3. 새로 진입 차수가 0이 된 노드를 큐에 추가
> 4. 큐가 빌 때까지 반복

### 동작 예시

```
N=4, 비교: (4,2), (3,1), (3,2)

초기 indegree: [_, 1, 2, 0, 0]
초기 큐: [3, 4]

1. pop 3 → answer=[3], indegree[1]--, indegree[2]--
   indegree: [_, 0, 1, 0, 0], 큐에 1 추가
2. pop 4 → answer=[3,4], indegree[2]--
   indegree: [_, 0, 0, 0, 0], 큐에 2 추가
3. pop 1 → answer=[3,4,1]
4. pop 2 → answer=[3,4,1,2]

출력: 3 4 1 2
```

## 핵심 아이디어

1. **진입 차수**: 해당 노드로 들어오는 간선 수
2. **BFS 방식**: 진입 차수 0인 노드부터 처리
3. **간선 제거**: 처리된 노드의 영향을 연결 노드에서 제거

### 시간 복잡도

- 모든 노드와 간선을 한 번씩 처리
- **O(N + M)**
