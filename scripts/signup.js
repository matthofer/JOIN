const checkbox = document.getElementById("customCheckbox");
const uncheckedIcon = document.querySelector(".unchecked");
const checkedIcon = document.querySelector(".checked");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    uncheckedIcon.style.display = "none";
    checkedIcon.style.display = "inline-block";
  } else {
    checkedIcon.style.display = "none";
    uncheckedIcon.style.display = "inline-block";
  }
});

let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

async function createUser(name, email, password) {
  try {
    let user = {
      name: name,
      email: email,
      password: password,
    };

    let response = await fetch(FB_URL + "/users.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    if (response.ok) {
      console.log("User created successfully!");
      return true;
    } else {
      console.error("Failed to create user.");
      return false;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return false;
  }
}

async function handleSignup() {
  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;
  let validationResult = validateInputs(
    name,
    email,
    password,
    confirmPassword,
    "addErrorMessage"
  );
  if (validationResult) {
    await createUser(name, email, password);
    // Insert Toast-Message here + timeout ----------------------------------------------
    window.location.href = "login.html";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  }
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

function checkConfirmPasswordInput() {
  let confirmPassword = document.getElementById("confirmPassword").value;
  let confirmCrossedEyeIcon = document.getElementById("confirmCrossedEyeIcon");
  let confirmLockIcon = document.getElementById("confirmLockIcon");

  if (confirmPassword.length >= 1) {
    confirmLockIcon.classList.add("d-none");
    confirmCrossedEyeIcon.classList.remove("d-none");
  } else {
    confirmLockIcon.classList.remove("d-none");
    confirmCrossedEyeIcon.classList.add("d-none");
  }
}

function showPassword() {
  let passwordInput = document.getElementById("password");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
}

function showPassword() {
  let passwordInput = document.getElementById("password");
  let eyeIcon = document.getElementById("eyeIcon");
  let crossedEyeIcon = document.getElementById("crossedEyeIcon");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  eyeIcon.classList.toggle("d-none");
  crossedEyeIcon.classList.toggle("d-none");
}

function showConfirmPassword() {
  let passwordInput = document.getElementById("confirmPassword");
  let confirmEyeIcon = document.getElementById("confirmEyeIcon");
  let confirmCrossedEyeIcon = document.getElementById("confirmCrossedEyeIcon");
  passwordInput.type = passwordInput.type === "password" ? "text" : "password";
  confirmEyeIcon.classList.toggle("d-none");
  confirmCrossedEyeIcon.classList.toggle("d-none");
}
