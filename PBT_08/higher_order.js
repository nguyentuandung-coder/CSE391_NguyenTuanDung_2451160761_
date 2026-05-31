function pipe(...fns) {
  return function (input) {
    let result = input;

    for (let i = 0; i < fns.length; i++) {
      result = fns[i](result);
    }

    return result;
  };
}

const process = pipe(
  (x) => x * 2,
  (x) => x + 10,
  (x) => x.toString(),
  (x) => "Kết quả: " + x,
);

console.log(process(5));

function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      return cache[key];
    }

    const result = fn(...args);
    cache[key] = result;

    return result;
  };
}

const expensiveCalc = memoize((n) => {
  console.log("Đang tính...");

  let result = 0;

  for (let i = 0; i < n; i++) {
    result += i;
  }

  return result;
});

console.log(expensiveCalc(1000000));
console.log(expensiveCalc(1000000));

function debounce(fn, delay) {
  let timerId;

  return function (...args) {
    clearTimeout(timerId);

    timerId = setTimeout(function () {
      fn(...args);
    }, delay);
  };
}

const search = debounce((query) => {
  console.log("Searching:", query);
}, 500);

search("i");
search("ip");
search("iph");
search("iphone");

async function retry(fn, maxAttempts = 3) {
  let lastError;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      console.log("Lần thử:", attempt);
      return await fn();
    } catch (error) {
      lastError = error;
      console.log("Lỗi:", error.message);
    }
  }

  throw lastError;
}

// Test retry
let count = 0;

async function unstableTask() {
  count++;

  if (count < 3) {
    throw new Error("Tác vụ thất bại");
  }

  return "Tác vụ thành công";
}

retry(unstableTask, 3)
  .then((result) => console.log(result))
  .catch((error) => console.log("Thất bại cuối cùng:", error.message));
