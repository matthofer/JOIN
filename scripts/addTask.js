let categorys = ["Technical Task", "User Story", "Customer Support", "Bug Fix"]

async function initAddTask() {
    await loadContactsData();
    renderDropdownContacts();

}

function toggleDropdown(id) {
    let dropdown = document.getElementById(id);
    let inputImg = document.getElementById("contactsDropdown")
    dropdown.classList.toggle('dropdown');
    if (dropdown.classList.contains('dropdown')) {
        inputImg.style.backgroundImage = "url('../assets/icons/arrow_drop_down.svg')";
        inputImg.style.backgroundPosition = "95%"
    } else {
        inputImg.style.backgroundImage = "url('../assets/icons/arrow_drop_down-down.svg')";
    }

}

function renderDropdownContacts() {
    let html = document.getElementById('contacts');
    contacts.sort((a,b) => a.name.localeCompare(b.name));
    for (let contactIndex = 0; contactIndex < contacts.length; contactIndex++) {
        const singleContact = contacts[contactIndex];
        html.innerHTML += contactDropdownTemplate(singleContact, contactIndex)
    }
}

function markCheckbox(contactIndex) {
    let checkbox = document.getElementById(`checkbox${contactIndex}`);
    let contact = document.getElementById(`contact${contactIndex}`)
    checkbox.checked = !checkbox.checked
    if (checkbox.checked) {
        contact.classList.add('dropdownContactBlueBG');
    } else {
        contact.classList.remove('dropdownContactBlueBG');
    }
    getSelectedContacts();
}

function getSelectedContacts() {
    let contactInitials = document.getElementById('initialsContacts');
    contactInitials.innerHTML = "";
    let selectedContact = document.querySelectorAll('.dropdownContactBlueBG');
    selectedContact.forEach(contact => {
        let initials = contact.querySelector('.initials');
        if (initials) {
            contactInitials.appendChild(initials.cloneNode(true));
            contactInitials.classList.add('fontColorwhite');
        }
    })
}

function filterContacts(){
    let valueInput = document.getElementById('contactsDropdown').value.toUpperCase();
    let filteredContacts = contacts.filter(contact => contact.name.toUpperCase().includes(valueInput))
    if (filteredContacts.length > 0) {
        renderFilteredContact(filteredContacts)
    } else {
        document.getElementById('contacts').innerHTML = `
        <p class="noContact">Keinen Kontakt gefunden !</p>
        `;

    }
}

function renderFilteredContact(filteredContacts){
    let html = document.getElementById('contacts');
    html.innerHTML = "";
    for (let index = 0; index < filteredContacts.length; index++) {
        const element = filteredContacts[index];
        html.innerHTML += contactDropdownTemplate(element, index)
    }
}
