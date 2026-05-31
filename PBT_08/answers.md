# Câu A1

## 1. Function Declaration

```javascript
function tinhThueBaoHiem(luong) {
  let thue = 0;

  if (luong > 11000000) {
    thue = luong * 0.1;
  }

  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
}

console.log(tinhThueBaoHiem(15000000));
```

---

## 2. Function Expression

```javascript
const tinhThueBaoHiem = function (luong) {
  let thue = 0;

  if (luong > 11000000) {
    thue = luong * 0.1;
  }

  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
};

console.log(tinhThueBaoHiem(15000000));
```

---

## 3. Arrow Function

```javascript
const tinhThueBaoHiem = (luong) => {
  let thue = 0;

  if (luong > 11000000) {
    thue = luong * 0.1;
  }

  return {
    thue: thue,
    thuc_nhan: luong - thue,
  };
};

console.log(tinhThueBaoHiem(15000000));
```

---

# So sánh Hoisting

## 1. Function Declaration

### Ví dụ

```javascript
console.log(cong(5, 3));

function cong(a, b) {
  return a + b;
}
```

### Dự đoán

```text
8
```

### Kết quả thực tế

```text
8
```

### Giải thích

Function Declaration được hoisting toàn bộ.

JavaScript hiểu như:

```javascript
function cong(a, b) {
  return a + b;
}

console.log(cong(5, 3));
```

Do đó có thể gọi hàm trước khi khai báo.

---

## 2. Function Expression

### Ví dụ

```javascript
console.log(cong(5, 3));

const cong = function (a, b) {
  return a + b;
};
```

### Dự đoán

```text
ReferenceError
```

### Kết quả thực tế

```text
ReferenceError: Cannot access 'cong' before initialization
```

### Giải thích

Biến:

```javascript
const cong;
```

nằm trong Temporal Dead Zone (TDZ).

Function Expression không được hoisting như Function Declaration.

---

## 3. Arrow Function

### Ví dụ

```javascript
console.log(cong(5, 3));

const cong = (a, b) => a + b;
```

### Dự đoán

```text
ReferenceError
```

### Kết quả thực tế

```text
ReferenceError: Cannot access 'cong' before initialization
```

### Giải thích

Arrow Function thực chất là một giá trị được gán cho biến.

Vì biến dùng:

```javascript
const
```

nên không thể truy cập trước khi khai báo.

---

# Bảng so sánh

| Đặc điểm             | Function Declaration | Function Expression  | Arrow Function |
| -------------------- | -------------------- | -------------------- | -------------- |
| Hoisting             | Có                   | Không                | Không          |
| Gọi trước khai báo   | Có                   | Không                | Không          |
| Có tên hàm riêng     | Có                   | Có thể có hoặc không | Không          |
| Cú pháp ngắn gọn     | Không                | Không                | Có             |
| Thường dùng hiện đại | Có                   | Có                   | Rất nhiều      |

---

# Câu A2 — Scope & Closure

## Đoạn 1

### Code

```javascript
function counter() {
  let count = 0;
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  };
}

const c = counter();

console.log(c.increment());
console.log(c.increment());
console.log(c.increment());
console.log(c.decrement());
console.log(c.getCount());
```

---

## Dự đoán output

```text
1
2
3
2
2
```

---

## Kết quả thực tế

```text
1
2
3
2
2
```

---

## Giải thích

Khi gọi:

```javascript
const c = counter();
```

hàm `counter()` tạo ra biến cục bộ:

```javascript
let count = 0;
```

Sau đó trả về object chứa 3 hàm:

```javascript
increment;
decrement;
getCount;
```

Ba hàm này vẫn nhớ được biến `count` dù hàm `counter()` đã chạy xong. Đây gọi là **closure**.

Các bước chạy:

```text
Ban đầu: count = 0
c.increment() → ++count → 1
c.increment() → ++count → 2
c.increment() → ++count → 3
c.decrement() → --count → 2
c.getCount()  → count   → 2
```

---

# Đoạn 2

## Code

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200);
}
```

---

## Dự đoán output sau khi chạy

```text
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

---

## Kết quả thực tế

```text
var: 3
var: 3
var: 3
let: 0
let: 1
let: 2
```

---

## Giải thích

### Vì sao `var` in ra 3 lần số 3?

Với vòng lặp:

```javascript
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var:", i), 100);
}
```

`var` có **function scope**, không có **block scope**.

Nghĩa là chỉ có một biến `i` duy nhất được dùng chung cho cả vòng lặp.

Khi vòng lặp chạy:

```text
i = 0 → tạo setTimeout
i = 1 → tạo setTimeout
i = 2 → tạo setTimeout
i = 3 → vòng lặp kết thúc
```

Sau 100ms, các callback trong `setTimeout` mới chạy. Lúc đó vòng lặp đã kết thúc và `i` đang bằng:

```text
3
```

Vì cả 3 callback đều dùng chung một biến `i`, nên kết quả là:

```text
var: 3
var: 3
var: 3
```

---

### Vì sao `let` in ra 0, 1, 2?

Với vòng lặp:

```javascript
for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let:", j), 200);
}
```

`let` có **block scope**.

Trong vòng lặp `for`, mỗi lần lặp với `let` sẽ tạo ra một biến `j` riêng cho lần lặp đó.

