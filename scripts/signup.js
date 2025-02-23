const checkbox = document.getElementById("customCheckbox");
const uncheckedIcon = document.querySelector(".unchecked");
const checkedIcon = document.querySelector(".checked");
const FB_URL =
  "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let isPasswordVisible = false;
let isConfirmPasswordVisible = false;

let initialColors = [
  "#9327FF",
  "#6E52FF",
  "#FC71FF",
  "#FFBB2B",
  "#1FD7C1",
  "#FF7A00",
  "#462F8A",
  "#00BEE8",
];

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    uncheckedIcon.classList.add("d-none");
    checkedIcon.classList.remove("d-none");
  } else {
    checkedIcon.classList.add("d-none");
    uncheckedIcon.classList.remove("d-none");
  }
});

async function createUser(name, email, password) {
  const user = createUserObject(name, email, password);
  const response = await sendUserData(user);
  await createNewContact(name, email);

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

function createUserObject(name, email, password) {
  return {
    name: name,
    email: email,
    password: password,
  };
}

async function sendUserData(user) {
  try {
    return await fetch(FB_URL + "/users.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
  } catch (error) {
    return { ok: false };
  }
}

function getFormValues() {
  return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };
}

function validateFormInputs(name, email, password, confirmPassword) {
  return validateInputs(
    name,
    email,
    password,
    confirmPassword,
    "addErrorMessage"
  );
}

async function handleSignup() {
  const { name, email, password, confirmPassword } = getFormValues();

  if ((await takenMail()) === true) {
    return;
  }

  if (validateFormInputs(name, email, password, confirmPassword)) {
    await createUser(name, email, password);
    showToastMessage(
      "You Signed Up successfully. <br> Redirecting to Log In..."
    );
    setTimeout(() => {
      redirectToLoginPage();
      clearFormFields();
    }, 3000);
  }
}

function redirectToLoginPage() {
  window.location.href = "login.html";
}

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

function validateInputs(name, email, password, confirmPassword, id) {
  if (
    checkEmptyInput(name, email, password, confirmPassword, id) &&
    checkEmail(email, id) &&
    checkPassword(password, id) &&
    checkConfirmPassword(password, confirmPassword, id) &&
    checkPrivacyPolicyTick()
  ) {
    return true;
  } else {
    return false;
  }
}

function checkEmptyInput(name, email, password, confirmPassword, id) {
  let errorElement = document.getElementById(id);
  if (
    name === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
  ) {
    errorElement.innerHTML = "<p>Please fill in all input fields!</p>";
    showRedBorder();
    setTimeout(() => {
      errorElement.innerHTML = "";
    }, 4000);
    return false;
  } else {
    return true;
  }
}

function checkEmail(email, id) {
  let errorElement = document.getElementById(id);
  if (!validateEmail(email)) {
    errorElement.innerHTML =
      "<p>Please enter a valid email address<br>e.g. max.muster@web.de</p>";
    showRedBorderMail();
    setTimeout(() => {
      errorElement.innerHTML = "";
    }, 4000);
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}$/;
  return emailRegex.test(email);
}

function checkPassword(password, id) {
  let errorElement = document.getElementById(id);
  if (password.length < 8) {
    errorElement.innerHTML =
      "<p>Password must be at least 8 characters long!</p>";
    showRedBorderPassword();
    setTimeout(() => {
      errorElement.innerHTML = "";
    }, 4000);
    return false;
  } else {
    return true;
  }
}

function checkConfirmPassword(password, confirmPassword, id) {
  let errorElement = document.getElementById(id);
  if (password !== confirmPassword) {
    errorElement.innerHTML = "<p>Passwords do not match!</p>";
    showRedBorderPassword();
    showRedBorderConfirmPw();
    setTimeout(() => {
      errorElement.innerHTML = "";
    }, 4000);
    return false;
  } else {
    return true;
  }
}

function checkPrivacyPolicyTick() {
  let checkbox = document.getElementById("customCheckbox");
  let errorElement = document.getElementById("addErrorMessage");
  if (!checkbox.checked) {
    errorElement.innerHTML = "<p>Please accept the privacy policy!</p>";
    setTimeout(() => {
      errorElement.innerHTML = "";
    }, 4000);
    return false;
  } else {
    return true;
  }
}

function toggleIcons(
  inputId,
  lockIconId,
  eyeIconId,
  crossedEyeIconId,
  isVisible
) {
  let input = document.getElementById(inputId).value;
  let lockIcon = document.getElementById(lockIconId);
  let eyeIcon = document.getElementById(eyeIconId);
  let crossedEyeIcon = document.getElementById(crossedEyeIconId);

  if (input.length >= 1) {
    lockIcon.classList.add("d-none");
    if (!isVisible) crossedEyeIcon.classList.remove("d-none");
  } else {
    lockIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
    eyeIcon.classList.add("d-none");
  }
}

function checkPasswordInput() {
  toggleIcons(
    "password",
    "lockIcon",
    "eyeIcon",
    "crossedEyeIcon",
    isPasswordVisible
  );
}

function checkConfirmPasswordInput() {
  toggleIcons(
    "confirmPassword",
    "confirmLockIcon",
    "confirmEyeIcon",
    "confirmCrossedEyeIcon",
    isConfirmPasswordVisible
  );
}

function showPassword() {
  let passwordInput = document.getElementById("password");
  let eyeIcon = document.getElementById("eyeIcon");
  let crossedEyeIcon = document.getElementById("crossedEyeIcon");

  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";

  eyeIcon.classList.toggle("d-none");
  crossedEyeIcon.classList.toggle("d-none");
}

function showConfirmPassword() {
  let passwordInput = document.getElementById("confirmPassword");
  let confirmEyeIcon = document.getElementById("confirmEyeIcon");
  let confirmCrossedEyeIcon = document.getElementById("confirmCrossedEyeIcon");

  isConfirmPasswordVisible = !isConfirmPasswordVisible;
  passwordInput.type = isConfirmPasswordVisible ? "text" : "password";

  confirmEyeIcon.classList.toggle("d-none");
  confirmCrossedEyeIcon.classList.toggle("d-none");
}

function showRedBorder() {
  showRedBorderName();
  showRedBorderMail();
  showRedBorderPassword();
  showRedBorderConfirmPw();
}

function showRedBorderName() {
  let inputName = document.getElementById("name");
  inputName.classList.add("redBorder");
  setTimeout(() => {
    inputName.classList.remove("redBorder");
  }, 4000);
}

function showRedBorderMail() {
  let inputMail = document.getElementById("email");
  inputMail.classList.add("redBorder");
  setTimeout(() => {
    inputMail.classList.remove("redBorder");
  }, 4000);
}

function showRedBorderPassword() {
  let inputPassword = document.getElementById("password");
  inputPassword.classList.add("redBorder");
  setTimeout(() => {
    inputPassword.classList.remove("redBorder");
  }, 4000);
}

function showRedBorderConfirmPw() {
  let inputConfirmPassword = document.getElementById("confirmPassword");
  inputConfirmPassword.classList.add("redBorder");
  setTimeout(() => {
    inputConfirmPassword.classList.remove("redBorder");
  }, 4000);
}

function showToastMessage(message) {
  document.getElementById("messageText").innerHTML = message;
  document.getElementById("overlay").classList.remove("d-none");
  document.getElementById("message").classList.remove("messageClosed");
  document.getElementById("message").classList.add("messageVisible");
  setTimeout(() => {
    document.getElementById("message").classList.remove("messageVisible");
    document.getElementById("message").classList.add("messageClosed");
    setTimeout(() => {
      document.getElementById("overlay").classList.add("d-none");
    }, 2000);
  }, 4000);
}

async function takenMail() {
  let email = document.getElementById("email").value;

  try {
    let users = await fetchUsers();
    let loggedInUser = findUser(users, email);
    if (loggedInUser) {
      showTakenMailMessage(loggedInUser);
      return true;
    }
  } catch (error) {}
  return false;
}

async function fetchUsers() {
  let response = await fetch(FB_URL + "/users.json");
  return response.json();
}

function findUser(users, email) {
  return Object.values(users).find((user) => user.email === email);
}

function showTakenMailMessage() {
  let errorElement = document.getElementById("addErrorMessage");
  errorElement.innerHTML =
    "<p>Email address already taken! Please use a different one.</p>";
  showRedBorderMail();
  setTimeout(() => {
    errorElement.innerHTML = "";
  }, 4000);
}

async function createNewContact(name, email) {
  let newUserObj = {
    color: getRandomInitialColor(),
    email: email,
    name: name,
    phone: "+49",
  };
  try {
    await postData("contacts/", newUserObj);
  } catch (error) {
    showToastMessage("Error while saving the data");
  }
}

function getRandomInitialColor() {
  let randIndex = Math.floor(Math.random() * initialColors.length);
  let randomColor = initialColors[randIndex];
  return randomColor;
}
