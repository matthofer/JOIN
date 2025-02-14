let categorys = ["Technical Task", "User Story", "Customer Support", "Bug Fix"];
let subtasks = [];
let selectedContacts = [];
let currentlyContacts = [];

async function initAddTask() {
    await loadContactsData();
    renderDropdownContacts();
    changePrio("medium", "mediumSVG");
    renderCategorys();
    submitSubtaskWithEnter();
}

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

function toggleDropdownContacts() {
    let dropdown = document.getElementById("contacts");
    if (dropdown.classList.contains("dropdown")) {
        closeDropDownContacts();
    } else {
        openDropdownContacts();
    }
}

function toggleDropdownCategorys() {
    let dropdown = document.getElementById("categorys");
    let inputImg = document.getElementById("categorysDropdown");
    dropdown.classList.toggle("dropdown");
    if (dropdown.classList.contains("dropdown")) {
        inputImg.style.backgroundImage =
            "url('../assets/icons/arrow_drop_down.svg')";
    } else {
        inputImg.style.backgroundImage =
            "url('../assets/icons/arrow_drop_down-down.svg')";
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
    let input = document.getElementById('contactsDropdown');
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
    let contacts = document.getElementById('contacts');
    let singleContact = contacts.querySelectorAll(".dropdownContactBlueBG");
    singleContact.forEach(
        contact => { contact.classList.remove('dropdownContactBlueBG'); }
    );
    let checkboxes = contacts.querySelectorAll("input[type='checkbox']");
    checkboxes.forEach(
        checkbox => { checkbox.checked = false }
    );
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
    let valueInput = document.getElementById("contactsDropdown").value.toUpperCase();
    let filteredContacts
    if (valueInput === "") {
        filteredContacts = contacts
    } else {
        filteredContacts = contacts.filter(contact =>
            contact.name.toUpperCase().includes(valueInput));
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

function changePrio(id, svg) {
    let buttons = ["urgent", "medium", "low"];
    let svgs = ["urgentSVG", "mediumSVG", "lowSVG"];
    buttons.forEach((btn) =>
        document.getElementById(btn).classList.remove("urgent", "medium", "low")
    );
    svgs.forEach((svgId) =>
        document
            .getElementById(svgId)
            .classList.remove("urgentSVG", "mediumSVG", "lowSVG")
    );
    let button = document.getElementById(id);
    let img = document.getElementById(svg);
    if (id == "urgent") {
        button.classList.add("urgent");
        img.classList.add("urgentSVG");
    } else if (id == "medium") {
        button.classList.add("medium");
        img.classList.add("mediumSVG");
    } else {
        button.classList.add("low");
        img.classList.add("lowSVG");
    }
}

function returnPrio() {
    let buttons = ["urgent", "medium", "low"];
    for (const btn of buttons) {
        if (document.getElementById(btn).classList.contains(btn)) {
            return btn;
        }
    }
}

function renderCategorys() {
    let html = document.getElementById("categorys");
    html.innerHTML = "";
    for (
        let categorysIndex = 0;
        categorysIndex < categorys.length;
        categorysIndex++
    ) {
        const category = categorys[categorysIndex];
        html.innerHTML += categorysDropdownTemplate(category, categorysIndex);
    }
}

function selectCategory(categorysIndex) {
    let categoryInput = document.getElementById("categorysDropdown");
    let category = document.getElementById(`category${categorysIndex}`).innerHTML;
    categoryInput.value = category;
    toggleDropdownCategorys();
}

function changeSubtasksIcons() {
    let input = document.getElementById("subtasks");
    let subtasksMenu = document.getElementById("subtasksMenu");
    if (input.value.length > 0) {
        input.style.backgroundImage = "none";
        subtasksMenu.classList.remove("d-none");
    } else {
        input.style.backgroundImage = "url(../assets/icons/subtasks.svg)";
        subtasksMenu.classList.add("d-none");
    }
}

function clearSubtasksInput() {
    let input = document.getElementById("subtasks");
    input.value = "";
    changeSubtasksIcons();
}

function saveSubtasks() {
    let input = document.getElementById("subtasks");
    let maessage = document.getElementById("subtaskValidation")
    if (input.value.length > 0) {
        maessage.classList.add('d-none')
        subtasks.push(input.value);
        input.value = "";
        renderSubtasks();
        changeSubtasksIcons();
    } else {
        maessage.classList.remove('d-none')
    }
}

function renderSubtasks() {
    let html = document.getElementById("renderedSubtasks");
    html.innerHTML = "";
    for (
        let subtasksIndex = 0;
        subtasksIndex < subtasks.length;
        subtasksIndex++
    ) {
        const subtask = subtasks[subtasksIndex];
        html.innerHTML += subtasksTemplate(subtask, subtasksIndex);
    }
}

function showSubtaskMenu(subtasksIndex) {
    let menu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
    menu.classList.remove("d-none");
}

function closeSubtaskMenu(subtasksIndex) {
    let menu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
    menu.classList.add("d-none");
}

function deleteSubtask(subtasksIndex) {
    subtasks.splice(subtasksIndex, 1);
    renderSubtasks();
}

function editSubtaskDBLClick(subtasksIndex) {
    let subTask = document.getElementById(`editSpan${subtasksIndex}`);
    subTask.setAttribute("contenteditable", "true");
    subTask.classList.toggle('cursor-text')
    editSubtaskWithEnter(subtasksIndex)
}

function editSubtask(subtasksIndex) {
    let subTask = document.getElementById(`singleSubtask${subtasksIndex}`);
    let span = document.getElementById(`editSpan${subtasksIndex}`);
    let editMenu = document.getElementById(`editMenu${subtasksIndex}`);
    let hoverMenu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
    subTask.classList.toggle("border");
    subTask.classList.toggle('cursor-text')
    span.classList.toggle("white");
    editMenu.classList.toggle("d-none");
    hoverMenu.classList.add("visibilty");
    editSubtaskDBLClick(subtasksIndex);
    editSubtaskWithEnter(subtasksIndex)
}

function saveEditedSubtask(subtasksIndex) {
    let hoverMenu = document.getElementById(`singleSubtaskMenu${subtasksIndex}`);
    let spanInput = document.getElementById(`editSpan${subtasksIndex}`).innerHTML;
    hoverMenu.classList.remove("visibilty");
    subtasks[subtasksIndex] = spanInput;
    renderSubtasks();
}

function submitSubtaskWithEnter() {
    let input = document.getElementById("subtasks");
    if (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                saveSubtasks();
            }
        });
    }
}


