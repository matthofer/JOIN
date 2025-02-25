let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let isPasswordVisible = false;

/**
 * Logs in a user by validating their credentials and handling the login process.
 *
 */
async function loginUser() {
  const { email, password } = getLoginCredentials();

  if (checkCredentialsEmpty(email, password)) {
    handleEmptyLogin(document.getElementById("addErrorMessage"));
    return;
  }

  if (!validateLogin(email, password)) return;

  try {
    const users = await fetchUsers();
    const loggedInUser = findUser(users, email, password);
    handleLoginResult(loggedInUser);
  } catch (error) {
    console.error("Error during login:", error);
  }
}

/**
 * Retrieves login credentials from the input fields and returns them as an object.
 *
 */
function getLoginCredentials() {
  return {
    email: getInputValue("email"),
    password: getInputValue("password"),
  };
}

/**
 * Checks if the provided email and password are empty and then returns true, otherwise false.
 *
 * @param {string} email - The email to check.
 * @param {string} password - The password to check.
 */
function checkCredentialsEmpty(email, password) {
  return email === "" && password === "";
}

/**
 * Handles the result of the login attempt.
 *
 * @param {object} loggedInUser - The logged-in user object.
 */
function handleLoginResult(loggedInUser) {
  if (loggedInUser) {
    removeRedBorders();
    removeErrorMessage();
    setTimeout(() => {
      handleSuccessfulLogin(loggedInUser);
    }, 400);
  } else {
    showLoginError();
  }
}

/**
 * Retrieves the value of an input field by its ID and returns it.
 *
 * @param {string} id - The ID of the input field.
 */
function getInputValue(id) {
  return document.getElementById(id).value;
}

/**
 * Fetches all users from the Firebase database.
 *
 */
async function fetchUsers() {
  let response = await fetch(FB_URL + "/users.json");
  return response.json();
}

/**
 * Finds a user by email and password.
 *
 * @param {Object} users - The users object.
 * @param {string} email - The email to search for.
 * @param {string} password - The password to search for.
 */
function findUser(users, email, password) {
  return Object.values(users).find(
    (user) => user.email === email && user.password === password
  );
}

/**
 * Handles a successful login by redirecting the user and storing session data.
 *
 * @param {Object} user - The logged-in user object.
 */
function handleSuccessfulLogin(user) {
  openPage("summary.html");
  sessionStorage.setItem("userName", user.name);
  sessionStorage.setItem("userInitials", getInitials(user.name));
  sessionStorage.setItem("loggedIn", true);
  sessionStorage.setItem("animationPlayed", false);
  document.getElementById("email").value = "";
}

/**
 * Logs in a guest user by redirecting them and storing session data.
 *
 */
function guestLogin() {
  openPage("summary.html");
  sessionStorage.setItem("loggedIn", false);
  sessionStorage.setItem("animationPlayed", false);
  sessionStorage.setItem("userName", "");
  sessionStorage.setItem("userInitials", "");
}

/**
 * Displays an error message for empty login credentials.
 *
 * @param {HTMLElement} errorElement - The HTML element to display the error message.
 */
function handleEmptyLogin(errorElement) {
  errorElement.innerHTML = "<p>Please fill in all input fields!</p>";
  removeRedBorders();
  showRedBorderPassword();
  showRedBorderMail();
}

/**
 * Generates initials from a full name and returns them as a string.
 *
 * @param {string} name - The full name.
 */
function getInitials(name) {
  let nameParts = name.split(" ");
  let initials = nameParts
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase();
  return initials;
}

/**
 * Validates the login credentials and returns true if valid, otherwise false.
 *
 * @param {string} email - The email to validate.
 * @param {string} password - The password to validate.
 */
function validateLogin(email, password) {
  return (
    checkEmail(email, "addErrorMessage") &&
    checkPassword(password, "addErrorMessage")
  );
}

/**
 * Checks if the email is valid and displays an error message if not.
 *
 * @param {string} email - The email to check.
 * @param {string} id - The ID of the error message element.
 */
function checkEmail(email, id) {
  return validateField(validateEmail(email), id, "Please enter a valid email!");
}

/**
 * Validates an email address using a regular expression.
 *
 * @param {string} email - The email to validate.
 */
function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}$/;
  return emailRegex.test(email);
}

/**
 * Checks if the password meets the minimum length requirement and displays an error message if not.
 *
 * @param {string} password - The password to check.
 * @param {string} id - The ID of the error message element.
 */
function checkPassword(password, id) {
  return validateField(
    password.length >= 8,
    id,
    "Password must be at least 8 characters long!"
  );
}

