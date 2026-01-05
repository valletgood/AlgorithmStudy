# 카드 정렬하기

[백준 1715번: 카드 정렬하기](https://www.acmicpc.net/problem/1715)

## 문제 파악하기

N개의 카드 묶음을 하나로 합칠 때 필요한 최소 비교 횟수를 구하는 문제입니다.

### 규칙

- 두 묶음을 합칠 때 비교 횟수 = 두 묶음의 카드 수 합
- 합친 묶음은 다시 다른 묶음과 합칠 수 있음
- 모든 묶음을 하나로 합칠 때까지 반복

> [!NOTE]
> 작은 묶음끼리 먼저 합쳐야 총 비교 횟수가 최소가 됩니다.
> 왜냐하면 먼저 합친 묶음은 이후 합칠 때 계속 더해지기 때문!

### 예시

카드 묶음: [10, 20, 40]

- (10+20) + (30+40) = 30 + 70 = **100** ✅
- (10+40) + (50+20) = 50 + 70 = 120
- (20+40) + (60+10) = 60 + 70 = 130

## 풀이

**최소 힙(Min Heap)** 과 **탐욕법(Greedy)** 으로 해결합니다.

### 1. 최소 힙 구현

```javascript
class MinHeap {
  constructor() {
    this.arr = [];
  }
  _up(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.arr[parent] <= this.arr[i]) break;
      [this.arr[parent], this.arr[i]] = [this.arr[i], this.arr[parent]];
      i = parent;
    }
  }
  _down(i) {
    const n = this.arr.length;
    while (true) {
      let l = 2 * i + 1;
      let r = l + 1;
      let m = i;
      if (l < n && this.arr[l] < this.arr[m]) m = l;
      if (r < n && this.arr[r] < this.arr[m]) m = r;
      if (m === i) break;
      [this.arr[m], this.arr[i]] = [this.arr[i], this.arr[m]];
      i = m;
    }
  }
  push(item) {
    this.arr.push(item);
    this._up(this.arr.length - 1);
  }
  pop() {
    if (this.arr.length === 0) return null;
    const top = this.arr[0];
    const last = this.arr.pop();
    if (this.arr.length > 0) {
      this.arr[0] = last;
      this._down(0);
    }
    return top;
  }
  get size() {
    return this.arr.length;
  }
}
```

> [!TIP]
> JavaScript는 내장 우선순위 큐가 없어서 직접 구현해야 합니다.
> `_up`: 삽입 시 부모와 비교하며 위로 이동
> `_down`: 삭제 시 자식과 비교하며 아래로 이동

### 2. 모든 카드 묶음을 힙에 삽입

```javascript
const pq = new MinHeap();

for (let i = 0; i < N; i++) {
  pq.push(nums[i]);
}
```

### 3. 가장 작은 두 묶음씩 합치기

```javascript
let answer = 0;

while (pq.size > 1) {
  const first = pq.pop();
  const second = pq.pop();
  const sum = first + second;
  pq.push(sum);
  answer += sum;
}

console.log(answer);
```

## 핵심 아이디어

### 왜 탐욕법이 최적인가?

| 합치는 순서  | 총 비용                           |
| ------------ | --------------------------------- |
| 작은 것 먼저 | 작은 값이 여러 번 더해짐 → 비용 ↓ |
| 큰 것 먼저   | 큰 값이 여러 번 더해짐 → 비용 ↑   |

### 동작 예시

```
초기 힙: [10, 20, 40]

1. pop 10, 20 → sum=30, answer=30
   힙: [30, 40]

2. pop 30, 40 → sum=70, answer=100
   힙: [70]

결과: 100
```

### 시간 복잡도

- 힙 삽입/삭제: O(log N)
- N-1번 합치기 수행
- 총 **O(N log N)**
