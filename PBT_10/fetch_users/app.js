const loadBtn = document.querySelector("#loadBtn");
const state = document.querySelector("#state");
const userList = document.querySelector("#userList");
function showLoading() {
  state.textContent = "⏳ Đang tải...";
  state.className = "loading";
  userList.textContent = "";
}
function showSuccess() {
  state.textContent = "✅ Tải dữ liệu thành công!";
  state.className = "success";
}
function showError(message) {
  state.textContent = "❌ " + message;
  state.className = "error";
  userList.textContent = "";
}
async function getUsers() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const users = await res.json();
    return users;
  } catch (error) {
    console.error("Lỗi:", error);
    return [];
  }
}
function renderUsers(users) {
  userList.textContent = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.className = "user-card";
    const name = document.createElement("strong");
    name.textContent = user.name;
    const email = document.createElement("p");
    email.textContent = "Email: " + user.email;
    const phone = document.createElement("p");
    phone.textContent = "Phone: " + user.phone;
    li.appendChild(name);
    li.appendChild(email);
    li.appendChild(phone);
    userList.appendChild(li);
  });
}
async function loadUsers() {
  showLoading();
  const users = await getUsers();
  if (users.length === 0) {
    showError("Không tải được dữ liệu. Kiểm tra kết nối mạng.");
    return;
  }
  showSuccess();
  renderUsers(users);
}
loadBtn.addEventListener("click", loadUsers);
loadUsers();
