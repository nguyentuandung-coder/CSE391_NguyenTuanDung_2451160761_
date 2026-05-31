const form = document.querySelector("#registerForm");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const confirmInput = document.querySelector("#confirmPassword");
const phoneInput = document.querySelector("#phone");

const nameStatus = document.querySelector("#nameStatus");
const emailStatus = document.querySelector("#emailStatus");
const confirmStatus = document.querySelector("#confirmStatus");
const phoneStatus = document.querySelector("#phoneStatus");

const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const passwordError = document.querySelector("#passwordError");
const confirmError = document.querySelector("#confirmError");
const phoneError = document.querySelector("#phoneError");

const strengthBar = document.querySelector("#strengthBar");
const strengthText = document.querySelector("#strengthText");

const submitBtn = document.querySelector("#submitBtn");

const modal = document.querySelector("#successModal");
const modalInfo = document.querySelector("#modalInfo");
const closeModal = document.querySelector("#closeModal");

const state = {
  name: false,
  email: false,
  password: false,
  confirm: false,
  phone: false,
};

function setFieldState(input, status, errorElement, isValid, message) {
  input.classList.remove("valid", "invalid");

  if (input.value.trim() === "") {
    status.textContent = "";
    errorElement.textContent = "";
    return;
  }

  if (isValid) {
    input.classList.add("valid");
    status.textContent = "✅";
    errorElement.textContent = "";
  } else {
    input.classList.add("invalid");
    status.textContent = "❌";
    errorElement.textContent = message;
  }
}

function updateSubmitButton() {
  const isFormValid =
    state.name && state.email && state.password && state.confirm && state.phone;

  submitBtn.disabled = !isFormValid;
}

function validateName() {
  const value = nameInput.value.trim();
  const isValid = value.length >= 2 && value.length <= 50;

  state.name = isValid;

  setFieldState(
    nameInput,
    nameStatus,
    nameError,
    isValid,
    "Tên phải từ 2 đến 50 ký tự.",
  );

  updateSubmitButton();
}

function validateEmail() {
  const value = emailInput.value.trim();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  let message = "";

  if (value === "") {
    message = "";
  } else if (!value.includes("@")) {
    message = "Email phải có ký tự @.";
  } else if (!emailRegex.test(value)) {
    message = "Email không đúng định dạng.";
  }

  const isValid = emailRegex.test(value);

  state.email = isValid;

  setFieldState(emailInput, emailStatus, emailError, isValid, message);

  updateSubmitButton();
}

function getPasswordStrength(password) {
  const hasMinLength = password.length >= 8;
  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);

  if (!hasMinLength) {
    return "weak";
  }

  if (hasLower && hasUpper && hasNumber && hasSpecial) {
    return "strong";
  }

  if ((hasLower || hasUpper) && hasNumber) {
    return "medium";
  }

  return "weak";
}

function validatePassword() {
  const password = passwordInput.value;

  strengthBar.className = "";

  if (password === "") {
    strengthBar.style.width = "0";
    strengthText.textContent = "Chưa nhập mật khẩu";
    passwordError.textContent = "";
    state.password = false;
    validateConfirm();
    updateSubmitButton();
    return;
  }

  const strength = getPasswordStrength(password);

  strengthBar.classList.add(strength);

  if (strength === "weak") {
    strengthText.textContent = "Yếu";
    passwordError.textContent = "Mật khẩu yếu: cần ít nhất 8 ký tự.";
    state.password = false;
  } else if (strength === "medium") {
    strengthText.textContent = "Trung bình";
    passwordError.textContent = "";
    state.password = true;
  } else {
    strengthText.textContent = "Mạnh";
    passwordError.textContent = "";
    state.password = true;
  }

  validateConfirm();
  updateSubmitButton();
}

function validateConfirm() {
  const password = passwordInput.value;
  const confirm = confirmInput.value;

  const isValid = confirm !== "" && confirm === password;

  state.confirm = isValid;

  setFieldState(
    confirmInput,
    confirmStatus,
    confirmError,
    isValid,
    "Mật khẩu xác nhận không khớp.",
  );

  updateSubmitButton();
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 10);

  if (digits.length <= 4) {
    return digits;
  }

  if (digits.length <= 7) {
    return digits.slice(0, 4) + "-" + digits.slice(4);
  }

  return digits.slice(0, 4) + "-" + digits.slice(4, 7) + "-" + digits.slice(7);
}

function validatePhone() {
  phoneInput.value = formatPhone(phoneInput.value);

  const digits = phoneInput.value.replace(/\D/g, "");
  const isValid = digits.length === 10;

  state.phone = isValid;

  setFieldState(
    phoneInput,
    phoneStatus,
    phoneError,
    isValid,
    "Số điện thoại phải gồm đúng 10 chữ số.",
  );

  updateSubmitButton();
}

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
passwordInput.addEventListener("input", validatePassword);
confirmInput.addEventListener("input", validateConfirm);
phoneInput.addEventListener("input", validatePhone);

form.addEventListener("submit", function (event) {
  event.preventDefault();

  modalInfo.textContent = "";

  const nameLine = document.createElement("p");
  nameLine.textContent = `Tên: ${nameInput.value.trim()}`;

  const emailLine = document.createElement("p");
  emailLine.textContent = `Email: ${emailInput.value.trim()}`;

  const phoneLine = document.createElement("p");
  phoneLine.textContent = `Số điện thoại: ${phoneInput.value}`;

  modalInfo.appendChild(nameLine);
  modalInfo.appendChild(emailLine);
  modalInfo.appendChild(phoneLine);

  modal.classList.remove("hidden");
});

closeModal.addEventListener("click", function () {
  modal.classList.add("hidden");
});

modal.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
  }
});
