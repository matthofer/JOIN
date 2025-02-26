const FB_URL =
  "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let isPasswordVisible = false;
let isConfirmPasswordVisible = false;
let signUpButton = document.getElementById("signUpButton");
let checkbox = document.getElementById("customCheckbox");
let uncheckedIcon = document.querySelector(".unchecked");
let checkedIcon = document.querySelector(".checked");

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

/**
 * Creates a new user with the provided name, email, and password.
 * 
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
async function createUser(name, email, password) {
  const user = createUserObject(name, email, password);
  const response = await sendUserData(user);

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}

/**
 * Creates a user object with the provided name, email, and password and returns it.
 * 
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 */
function createUserObject(name, email, password) {
  return {
    name: name,
    email: email,
    password: password,
  };
}

/**
 * Sends user data to the database.
 * 
 * @param {Object} user - The user object to be sent.
 */
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

/**
 * Retrieves form values from the input fields and returns them as an object.
 * 
 */
function getFormValues() {
  return {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };
}

/**
 * Handles the signup process by validating inputs, creating a user, and redirecting to the login page.
 */
async function handleSignup() {
  const { name, email, password, confirmPassword } = getFormValues();

  if ((await takenMail()) === true) {
    showRedBorderMail();
    return;
  }

  if (validateFormInputs(name, email, password, confirmPassword)) {
    await createUser(name, email, password);
    await createNewContact(name, email);
    signUpButton.disabled = true;
    showToastMessage("You Signed Up successfully. <br> Redirecting to Log In...");
    setTimeout(() => {
      redirectToLoginPage();
      clearFormFields();
      signUpButton.disabled = false;
    }, 3000);
  }
}

/**
 * Redirects the user to the login page.
 */
function redirectToLoginPage() {
  window.location.href = "login.html";
}

/**
 * Clears the form fields for name and email.
 */
function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
}

/**
 * Checks the password input field and updates the icons based on its state.
 */
function checkPasswordInput() {
  const passwordInput = document.getElementById("password");
  let { eyeIcon, crossedEyeIcon, lockIcon } = getIcons();

  if (passwordInput.value.length === 0) {
    resetPasswordVisibility(passwordInput, lockIcon, eyeIcon, crossedEyeIcon, "password");
  } else {
    updateIcons(lockIcon, eyeIcon, crossedEyeIcon, isPasswordVisible);
  }
}

/**
 * Checks the confirm password input field and updates the icons based on its state.
 */
function checkConfirmPasswordInput() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  let { eyeIcon, crossedEyeIcon, lockIcon } = getConfirmIcons();

  if (confirmPasswordInput.value.length === 0) {
    resetPasswordVisibility(confirmPasswordInput, lockIcon, eyeIcon, crossedEyeIcon, "confirmPassword");
  } else {
    updateIcons(lockIcon, eyeIcon, crossedEyeIcon, isConfirmPasswordVisible);
  }
}

/**
 * Toggles the visibility of the password and updates the icons.
 */
function showPassword() {
  const passwordInput = document.getElementById("password");
  let { eyeIcon, crossedEyeIcon } = getIcons();

  isPasswordVisible = !isPasswordVisible;
  passwordInput.type = isPasswordVisible ? "text" : "password";
  toggleVisibilityIcons(eyeIcon, crossedEyeIcon, isPasswordVisible);
}

/**
 * Toggles the visibility of the confirm password and updates the icons.
 */
function showConfirmPassword() {
  const confirmPasswordInput = document.getElementById("confirmPassword");
  let { eyeIcon, crossedEyeIcon } = getConfirmIcons();

  isConfirmPasswordVisible = !isConfirmPasswordVisible;
  confirmPasswordInput.type = isConfirmPasswordVisible ? "text" : "password";
  toggleVisibilityIcons(eyeIcon, crossedEyeIcon, isConfirmPasswordVisible);
}

/**
 * Retrieves the icon elements for the password input field and returns them.
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
 * Retrieves the icon elements for the confirm password input field and returns them.
 * 
 */
