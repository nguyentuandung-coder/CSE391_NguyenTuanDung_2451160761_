# Câu A1 — var / let / const

## Đoạn 1

```javascript
console.log(x);
var x = 5;
```

### Dự đoán

Output:

```text
undefined
```

### Kết quả thực tế

Output:

```text
undefined
```

### Giải thích

Biến `var` được hoisting lên đầu phạm vi. Tại thời điểm `console.log(x)`, biến đã tồn tại nhưng chưa được gán giá trị nên kết quả là `undefined`.

---

## Đoạn 2

```javascript
console.log(y);
let y = 10;
```

### Dự đoán

Output:

```text
ReferenceError
```

### Kết quả thực tế

Output:

```text
ReferenceError: Cannot access 'y' before initialization
```

### Giải thích

Biến `let` nằm trong Temporal Dead Zone (TDZ) từ đầu block đến trước dòng khai báo. Truy cập biến trước khi khởi tạo sẽ gây lỗi `ReferenceError`.

---

## Đoạn 3

```javascript
const z = 15;
z = 20;
console.log(z);
```

### Dự đoán

Output:

```text
TypeError
```

### Kết quả thực tế

Output:

```text
TypeError: Assignment to constant variable
```

### Giải thích

Biến khai báo bằng `const` không thể gán lại giá trị sau khi đã khởi tạo.

---

## Đoạn 4

```javascript
const arr = [1, 2, 3];
arr.push(4);
console.log(arr);
```

### Dự đoán

Output:

```text
[1, 2, 3, 4]
```

### Kết quả thực tế

Output:

```text
[1, 2, 3, 4]
```

### Giải thích

`const` không cho phép thay đổi tham chiếu của biến nhưng vẫn cho phép thay đổi nội dung của object hoặc array.

---

## Đoạn 5

```javascript
let a = 1;
{
  let a = 2;
  console.log("Trong block:", a);
}
console.log("Ngoài block:", a);
```

### Dự đoán

Output:

```text
Trong block: 2
Ngoài block: 1
```

### Kết quả thực tế

Output:

```text
Trong block: 2
Ngoài block: 1
```

### Giải thích

`let` có phạm vi block. Biến `a` bên trong block là một biến khác với biến `a` bên ngoài.

---

## Các kết quả bất ngờ

1. `var` cho ra `undefined` thay vì báo lỗi do cơ chế hoisting.
2. `let` báo `ReferenceError` vì Temporal Dead Zone (TDZ).
3. `const` vẫn cho phép thay đổi nội dung của mảng nhưng không cho phép gán lại biến sang giá trị khác.

# Câu A2 — Data Types & Coercion

## Dự đoán kết quả

```text
object
undefined
number
53
2
15
2

[object Object]
[object Object]
```

Lưu ý: dòng `[] + []` cho ra chuỗi rỗng nên khi in ra terminal sẽ thấy một dòng trống.

---

## Kết quả thực tế

```text
object
undefined
number
53
2
15
2

[object Object]
[object Object]
```

---

## Giải thích từng dòng

### 1. `typeof null`

```javascript
console.log(typeof null);
```

Kết quả:

```text
object
```

Đây là một lỗi lịch sử của JavaScript. `null` biểu diễn giá trị rỗng, nhưng `typeof null` lại trả về `"object"`.

---

### 2. `typeof undefined`

```javascript
console.log(typeof undefined);
```

Kết quả:

```text
undefined
```

`undefined` nghĩa là biến chưa có giá trị hoặc giá trị chưa được định nghĩa.

---

### 3. `typeof NaN`

```javascript
console.log(typeof NaN);
```

Kết quả:

```text
number
```

`NaN` là viết tắt của `Not a Number`, nhưng trong JavaScript nó vẫn thuộc kiểu dữ liệu `number`.

---

### 4. `"5" + 3`

```javascript
console.log("5" + 3);
```

Kết quả:

```text
53
```

Toán tử `+` nếu có một bên là chuỗi thì JavaScript sẽ ưu tiên nối chuỗi. Vì `"5"` là string nên số `3` bị đổi thành chuỗi `"3"`, sau đó nối lại thành `"53"`.

---

### 5. `"5" - 3`

```javascript
console.log("5" - 3);
```

Kết quả:

```text
2
```

Toán tử `-` không dùng để nối chuỗi. Vì vậy JavaScript tự ép chuỗi `"5"` thành số `5`, sau đó tính:

```text
5 - 3 = 2
```

---

### 6. `"5" * "3"`

