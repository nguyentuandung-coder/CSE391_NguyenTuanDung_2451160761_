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
