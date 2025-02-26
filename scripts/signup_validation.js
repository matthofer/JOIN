/**
 * Validates form inputs by forwarding to `validateInputs`.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} confirmPassword - The user's confirmed password.
 */
function validateFormInputs(name, email, password, confirmPassword) {
  return validateInputs(name, email, password, confirmPassword, "addErrorMessage");
}

/**
 * Validates all input fields.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} confirmPassword - The user's confirmed password.
 * @param {string} id - The ID of the error message element.
 */
function validateInputs(name, email, password, confirmPassword, id) {
  return (
    checkEmptyInput(name, email, password, confirmPassword, id) &&
    checkName(name) &&
    checkEmail(email, id) &&
    checkPassword(password, id) &&
    checkConfirmPassword(password, confirmPassword, id) &&
    checkPrivacyPolicyTick()
  );
}

/**
 * Checks if any input fields are empty and shows an error message if either of them are.
 * @param {string} name - The user's name.
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @param {string} confirmPassword - The user's confirmed password.
 * @param {string} id - The ID of the error message element.
 */
function checkEmptyInput(name, email, password, confirmPassword, id) {
  let errorElement = document.getElementById(id);
  if (!name || !email || !password || !confirmPassword) {
    errorElement.innerHTML = "<p>Please fill in all input fields!</p>";
    showRedBorder();
    return false;
  }
  removeRedBorders();
  errorElement.innerHTML = "";
  return true;
}

/**
 * Validates the name format using a regular expression.
 * @param {string} name - The user's name.
 */
function validateName(name) {
  let nameRegex = /^[a-zA-ZäöüÄÖÜß\s'-]+$/;
  return nameRegex.test(name);
}

/**
 * Checks if the name is valid and shows an error message if not.
 * @param {string} name - The user's name.
 */
function checkName(name) {
  let errorElement = document.getElementById("addErrorMessage");
  if (!validateName(name)) {
    errorElement.innerHTML = "<p>Only letters are allowed in the name</p>";
    showRedBorderName();
    return false;
  }
  errorElement.innerHTML = "";
  return true;
}

/**
 * Checks if the email is valid and shows an error message if not.
 * @param {string} email - The user's email.
 * @param {string} id - The ID of the error message element.
 */
function checkEmail(email, id) {
  let errorElement = document.getElementById(id);
  if (!validateEmail(email)) {
    errorElement.innerHTML = "<p>Please enter a valid email address<br>e.g. max.muster@web.de</p>";
    showRedBorderMail();
    return false;
  }
  errorElement.innerHTML = "";
  return true;
}

/**
 * Validates the email format using a regular expression.
 * @param {string} email - The user's email.
 */
function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}$/;
  return emailRegex.test(email);
}

/**
 * Checks if the password meets the required length.
 * @param {string} password - The user's password.
 * @param {string} id - The ID of the error message element.
 */
function checkPassword(password, id) {
  let errorElement = document.getElementById(id);
  if (password.length < 8) {
    errorElement.innerHTML = "<p>Password must be at least 8 characters long!</p>";
    showRedBorderPassword();
    return false;
  }
  errorElement.innerHTML = "";
  return true;
}

/**
 * Checks if the password and confirm password match.
 * @param {string} password - The user's password.
 * @param {string} confirmPassword - The user's confirmed password.
 * @param {string} id - The ID of the error message element.
 */
function checkConfirmPassword(password, confirmPassword, id) {
  let errorElement = document.getElementById(id);
  if (password !== confirmPassword) {
    errorElement.innerHTML = "<p>Passwords do not match!</p>";
    showRedBorderPassword();
    showRedBorderConfirmPw();
    return false;
  }
  errorElement.innerHTML = "";
  return true;
}

/**
 * Checks if the privacy policy checkbox is ticked.
 * 
 */
function checkPrivacyPolicyTick() {
  let checkbox = document.getElementById("customCheckbox");
  let errorElement = document.getElementById("addErrorMessage");
  if (!checkbox.checked) {
    errorElement.innerHTML = "<p>Please accept the privacy policy!</p>";
    return false;
  }
  errorElement.innerHTML = "";
  return true;
}

/**
 * Checks if the email is already taken.
 * 
 */
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