```javascript
console.log("5" * "3");
```

Kết quả:

```text
15
```

Toán tử `*` là toán tử số học nên JavaScript ép cả hai chuỗi `"5"` và `"3"` thành số, sau đó tính:

```text
5 * 3 = 15
```

---

### 7. `true + true`

```javascript
console.log(true + true);
```

Kết quả:

```text
2
```

Trong phép toán số học, `true` được ép kiểu thành `1`, nên:

```text
true + true = 1 + 1 = 2
```

---

### 8. `[] + []`

```javascript
console.log([] + []);
```

Kết quả:

```text

```

Hai mảng rỗng khi chuyển sang chuỗi đều thành chuỗi rỗng `""`.

Vì vậy:

```text
"" + "" = ""
```

Kết quả là một dòng trống.

---

### 9. `[] + {}`

```javascript
console.log([] + {});
```

Kết quả:

```text
[object Object]
```

Mảng rỗng `[]` khi chuyển sang chuỗi thành `""`.

Object `{}` khi chuyển sang chuỗi thành `"[object Object]"`.

Vì vậy:

```text
"" + "[object Object]" = "[object Object]"
```

---

### 10. `{} + []`

```javascript
console.log({} + []);
```

Kết quả:

```text
[object Object]
```

Trong file `.js` chạy bằng Node.js, biểu thức `{}` trong `console.log({} + [])` được hiểu là object rỗng. Object rỗng chuyển sang chuỗi thành `"[object Object]"`, còn mảng rỗng chuyển thành chuỗi rỗng `""`.

Vì vậy:

```text
"[object Object]" + "" = "[object Object]"
```

---

## Giải thích vì sao `"5" + 3` và `"5" - 3` khác nhau

`"5" + 3` cho kết quả `"53"` vì toán tử `+` vừa có thể dùng để cộng số, vừa có thể dùng để nối chuỗi. Khi có một toán hạng là string, JavaScript ưu tiên nối chuỗi.

Còn `"5" - 3` cho kết quả `2` vì toán tử `-` chỉ dùng cho phép trừ số học. JavaScript sẽ tự động ép chuỗi `"5"` thành số `5`, rồi thực hiện phép trừ.

---

## Các kết quả bất ngờ

1. `typeof null` trả về `"object"` mặc dù `null` không phải object thực sự.
2. `typeof NaN` trả về `"number"` dù tên là `Not a Number`.
3. `"5" + 3` cho ra `"53"` do nối chuỗi.
4. `"5" - 3` cho ra `2` do ép kiểu sang số.
5. `[] + []` cho ra chuỗi rỗng nên terminal hiển thị một dòng trống.

# Câu A3 — So sánh `==` vs `===`

## Code kiểm tra

## Dự đoán kết quả

```text
true
false
true
false
false
true
false
true
```

---

## Kết quả thực tế

```text
true
false
true
false
false
true
false
true
```

---

## Giải thích từng dòng

### 1. `5 == "5"`

```javascript
console.log(5 == "5");
```

Kết quả:

```text
true
```

Toán tử `==` cho phép ép kiểu.

JavaScript chuyển:

```text
"5" → 5
```

Sau đó so sánh:

```text
5 == 5
```

nên kết quả là:

```text
true
```

---

### 2. `5 === "5"`

```javascript
console.log(5 === "5");
```

Kết quả:

```text
false
```

Toán tử `===` không ép kiểu.

So sánh:

```text
number 5
string "5"
```

Khác kiểu dữ liệu nên:

```text
false
```

---

### 3. `null == undefined`

```javascript
console.log(null == undefined);
```

Kết quả:

```text
true
```

Đây là một quy tắc đặc biệt của JavaScript.

Khi dùng `==`:

```text
null == undefined
```

luôn trả về:

```text
true
```

---

### 4. `null === undefined`

```javascript
console.log(null === undefined);
```

Kết quả:

```text
false
```

Vì:

```text
null      → kiểu null
undefined → kiểu undefined
```

Khác kiểu nên:

```text
false
```

---

### 5. `NaN == NaN`

```javascript
console.log(NaN == NaN);
```

Kết quả:

```text
false
```

Đây là một trường hợp đặc biệt.

Theo chuẩn JavaScript:

```text
NaN không bằng bất kỳ giá trị nào,
kể cả chính nó.
```

Do đó:

```text
NaN == NaN
```

và

```text
NaN === NaN
```

đều trả về:

```text
false
```

Muốn kiểm tra NaN nên dùng:

