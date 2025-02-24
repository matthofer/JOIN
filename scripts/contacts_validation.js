/**
 * This function validates the inputs for add the new contact function.
 * Check criteria: all fields filled, name and email and phone valid
 * @param {string} contactName - is the value of the name input field
 * @param {string} contactMail - is the value of the mail input field
 * @param {string} contactPhone - is the value of the phone input field
 * @param {string} id - id of the error message HTML tag
 *
 */
function validateInputs(contactName, contactMail, contactPhone, id) {
  if (
    checkEmptyInput(contactName, contactMail, contactPhone, id) &&
    checkIfContactNameNotExits(contactName, id) &&
    checkName(contactName, id) &&
    checkIfContactEmailNotExits(contactMail, id) &&
    checkEmail(contactMail, id) &&
    checkPhone(contactPhone, id)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * This function validates the inputs for edit a contact function.
 * Check criteria: all fields filled, name and email and phone valid
 * @param {string} contactName - is the value of the name input field
 * @param {string} contactMail - is the value of the mail input field
 * @param {string} contactPhone - is the value of the phone input field
 * @param {string} id - id of the error message HTML tag
 *
 */
function validateInputsEdit(contactName, contactMail, contactPhone, id) {
  if (
    checkEmptyInput(contactName, contactMail, contactPhone, id) &&
    checkName(contactName, id) &&
    checkEmail(contactMail, id) &&
    checkPhone(contactPhone, id)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * This function checks if all three input fields are filled. If not a error message will be displayed
 *
 */
function checkEmptyInput(contactName, contactMail, contactPhone, id) {
  if (contactName === "" || contactMail === "" || contactPhone === "") {
    showRedBorders();
    document.getElementById(id).innerHTML =
      "<p>Please fill in all three input fields!</p>";

    return false;
  } else {
    removeRedBorders();
    return true;
  }
}

function checkName(contactName, id) {
  if (!validateName(contactName)) {
    document.getElementById(id).innerHTML +=
      "<p>Only letters are allowed in the name</p>";
    showRedBordersName();
    return false;
  } else {
    removeRedBordersName();
    return true;
  }
}

/**
 * This function checks if the email is correct. If not a error message will be displayed
 *
 * @param {string} contactMail - is the value of the mail input field
 * @param {string} id - id of the error message HTML tag
 */
function checkEmail(contactMail, id) {
  if (!validateEmail(contactMail)) {
    document.getElementById(id).innerHTML +=
      "<p>Please enter a valid email address<br>e.g. max.muster@web.de</p>";
    showRedBordersMail();
    return false;
  } else {
    removeRedBordersMail();
    return true;
  }
}

/**
 * This function checks if the phone number is correct. If not a error message will be displayed
 *
 * @param {string} contactPhone - is the value of the phone input field
 * @param {string} id - id of the error message HTML tag
 */
function checkPhone(contactPhone, id) {
  if (!validatePhoneNumber(contactPhone)) {
    document.getElementById(id).innerHTML +=
      "<p>Phone number invalid!<br>Must start with +49 and can be max. 15 characters long</p>";
    showRedBordersPhone();
    return false;
  } else {
    removeRedBordersPhone();
    return true;
  }
}

/**
 * This function checks the name against a regular expression only letters are allowed
 *
 * @param {string} name - is the value of the name input field
 */
function validateName(name) {
  let nameRegex = /^[a-zA-ZäöüÄÖÜß\s'-]+$/;
  return nameRegex.test(name);
}

/**
 * This function checks the email against a regular expression
 *
 * @param {string} email - is the value of the email input field
 */
function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}$/;
  return emailRegex.test(email);
}

/**
 * This function checks the phone number against a regular expression
 *
 * @param {string} phone - is the value of the phone number input field
 */
function validatePhoneNumber(phoneNumber) {
  let phoneRegex = /^\+49\d{0,12}$/;
  return phoneRegex.test(phoneNumber);
}

async function saveContact(contactName, contactMail, contactPhone) {
  let newUserObj = {
    color: getRandomIntialColor(),
    email: contactMail,
    name: contactName,
    phone: contactPhone,
  };
  try {
    await postData("contacts/", newUserObj);
  } catch (error) {
    showMessage("Error while saving the data");
  }
}

/**
 * This function checks if the email address not exists. If yes a error message will be displayed
 *
 * @param {string} contactMail - is the value of the email input field
 * @param {string} id - id of the error message HTML tag
 */
function checkIfContactEmailNotExits(contactMail, id) {
  let result = contacts.filter(
    (contact) => contact.email.toLowerCase() === contactMail.toLowerCase()
  );
  if (result.length === 0) {
    removeRedBordersMail();
    return true;
  } else {
    document.getElementById(id).innerHTML +=
      "<p>Email address already exists</p>";
    showRedBordersMail();
    return false;
  }
}

/**
 * This function checks if the contact Name not exists. If yes a error message will be displayed
 *
 * @param {string} contactMail - is the value of the email input field
 * @param {string} id - id of the error message HTML tag
 */
function checkIfContactNameNotExits(contactName, id) {
  let result = contacts.filter(
    (contact) => contact.name.toLowerCase() === contactName.toLowerCase()
  );
  if (result.length === 0) {
    removeRedBordersName();
    return true;
  } else {
    document.getElementById(id).innerHTML += "<p>Name already exists</p>";
    showRedBordersName();
    return false;
  }
}

/**
 * This function adds the red color to the the border of input fields if validation failed
 *
 */
function showRedBorders() {
  document.getElementById("contactName").style.borderColor = "#f50000";
  document.getElementById("contactMail").style.borderColor = "#f50000";
  document.getElementById("contactPhone").style.borderColor = "#f50000";
  document.getElementById("contactNameEdit").style.borderColor = "#f50000";
  document.getElementById("contactMailEdit").style.borderColor = "#f50000";
  document.getElementById("contactPhoneEdit").style.borderColor = "#f50000";
}

/**
 * This function removes the red color to the the border of input fields if validation failed
 *
 */
function removeRedBorders() {
  document.getElementById("contactName").style.borderColor = "#ccc";
  document.getElementById("contactMail").style.borderColor = "#ccc";
  document.getElementById("contactPhone").style.borderColor = "#ccc";
  document.getElementById("contactNameEdit").style.borderColor = "#ccc";
  document.getElementById("contactMailEdit").style.borderColor = "#ccc";
  document.getElementById("contactPhoneEdit").style.borderColor = "#ccc";
}

/**
 * This function added the red border color to the mail input field if validation failed
 *
 */
function showRedBordersName() {
  document.getElementById("contactName").style.borderColor = "#f50000";
  document.getElementById("contactNameEdit").style.borderColor = "#f50000";
}

/**
 * This function removes the red border color to the mail input field if validation failed
 *
 */
function removeRedBordersName() {
  document.getElementById("contactName").style.borderColor = "#ccc";
  document.getElementById("contactNameEdit").style.borderColor = "#ccc";
}

/**
 * This function added the red border color to the mail input field if validation failed
 *
 */
function showRedBordersMail() {
  document.getElementById("contactMail").style.borderColor = "#f50000";
  document.getElementById("contactMailEdit").style.borderColor = "#f50000";
}

/**
 * This function removes the red border color to the mail input field if validation failed
 *
 */
function removeRedBordersMail() {
  document.getElementById("contactMail").style.borderColor = "#ccc";
  document.getElementById("contactMailEdit").style.borderColor = "#ccc";
}

/**
 * This function added the red border color to the phone input field if validation failed
 *
 */
function showRedBordersPhone() {
  document.getElementById("contactPhone").style.borderColor = "#f50000";
  document.getElementById("contactPhoneEdit").style.borderColor = "#f50000";
}

/**
 * This function remove the red border color to the phone input field if validation failed
 *
 */
function removeRedBordersPhone() {
  document.getElementById("contactPhone").style.borderColor = "#ccc";
  document.getElementById("contactPhoneEdit").style.borderColor = "#ccc";
}
