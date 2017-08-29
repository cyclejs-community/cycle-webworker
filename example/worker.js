function fib (number) {
  if (number <= 2) {
    return 1;
  }

  return fib(number - 1) + fib(number - 2);
}

onmessage = function (event) {
  const number = parseInt(event.data, 10);

  const result = fib(number);

  postMessage(result);
}
