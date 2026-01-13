# 두 용액

[백준 2470번: 두 용액](https://www.acmicpc.net/problem/2470)

## 문제 파악하기

산성/알칼리성 용액들 중 **두 용액을 섞어서 0에 가장 가까운 혼합 용액**을 만드는 문제입니다.

### 조건

- 용액의 특성값: -1,000,000,000 ~ 1,000,000,000
- 같은 용액 두 번 사용 불가
- 두 용액의 합이 0에 가장 가까운 쌍 찾기

> [!NOTE]
> 정렬 후 **투 포인터**로 양 끝에서 탐색하면 O(N log N)에 해결할 수 있습니다.

## 풀이

### 1. 정렬

```javascript
const cases = input[1]
  .split(" ")
  .map(Number)
  .sort((a, b) => a - b);
```

### 2. 투 포인터 초기화

```javascript
let leftPoint = 0;
let rightPoint = N - 1;
let diff = Infinity;
let answer = [cases[0], cases[N - 1]];
```

- `leftPoint`: 가장 작은 값 (가장 강한 산성 또는 약한 알칼리)
- `rightPoint`: 가장 큰 값 (가장 강한 알칼리 또는 약한 산성)

### 3. 투 포인터 탐색

```javascript
while (leftPoint < rightPoint) {
  const sum = cases[leftPoint] + cases[rightPoint];
  if (Math.abs(sum) < diff) {
    answer[0] = cases[leftPoint];
    answer[1] = cases[rightPoint];
    diff = Math.abs(sum);
  }
  if (sum > 0) {
    rightPoint--;
  } else if (sum < 0) {
    leftPoint++;
  } else if (sum === 0) {
    break;
  }
}
```

> [!TIP] > **포인터 이동 원리**
>
> - `sum > 0`: 합이 양수 → 줄여야 함 → 오른쪽(큰 값) 포인터 감소
> - `sum < 0`: 합이 음수 → 늘려야 함 → 왼쪽(작은 값) 포인터 증가
> - `sum === 0`: 최적해! 바로 종료

## 동작 예시

```
용액: [-99, -2, -1, 4, 98]
정렬: 이미 정렬됨

l=0, r=4: -99+98 = -1 → diff=1, answer=[-99,98], sum<0 → l++
l=1, r=4: -2+98 = 96 → |96|>1 유지, sum>0 → r--
l=1, r=3: -2+4 = 2 → |2|>1 유지, sum>0 → r--
l=1, r=2: -2+(-1) = -3 → |3|>1 유지, sum<0 → l++
l=2, r=2: 종료 (l >= r)

결과: [-99, 98]
```

## 핵심 정리

| 조건     | 동작 | 이유                   |
| -------- | ---- | ---------------------- |
| sum > 0  | r--  | 합을 줄여서 0에 가깝게 |
| sum < 0  | l++  | 합을 늘려서 0에 가깝게 |
| sum == 0 | 종료 | 최적해 발견            |

### 왜 투 포인터인가?

- 정렬된 배열에서 양 끝부터 탐색
- 합의 부호에 따라 한 방향으로만 이동 → 놓치는 쌍 없음
- 각 포인터가 최대 N번 이동 → **O(N)**

### 시간 복잡도

- 정렬: O(N log N)
- 탐색: O(N)
- **총: O(N log N)**
