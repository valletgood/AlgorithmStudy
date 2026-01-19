# 소수의 연속합

[백준 1644번: 소수의 연속합](https://www.acmicpc.net/problem/1644)

## 문제 파악하기

자연수 N을 **연속된 소수의 합**으로 나타낼 수 있는 경우의 수를 구하는 문제입니다.

### 예시

- 41 = 2+3+5+7+11+13 = 11+13+17 = 41 → **3가지**

> [!NOTE] > **소수 구하기 + 투 포인터** 조합 문제입니다!

## 풀이

### 1. 소수 구하기

```javascript
const nums = new Set();

outer: for (let i = 2; i <= N; i++) {
  for (let j = 2; j * j <= i; j++) {
    if (i % j === 0) continue outer;
  }
  nums.add(i);
}
```

- 2부터 N까지 각 수가 소수인지 판별
- `j * j <= i`: 제곱근까지만 확인하면 충분

### 2. 투 포인터 탐색

```javascript
const numArr = Array.from(nums);
let answer = 0;
let l = 0;
let r = 1;
let sum = numArr[0];

while (l <= r) {
  if (sum < N) {
    sum += numArr[r];
    r++;
  } else if (sum > N) {
    sum -= numArr[l];
    l++;
  } else if (sum === N) {
    answer++;
    sum -= numArr[l];
    l++;
  }
  if (r >= numArr.length - 1) r = numArr.length - 1;
}
```

> [!TIP] > **투 포인터 동작**
>
> - `sum < N`: 합이 부족 → 오른쪽 확장
> - `sum > N`: 합이 초과 → 왼쪽 축소
> - `sum === N`: 정답! 카운트 후 왼쪽 축소

## 동작 예시

```
N = 41
소수 배열: [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41]

l=0, r=5: 2+3+5+7+11+13 = 41 ✓ → answer=1
l=3, r=5: 11+13+17 = 41 ✓ → answer=2
l=12, r=12: 41 = 41 ✓ → answer=3

결과: 3
```

## 핵심 정리

| 단계      | 동작                 | 시간 복잡도  |
| --------- | -------------------- | ------------ |
| 소수 판별 | 2~N 각각 √N까지 확인 | O(N√N)       |
| 투 포인터 | 연속 구간 합 탐색    | O(소수 개수) |

### 시간 복잡도

- 소수 판별: O(N√N)
- 투 포인터: O(N / ln N) ≈ 소수 개수
- **총: O(N√N)**