function getConfirmIcons() {
  return {
    eyeIcon: document.getElementById("confirmEyeIcon"),
    crossedEyeIcon: document.getElementById("confirmCrossedEyeIcon"),
    lockIcon: document.getElementById("confirmLockIcon"),
  };
}

/**
 * Resets the password visibility state and updates the icons.
 * @param {HTMLElement} input - The input element (password or confirm password).
 * @param {HTMLElement} lockIcon - The lock icon element.
 * @param {HTMLElement} eyeIcon - The eye icon element.
 * @param {HTMLElement} crossedEyeIcon - The crossed eye icon element.
 * @param {string} inputType - The type of input ("password" or "confirmPassword").
 */
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

/**
 * Updates the icons based on the visibility state.
 * @param {HTMLElement} lockIcon - The lock icon element.
 * @param {HTMLElement} eyeIcon - The eye icon element.
 * @param {HTMLElement} crossedEyeIcon - The crossed eye icon element.
 * @param {boolean} isVisible - The visibility state of the password.
 */
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

/**
 * Toggles the visibility of the eye icons based on the password's visibility state.
 * @param {HTMLElement} eyeIcon - The eye icon element.
 * @param {HTMLElement} crossedEyeIcon - The crossed eye icon element.
 * @param {boolean} isVisible - The visibility state of the password.
 */
function toggleVisibilityIcons(eyeIcon, crossedEyeIcon, isVisible) {
  if (isVisible) {
    eyeIcon.classList.remove("d-none");
    crossedEyeIcon.classList.add("d-none");
  } else {
    eyeIcon.classList.add("d-none");
    crossedEyeIcon.classList.remove("d-none");
  }
}

/**
 * Adds a red border to all input fields.
 */
function showRedBorder() {
  showRedBorderName();
  showRedBorderMail();
  showRedBorderPassword();
  showRedBorderConfirmPw();
}

/**
 * Adds a red border to the name input field.
 */
function showRedBorderName() {
  let inputName = document.getElementById("name");
  inputName.classList.add("redBorder");
}

/**
 * Adds a red border to the email input field.
 */
function showRedBorderMail() {
  let inputMail = document.getElementById("email");
  inputMail.classList.add("redBorder");
}

/**
 * Adds a red border to the password input field.
 */
function showRedBorderPassword() {
  let inputPassword = document.getElementById("password");
  inputPassword.classList.add("redBorder");
}

/**
 * Adds a red border to the confirm password input field.
 */
function showRedBorderConfirmPw() {
  let inputConfirmPassword = document.getElementById("confirmPassword");
  inputConfirmPassword.classList.add("redBorder");
}

/**
 * Removes red borders from all input fields.
 */
function removeRedBorders() {
  let inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("redBorder");
  });
}

/**
 * Displays a toast message with the provided message.
 * @param {string} message - The message to display in the toast.
 */
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

/**
 * Fetches all users from the database.
 * 
 */
async function fetchUsers() {
  let response = await fetch(FB_URL + "/users.json");
  return response.json();
}

/**
 * Finds a user by email in the provided users object.
 * @param {Object} users - The users object.
 * @param {string} email - The email to search for.
 */
function findUser(users, email) {
  return Object.values(users).find((user) => user.email === email);
}

/**
 * Displays a message indicating that the email is already taken.
 */
function showTakenMailMessage() {
  let errorElement = document.getElementById("addErrorMessage");
  errorElement.innerHTML =
    "<p>Email address already taken! Please use a different one.</p>";
  showRedBorderMail();
}

/**
 * Adds an event listener to the checkbox to toggle between checked and unchecked icons.
 */
checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    uncheckedIcon.classList.add("d-none");
    checkedIcon.classList.remove("d-none");
  } else {
    checkedIcon.classList.add("d-none");
    uncheckedIcon.classList.remove("d-none");
  }
});

/**
 * Creates a new contact with the provided name and email.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email of the contact.
 */
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

/**
 * Returns a random color from the `initialColors` array.
 * 
 */
function getRandomInitialColor() {
  let randIndex = Math.floor(Math.random() * initialColors.length);
  let randomColor = initialColors[randIndex];
  return randomColor;
}