Do đó:

```text
Lần 1 giữ j = 0
Lần 2 giữ j = 1
Lần 3 giữ j = 2
```

Sau 200ms, các callback chạy và nhớ đúng giá trị `j` của từng lần lặp.

Kết quả:

```text
let: 0
let: 1
let: 2
```

---

# Câu A3 — Array Methods

## Mảng ban đầu

```javascript
const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
```

---

## 1. Lấy các số chẵn

### Code

```javascript
const evenNumbers = nums.filter((n) => n % 2 === 0);
```

### Kết quả

```javascript
[2, 4, 6, 8, 10];
```

---

## 2. Nhân mỗi số với 3

### Code

```javascript
const multipliedBy3 = nums.map((n) => n * 3);
```

### Kết quả

```javascript
[3, 6, 9, 12, 15, 18, 21, 24, 27, 30];
```

---

## 3. Tính tổng tất cả phần tử

### Code

```javascript
const total = nums.reduce((sum, n) => sum + n, 0);
```

### Kết quả

```javascript
55;
```

---

## 4. Tìm số đầu tiên lớn hơn 7

### Code

```javascript
const firstGreaterThan7 = nums.find((n) => n > 7);
```

### Kết quả

```javascript
8;
```

---

## 5. Kiểm tra có số nào lớn hơn 10 không

### Code

```javascript
const hasGreaterThan10 = nums.some((n) => n > 10);
```

### Kết quả

```javascript
false;
```

---

## 6. Kiểm tra tất cả đều lớn hơn 0

### Code

```javascript
const allGreaterThan0 = nums.every((n) => n > 0);
```

### Kết quả

```javascript
true;
```

---

## 7. Tạo mảng "Số X là [chẵn/lẻ]"

### Code

```javascript
const descriptions = nums.map(
  (n) => `Số ${n} là ${n % 2 === 0 ? "chẵn" : "lẻ"}`,
);
```

### Kết quả

```javascript
[
  "Số 1 là lẻ",
  "Số 2 là chẵn",
  "Số 3 là lẻ",
  "Số 4 là chẵn",
  "Số 5 là lẻ",
  "Số 6 là chẵn",
  "Số 7 là lẻ",
  "Số 8 là chẵn",
  "Số 9 là lẻ",
  "Số 10 là chẵn",
];
```

---

## 8. Đảo ngược mảng (không mutate mảng gốc)

### Code

```javascript
const reversed = [...nums].reverse();
```

### Kết quả

```javascript
[10, 9, 8, 7, 6, 5, 4, 3, 2, 1];
```

---

## Giải thích các phương thức

### filter()

Dùng để lọc phần tử thỏa điều kiện.

```javascript
nums.filter((n) => n % 2 === 0);
```

---

### map()

Dùng để biến đổi từng phần tử và tạo mảng mới.

```javascript
nums.map((n) => n * 3);
```

---

### reduce()

Dùng để gộp toàn bộ phần tử thành một giá trị duy nhất.

```javascript
nums.reduce((sum, n) => sum + n, 0);
```

---

### find()

Trả về phần tử đầu tiên thỏa điều kiện.

```javascript
nums.find((n) => n > 7);
```

---

### some()

Kiểm tra có ít nhất một phần tử thỏa điều kiện hay không.

```javascript
nums.some((n) => n > 10);
```

---

### every()

Kiểm tra tất cả phần tử có thỏa điều kiện hay không.

```javascript
nums.every((n) => n > 0);
```

---

### reverse()

Đảo ngược mảng.

Lưu ý:

```javascript
nums.reverse();
```

sẽ làm thay đổi mảng gốc.

Do đó nên dùng:

```javascript
[...nums].reverse();
```

để tạo bản sao rồi mới đảo ngược.

---

# Câu A4 — Object Destructuring & Spread

# Phần 1: Destructuring

## Dự đoán

```javascript
console.log(name, price, ram, color);
```

Kết quả:

```text
iPhone 16 25990000 8 Titan
```

---

## Dự đoán

```javascript
console.log(specs);
```

Kết quả:

```text
ReferenceError
```

---

# Phần 2: Spread Operator

## Dự đoán

```javascript
console.log(updated.price);
```

Kết quả:

```text
23990000
```

---

## Dự đoán

```javascript
console.log(updated.sale);
```

Kết quả:

```text
true
```

---

## Dự đoán

```javascript
console.log(product.price);
```

Kết quả:

```text
25990000
```

---

# Phần 3: Spread Gotcha

## Code

```javascript
const copy = { ...product };

copy.specs.ram = 16;

console.log(product.specs.ram);
```

---

# Câu C1 — Refactor Code

# Code Refactor

```javascript
const processOrders = (orders) => {
  return orders

    .filter((order) => order.status === "completed" && order.total > 100000)

    .map((order) => {
      const discount = order.total * 0.1;

      return {
        id: order.id,
        customer: order.customer,
        total: order.total,
        discount,
        finalTotal: order.total - discount,
      };
    })

    .sort((a, b) => b.finalTotal - a.finalTotal);
};
```

link video:
https://drive.google.com/drive/folders/159_a0yGi1tmAWgWWFUfq-hdhnDMJsFIL?usp=drive_link
