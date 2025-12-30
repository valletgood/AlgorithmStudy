# 알파벳

[백준 1987번: 알파벳](https://www.acmicpc.net/problem/1987)

## 문제 파악하기

R×C 크기의 보드에서 좌측 상단 (0,0)부터 시작하여 **같은 알파벳을 두 번 지나지 않으면서 최대 몇 칸을 이동**할 수 있는지 구하는 문제입니다.

### 조건

- 상하좌우로 이동 가능
- 이미 지나온 알파벳이 있는 칸은 다시 갈 수 없음
- 시작 칸도 포함하여 개수를 셈

> [!NOTE]
> 알파벳은 A-Z로 총 **26개**입니다.
>
> 방문한 알파벳을 체크하는데 배열 대신 **비트마스킹**을 사용하면 더 효율적으로 처리할 수 있습니다!

## 풀이

이 문제는 **DFS + 비트마스킹**으로 해결합니다.

### 1. 비트마스킹으로 알파벳 체크

```javascript
const toBit = (char) => 1 << (char.charCodeAt(0) - 65);
```

각 알파벳을 비트로 변환합니다:

- A → `1 << 0` = 1 (0b0000...0001)
- B → `1 << 1` = 2 (0b0000...0010)
- C → `1 << 2` = 4 (0b0000...0100)
- ...
- Z → `1 << 25`

> [!TIP] > **비트마스킹의 장점**
>
> - 26개 알파벳을 하나의 정수(32비트)로 표현 가능
> - `mask & bit`: 이미 방문한 알파벳인지 O(1)로 확인
> - `mask | bit`: 새 알파벳 방문 표시도 O(1)
> - 배열 복사 없이 상태를 숫자 하나로 전달

### 2. DFS 탐색

```javascript
const dfs = () => {
  let stack = [[0, 0, toBit(board[0][0]), 1]];
  while (stack.length) {
    const [x, y, mask, len] = stack.pop();
    if (len > answer) {
      answer = len;
    }
    for (const [dx, dy] of dirs) {
      const nx = x + dx;
      const ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= R || ny >= C) continue;
      const bit = toBit(board[nx][ny]);
      if (mask & bit) continue; // 이미 방문한 알파벳
      stack.push([nx, ny, mask | bit, len + 1]);
    }
  }
};
```

스택에 저장되는 정보:

- `x, y`: 현재 위치
- `mask`: 지금까지 방문한 알파벳들 (비트마스크)
- `len`: 현재까지 이동한 칸 수

### 3. 방문 체크 로직

```javascript
const bit = toBit(board[nx][ny]);
if (mask & bit) continue;      // AND 연산: 이미 방문했으면 스킵
stack.push([nx, ny, mask | bit, len + 1]);  // OR 연산: 방문 표시
```

- `mask & bit`가 0이 아니면 → 해당 알파벳 이미 방문
- `mask | bit`로 새 알파벳을 mask에 추가

## 핵심 아이디어

1. **비트마스킹**: 26개 알파벳 방문 여부를 정수 하나로 표현
2. **DFS**: 모든 가능한 경로를 탐색하며 최대 길이 갱신
3. **상태 전달**: 비트마스크로 방문 상태를 스택에 함께 저장

### 시간 복잡도

- 최악의 경우 모든 경로 탐색
- **O(4^(R×C))** (실제로는 알파벳 중복으로 인해 훨씬 적음)
