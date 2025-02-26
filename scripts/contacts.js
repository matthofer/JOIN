let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let activeContact = null;
let intialColors = [
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
 * This function initializes the contacts page. Contacts are loaded from firebase and will be rendered
 * Then the user icon is updated based on the login and the navigation link of the page is highlighted
 *
 */
async function init() {
  await loadContactsData();
  renderContacts();
  initLoad();
  highlightNavLink("contactsLink", "contactsLinkResp");
  await loadTasksData();
  window.addEventListener("resize", reSize);
}

/**
 * This function load the contacts data from firebase and push it to the global contacts array.
 *
 * @param {string} path - This the path to the object in firebase for example "contacts/"
 */
async function loadContactsData(path = "/contacts") {
  contacts = [];
  try {
    let contactResponse = await fetch(FB_URL + path + ".json");
    let contactResponseToJson = await contactResponse.json();
    let contactKeys = Object.keys(contactResponseToJson);
    for (let i = 0; i < contactKeys.length; i++) {
      contacts.push({
        firebaseid: contactKeys[i],
        name: contactResponseToJson[contactKeys[i]].name,
        email: contactResponseToJson[contactKeys[i]].email,
        phone: contactResponseToJson[contactKeys[i]].phone,
        color: contactResponseToJson[contactKeys[i]].color,
      });
    }
  } catch (error) {
    showMessage("Error during loading of data");
  }
}

/**
 * This function returns the first letters of the contacts for alphabetical sorting
 *
 * @param {Array} contactsArr - this is the array of contacts which have been pushed in the load data function
 */
function getFirstLettersSorted(contactsArr) {
  let firstLettersOfContacts = [];
  for (let i = 0; i < contactsArr.length; i++) {
    let firstLetter = contactsArr[i].name[0].toUpperCase();
    if (!firstLettersOfContacts.includes(firstLetter)) {
      firstLettersOfContacts.push(firstLetter);
    }
  }
  let sortedLetters = firstLettersOfContacts.sort();
  return sortedLetters;
}

/**
 * This function renders the contact in a alphabeticaly list on the screen
 *
 */
function renderContacts() {
  let contactContentRef = document.getElementById("contactList");
  contactContentRef.innerHTML = "";
  let firstLetters = getFirstLettersSorted(contacts);
  for (let i = 0; i < firstLetters.length; i++) {
    contactContentRef.innerHTML += getContactHeaderTemplate(firstLetters[i]);
  }
  for (let i = 0; i < contacts.length; i++) {
    let firstCharContact = contacts[i].name[0].toLowerCase();
    let contactGroupRef = document.getElementById(firstCharContact);
    let intials = getIntialsOfContact(contacts[i].name);
    contactGroupRef.innerHTML += getSingleContactTemplate(i, intials);
    setBackgroundColorOfIntial(i, "initial");
  }
}

/**
 * This function sets the background color of the intial in renderd contact list
 *
 *@param {number} i - index of the object in contacts array
 *@param {string} initialID - Id of the intial in the HTML
 */
function setBackgroundColorOfIntial(i, initialID) {
  let initialRef = document.getElementById(initialID + i);
  initialRef.style.backgroundColor = contacts[i].color;
}

/**
 * This function returns the intials of the contact
 *
 *@param {string} contact - Object of the contacts array
 */
function getIntialsOfContact(contact) {
  let intials = "";
  let splittedContact = contact.split(" ");
  for (let i = 0; i < splittedContact.length; i++) {
    intials += splittedContact[i][0].toUpperCase();
  }
  return intials;
}

/**
 * This function opens the details of a contacts depends on the screen width
 *
 *@param {number} i - index of the object in contacts array
 *@param {string} initialID - Id of the intial in the HTML
 */
function openDetails(i, contactID) {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1100) {
    openDetailsMobile(i, contactID);
  } else {
    openDetailsDesktop(i, contactID);
  }
}

/**
 * This function opens the desktop view of details
 *
 *@param {number} i - index of the object in contacts array
 *@param {string} initialID - Id of the intial in the HTML
 */
function openDetailsDesktop(i, contactID) {
  let contactInfoRef = document.getElementById("contactInfo");
  if (activeContact == contactID) {
    renderContactInfo(i);
    activeContact = null;
    return;
  }
  contactInfoRef.classList.remove("detailClosed");
  renderContactInfo(i);
  activeContact = contactID;
}

