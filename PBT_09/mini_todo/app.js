const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const list = document.querySelector("#todoList");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!input.value.trim()) return;
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = input.value;
  span.addEventListener("click", () => {
    li.classList.toggle("completed");
  });
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.addEventListener("click", () => {
    li.remove();
  });
  li.appendChild(span);
  li.appendChild(deleteBtn);
  list.appendChild(li);
  input.value = "";
  input.focus();
});
