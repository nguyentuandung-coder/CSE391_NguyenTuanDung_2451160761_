const todoForm = document.querySelector("#todoForm");
const todoInput = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const todoCount = document.querySelector("#todoCount");
const filterButtons = document.querySelectorAll(".filter-btn");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.className = "todo-item";
  li.dataset.id = todo.id;

  if (todo.completed) {
    li.classList.add("completed");
  }

  const span = document.createElement("span");
  span.className = "todo-text";
  span.textContent = todo.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "delete-btn";
  deleteBtn.textContent = "❌";

  li.appendChild(span);
  li.appendChild(deleteBtn);

  return li;
}

function getFilteredTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }

  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }

  return todos;
}

function renderTodos() {
  todoList.textContent = "";

  const filteredTodos = getFilteredTodos();

  filteredTodos.forEach((todo) => {
    const li = createTodoElement(todo);
    todoList.appendChild(li);
  });

  updateCount();
}

function updateCount() {
  const leftCount = todos.filter((todo) => !todo.completed).length;
  todoCount.textContent = `${leftCount} items left`;
}

function addTodo(text) {
  const todo = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => {
    if (todo.id === id) {
      return {
        ...todo,
        completed: !todo.completed,
      };
    }

    return todo;
  });

  saveTodos();
  renderTodos();
}

function startEdit(li, id) {
  const todo = todos.find((todo) => todo.id === id);
  if (!todo) return;

  li.textContent = "";

  const input = document.createElement("input");
  input.className = "edit-input";
  input.value = todo.text;

  li.appendChild(input);
  input.focus();

  input.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      const newText = input.value.trim();

      if (newText !== "") {
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return {
              ...todo,
              text: newText,
            };
          }

          return todo;
        });

        saveTodos();
      }

      renderTodos();
    }
  });

  input.addEventListener("blur", function () {
    renderTodos();
  });
}

todoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const text = todoInput.value.trim();

  if (text === "") {
    return;
  }

  addTodo(text);
  todoInput.value = "";
});

todoList.addEventListener("click", function (event) {
  const li = event.target.closest(".todo-item");

  if (!li) return;

  const id = Number(li.dataset.id);

  if (event.target.classList.contains("delete-btn")) {
    deleteTodo(id);
    return;
  }

  if (event.target.classList.contains("todo-text")) {
    toggleTodo(id);
  }
});

todoList.addEventListener("dblclick", function (event) {
  const li = event.target.closest(".todo-item");

  if (!li) return;

  const id = Number(li.dataset.id);

  if (event.target.classList.contains("todo-text")) {
    startEdit(li, id);
  }
});

filterButtons.forEach((button) => {
  button.addEventListener("click", function () {
    filterButtons.forEach((btn) => btn.classList.remove("active"));

    button.classList.add("active");
    currentFilter = button.dataset.filter;

    renderTodos();
  });
});

clearCompletedBtn.addEventListener("click", function () {
  todos = todos.filter((todo) => !todo.completed);

  saveTodos();
  renderTodos();
});

renderTodos();
