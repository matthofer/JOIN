let categorys = ["Technical Task", "User Story", "Customer Support", "Bug Fix"]

async function initAddTask() {
    await loadContactsData();
    renderDropdownContacts();

}

function toggleDropdown(id) {
    let dropdown = document.getElementById(id);
    dropdown.classList.toggle('dropdown');
}

function renderDropdownContacts() {
    let html = document.getElementById('contacts');
    for (let i = 0; i < contacts.length; i++) {
        const singleContact = contacts[i];
        html.innerHTML += contactDropdownTemplate(singleContact, i)
    }
}

function markCheckbox(i) {
    let checkbox = document.getElementById(`checkbox${i}`);
    let contact = document.getElementById(`contact${i}`)
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

