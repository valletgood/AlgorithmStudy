# 경사로

[백준 14890번: 경사로](https://www.acmicpc.net/problem/14890)

## 문제 파악하기

N x N 지도에서 **지나갈 수 있는 길의 개수**를 구하는 문제입니다.

### 규칙

- 길은 가로 한 줄 또는 세로 한 줄
- 인접한 칸의 높이 차이가 1이면 경사로 설치 가능
- 경사로 길이는 L칸
- 높이 차이가 2 이상이면 지나갈 수 없음
- 경사로는 겹칠 수 없음

> [!NOTE]
> 핵심은 높이가 달라지는 지점에서 **낮은 쪽에 L칸 경사로**를 설치할 수 있는지 확인하는 것입니다.

## 풀이

**시뮬레이션** 으로 해결합니다.

### 1. 경사로 설치 여부 체크 배열

```javascript
const stairsX = Array.from({ length: N }, () => Array(N).fill(false));
const stairsY = Array.from({ length: N }, () => Array(N).fill(false));
```

가로/세로 각각 경사로가 이미 설치된 위치를 저장합니다.

### 2. 가로 줄 통과 가능 여부 (canPassX)

```javascript
const canPassX = (arr, xIndex) => {
  for (let i = 0; i < N - 1; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) > 1) return false;
    if (Math.abs(arr[i] - arr[i + 1]) === 1) {
      let index = 1;
      while (index <= L) {
        let p = arr[i] > arr[i + 1] ? i + index : i - index + 1;
        if (p < 0 || p >= N) return false;
        if (stairsX[xIndex][p]) return false;
        stairsX[xIndex][p] = true;
        index++;
      }
    }
  }
  return true;
};
```

> [!TIP] > **경사로 설치 방향**
>
> - `arr[i] > arr[i + 1]`: 내리막 → 오른쪽(i+1부터)에 경사로
> - `arr[i] < arr[i + 1]`: 오르막 → 왼쪽(i부터 거꾸로)에 경사로

### 3. 세로 줄 통과 가능 여부 (canPassY)

```javascript
const canPassY = (arr, yIndex) => {
  for (let i = 0; i < N - 1; i++) {
    if (Math.abs(arr[i] - arr[i + 1]) > 1) return false;
    if (Math.abs(arr[i] - arr[i + 1]) === 1) {
      let index = 1;
      while (index <= L) {
        let p = arr[i] > arr[i + 1] ? i + index : i - index + 1;
        if (p < 0 || p >= N) return false;
        if (stairsY[p][yIndex]) return false;
        stairsY[p][yIndex] = true;
        index++;
      }
    }
  }
  return true;
};
```

### 4. 모든 줄 검사

```javascript
// 가로 줄
for (let i = 0; i < N; i++) {
  if (canPassX(board[i], i)) answer++;
}

// 세로 줄
for (let i = 0; i < N; i++) {
  const arr = [];
  for (let j = 0; j < N; j++) {
    arr.push(board[j][i]);
  }
  if (canPassY(arr, i)) answer++;
}
```

## 동작 예시

```
N=6, L=2
3 3 3 3 3 3
2 3 3 3 3 3
2 2 2 3 3 3
1 1 1 2 2 2
1 1 1 3 3 1
1 1 2 3 3 2

가로 1번째 줄: [3,3,3,3,3,3] → 통과 ✅
가로 2번째 줄: [2,3,3,3,3,3] → 2→3 오르막, 0번에 경사로 설치 필요 (범위 부족) ❌
...
```

## 핵심 정리

| 조건             | 처리                           |
| ---------------- | ------------------------------ |
| 높이 차이 > 1    | 통과 불가                      |
| 높이 차이 = 1    | 낮은 쪽에 L칸 경사로 설치 시도 |
| 경사로 범위 초과 | 통과 불가                      |
| 경사로 중복      | 통과 불가                      |

### 경사로 설치 위치 계산

```
내리막 (arr[i] > arr[i+1]): i+1, i+2, ..., i+L
오르막 (arr[i] < arr[i+1]): i, i-1, ..., i-L+1
```

### 시간 복잡도

- 가로/세로 각 N줄
- 각 줄마다 O(N) 검사
- 총 **O(N²)**
