function validateFormInputs(name, email, password, confirmPassword) {
  return validateInputs(
    name,
    email,
    password,
    confirmPassword,
    "addErrorMessage"
  );
}

function validateInputs(name, email, password, confirmPassword, id) {
  if (
    checkEmptyInput(name, email, password, confirmPassword, id) &&
    checkName(name) &&
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
    return false;
  } else {
    removeRedBorders();
    errorElement.innerHTML = "";
    return true;
  }
}

function validateName(name) {
  let nameRegex = /^[a-zA-ZäöüÄÖÜß\s'-]+$/;
  return nameRegex.test(name);
}

function checkName(name) {
  if (!validateName(name)) {
    document.getElementById("addErrorMessage").innerHTML =
      "<p>Only letters are allowed in the name</p>";
    showRedBorderName();
    return false;
  } else {
    document.getElementById("addErrorMessage").innerHTML = "";
    return true;
  }
}

function checkEmail(email, id) {
  let errorElement = document.getElementById(id);
  if (!validateEmail(email)) {
    errorElement.innerHTML =
      "<p>Please enter a valid email address<br>e.g. max.muster@web.de</p>";
    showRedBorderMail();
    return false;
  } else {
    errorElement.innerHTML = "";
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
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}

function checkConfirmPassword(password, confirmPassword, id) {
  let errorElement = document.getElementById(id);
  if (password !== confirmPassword) {
    errorElement.innerHTML = "<p>Passwords do not match!</p>";
    showRedBorderPassword();
    showRedBorderConfirmPw();
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
}

function checkPrivacyPolicyTick() {
  let checkbox = document.getElementById("customCheckbox");
  let errorElement = document.getElementById("addErrorMessage");
  if (!checkbox.checked) {
    errorElement.innerHTML = "<p>Please accept the privacy policy!</p>";
    return false;
  } else {
    errorElement.innerHTML = "";
    return true;
  }
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
