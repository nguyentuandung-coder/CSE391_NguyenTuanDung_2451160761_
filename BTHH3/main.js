// Khởi tạo dữ liệu từ localStorage hoặc giá trị mẫu nếu chưa có
let students = JSON.parse(localStorage.getItem("students")) || [
  {
    id: "2451160761",
    hoten: "Nguyễn Dũng",
    ngaysinh: "01/01/2003",
    lophoc: "66HTTT1",
    diemtb: 10,
    email: "123@gmail.com",
  },
];

let isEditMode = false;
let selectedStudentId = null;

const studentList = document.getElementById("student-list");
const totalCountEl = document.getElementById("total-count");
const avgScoreEl = document.getElementById("avg-score");
const modal = document.getElementById("modal");
const studentForm = document.getElementById("student-form");
const modalTitle = document.getElementById("modal-title");
const closeBtn = document.getElementById("close-btn");
const addBtn = document.getElementById("add");
const fixBtn = document.getElementById("fix");
const delBtn = document.getElementById("del");

function saveStudents() {
  localStorage.setItem("students", JSON.stringify(students));
}

function updateStats() {
  totalCountEl.innerText = students.length;

  if (students.length === 0) {
    avgScoreEl.innerText = "0.00";
    return;
  }

  const totalScore = students.reduce((sum, stu) => sum + Number(stu.diemtb), 0);

  avgScoreEl.innerText = (totalScore / students.length).toFixed(2);
}

function selectStudent(id) {
  if (selectedStudentId === id) {
    selectedStudentId = null;
  } else {
    selectedStudentId = id;
  }
  renderStudents();
}

function renderStudents() {
  studentList.innerHTML = "";

  if (students.length === 0) {
    studentList.innerHTML =
      '<tr><td colspan="7" style="text-align:center; padding: 24px 0">Chưa có sinh viên nào</td></tr>';
    updateStats();
    return;
  }

  students.forEach((stu) => {
    const isSelected = stu.id === selectedStudentId ? "selected" : "";
    studentList.innerHTML += `
      <tr class="${isSelected}" data-id="${stu.id}">
        <td>${stu.id}</td>
        <td>${stu.hoten}</td>
        <td>${stu.ngaysinh}</td>
        <td>${stu.lophoc}</td>
        <td>${stu.diemtb}</td>
        <td>${stu.email}</td>
        <td>
          <button class="action-btn edit-btn" data-id="${stu.id}">Sửa</button>
          <button class="action-btn del-btn" data-id="${stu.id}">Xóa</button>
        </td>
      </tr>
    `;
  });

  updateStats();
}

function openModal(editMode = false) {
  isEditMode = editMode;
  modalTitle.innerText = editMode ? "Sửa sinh viên" : "Thêm sinh viên";
  document.getElementById("masv").disabled = editMode;
  modal.classList.add("active");
}

function closeModal() {
  studentForm.reset();
  isEditMode = false;
  modal.classList.remove("active");
}

function fillForm(student) {
  document.getElementById("masv").value = student.id;
  document.getElementById("hoten").value = student.hoten;
  document.getElementById("ngaysinh").value = student.ngaysinh;
  document.getElementById("lophoc").value = student.lophoc;
  document.getElementById("diemtb").value = student.diemtb;
  document.getElementById("email").value = student.email;
}

addBtn.addEventListener("click", () => {
  studentForm.reset();
  selectedStudentId = null;
  openModal(false);
});

fixBtn.addEventListener("click", () => {
  if (!selectedStudentId) {
    alert("Vui lòng chọn một sinh viên để sửa.");
    return;
  }
  const student = students.find((s) => s.id === selectedStudentId);
  if (!student) return;
  fillForm(student);
  openModal(true);
});

delBtn.addEventListener("click", () => {
  if (!selectedStudentId) {
    alert("Vui lòng chọn một sinh viên để xóa.");
    return;
  }

  if (confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
    students = students.filter((s) => s.id !== selectedStudentId);
    selectedStudentId = null;
    saveStudents();
    renderStudents();
  }
});

closeBtn.addEventListener("click", closeModal);

studentForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const newStudent = {
    id: document.getElementById("masv").value.trim(),
    hoten: document.getElementById("hoten").value.trim(),
    ngaysinh: document.getElementById("ngaysinh").value.trim(),
    lophoc: document.getElementById("lophoc").value.trim(),
    diemtb: Number(document.getElementById("diemtb").value),
    email: document.getElementById("email").value.trim(),
  };

  if (!newStudent.id || !newStudent.hoten || !newStudent.email) {
    return alert("Vui lòng điền đầy đủ thông tin.");
  }

  if (newStudent.diemtb < 0 || newStudent.diemtb > 10) {
    return alert("Điểm trung bình phải nằm trong khoảng 0 - 10.");
  }

  if (!isEditMode) {
    if (students.some((student) => student.id === newStudent.id)) {
      return alert("Mã sinh viên đã tồn tại.");
    }
    students.push(newStudent);
    alert("Thêm sinh viên thành công.");
  } else {
    const index = students.findIndex((s) => s.id === newStudent.id);
    if (index === -1) {
      return alert("Không tìm thấy sinh viên để cập nhật.");
    }
    students[index] = newStudent;
    alert("Cập nhật sinh viên thành công.");
  }

  saveStudents();
  renderStudents();
  closeModal();
});

studentList.addEventListener("click", function (e) {
  const row = e.target.closest("tr[data-id]");
  const id = row ? row.dataset.id : null;

  if (e.target.classList.contains("edit-btn") && id) {
    const student = students.find((s) => s.id === id);
    if (!student) return;
    fillForm(student);
    openModal(true);
    selectedStudentId = id;
    renderStudents();
    return;
  }

  if (e.target.classList.contains("del-btn") && id) {
    if (confirm("Bạn có chắc muốn xóa sinh viên này không?")) {
      students = students.filter((s) => s.id !== id);
      selectedStudentId = null;
      saveStudents();
      renderStudents();
    }
    return;
  }

  if (id && !e.target.classList.contains("action-btn")) {
    selectStudent(id);
  }
});

renderStudents();
