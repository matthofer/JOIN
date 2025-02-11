let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

async function loginUser() {
  let email = getInputValue("email");
  let password = getInputValue("password");

  if (!validateLogin(email, password)) return;

  try {
    let users = await fetchUsers();
    let loggedInUser = findUser(users, email, password);
    loggedInUser ? handleSuccessfulLogin(loggedInUser) : showLoginError();
  } catch (error) {
    handleLoginError(error);
  }
}

function getInputValue(id) {
  return document.getElementById(id).value;
}

async function fetchUsers() {
  let response = await fetch(FB_URL + "/users.json");
  return response.json();
}

function findUser(users, email, password) {
  return Object.values(users).find(
    (user) => user.email === email && user.password === password
  );
}

function handleSuccessfulLogin(user) {
  sessionStorage.setItem("userInitials", getInitials(user.name));
  window.location.href = "summary.html";
  document.getElementById("email").value = "";
}

function handleLoginError(errorElement) {
  errorElement.innerHTML = "";
  errorElement.innerHTML = "<p>Please fill in all input fields!</p>";
  setTimeout(() => {
    errorElement.innerHTML = "";
  }, 4000);
}

function getInitials(name) {
  let nameParts = name.split(" ");
  let initials = nameParts
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

function validateLogin(email, password) {
  return (
    checkEmail(email, "addErrorMessage") &&
    checkPassword(password, "addErrorMessage")
  );
}

function checkEmail(email, id) {
  return validateField(validateEmail(email), id, "Please enter a valid email!");
}

function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}$/;
  return emailRegex.test(email);
}

function checkPassword(password, id) {
  return validateField(
    password.length >= 8,
    id,
    "Password must be at least 8 characters long!"
  );
}

function validateField(condition, id, message) {
  let errorElement = document.getElementById(id);
  if (condition) return true;
  errorElement.innerHTML = "";
  errorElement.innerHTML = `<p>${message}</p>`;
  setTimeout(() => (errorElement.innerHTML = ""), 4000);
  return false;
}

function showLoginError() {
  let errorElement = document.getElementById("addErrorMessage");
  errorElement.innerHTML = "<p>Invalid credentials. Please try again.</p>";
  setTimeout(() => (errorElement.innerHTML = ""), 4000);
}

function checkPasswordInput() {
  let password = document.getElementById("password").value;
  let crossedEyeIcon = document.getElementById("crossedEyeIcon");
  let lockIcon = document.getElementById("lockIcon");

  if (password.length >= 1) {
    lockIcon.classList.add("d-none");
    crossedEyeIcon.classList.remove("d-none");
  } else {
    lockIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
  }
}

function showPassword() {
  let passwordInput = document.getElementById("password");
  let eyeIcon = document.getElementById("eyeIcon");
  let crossedEyeIcon = document.getElementById("crossedEyeIcon");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.classList.toggle("d-none");
  crossedEyeIcon.classList.toggle("d-none");
}
