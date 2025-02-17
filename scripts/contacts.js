let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";
let contacts = [];
let activeContact = null;

async function init() {
  await loadContactsData();
  renderContacts();
}

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

function setBackgroundColorOfIntial(i, initialID) {
  let initialRef = document.getElementById(initialID + i);
  initialRef.style.backgroundColor = contacts[i].color;
}

function getIntialsOfContact(contact) {
  let intials = "";
  let splittedContact = contact.split(" ");
  for (let i = 0; i < splittedContact.length; i++) {
    intials += splittedContact[i][0].toUpperCase();
  }
  return intials;
}

function openDetails(i, contactID) {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1100) {
    openDetailsMobile(i, contactID);
  } else {
    openDetailsDesktop(i, contactID);
  }
}

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

function renderContactInfo(i) {
  let contactInfoRef = document.getElementById("contactInfo");
  contactInfoRef.innerHTML = "";
  let initials = getIntialsOfContact(contacts[i].name);
  contactInfoRef.innerHTML = getContactInfoTemplateDesktop(i, initials);
  setBackgroundColorOfIntial(i, "bigInitial");
}

function openDetailsMobile(i, contactID) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  document.getElementById("respAddbutton").classList.add("addButtonRemoved");
  contactInfoRef.classList.remove("dNone");
  renderContactInfoMobile(i);
  activeContact = contactID;
  document.getElementById("contactInfo").innerHTML = "";
}

function renderContactInfoMobile(i) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  contactInfoRef.innerHTML = "";
  let initials = getIntialsOfContact(contacts[i].name);
  contactInfoRef.innerHTML = getContactInfoTemplateMobile(i, initials);
  setBackgroundColorOfIntial(i, "mobileInitial");
}

function closeMobileInfo() {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  document.getElementById("respAddbutton").classList.remove("addButtonRemoved");
  contactInfoRef.classList.add("dNone");
  activeContact = null;
}

function openMobileEditButton() {
  document.getElementById("mobileEditButton").classList.toggle("respBtnclosed");
}

function openAddContactOverlay() {
  document.getElementById("addErrorMessage").innerHTML = "";
  document.getElementById("overlay").classList.remove("overlayClosed");
}

function closeOverlay() {
  document.getElementById("overlay").classList.add("overlayClosed");
  cleanInputfields();
}

function closeEditOverlay() {
  document.getElementById("overlayEdit").classList.add("overlayClosed");
}

function cleanInputfields() {
  document.getElementById("contactName").value = "";
  document.getElementById("contactMail").value = "";
  document.getElementById("contactPhone").value = "";
}

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

function validateInputs(contactName, contactMail, contactPhone, id) {
  if (
    checkEmptyInput(contactName, contactMail, contactPhone, id) &&
    checkEmail(contactMail, id) &&
    checkPhone(contactPhone, id)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkEmptyInput(contactName, contactMail, contactPhone, id) {
  if (contactName === "" || contactMail === "" || contactPhone === "") {
    document.getElementById(id).innerHTML =
      "<p>Please fill in all three input fields!</p>";
    return false;
  } else {
    return true;
  }
}

function checkEmail(contactMail, id) {
  if (!validateEmail(contactMail)) {
    document.getElementById(id).innerHTML +=
      "<p>Please enter a valid email address<br>e.g. max.muster@web.de</p>";
    return false;
  } else {
    return true;
  }
}

function checkPhone(contactPhone, id) {
  if (!validatePhoneNumber(contactPhone)) {
    document.getElementById(id).innerHTML +=
      "<p>Phone number invalid!<br>Must start with +49 and can be max. 15 characters long</p>";
    return false;
  } else {
    return true;
  }
}

function validateEmail(email) {
  let emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{1,3}$/;
  return emailRegex.test(email);
}

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

function showMessage(message) {
  document.getElementById("messageText").innerHTML = message;
  document.getElementById("message").classList.remove("messageClosed");
  const myTimeout = setTimeout(closeSuccessMessage, 1200);
}

function closeSuccessMessage() {
  document.getElementById("message").classList.add("messageClosed");
}

async function deleteContact(i) {
  let contactInfoRef = document.getElementById("contactInfo");
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  showMessage("Contact successfully deleted");
}

function openEditContactOverlay(i) {
  document.getElementById("editErrorMessage").innerHTML = "";
  let intials = getIntialsOfContact(contacts[i].name);
  renderIntialsAndButtonsInEditMode(i, intials);
  document.getElementById("overlayEdit").classList.remove("overlayClosed");
  fillInputfields(i);
}

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

async function fillInputfields(i) {
  document.getElementById("contactNameEdit").value = contacts[i].name;
  document.getElementById("contactMailEdit").value = contacts[i].email;
  document.getElementById("contactPhoneEdit").value = contacts[i].phone;
}

async function editContact(i) {
  document.getElementById("editErrorMessage").innerHTML = "";
  let name = document.getElementById("contactNameEdit").value;
  let mail = document.getElementById("contactMailEdit").value;
  let phone = document.getElementById("contactPhoneEdit").value;
  let validationResult = validateInputs(name, mail, phone, "editErrorMessage");
  if (validationResult) {
    await updateContact(i, name, mail, phone, "editErrorMessage");
    await loadContactsData();
    renderContacts();
    renderContactInfos(i);
    closeEditOverlay();
    showMessage("Contact successfully edited");
  }
}

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

async function deleteContactInEditMode(i) {
  let contactInfoRef = document.getElementById("contactInfo");
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  closeEditOverlay();
  showMessage("Contact successfully deleted");
}

async function deleteContactInMobileInfo(i, event) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  closeMobileInfo();
  showMessage("Contact successfully deleted");
  event.stopPropagation(event);
}

async function deleteContactInMobileEditMode(i, event) {
  let contactInfoRef = document.getElementById("mobileContactInfo");
  await deleteData(`/contacts/${contacts[i].firebaseid}`);
  contactInfoRef.innerHTML = "";
  await loadContactsData();
  renderContacts();
  closeMobileInfo();
  closeEditOverlay();
  showMessage("Contact successfully deleted");
  event.stopPropagation(event);
}

function renderContactInfos(i) {
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1100) {
    renderContactInfoMobile(i);
  } else {
    renderContactInfo(i);
  }
}
