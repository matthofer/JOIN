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

function closeDropDownContactsBoard() {
  let dropdown = document.getElementById("contacts");
  let category = document.getElementById("categorys");
  if (dropdown || category) {
    closeDropDownContacts();
  } else {
    return;
  }
}

function toggleDropdownContacts() {
  let dropdown = document.getElementById("contacts");
  if (dropdown.classList.contains("dropdown")) {
    closeDropDownContacts();
  } else {
    openDropdownContacts();
  }
}

function renderDropdownContacts() {
  let html = document.getElementById("contacts");
  contacts.sort((a, b) => a.name.localeCompare(b.name));
  for (let contactIndex = 0; contactIndex < contacts.length; contactIndex++) {
    const singleContact = contacts[contactIndex];
    html.innerHTML += contactDropdownTemplate(singleContact, contactIndex);
  }
}

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

function getContactID(singleContact) {
  return singleContact.firebaseid;
}

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
