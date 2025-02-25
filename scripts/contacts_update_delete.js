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
