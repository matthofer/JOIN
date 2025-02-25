const checkbox = document.getElementById("customCheckbox");
const uncheckedIcon = document.querySelector(".unchecked");
const checkedIcon = document.querySelector(".checked");
const FB_URL =
  "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let isPasswordVisible = false;
let isConfirmPasswordVisible = false;
let signUpButton = document.getElementById("signUpButton");

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

async function handleSignup() {
  const { name, email, password, confirmPassword } = getFormValues();

  if ((await takenMail()) === true) {showRedBorderMail(); return;};

  if (validateFormInputs(name, email, password, confirmPassword)) {
    await createUser(name, email, password);
    await createNewContact(name, email);
    signUpButton.disabled = true;
    showToastMessage("You Signed Up successfully. <br> Redirecting to Log In...");
    setTimeout(() => {redirectToLoginPage(); clearFormFields(); signUpButton.disabled = false;
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

function checkPasswordInput() {
  const passwordInput = document.getElementById("password");
  let { eyeIcon, crossedEyeIcon, lockIcon } = getIcons();

  if (passwordInput.value.length === 0) {
    resetPasswordVisibility(passwordInput, lockIcon, eyeIcon, crossedEyeIcon, "password");
  } else {
    updateIcons(lockIcon, eyeIcon, crossedEyeIcon, isPasswordVisible);
  }
}

function checkConfirmPasswordInput() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  let { eyeIcon, crossedEyeIcon, lockIcon } = getConfirmIcons();

  if (confirmPasswordInput.value.length === 0) {
    resetPasswordVisibility(confirmPasswordInput, lockIcon, eyeIcon, crossedEyeIcon, "confirmPassword");
  } else {
    updateIcons(lockIcon, eyeIcon, crossedEyeIcon, isConfirmPasswordVisible);
  }
}

function showPassword() {
  const passwordInput = document.getElementById("password");
  let { eyeIcon, crossedEyeIcon } = getIcons();

  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";
  toggleVisibilityIcons(eyeIcon, crossedEyeIcon, isPasswordVisible);
}

function showConfirmPassword() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  let { eyeIcon, crossedEyeIcon } = getConfirmIcons();

  isConfirmPasswordVisible = !isConfirmPasswordVisible;
  confirmPasswordInput.type = isConfirmPasswordVisible ? "text" : "password";
  toggleVisibilityIcons(eyeIcon, crossedEyeIcon, isConfirmPasswordVisible);
}

function getIcons() {
  return {
    eyeIcon: document.getElementById("eyeIcon"),
    crossedEyeIcon: document.getElementById("crossedEyeIcon"),
    lockIcon: document.getElementById("lockIcon"),
  };
}

function getConfirmIcons() {
  return {
    eyeIcon: document.getElementById("confirmEyeIcon"),
    crossedEyeIcon: document.getElementById("confirmCrossedEyeIcon"),
    lockIcon: document.getElementById("confirmLockIcon"),
  };
}

function resetPasswordVisibility(input, lockIcon, eyeIcon, crossedEyeIcon, inputType) {
  if (inputType === "password") {
    isPasswordVisible = false;
  } else if (inputType === "confirmPassword") {
    isConfirmPasswordVisible = false;
  }

  input.type = "password";
  lockIcon.classList.remove("d-none");
  eyeIcon.classList.add("d-none");
  crossedEyeIcon.classList.add("d-none");
}

function updateIcons(lockIcon, eyeIcon, crossedEyeIcon, isVisible) {
  lockIcon.classList.add("d-none");
  if (isVisible) {
    eyeIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
  } else {
    eyeIcon.classList.add("d-none");
    crossedEyeIcon.classList.remove("d-none");
  }
}

function toggleVisibilityIcons(eyeIcon, crossedEyeIcon, isVisible) {
  if (isVisible) {
    eyeIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
  } else {
    eyeIcon.classList.add("d-none");
    crossedEyeIcon.classList.remove("d-none");
  }
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
}

function showRedBorderMail() {
  let inputMail = document.getElementById("email");
  inputMail.classList.add("redBorder");
}

function showRedBorderPassword() {
  let inputPassword = document.getElementById("password");
  inputPassword.classList.add("redBorder");
}

function showRedBorderConfirmPw() {
  let inputConfirmPassword = document.getElementById("confirmPassword");
  inputConfirmPassword.classList.add("redBorder");
}

function removeRedBorders() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("redBorder");
  });
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
