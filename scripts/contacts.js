let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";

let contacts = [];

async function init() {
  await loadContactsData();
  renderContacts();
}

async function loadContactsData(path = "/contacts") {
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
    console.log("Fehler beim Laden");
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
  let firstLetters = getFirstLettersSorted(contacts);
  for (let i = 0; i < firstLetters.length; i++) {
    contactContentRef.innerHTML += getContactHeaderTemplate(firstLetters[i]);
  }
  for (let i = 0; i < contacts.length; i++) {
    let firstCharContact = contacts[i].name[0].toLowerCase();
    let contactGroupRef = document.getElementById(firstCharContact);
    let intials = getIntialsOfContact(contacts[i].name);
    contactGroupRef.innerHTML += getSingleContactTemplate(i, intials);
  }
}

function getContactHeaderTemplate(firstLetter) {
  return `  <div class="contactGroup">
                <h3>${firstLetter}</h3>
                <div class="dividerContainer">
                <div class="dividerContactGroups"></div>
                </div>
                <div id="${firstLetter.toLowerCase()}"></div>
            </div>`;
}

function getSingleContactTemplate(i, intials) {
  return `  <div class="singleContact">
                <div id="initial${i}" class="initials">${intials}</div>
                <div class="nameAndMail">
                    <p class="name">${contacts[i].name}</p>
                    <p class="email">${contacts[i].email}</p>
                </div>
            </div>`;
}

function getIntialsOfContact(contact) {
  let intials = "";
  let splittedContact = contact.split(" ");
  for (let i = 0; i < splittedContact.length; i++) {
    intials += splittedContact[i][0].toUpperCase();
  }
  return intials;
}

async function postData(path, data = {}) {
  await fetch(FB_URL + path + ".json", {
    method: "POST",
    header: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}
