/**
 * This function open the dropdown menu for the Contacts.
 */
function openDropdownContacts() {
  checkSelectedContacts();
  let dropdown = document.getElementById("contacts");
  let inputImg = document.getElementById("contactsDropdown");
  dropdown.classList.add("dropdown");
  if (dropdown.classList.contains("dropdown")) {
    inputImg.style.backgroundImage =
      "url('../assets/icons/arrow_drop_down.svg')";
  } else {
    inputImg.style.backgroundImage =
      "url('../assets/icons/arrow_drop_down-down.svg')";
  }
}

/**
 * This function close the dropdown menu for the contacts
 */
function closeDropDownContacts() {
  let dropdown = document.getElementById("contacts");
  let category = document.getElementById("categorys");
  let inputImg = document.getElementById("contactsDropdown");
  dropdown.classList.remove("dropdown");
  category.classList.remove("dropdown");
  if (
    dropdown.classList.contains("dropdown") ||
    category.classList.contains("dropdown")
  ) {
    inputImg.style.backgroundImage =
      "url('../assets/icons/arrow_drop_down.svg')";
  } else {
    inputImg.style.backgroundImage =
      "url('../assets/icons/arrow_drop_down-down.svg')";
  }
}

/**
 * This function close the dropdown menus contacts or catgory at the board template when clicking somewhere outside from the form
 * 
 * @returns nothing -- just stop the function when the id is not available
 */
function closeDropDownContactsBoard() {
  let dropdown = document.getElementById("contacts");
  let category = document.getElementById("categorys");
  if (dropdown || category) {
    closeDropDownContacts();
  } else {
    return;
  }
}

/**
 * This function close the dropdown menus contacts when clicking somewhere outside from the form
 * 
 */
function toggleDropdownContacts() {
  let dropdown = document.getElementById("contacts");
  if (dropdown.classList.contains("dropdown")) {
    closeDropDownContacts();
  } else {
    openDropdownContacts();
  }
}

/**
 * This function render the contacts into the dropdown menu.
 * 
 */
function renderDropdownContacts() {
  let html = document.getElementById("contacts");
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  for (let contactIndex = 0; contactIndex < contacts.length; contactIndex++) {
    const singleContact = contacts[contactIndex];
    html.innerHTML += contactDropdownTemplate(singleContact, contactIndex);
  }
}

/**
 * This function highlight the selected contact in the dropdown menu.
 * 
 * @param {*} singleContact = is a single contact from the for-loop of all contacts 
 * @param {*} contactIndex = is the index of the singleContact.
 */
function markCheckbox(singleContact, contactIndex) {
  let input = document.getElementById("contactsDropdown");
  let checkbox = document.getElementById(`checkbox${contactIndex}`);
  let contact = document.getElementById(`contact${contactIndex}`);
  let contactData = singleContact;
  let contactID = getContactID(singleContact);
  let findContactIndex = selectedContacts.findIndex(
    (cont) => getContactID(cont) === contactID
  );
  checkbox.checked = !checkbox.checked;
  if (checkbox.checked) {
    contact.classList.add("dropdownContactBlueBG");
    selectedContacts.push(contactData);
  } else {
    contact.classList.remove("dropdownContactBlueBG");
    if (findContactIndex !== -1) {
      selectedContacts.splice(findContactIndex, 1);
    }
  }
  renderSelectedContacts();
  input.value = "";
  filterContacts();
}

/**
 * This function clears all selected and marked contacts when the form gets cleared.
 * 
 */
function clearContacts() {
  let contacts = document.getElementById("contacts");
  let singleContact = contacts.querySelectorAll(".dropdownContactBlueBG");
  singleContact.forEach((contact) => {
    contact.classList.remove("dropdownContactBlueBG");
  });
  let checkboxes = contacts.querySelectorAll("input[type='checkbox']");
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

/**
 * This function syncs the UI and check if the contcats are checked.
 * If not, this function add the class to mark the contacts and turn the checkbox on true. 
 * If the Conatct is not in the selectedContacts Array, he gets pushed.
 * selected contacts gets rendered. 
 * 
 * @param {*} singleContact = is a single contact from the for-loop of all contacts 
 * @param {*} contactIndex = is the index of the singleContact.
 */
function syncCheckbox(singleContact, contactIndex) {
  let checkbox = document.getElementById(`checkbox${contactIndex}`);
  let contact = document.getElementById(`contact${contactIndex}`);
  checkbox.checked = true;
  contact.classList.add("dropdownContactBlueBG");
  if (
    !selectedContacts.find(
      (cont) => getContactID(cont) === getContactID(singleContact)
    )
  ) {
    selectedContacts.push(singleContact);
  }
  renderSelectedContacts();
}

/**
 * This function gets the firebase Id od the singleContact
 * 
 * @param {*} singleContact = is a single contact from the for-loop of all contacts 
 * @returns the firebase ID
 */
function getContactID(singleContact) {
  return singleContact.firebaseid;
}

/**
 * This function render the selected Conatcts.
 */
function renderSelectedContacts() {
  let contactInitials = document.getElementById("initialsContacts");
  contactInitials.innerHTML = "";
  for (
    let selectedContactIndex = 0;
    selectedContactIndex < selectedContacts.length;
    selectedContactIndex++
  ) {
    const singleAvatar = selectedContacts[selectedContactIndex];
    let intials = getIntialsOfContact(singleAvatar.name);
    contactInitials.innerHTML += `
        <div class="initials fontColorwhite" style="background-color: ${singleAvatar.color};">${intials}</div
        `;
  }
}

/**
 * This function compare the Arrays SelectedContacts and CurrentlyContacts by each contact on his FirebaseID.
 * When a Contact is founded,so he gets marked and the dropdown menu gets synced
 * 
 */
function checkSelectedContacts() {
  for (
    let contactsIndex = 0;
    contactsIndex < currentlyContacts.length;
    contactsIndex++
  ) {
    const singleContact = currentlyContacts[contactsIndex];
    let isSelected = false;
    for (
      let selectedContactsIndex = 0;
      selectedContactsIndex < selectedContacts.length;
      selectedContactsIndex++
    ) {
      const singleAvatar = selectedContacts[selectedContactsIndex];
      if (singleContact.firebaseid === singleAvatar.firebaseid) {
        isSelected = true;
        break;
      }
    }
    if (isSelected) {
      syncCheckbox(singleContact, contactsIndex);
    }
  }
}

/**
 * This function filter the Contacts for the Dropdown menu.
 * Value from Input gets filtered 
 * 
 */
function filterContacts() {
  let valueInput = document
    .getElementById("contactsDropdown")
    .value.toUpperCase();
  let filteredContacts;
  if (valueInput === "") {
    filteredContacts = contacts;
  } else {
    filteredContacts = contacts.filter((contact) =>
      contact.name.toUpperCase().includes(valueInput)
    );
  }
  if (filteredContacts.length > 0) {
    renderFilteredContact(filteredContacts);
  } else {
    document.getElementById("contacts").innerHTML = `
        <p class="noContact">No contacts founded !</p>
        `;
  }
}

/**
 * This function render the filtered Contacts in the dropdown Menu
 * @param {*} filteredContacts = array from Filterfunction
 */
function renderFilteredContact(filteredContacts) {
  let html = document.getElementById("contacts");
  html.innerHTML = "";
  currentlyContacts = filteredContacts;
  for (let index = 0; index < filteredContacts.length; index++) {
    const element = filteredContacts[index];
    html.innerHTML += contactDropdownTemplate(element, index);
  }
  if (!html.classList.contains("dropdown")) {
    openDropdownContacts();
  }
  checkSelectedContacts();
}