/**
 * This function renders the contact details
 *
 *@param {number} i - index of the object in contacts array
 */
function renderContactInfo(i) {
  let contactInfoRef = document.getElementById("contactInfo");
  contactInfoRef.innerHTML = "";
  let initials = getIntialsOfContact(contacts[i].name);
  contactInfoRef.innerHTML = getContactInfoTemplateDesktop(i, initials);
  setBackgroundColorOfIntial(i, "bigInitial");
}

/**
 * This function opens the mobile view of details
 *
 *@param {number} i - index of the object in contacts array
 *@param {string} initialID - Id of the intial in the HTML
 */
function openDetailsMobile(i, contactID) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  document.getElementById("respAddbutton").classList.add("addButtonRemoved");
  contactInfoRef.classList.remove("dNone");
  renderContactInfoMobile(i);
  activeContact = contactID;
  document.getElementById("contactInfo").innerHTML = "";
}

/**
 * This function renders the contact details in mobile view
 *
 *@param {number} i - index of the object in contacts array
 */
function renderContactInfoMobile(i) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  contactInfoRef.innerHTML = "";
  let initials = getIntialsOfContact(contacts[i].name);
  contactInfoRef.innerHTML = getContactInfoTemplateMobile(i, initials);
  setBackgroundColorOfIntial(i, "mobileInitial");
}

/**
 * This function closing the mobile details
 *
 */
function closeMobileInfo() {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  document.getElementById("respAddbutton").classList.remove("addButtonRemoved");
  contactInfoRef.classList.add("dNone");
  activeContact = null;
}

/**
 * This function open the edit/delete menu in mobile view
 *
 */
function openMobileEditButton() {
  document.getElementById("mobileEditButton").classList.toggle("respBtnclosed");
}

/**
 * This function open the add new contact dialog
 *
 */
function openAddContactOverlay() {
  document.getElementById("addErrorMessage").innerHTML = "";
  document.getElementById("overlay").classList.remove("overlayClosed");
}

/**
 * This function close add contact dialog and removes the red boarders from input fields
 *
 */
function closeOverlay() {
  document.getElementById("overlay").classList.add("overlayClosed");
  removeRedBorders();
  cleanInputfields();
}

/**
 * This function close edit contact dialog and removes the red boarders from input fields
 *
 */
function closeEditOverlay() {
  removeRedBorders();
  document.getElementById("overlayEdit").classList.add("overlayClosed");
}

/**
 * This function clears the input fields of the add contact dialog
 *
 */
function cleanInputfields() {
  document.getElementById("contactName").value = "";
  document.getElementById("contactMail").value = "";
  document.getElementById("contactPhone").value = "";
}

/**
 * This function clears the detail view. Needed for at deletion of contact
 *
 */
function clearContactInfo() {
  document.getElementById("contactInfo").innerHTML = "";
}

/**
 * This function creates a new contact in firebase with the values from the add contact dialog
 *
 */
async function createNewContact() {
  document.getElementById("addErrorMessage").innerHTML = "";
  let name = document.getElementById("contactName").value;
  let mail = document.getElementById("contactMail").value;
  let phone = document.getElementById("contactPhone").value;
  let validationResult = validateInputs(name, mail, phone, "addErrorMessage");
  if (validationResult) {
    await saveContact(name, mail, phone);
    await loadContactsData();
    renderContacts();
    closeOverlay();
    showMessage("Contact successfully created");
  }
}

/**
 * This function shows the message if a contact where created, updated or deleted
 * @param {string} message - The text which will be displayed in the message
 *
 */
function showMessage(message) {
  document.getElementById("messageText").innerHTML = message;
  document.getElementById("message").classList.remove("messageClosed");
  const myTimeout = setTimeout(closeSuccessMessage, 1200);
}

/**
 * This function close the message if a contact where created, updated or deleted
 *
 */
function closeSuccessMessage() {
  document.getElementById("message").classList.add("messageClosed");
}

/**
 * This function closes the mobile contact detail view if it was still open when you enlarge the screen
 *
 */
function reSize() {
  let width = window.innerWidth;
  if (width > 1400) {
    closeMobileInfo();
  } else {
    return;
  }
}

/**
 * This function returns a random color from the global array intialColorsrenders
 *
 *@param {number} i - index of the object in contacts array
 */
function getRandomIntialColor() {
  let randIndex = Math.floor(Math.random() * intialColors.length);
  let randomColor = intialColors[randIndex];
  return randomColor;
}
