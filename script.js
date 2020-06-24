const form = document.getElementById("form");
const el_userName = document.getElementById("userName");
const el_email = document.getElementById("email");
const el_password = document.getElementById("password");
const el_confirmPassword = document.getElementById("confirmPassword");
var inputList = [];

(function () {
  inputList.push(el_userName);
  inputList.push(el_email);
  inputList.push(el_password);
  inputList.push(el_confirmPassword);
})();
form.addEventListener("submit", function (e) {
  e.preventDefault();
  updateClassLists();
  checkField(el_userName);
  let eMaliNotEmp = checkField(el_email);
  let passNotEmp = checkField(el_password);
  let conPassNotEmp = checkField(el_confirmPassword);
  if (!passNotEmp || conPassNotEmp) checkPasswords();
  if (eMaliNotEmp) {
    checkEmail();
  }
});

var updateClassLists = function () {
  for (let element of inputList) {
    let parent = element.parentElement;
    parent.classList.remove("error", "success");
  }
};

var checkPasswords = function () {
  if (!(el_password.value == el_confirmPassword.value)) {
    let parent = el_confirmPassword.parentElement;
    parent.classList.add("error");
    let small = parent.querySelector("small");
    small.innerText = "passwords don't match";
    return false;
  } else return true;
};

var showError = function (input, message) {
  let parent = input.parentElement;
  parent.className = "form_control error";
  let small = parent.querySelector("small");
  small.innerText = message;
};

var showSuccess = function (input) {
  let parent = input.parentElement;
  //   parent.className = "form_control success";
  parent.classList.add("success");
};

var checkField = function (input) {
  if (checkIfEmpty(input)) {
    showError(input, `field can't be empty`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
};

var checkIfEmpty = function (input) {
  if (input.value != "") return false;
  else return true;
};

var checkEmail = function () {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(el_email.value)) {
    showSuccess(el_email);
    return true;
  }
  showError(el_email, "email address!");
  return false;
};
