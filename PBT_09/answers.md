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