/**
 * Validates a field condition and displays an error message if the condition is not met.
 *
 * @param {boolean} condition - The condition to validate.
 * @param {string} id - The ID of the error message element.
 * @param {string} message - The error message to display.
 */
function validateField(condition, id, message) {
  let errorElement = document.getElementById(id);
  if (condition) return true;
  errorElement.innerHTML = `<p>${message}</p>`;
  if (message == "Password must be at least 8 characters long!") {
    removeRedBorders();
    showRedBorderPassword();
  } else {
    removeRedBorders();
    showRedBorderMail();
  }
  return false;
}

/**
 * Displays an error message for invalid login credentials.
 *
 */
function showLoginError() {
  let errorElement = document.getElementById("addErrorMessage");
  errorElement.innerHTML = "<p>Invalid credentials. Please try again.</p>";
  removeRedBorders();
  showRedBorderPassword();
  showRedBorderMail();
}

/**
 * Checks the password input field and updates the icons based on its state.
 * 
 */
function checkPasswordInput() {
  const passwordInput = document.getElementById("password");
  let { eyeIcon, crossedEyeIcon, lockIcon } = getIcons();

  if (passwordInput.value.length === 0) {
    resetPasswordVisibility(passwordInput, lockIcon, eyeIcon, crossedEyeIcon);
  } else {
    updateIcons(passwordInput, lockIcon, eyeIcon, crossedEyeIcon);
  }
}

/**
 * Toggles the visibility of the password and updates the icons.
 * 
 */
function showPassword() {
  const passwordInput = document.getElementById("password");
  let { eyeIcon, crossedEyeIcon } = getIcons();

  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";
  toggleVisibilityIcons(eyeIcon, crossedEyeIcon);
}

/**
 * Retrieves the icon elements for the password input field and returns them as an object.
 * 
 */
function getIcons() {
  return {
    eyeIcon: document.getElementById("eyeIcon"),
    crossedEyeIcon: document.getElementById("crossedEyeIcon"),
    lockIcon: document.getElementById("lockIcon"),
  };
}

/**
 * Resets the password visibility state and updates the icons.
 * 
 * @param {HTMLElement} passwordInput - The password input element.
 * @param {HTMLElement} lockIcon - The lock icon element.
 * @param {HTMLElement} eyeIcon - The eye icon element.
 * @param {HTMLElement} crossedEyeIcon - The crossed eye icon element.
 */
function resetPasswordVisibility(passwordInput, lockIcon, eyeIcon, crossedEyeIcon) {
  isPasswordVisible = false;
  passwordInput.type = "password";
  lockIcon.classList.remove("d-none");
  eyeIcon.classList.add("d-none");
  crossedEyeIcon.classList.add("d-none");
}

/**
 * Updates the icons based on the password's visibility state.
 * 
 * @param {HTMLElement} passwordInput - The password input element.
 * @param {HTMLElement} lockIcon - The lock icon element.
 * @param {HTMLElement} eyeIcon - The eye icon element.
 * @param {HTMLElement} crossedEyeIcon - The crossed eye icon element.
 */
function updateIcons(passwordInput, lockIcon, eyeIcon, crossedEyeIcon) {
  lockIcon.classList.add("d-none");
  if (isPasswordVisible) {
    eyeIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
  } else {
    eyeIcon.classList.add("d-none");
    crossedEyeIcon.classList.remove("d-none");
  }
}

/**
 * Toggles the visibility of the eye icons based on the password's visibility state.
 * 
 * @param {HTMLElement} eyeIcon - The eye icon element.
 * @param {HTMLElement} crossedEyeIcon - The crossed eye icon element.
 */
function toggleVisibilityIcons(eyeIcon, crossedEyeIcon) {
  if (isPasswordVisible) {
    eyeIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
  } else {
    eyeIcon.classList.add("d-none");
    crossedEyeIcon.classList.remove("d-none");
  }
}

/**
 * Adds a red border to the password input field.
 *
 */
function showRedBorderPassword() {
  let inputFieldPassword = document.getElementById("password");
  inputFieldPassword.classList.add("redBorder");
}

/**
 * Adds a red border to the email input field.
 *
 */
function showRedBorderMail() {
  let inputFieldMail = document.getElementById("email");
  inputFieldMail.classList.add("redBorder");
}

/**
 * Removes all red borders from the input fields.
 *
 */
function removeRedBorders() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("redBorder");
  });
}

/**
 * Removes the error message from the login field.
 *
 */
function removeErrorMessage() {
  let errorElement = document.getElementById("addErrorMessage");
  errorElement.innerHTML = "";
}
