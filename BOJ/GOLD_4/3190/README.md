# 뱀

[백준 3190번: 뱀](https://www.acmicpc.net/problem/3190)

## 문제 파악하기

N x N 보드에서 뱀이 움직이는 게임을 시뮬레이션하는 문제입니다.

### 규칙

1. 뱀은 매 초마다 머리를 다음 칸으로 이동
2. 이동한 칸에 사과가 있으면 사과를 먹고 몸 길이 증가
3. 사과가 없으면 꼬리가 줄어듦 (몸 길이 유지)
4. 벽 또는 자기 자신의 몸과 부딪히면 게임 종료
5. 특정 시간에 방향 전환 (L: 왼쪽 90도, D: 오른쪽 90도)

> [!NOTE]
> 뱀의 몸을 효율적으로 관리하기 위해 **큐(Queue)** 자료구조를 사용합니다.
> 머리는 뒤에 추가(push), 꼬리는 앞에서 제거(shift)!

## 풀이

**시뮬레이션** 으로 해결합니다.

### 1. 초기 설정

```javascript
let head = [0, 0];
let bodyQueue = [[0, 0]];
let direction = 0; // 0: 오른쪽, 1: 아래, 2: 왼쪽, 3: 위쪽
```

- 뱀은 (0, 0)에서 시작
- 초기 방향은 오른쪽

### 2. 방향에 따른 이동

```javascript
if (direction === 0) {
  head[1] += 1; // 오른쪽
} else if (direction === 1) {
  head[0] += 1; // 아래
} else if (direction === 2) {
  head[1] -= 1; // 왼쪽
} else if (direction === 3) {
  head[0] -= 1; // 위
}
```

### 3. 충돌 체크

```javascript
// 벽 충돌 (while 조건)
while (head[0] >= 0 && head[1] >= 0 && head[0] < N && head[1] < N) {
  // ...
}

// 자기 몸 충돌
for (const [bx, by] of bodyQueue) {
  if (head[0] === bx && head[1] === by) break outer;
}
```

### 4. 방향 전환

```javascript
if (
  changesIndex < changes.length &&
  answer === Number(changes[changesIndex][0])
) {
  const [t, d] = changes[changesIndex];
  if (d === "D") {
    direction = (direction + 1) % 4; // 오른쪽 90도
  } else if (d === "L") {
    direction = (direction + 3) % 4; // 왼쪽 90도 (= 오른쪽 270도)
  }
  changesIndex++;
}
```

> [!TIP] > **방향 전환 공식**
>
> - 오른쪽 90도: `(direction + 1) % 4`
> - 왼쪽 90도: `(direction + 3) % 4` (역방향으로 1칸 = 정방향 3칸)

### 5. 사과 처리 및 몸 길이 관리

```javascript
// 머리 위치 추가
bodyQueue.push([head[0], head[1]]);

// 사과 확인
let isApple = false;
for (const pos of apples) {
  const [ax, ay] = pos;
  if (ax - 1 === head[0] && ay - 1 === head[1]) {
    isApple = true;
    apples.delete(pos);
    break;
  }
}

// 사과가 없으면 꼬리 제거
if (!isApple) {
  bodyQueue.shift();
}
```

## 핵심 아이디어

| 요소      | 구현 방식                    |
| --------- | ---------------------------- |
| 뱀의 몸   | Queue (push/shift)           |
| 방향 관리 | 0~3 숫자로 표현              |
| 방향 전환 | 나머지 연산 활용             |
| 사과 저장 | Set 자료구조                 |
| 충돌 판정 | 벽: 범위 체크, 몸: 좌표 비교 |

### 시뮬레이션 흐름

```
1초: 머리 이동 → 충돌 체크 → 방향 전환 → 사과 체크 → 꼬리 처리
2초: 반복...
```

### 시간 복잡도

- 게임 시간 \* 뱀 길이만큼 반복
- 최악의 경우 **O(N² × N²)** (보드 크기 × 최대 뱀 길이)
