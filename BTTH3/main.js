let students = JSON.parse(localStorage.getItem("students")) || [];

let isEditMode = false;
let editingId = null;

const studentList = document.getElementById("student-list");
const totalCountEl = document.getElementById("total-count");
const avgScoreEl = document.getElementById("avg-score");
const modal = document.getElementById("modal");
const studentForm = document.getElementById("student-form");
const modalTitle = document.getElementById("modal-title");
const addBtn = document.getElementById("add");
const closeBtn = document.getElementById("close-btn");
const messageEl = document.getElementById("message");

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function showMessage(message) {
  messageEl.innerText = message;

  setTimeout(function () {
    messageEl.innerText = "";
  }, 2500);
}

function renderStudents() {
  studentList.innerHTML = "";

  if (students.length === 0) {
    studentList.innerHTML = `
      <tr>
        <td colspan="7" style="text-align:center;">Chưa có sinh viên nào</td>
      </tr>
    `;
    updateStats();
    return;
  }

  students.forEach(function (student) {
    studentList.innerHTML += `
      <tr>
        <td>${student.masv}</td>
        <td>${student.hoten}</td>
        <td>${student.ngaysinh}</td>
        <td>${student.lophoc}</td>
        <td>${student.diemtb}</td>
        <td>${student.email}</td>
        <td>
          <button class="edit-btn" data-id="${student.masv}">Sửa</button>
          <button class="del-btn" data-id="${student.masv}">Xóa</button>
        </td>
      </tr>
    `;
  });

  updateStats();
}

function updateStats() {
  totalCountEl.innerText = students.length;

  if (students.length === 0) {
    avgScoreEl.innerText = "0.00";
    return;
  }

  let total = 0;

  students.forEach(function (student) {
    total += Number(student.diemtb);
  });

  avgScoreEl.innerText = (total / students.length).toFixed(2);
}

function openModal() {
  modal.classList.add("active");
}

function closeModal() {
  modal.classList.remove("active");
  studentForm.reset();
  clearAllErrors();
  isEditMode = false;
  editingId = null;
  modalTitle.innerText = "Thêm sinh viên";
  document.getElementById("masv").disabled = false;
}

function setError(inputId, message) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "-error");

  input.classList.add("error");
  error.innerText = message;
}

function clearError(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(inputId + "-error");

  input.classList.remove("error");
  error.innerText = "";
}

function clearAllErrors() {
  clearError("masv");
  clearError("hoten");
  clearError("ngaysinh");
  clearError("lophoc");
  clearError("diemtb");
  clearError("email");
}

function validateForm() {
  clearAllErrors();

  let isValid = true;

  const masv = document.getElementById("masv").value.trim();
  const hoten = document.getElementById("hoten").value.trim();
  const ngaysinh = document.getElementById("ngaysinh").value;
  const lophoc = document.getElementById("lophoc").value.trim();
  const diemtb = document.getElementById("diemtb").value;
  const email = document.getElementById("email").value.trim();

  const masvRegex = /^[0-9]{10}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (masv === "") {
    setError("masv", "Mã sinh viên không được để trống");
    isValid = false;
  } else if (!masvRegex.test(masv)) {
    setError("masv", "Mã sinh viên phải gồm đúng 10 chữ số");
    isValid = false;
  } else if (
    !isEditMode &&
    students.some(function (s) {
      return s.masv === masv;
    })
  ) {
    setError("masv", "Mã sinh viên đã tồn tại");
    isValid = false;
  }

  if (hoten === "") {
    setError("hoten", "Họ tên không được để trống");
    isValid = false;
  } else if (hoten.length < 3) {
    setError("hoten", "Họ tên phải có ít nhất 3 ký tự");
    isValid = false;
  }

  if (ngaysinh === "") {
    setError("ngaysinh", "Ngày sinh không được để trống");
    isValid = false;
  }

  if (lophoc === "") {
    setError("lophoc", "Lớp học không được để trống");
    isValid = false;
  }

  if (diemtb === "") {
    setError("diemtb", "Điểm trung bình không được để trống");
    isValid = false;
  } else if (isNaN(diemtb) || Number(diemtb) < 0 || Number(diemtb) > 10) {
    setError("diemtb", "Điểm trung bình phải từ 0 đến 10");
    isValid = false;
  }

  if (email === "") {
    setError("email", "Email không được để trống");
    isValid = false;
  } else if (!emailRegex.test(email)) {
    setError("email", "Email không đúng định dạng");
    isValid = false;
  }

  return isValid;
}

function getFormData() {
  return {
    masv: document.getElementById("masv").value.trim(),
    hoten: document.getElementById("hoten").value.trim(),
    ngaysinh: document.getElementById("ngaysinh").value,
    lophoc: document.getElementById("lophoc").value.trim(),
    diemtb: Number(document.getElementById("diemtb").value),
    email: document.getElementById("email").value.trim(),
  };
}

function fillForm(student) {
  document.getElementById("masv").value = student.masv;
  document.getElementById("hoten").value = student.hoten;
  document.getElementById("ngaysinh").value = student.ngaysinh;
  document.getElementById("lophoc").value = student.lophoc;
  document.getElementById("diemtb").value = student.diemtb;
  document.getElementById("email").value = student.email;
}

addBtn.addEventListener("click", function () {
  studentForm.reset();
  clearAllErrors();
  isEditMode = false;
  editingId = null;
  modalTitle.innerText = "Thêm sinh viên";
  document.getElementById("masv").disabled = false;
  openModal();
});

closeBtn.addEventListener("click", function () {
  closeModal();
});

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const student = getFormData();

  if (isEditMode) {
    const index = students.findIndex(function (s) {
      return s.masv === editingId;
    });

    students[index] = student;
    showMessage("Cập nhật sinh viên thành công");
  } else {
    students.push(student);
    showMessage("Thêm sinh viên thành công");
  }

  saveStudents();
  renderStudents();
  closeModal();
});

studentList.addEventListener("click", function (event) {
  const id = event.target.dataset.id;

  if (event.target.classList.contains("edit-btn")) {
    const student = students.find(function (s) {
      return s.masv === id;
    });

    if (!student) return;

    isEditMode = true;
    editingId = id;

    fillForm(student);

    modalTitle.innerText = "Sửa sinh viên";
    document.getElementById("masv").disabled = true;

    openModal();
  }

  if (event.target.classList.contains("del-btn")) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa sinh viên này không?");

    if (confirmDelete) {
      students = students.filter(function (s) {
        return s.masv !== id;
      });

      saveStudents();
      renderStudents();
      showMessage("Xóa sinh viên thành công");
    }
  }
});

renderStudents();
