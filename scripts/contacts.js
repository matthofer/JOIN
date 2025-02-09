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
    let firstLetter = contactsArr[i].name[0];
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
    contactInfoRef.classList.add("detailClosed");
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
  if (activeContact == contactID) {
    contactInfoRef.classList.add("dNone");
    activeContact = null;
    return;
  }
  document.getElementById("respAddbutton").classList.add("addButtonRemoved");
  contactInfoRef.classList.remove("dNone");
  renderContactInfoMobile(i);
  activeContact = contactID;
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
  document.getElementById("overlay").innerHTML = "";
  let screenWidth = window.innerWidth;
  if (screenWidth <= 1100) {
    document.getElementById("overlay").innerHTML = getAddContactMobileContent();
  } else {
    document.getElementById("overlay").innerHTML =
      getAddContactDesktopContent();
  }
  document.getElementById("overlay").classList.remove("overlayClosed");
}

function closeOverlay() {
  document.getElementById("overlay").classList.add("overlayClosed");
}

async function createNewContact() {
  document.getElementById("validationErrorMessage").innerHTML = "";
  let contactName = document.getElementById("contactName").value;
  let contactMail = document.getElementById("contactMail").value;
  let contactPhone = document.getElementById("contactPhone").value;
  let validationResult = validateInputs(contactName, contactMail, contactPhone);
  if (validationResult) {
    await saveContact(contactName, contactMail, contactPhone);
    await loadContactsData();
    renderContacts();
    closeOverlay();
    showMessage("Contact successfully created");
  }
}

function validateInputs(contactName, contactMail, contactPhone) {
  if (
    checkEmptyInput(contactName, contactMail, contactPhone) &&
    checkEmail(contactMail) &&
    checkPhone(contactPhone)
  ) {
    return true;
  } else {
    return false;
  }
}

function checkEmptyInput(contactName, contactMail, contactPhone) {
  if (contactName === "" || contactMail === "" || contactPhone === "") {
    document.getElementById("validationErrorMessage").innerHTML =
      "<p>Bitte alle drei Eingabefelder ausfüllen!</p>";
    return false;
  } else {
    return true;
  }
}

function checkEmail(contactMail) {
  if (!validateEmail(contactMail)) {
    document.getElementById("validationErrorMessage").innerHTML +=
      "<p>Bitte eine gültige Emailadresse eingeben</p>";
    return false;
  } else {
    return true;
  }
}

function checkPhone(contactPhone) {
  if (!validatePhoneNumber(contactPhone)) {
    document.getElementById("validationErrorMessage").innerHTML +=
      "<p>Telefonnummer ungültig! (Muss mit +49 beginnen und darf max. 15 Stellen lang sein)</p>";
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
  const myTimeout = setTimeout(closeSuccessMessage, 2000);
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
  document.getElementById("overlay").innerHTML = "";
  let intials = getIntialsOfContact(contacts[i].name);
  document.getElementById("overlay").innerHTML = getEditContactDesktopContent(
    i,
    intials
  );
  setBackgroundColorOfIntial(i, "editInitial");
  document.getElementById("overlay").classList.remove("overlayClosed");
  fillInputfields(i);
}

async function fillInputfields(i) {
  document.getElementById("contactName").value = contacts[i].name;
  document.getElementById("contactMail").value = contacts[i].email;
  document.getElementById("contactPhone").value = contacts[i].phone;
}

async function editContact(i) {
  document.getElementById("validationErrorMessage").innerHTML = "";
  let editedName = document.getElementById("contactName").value;
  let editedMail = document.getElementById("contactMail").value;
  let editedPhone = document.getElementById("contactPhone").value;
  let validationResult = validateInputs(editedName, editedMail, editedPhone);
  if (validationResult) {
    await updateContact(i, editedName, editedMail, editedPhone);
    await loadContactsData();
    renderContacts();
    renderContactInfo(i);
    closeOverlay();
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
  closeOverlay();
  showMessage("Contact successfully deleted");
}
