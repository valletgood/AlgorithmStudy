## 문제

https://www.acmicpc.net/problem/14502

### 문제 파악하기

위 문제는 백준 알고리즘 14502 연구소 문제이다.

N x M 크기의 연구소에서 바이러스가 퍼지는 것을 막기 위해 벽을 3개 세워야 한다. 벽을 세운 후 바이러스가 퍼졌을 때, 안전 영역의 최대 크기를 구하는 문제다.

> [!NOTE] > **브루트포스 + BFS 접근**: 빈 칸 중 3개를 선택해 벽을 세우는 모든 경우의 수를 탐색한다.
>
> - 빈 칸에서 3개를 선택하는 조합(Combination) 생성
> - 각 조합에 대해 BFS로 바이러스 확산 시뮬레이션
> - 안전 영역이 최대인 경우를 찾음

## 풀이

### 1. 초기 위치 수집

```javascript
const viruses = [];
const safe = [];
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (board[i][j] === 2) viruses.push([i, j]);
    if (board[i][j] === 0) safe.push([i, j]);
  }
}
```

- `viruses`: 바이러스 위치 (값이 2인 칸)
- `safe`: 빈 칸 위치 (값이 0인 칸) - 벽을 세울 후보

### 2. 조합 생성

```javascript
const getCombi = (arr, n) => {
  let result = [];
  let selected = [];

  const dfs = (start) => {
    if (selected.length === n) {
      result.push([...selected]);
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

const combi = getCombi(safe, 3);
```

> [!TIP] > **조합 생성 로직**
>
> - DFS로 백트래킹하며 3개를 선택
> - `start` 인덱스부터 탐색해서 중복 선택 방지
> - 선택 후 재귀 → 복귀 시 선택 취소 (백트래킹)

### 3. BFS로 바이러스 확산

```javascript
const bfs = (wall) => {
  const tmp = board.map((row) => row.slice()); // 원본 보존을 위한 복사
  const q = [];

  // 바이러스 위치를 큐에 추가
  for (const [x, y] of viruses) {
    q.push([x, y]);
  }

  // 벽 세우기
  for (const [wx, wy] of wall) {
    tmp[wx][wy] = 1;
  }

  // BFS로 바이러스 확산
  while (head < q.length) {
    const [x, y] = q[head++];
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= M) continue;
      if (tmp[nx][ny] !== 0) continue; // 빈 칸만 감염
      tmp[nx][ny] = 2;
      q.push([nx, ny]);
    }
  }

  // 남은 안전 영역 카운트
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (tmp[i][j] === 0) count++;
    }
  }
  return count;
};
```

> [!TIP] > **Multi-Source BFS**
>
> - 모든 바이러스 위치를 처음부터 큐에 넣고 시작
> - 동시에 여러 지점에서 확산하는 시뮬레이션

### 4. 최대값 탐색

```javascript
for (let i = 0; i < combi.length; i++) {
  answer = Math.max(answer, bfs(combi[i]));
}
```

- 모든 벽 조합에 대해 BFS 실행
- 안전 영역의 최대값을 answer에 저장
