function solution(n) {
  var answer = 0;

  // answer는 n%x == 1 를 만들어주는 가장 작은 자연수 x
  // (n-1)%x == 0 , 단 1은 제외. n%x 일 때도 0이기 때문

  for (let i = 2; i < n; i++) {
    if ((n - 1) % i == 0) {
      answer = i;
      return answer;
    }
  }
}
