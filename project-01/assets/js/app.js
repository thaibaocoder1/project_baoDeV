const formBlock = document.querySelector(".form");
const inputFullNameEl = document.querySelector("input[name='fullname']");
const inputUserEl = document.querySelector("input[name='username']");
const inputEmailEl = document.querySelector("input[name='email']");
const inputPasswordEl = document.querySelector("input[name='password']");
const inputRepassEl = document.querySelector("input[name='re-password']");
formBlock.addEventListener("submit", function (e) {
  e.preventDefault();
  checkInputs();
  this.reset();
});
function showSuccess(input) {
  const parent = input.parentElement;
  const smallMessage = parent.querySelector(".form-small");
  parent.classList.add("success");
  smallMessage.innerText = "";
}
function showError(input, message) {
  const parent = input.parentElement;
  const smallMessage = parent.querySelector(".form-small");
  parent.classList.add("error");
  smallMessage.innerText = message;
}
function checkInputs() {
  fullNameValue = inputFullNameEl.value.trim();
  usernameValue = inputUserEl.value.trim();
  emailValue = inputEmailEl.value.trim();
  passwordValue = inputPasswordEl.value.trim();
  repassValue = inputRepassEl.value.trim();
  // Check value of full name
  if (fullNameValue === "") {
    showError(inputFullNameEl, "Khong duoc de trong full name!");
  } else {
    showSuccess(inputFullNameEl);
  }
  // Check value of username
  if (usernameValue === "") {
    showError(inputUserEl, "Khong duoc de trong username!");
  } else {
    showSuccess(inputUserEl);
  }
  // Check value of emali
  if (!isEmail(emailValue)) {
    showError(inputEmailEl, "Email khong dung dinh dang");
  } else if (emailValue === "") {
    showError(inputEmailEl, "Email khong duoc de trong");
  } else {
    showSuccess(inputEmailEl);
  }
  // Check value of password
  if (passwordValue === "") {
    showError(inputPasswordEl, "Password khong duoc de trong");
  } else if (!isPassword(inputPasswordEl)) {
    showError(inputPasswordEl, "Password khong dung dinh dang!");
  } else {
    showSuccess(inputPasswordEl);
  }
  if (repassValue === "") {
    showError(inputRepassEl, "Can phai nhap lai password o tren!");
  } else if (!isMatch(passwordValue, repassValue)) {
    showError(inputRepassEl, "Password nhap lai khong trung khop!");
  } else {
    showSuccess(inputRepassEl);
  }
}
function isEmail(input) {
  const regexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!regexp.test(input)) return false;
  return true;
}
function isPassword(input) {
  const regexp = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  if (!regexp.test(input)) return false;
  return true;
}
function isMatch(valueOne, valueTwo) {
  if (valueOne.length !== valueTwo.length || valueOne !== valueTwo)
    return false;
  return true;
}