```javascript
Number.isNaN(value);
```

---

### 6. `0 == false`

```javascript
console.log(0 == false);
```

Kết quả:

```text
true
```

Do `==` ép kiểu:

```text
false → 0
```

Sau đó:

```text
0 == 0
```

nên:

```text
true
```

---

### 7. `0 === false`

```javascript
console.log(0 === false);
```

Kết quả:

```text
false
```

Vì:

```text
0      → number
false  → boolean
```

Khác kiểu dữ liệu nên:

```text
false
```

---

### 8. `"" == false`

```javascript
console.log("" == false);
```

Kết quả:

```text
true
```

JavaScript thực hiện ép kiểu:

```text
false → 0
"" → 0
```

Sau đó:

```text
0 == 0
```

nên:

```text
true
```

---

## Bảng tóm tắt

| Biểu thức            | Kết quả |
| -------------------- | ------- |
| `5 == "5"`           | true    |
| `5 === "5"`          | false   |
| `null == undefined`  | true    |
| `null === undefined` | false   |
| `NaN == NaN`         | false   |
| `0 == false`         | true    |
| `0 === false`        | false   |
| `"" == false`        | true    |

---

## Nên dùng `==` hay `===`?

Nên ưu tiên sử dụng:

```javascript
===
```

### Lý do

`===` so sánh:

- Giá trị
- Kiểu dữ liệu

và không tự động ép kiểu.

Ví dụ:

```javascript
5 === "5";
```

Kết quả:

```text
false
```

rõ ràng và dễ hiểu.

Trong khi:

```javascript
5 == "5";
```

Kết quả:

```text
true
```

do JavaScript tự động ép kiểu, dễ gây lỗi khó phát hiện.

---

## Kết luận

Trong thực tế lập trình JavaScript hiện đại:

```text
Luôn ưu tiên dùng === và !==
Chỉ dùng == khi thực sự hiểu rõ quy tắc ép kiểu của JavaScript.
```

Điều này giúp code dễ đọc, dễ bảo trì và tránh các lỗi logic không mong muốn.

# Câu A4 — Truthy & Falsy

## Tất cả giá trị Falsy trong JavaScript

JavaScript chỉ có các giá trị Falsy sau:

```javascript
false;
0 - 0;
0n;
("");
""``;
null;
undefined;
NaN;
```

Ngoài các giá trị trên, mọi giá trị khác đều là Truthy.

---

## Dự đoán kết quả

```text
A
C
D
G
H
```

---

## Kết quả thực tế

```text
A
C
D
G
H
```

---

# Câu A5 — Template Literals

## Cách 1

### Code ban đầu

```javascript
var greeting = "Xin chào " + name + "! Bạn " + age + " tuổi.";
```

### Viết lại bằng Template Literal

```javascript
const greeting = `Xin chào ${name}! Bạn ${age} tuổi.`;
```

---

## Cách 2

### Code ban đầu

```javascript
var url = "https://api.example.com/users/" + userId + "/orders?page=" + page;
```

### Viết lại bằng Template Literal

```javascript
const url = `https://api.example.com/users/${userId}/orders?page=${page}`;
```

---

## Cách 3

### Code ban đầu

```javascript
var html =
  '<div class="card">' +
  "<h2>" +
  title +
  "</h2>" +
  "<p>" +
  description +
  "</p>" +
  "<span>Giá: " +
  price +
  "đ</span>" +
  "</div>";
```

### Viết lại bằng Template Literal

```javascript
const html = `
<div class="card">
    <h2>${title}</h2>
    <p>${description}</p>
    <span>Giá: ${price}đ</span>
</div>
`;
```

# Câu C1 — Debug JavaScript

## Code đã sửa

```javascript
function tinhGiaGiamGia(giaBan, phanTramGiam) {
  if (typeof giaBan !== "number" || isNaN(giaBan)) {
    return "Giá bán không hợp lệ";
  }

  if (typeof phanTramGiam !== "number" || isNaN(phanTramGiam)) {
    return "Phần trăm giảm không hợp lệ";
  }

  if (giaBan < 0) {
    return "Giá bán không được âm";
  }

  if (phanTramGiam < 0 || phanTramGiam > 100) {
    return "Phần trăm giảm không hợp lệ";
  }

  const giamGia = (giaBan * phanTramGiam) / 100;
  const giaSauGiam = giaBan - giamGia;

  if (giaSauGiam === 0) {
    console.log("Sản phẩm miễn phí!");
  }

  return giaSauGiam;
}

