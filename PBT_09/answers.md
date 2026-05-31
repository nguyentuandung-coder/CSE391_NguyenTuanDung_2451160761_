# Câu A1

div#app
│
├── header
│ │
│ ├── h1
│ │ └── "Todo App"
│ │
│ └── nav
│ │
│ ├── a.active
│ │ └── "All"
│ │
│ ├── a
│ │ └── "Active"
│ │
│ └── a
│ └── "Completed"
│
└── main
│
├── form#todoForm
│ │
│ ├── input#todoInput
│ │
│ └── button
│ └── "Add"
│
└── ul#todoList
│
├── li.todo-item
│ └── "Learn HTML"
│
└── li.todo-item.completed
└── "Learn CSS"

// 1. Chọn thẻ <h1>
document.querySelector("h1");

// 2. Chọn input trong form
document.querySelector("#todoForm input");

// 3. Chọn tất cả .todo-item
document.querySelectorAll(".todo-item");

// 4. Chọn link đang active
document.querySelector("a.active");

// 5. Chọn <li> đầu tiên trong #todoList
document.querySelector("#todoList li:first-child");

// 6. Chọn tất cả <a> bên trong <nav>
document.querySelectorAll("nav a");

# Câu A2

## 1. Sự khác nhau

### `innerHTML`

`innerHTML` dùng để đọc hoặc ghi nội dung HTML bên trong một phần tử.

Ví dụ:

```javascript
document.querySelector("#result").innerHTML = "<strong>Hello</strong>";
```

Kết quả hiển thị:

```text
Hello
```

Chữ `Hello` sẽ được in đậm vì trình duyệt hiểu `<strong>` là thẻ HTML.

---

### `textContent`

`textContent` dùng để đọc hoặc ghi nội dung dạng văn bản thuần.

Ví dụ:

```javascript
document.querySelector("#result").textContent = "<strong>Hello</strong>";
```

Kết quả hiển thị:

```text
<strong>Hello</strong>
```

Trình duyệt không hiểu `<strong>` là HTML, mà chỉ coi nó là text bình thường.

## 2.Vì sao `innerHTML` có thể gây XSS?

Đây là lỗi bảo mật xảy ra khi website đưa dữ liệu người dùng nhập vào trang dưới dạng HTML hoặc JavaScript mà không kiểm tra an toàn.

Ví dụ người dùng nhập:

```html
<img src="x" onerror="alert('Hacked!')" />
```

Khi dùng `innerHTML`, trình duyệt sẽ hiểu chuỗi người dùng nhập là HTML thật.

Thẻ:

```html
<img src="x" onerror="alert('Hacked!')" />
```

có thể kích hoạt sự kiện `onerror`.

Kết quả là đoạn JavaScript trong `onerror` có thể chạy.

Đây là lý do `innerHTML` nguy hiểm nếu dùng với input từ người dùng.

```javascript
const userInput = document.querySelector("#search").value;

document.querySelector("#result").textContent = userInput;
```

# Câu A3

## Trường hợp 1: Không dùng stopPropagation()

### Code

```javascript
document.querySelector("#outer").addEventListener("click", () => {
  console.log("OUTER");
});

document.querySelector("#inner").addEventListener("click", () => {
  console.log("INNER");
});

document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
});
```

### Dự đoán output

```text
BUTTON
INNER
OUTER
```

## Trường hợp 2: Có stopPropagation()

### Code

```javascript
document.querySelector("#btn").addEventListener("click", (e) => {
  console.log("BUTTON");
  e.stopPropagation();
});
```

### Dự đoán output

```text
BUTTON
```

# Câu C1

## Các lỗi đã tìm và sửa

### Lỗi 1: Dùng `innerHTML` không cần thiết

```javascript
countDisplay.textContent = count;
```

---

### Lỗi 2: Sai tên event

```javascript
addEventListener("click", function () {
```

---

### Lỗi 3: Gán sai vào biến DOM

```javascript
countDisplay.textContent = count;
```

---

### Lỗi 4: Xóa history bằng `innerHTML = null`

```javascript
historyList.textContent = "";
```

---

### Lỗi 5: Gọi sai hàm `remove`

```javascript
item.remove();
```

### Lỗi 6: Bind event click riêng cho từng `li`

```javascript
historyList.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});
```

---

### Lỗi 7: Lưu history bằng `innerHTML`

```javascript
localStorage.setItem("history", JSON.stringify(getHistoryItems()));
```

---

### Lỗi 8: Load count từ localStorage nhưng không ép kiểu

```javascript
count = Number(localStorage.getItem("count")) || 0;
```

---

### Lỗi 9: Không load lại history từ localStorage

```javascript
loadHistory();
```

---

### Lỗi 10: Không lưu sau mỗi thao tác

```javascript
saveToLocalStorage();
```

# Câu C2

## 1. Vì sao bind event lên 1000 elements riêng lẻ là bad practice?

Nếu có 1000 phần tử và mỗi phần tử đều gắn event riêng:

```javascript
item.addEventListener("click", function () {
  console.log("Clicked");
});
```

thì trình duyệt phải lưu 1000 event listeners khác nhau.

Điều này gây ra các vấn đề:

```text
Tốn bộ nhớ hơn
Code khó quản lý hơn
Khó xử lý phần tử được thêm mới sau này
Hiệu năng kém hơn khi danh sách lớn
```

## 2. Event Delegation giải quyết thế nào?

Event Delegation là kỹ thuật gắn event vào phần tử cha thay vì gắn vào từng phần tử con.

Khi click vào một `.item`, event sẽ bubble lên `#list`.

Nhờ đó chỉ cần 1 event listener cho toàn bộ danh sách.

Ưu điểm:

```text
Chỉ cần 1 listener
Tiết kiệm bộ nhớ
Code dễ quản lý hơn
Item thêm mới vẫn hoạt động
Phù hợp với danh sách lớn
```

---

## 3. Code cũ gây nhiều reflow

Vấn đề:

```text
appendChild vào DOM thật 1000 lần
Mỗi lần có thể làm trình duyệt tính lại layout
Gây nhiều reflow/repaint
Hiệu năng kém
```

---

## 4. Refactor bằng DocumentFragment

```javascript
const fragment = document.createDocumentFragment();

for (let i = 0; i < 1000; i++) {
  const div = document.createElement("div");
  div.textContent = `Item ${i}`;
  fragment.appendChild(div);
}

document.body.appendChild(fragment);
```

---

## 5. Vì sao DocumentFragment nhanh hơn?

`DocumentFragment` là một vùng DOM tạm thời nằm ngoài DOM thật.

Khi thêm phần tử vào fragment:

```javascript
fragment.appendChild(div);
```

trình duyệt chưa cần render ngay ra giao diện.

Sau khi tạo xong 1000 phần tử, ta chỉ append fragment vào DOM thật một lần:

```javascript
document.body.appendChild(fragment);
```

link video:
