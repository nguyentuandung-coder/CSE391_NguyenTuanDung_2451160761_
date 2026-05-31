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