function editSubtaskWithEnter(subtasksIndex) {
    let input = document.getElementById(`editSpan${subtasksIndex}`);
    if (input) {
        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                saveEditedSubtask(subtasksIndex);
            }
        });
    }
}


function clearInput(id) {
    let input = document.getElementById(id);
    input.value = "";
    input.classList.remove("error");
    input.classList.remove("focus");
}

function clearForm() {
    selectedContacts = [];
    currentlyContacts = [];
    subtasks = [];
    clearInput("title");
    clearInput("description");
    clearInput("date");
    clearInput("categorysDropdown");
    changePrio("medium", "mediumSVG");
    renderSelectedContacts();
    clearContacts();
    clearSubtasksInput();
    renderSubtasks();
}

function validateInputFields(id, infoId) {
    let input = document.getElementById(id);
    let notice = document.getElementById(infoId);
    if (input.value.length > 0) {
        notice.classList.add("d-none");
        input.classList.add("focus");
        input.classList.remove("error");
    } else {
        notice.classList.remove("d-none");
        input.classList.add("error");
        input.classList.remove("focus");
    }
}

function getBlueBorder(id) {
    setTimeout(() => {
        let input = document.getElementById(id);
        if (input.value.length > 0) {
            input.classList.add("focus");
        } else {
            input.classList.remove("focus");
        }
    }, 100);
}

function collectData() {
    let title = document.getElementById("title").value;
    let description = document.getElementById("description").value;
    let date = document.getElementById("date").value;
    let category = document.getElementById("categorysDropdown").value;
    let prio = returnPrio();
    let type = "todo";
    let data = {
        title: title,
        description: description,
        date: date,
        category: category,
        prio: prio,
        assignTo: getContactsForFB(),
        subtasks: subtasks,
        type: type,
    };
    return data;
}

function getContactsForFB() {
    let contacts = {};
    for (let i = 0; i < selectedContacts.length; i++) {
        contacts[selectedContacts[i].firebaseid] = {
            name: selectedContacts[i].name,
            email: selectedContacts[i].email,
            phone: selectedContacts[i].phone,
            color: selectedContacts[i].color,
        };
    }
    return contacts;
}

function showToast() {
    let toast = document.getElementById('toastMSG');
    toast.classList.remove('animateToast')
    setTimeout(() => {
        window.location = './board.html'
    }, 1000);
}

async function submitForm() {
    let title = document.getElementById("title").value.length;
    let date = document.getElementById("date").value.length;
    let category = document.getElementById("categorysDropdown").value.length;
    let data = collectData();
    if (title > 0 && date > 0 && category > 0) {
        validateInputFields("title", "titleValidation");
        validateInputFields("date", "dateValidation");
        validateInputFields("categorysDropdown", "categoryValidation");
        // await postData("tasks/", data);
        clearForm();
        showToast()
    } else {
        validateInputFields("title", "titleValidation");
        validateInputFields("date", "dateValidation");
        validateInputFields("categorysDropdown", "categoryValidation");
    }
}
