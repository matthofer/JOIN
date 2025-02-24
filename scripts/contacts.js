let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let activeContact = null;

/**
 * This function initializes the contacts page. contacts are loaded and rendered from firebase.
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
 * This function load the contacts data from firebase and push it to contacts array.
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
 * This function delete a contact in the firebase and renders the updated contacts
 * @param {number} i - The index of the contact in the contacts array
 *
 */
async function deleteContact(i) {
  let contactInfoRef = document.getElementById("contactInfo");
  await deleteContactFromTasks(i);
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  showMessage("Contact successfully deleted");
}

/**
 * This function opens the edit contact dialog and renders the contact specific informations
 * @param {number} i - The index of the contact in the contacts array
 *
 */
function openEditContactOverlay(i) {
  document.getElementById("editErrorMessage").innerHTML = "";
  let intials = getIntialsOfContact(contacts[i].name);
  renderIntialsAndButtonsInEditMode(i, intials);
  document.getElementById("overlayEdit").classList.remove("overlayClosed");
  fillInputfields(i);
}

/**
 * This function renders the contact specific intials and buttons in edit dialog
 * @param {number} i - The index of the contact in the contacts array
 * @param {string} initials - intitals of the contact
 *
 */
function renderIntialsAndButtonsInEditMode(i, initials) {
  document.getElementById("editButtons").innerHTML = "";
  document.getElementById("personIcon").innerHTML = "";
  document.getElementById("editButtons").innerHTML = getEditButtonsTemplate(i);
  document.getElementById("personIcon").innerHTML = getIntialsTemplate(
    i,
    initials
  );
  setBackgroundColorOfIntial(i, "editInitial");
}

/**
 * This function fills the input fields of the specific contact in edit Dialog
 * @param {number} i - The index of the contact in the contacts array
 *
 */
async function fillInputfields(i) {
  document.getElementById("contactNameEdit").value = contacts[i].name;
  document.getElementById("contactMailEdit").value = contacts[i].email;
  document.getElementById("contactPhoneEdit").value = contacts[i].phone;
}

/**
 * This function edit the contact in firebase and rendering all contact relevant information if the validation criterias are fullfilled
 * @param {number} i - The index of the contact in the contacts array
 *
 */
async function editContact(i) {
  document.getElementById("editErrorMessage").innerHTML = "";
  let name = document.getElementById("contactNameEdit").value;
  let mail = document.getElementById("contactMailEdit").value;
  let phone = document.getElementById("contactPhoneEdit").value;
  let valResult = validateInputsEdit(name, mail, phone, "editErrorMessage");
  if (valResult) {
    await updateContact(i, name, mail, phone, "editErrorMessage");
    await loadContactsData();
    renderContacts();
    renderContactInfos(i);
    closeEditOverlay();
    showMessage("Contact successfully edited");
  }
}

/**
 * This function mades the update in firebase
 * @param {number} i - The index of the contact in the contacts array
 * @param {editedName} editedName - The edited name from the inputfield
 * @param {editedMail} editedMail - The edited mail from the inputfield
 * @param {editedPhone} editedPhone - The edited phone from the inputfield
 *
 */
async function updateContact(i, editedName, editedMail, editedPhone) {
  await putData(
    (path = `contacts/${contacts[i].firebaseid}`),
    (data = {
      name: editedName,
      email: editedMail,
      phone: editedPhone,
      color: contacts[i].color,
    })
  );
}

/**
 * This function deletes the contact in the edit mode
 * @param {number} i - The index of the contact in the contacts array
 *
 */
async function deleteContactInEditMode(i) {
  let contactInfoRef = document.getElementById("contactInfo");
  await deleteContactFromTasks(i);
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  closeEditOverlay();
  showMessage("Contact successfully deleted");
}

/**
 * This function deletes the contact in the mobile info/detail mode
 * @param {number} i - The index of the contact in the contacts array
 *
 */
async function deleteContactInMobileInfo(i, event) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  await deleteContactFromTasks(i);
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  closeMobileInfo();
  showMessage("Contact successfully deleted");
  event.stopPropagation(event);
}

/**
 * This function deletes the contact in the mobile info/detail edit mode
 * @param {number} i - The index of the contact in the contacts array
 *
 */
async function deleteContactInMobileEditMode(i, event) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  await deleteContactFromTasks(i);
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  clearContactInfo();
  closeMobileInfo();
  closeEditOverlay();
  showMessage("Contact successfully deleted");
  event.stopPropagation(event);
}

/**
 * This rendering the contact infos in mobile or desktop depending on the screen size
 * @param {number} i - The index of the contact in the contacts array
 *
 */
function renderContactInfos(i) {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1100) {
    renderContactInfoMobile(i);
  } else {
    renderContactInfo(i);
  }
}

/**
 * This function is needed to find the taskIDs where a specific contact is included
 * @param {contactID} contactID - firebaseID of the contact
 *
 */
function getFirebaseIdOfTasks(contactID) {
  let result = [];
  for (let i = 0; i < tasks.length; i++) {
    let taskFirebaseId = tasks[i].firebaseid;
    let contactsArr = tasks[i].contacts;
    if (contactsArr != undefined) {
      let contactsArrKeys = Object.keys(contactsArr);
      if (contactsArrKeys.includes(contactID)) {
        result.push(taskFirebaseId);
      }
    }
  }
  return result;
}

/**
 * This function deletes the contact from all tasks to which it was assigned
 * @param {contactID} contactID - firebaseID of the contact
 *
 */
async function deleteContactFromTasks(i) {
  let contactFirebaseId = contacts[i].firebaseid;
  let tasksContactIncluded = getFirebaseIdOfTasks(contactFirebaseId);
  if (tasksContactIncluded.length > 0) {
    for (let i = 0; i < tasksContactIncluded.length; i++) {
      let taskId = tasksContactIncluded[i];
      await deleteData(`tasks/${taskId}/assignTo/${contactFirebaseId}`);
    }
  } else {
    return;
  }
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