// Test
const gia = tinhGiaGiamGia(100000, 20);
console.log("Giá sau giảm: " + gia + "đ");

const gia2 = tinhGiaGiamGia(50000, 110);
console.log("Giá: " + gia2);

for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

---

## Dự đoán kết quả

```text
Giá sau giảm: 80000đ
Giá: Phần trăm giảm không hợp lệ
Item 0
Item 1
Item 2
Item 3
Item 4
```

---

## Kết quả thực tế

```text
Giá sau giảm: 80000đ
Giá: Phần trăm giảm không hợp lệ
Item 0
Item 1
Item 2
Item 3
Item 4
```

---

## Liệt kê lỗi + giải thích + cách sửa

### Lỗi 1: Gán nhầm trong điều kiện `if`

Code sai:

```javascript
if ((giaSauGiam = 0)) {
  console.log("Sản phẩm miễn phí!");
}
```

Dòng này dùng dấu `=` là phép gán, không phải phép so sánh.

Cách sửa:

```javascript
if (giaSauGiam === 0) {
  console.log("Sản phẩm miễn phí!");
}
```

Nên dùng `===` để so sánh cả giá trị và kiểu dữ liệu.

---

### Lỗi 2: Input `giaBan` là chuỗi nhưng vẫn được tính toán

Code sai:

```javascript
const gia = tinhGiaGiamGia("100000", 20);
```

`"100000"` là chuỗi, không phải số. JavaScript có thể tự ép kiểu khi nhân hoặc trừ, nhưng không nên phụ thuộc vào ép kiểu ngầm.

Cách sửa:

```javascript
const gia = tinhGiaGiamGia(100000, 20);
```

Đồng thời thêm kiểm tra:

```javascript
if (typeof giaBan !== "number" || isNaN(giaBan)) {
  return "Giá bán không hợp lệ";
}
```

---

### Lỗi 3: Chưa kiểm tra `phanTramGiam` có phải số hay không

Code ban đầu chỉ kiểm tra:

```javascript
if (phanTramGiam < 0 || phanTramGiam > 100)
```

Nếu truyền vào `"abc"` thì điều kiện này không xử lý rõ ràng.

Cách sửa:

```javascript
if (typeof phanTramGiam !== "number" || isNaN(phanTramGiam)) {
  return "Phần trăm giảm không hợp lệ";
}
```

---

### Lỗi 4: Chưa kiểm tra `giaBan` âm

Nếu gọi:

```javascript
tinhGiaGiamGia(-100000, 20);
```

thì chương trình vẫn tính, nhưng giá bán âm là dữ liệu không hợp lệ.

Cách sửa:

```javascript
if (giaBan < 0) {
  return "Giá bán không được âm";
}
```

---

### Lỗi 5: Dùng `var` không cần thiết

Code ban đầu:

```javascript
var giamGia = (giaBan * phanTramGiam) / 100;
```

Trong JavaScript hiện đại, nên hạn chế dùng `var` vì `var` có function scope và dễ gây lỗi hoisting.

Cách sửa:

```javascript
const giamGia = (giaBan * phanTramGiam) / 100;
```

Vì giá trị này không cần gán lại nên dùng `const`.

---

### Lỗi 6: Thiếu dấu chấm phẩy

Code ban đầu có nhiều dòng thiếu dấu `;`.

Ví dụ:

```javascript
return "Phần trăm giảm không hợp lệ";
```

Cách sửa:

```javascript
return "Phần trăm giảm không hợp lệ";
```

JavaScript có cơ chế tự thêm dấu chấm phẩy, nhưng để code rõ ràng và tránh lỗi khó đoán, nên viết đầy đủ.

---

### Lỗi 7: Lỗi ẩn do dùng `var` trong vòng lặp với `setTimeout`

Code sai:

```javascript
for (var i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

Kết quả có thể là:

```text
Item 5
Item 5
Item 5
Item 5
Item 5
```

Lý do: `var` có function scope, nên tất cả callback trong `setTimeout` dùng chung một biến `i`. Sau khi vòng lặp kết thúc, `i` đã bằng `5`, nên tất cả callback đều in ra `5`.

Cách sửa:

```javascript
for (let i = 0; i < 5; i++) {
  setTimeout(function () {
    console.log("Item " + i);
  }, 1000);
}
```

`let` có block scope, mỗi vòng lặp tạo ra một biến `i` riêng, nên kết quả đúng là:

```text
Item 0
Item 1
Item 2
Item 3
Item 4
```
