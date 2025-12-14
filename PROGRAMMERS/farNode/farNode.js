const bfs = (n, graph) => {
  let q = [[n, 0]];
  let head = 0;
  const visited = Array.from({ length: n + 1 }).fill(false);
  visited[n] = true;
  while (head < q.length) {
    const [node, dist] = q[head++];
    for (const next of graph[node]) {
      if (visited[next]) continue;
      visited[next] = true;
      q.push([next, dist + 1]);
    }
  }
  return q;
};

function solution(n, edge) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (let i = 0; i < edge.length; i++) {
    const [a, b] = edge[i];
    graph[a].push(b);
    graph[b].push(a);
  }
  const result = bfs(1, graph);

  let max = 0;
  let answer = 0;
  for (let i = 0; i < result.length; i++) {
    const value = Math.max(max, result[i][1]);
    if (max === value) {
      answer++;
    } else {
      answer = 1;
    }
    max = value;
  }
  return answer;
}
