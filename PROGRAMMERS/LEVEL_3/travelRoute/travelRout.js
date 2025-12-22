function solution(tickets) {
  const map = new Map();
  for (const [from, to] of tickets) {
    if (!map.has(from)) map.set(from, []);
    map.get(from).push(to);
  }

  for (const [from, des] of map) {
    des.sort((a, b) => b.localeCompare(a));
  }

  let stack = ["ICN"];
  let path = [];

  while (stack.length) {
    const cur = stack[stack.length - 1];
    const tos = map.get(cur);

    if (tos && tos.length) {
      stack.push(tos.pop());
    } else {
      path.push(stack.pop());
    }
  }
  return path.reverse();
}
