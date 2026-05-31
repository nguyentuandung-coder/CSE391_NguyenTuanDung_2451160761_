const api = {
    baseURL: "https://jsonplaceholder.typicode.com",

    async request(endpoint, options = {}) {
        const response = await fetch(this.baseURL + endpoint, {
            headers: {
                "Content-Type": "application/json"
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        if (options.method === "DELETE") {
            return true;
        }

        return response.json();
    },

    async getUsers() {
        return this.request("/users");
    },

    async getUser(id) {
        return this.request(`/users/${id}`);
    },

    async createUser(data) {
        return this.request("/users", {
            method: "POST",
            body: JSON.stringify(data)
        });
    },

    async updateUser(id, data) {
        return this.request(`/users/${id}`, {
            method: "PUT",
            body: JSON.stringify(data)
        });
    },

    async deleteUser(id) {
        return this.request(`/users/${id}`, {
            method: "DELETE"
        });
    }
};

const userList = document.querySelector("#userList");
const loading = document.querySelector("#loading");
const toast = document.querySelector("#toast");

const userForm = document.querySelector("#userForm");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const phoneInput = document.querySelector("#phoneInput");
const submitBtn = document.querySelector("#submitBtn");
const cancelBtn = document.querySelector("#cancelBtn");
const searchInput = document.querySelector("#searchInput");

let users = [];
let editingId = null;

const ui = {
    renderUsers(userArray) {
        userList.textContent = "";

        if (userArray.length === 0) {
            const empty = document.createElement("p");
            empty.textContent = "Không có user phù hợp.";
            userList.appendChild(empty);
            return;
        }

        userArray.forEach(user => {
            const card = document.createElement("article");
            card.className = "card";
            card.dataset.id = user.id;

            const name = document.createElement("h3");
            name.textContent = user.name;

            const email = document.createElement("p");
            email.textContent = `Email: ${user.email}`;

            const phone = document.createElement("p");
            phone.textContent = `Phone: ${user.phone}`;

            const actions = document.createElement("div");
            actions.className = "card-actions";

            const detailBtn = document.createElement("button");
            detailBtn.className = "detail-btn";
            detailBtn.textContent = "Detail";

            const editBtn = document.createElement("button");
            editBtn.className = "edit-btn";
            editBtn.textContent = "Edit";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";

            actions.appendChild(detailBtn);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);

            card.appendChild(name);
            card.appendChild(email);
            card.appendChild(phone);
            card.appendChild(actions);

            userList.appendChild(card);
        });
    },

    showLoading() {
        loading.textContent = "";
        userList.textContent = "";

        for (let i = 0; i < 4; i++) {
            const skeleton = document.createElement("div");
            skeleton.className = "skeleton";
            loading.appendChild(skeleton);
        }
    },

    hideLoading() {
        loading.textContent = "";
    },

    showError(message) {
        this.showToast(message, "error");
    },

    showSuccess(message) {
        this.showToast(message, "success");
    },

    showToast(message, type) {
        toast.textContent = "";

        const box = document.createElement("div");
        box.className = `toast ${type}`;
        box.textContent = message;

        toast.appendChild(box);

        setTimeout(() => {
            toast.textContent = "";
        }, 2500);
    }
};

function resetForm() {
    editingId = null;
    userForm.reset();
    submitBtn.textContent = "Add User";
    cancelBtn.classList.add("hidden");
}

function getFormData() {
    return {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim()
    };
}

function applySearch() {
    const keyword = searchInput.value.trim().toLowerCase();

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword)
    );

    ui.renderUsers(filteredUsers);
}

async function loadUsers() {
    ui.showLoading();

    try {
        users = await api.getUsers();
        ui.hideLoading();
        ui.renderUsers(users);
    } catch (error) {
        ui.hideLoading();
        ui.showError("Không tải được danh sách users.");
    }
}

userForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const data = getFormData();

    try {
        if (editingId === null) {
            const newUser = await api.createUser(data);

            users.unshift(newUser);
            ui.showSuccess("Thêm user thành công!");
        } else {
            const updatedUser = await api.updateUser(editingId, data);

            users = users.map(user => {
                if (user.id === editingId) {
                    return {
                        ...user,
                        ...updatedUser
                    };
                }

                return user;
            });

            ui.showSuccess("Cập nhật user thành công!");
        }

        resetForm();
        applySearch();

    } catch (error) {
        ui.showError("Thao tác thất bại. Vui lòng thử lại.");
    }
});

userList.addEventListener("click", async function (event) {
    const card = event.target.closest(".card");

    if (!card) return;

    const id = Number(card.dataset.id);
    const user = users.find(item => item.id === id);

    if (!user) return;

    if (event.target.classList.contains("detail-btn")) {
        try {
            const detail = await api.getUser(id);
            alert(
                `Name: ${detail.name}\nEmail: ${detail.email}\nPhone: ${detail.phone}\nWebsite: ${detail.website}`
            );
        } catch (error) {
            ui.showError("Không lấy được chi tiết user.");
        }
    }

    if (event.target.classList.contains("edit-btn")) {
        editingId = id;

        nameInput.value = user.name;
        emailInput.value = user.email;
        phoneInput.value = user.phone;

        submitBtn.textContent = "Update User";
        cancelBtn.classList.remove("hidden");
        nameInput.focus();
    }

    if (event.target.classList.contains("delete-btn")) {
        const confirmed = confirm(`Bạn có chắc muốn xóa ${user.name}?`);

        if (!confirmed) return;

        try {
            await api.deleteUser(id);

            users = users.filter(item => item.id !== id);

            applySearch();
            ui.showSuccess("Xóa user thành công!");
        } catch (error) {
            ui.showError("Xóa user thất bại.");
        }
    }
});

cancelBtn.addEventListener("click", resetForm);

searchInput.addEventListener("input", applySearch);

loadUsers();