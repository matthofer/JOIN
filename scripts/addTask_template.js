function contactDropdownTemplate(contact, contactIndex) {
    return `
        <div class="dropDownContact" onclick="markCheckbox(${contactIndex})" id="contact${contactIndex}">
            <div class="dropDownLeft">
                <div class="initials" style="background-color: ${contact.color};">${getIntialsOfContact(contact.name)}</div>
                <div class="contactName">${contact.name}</div>
            </div>
                <input type="checkbox" name="checkbox" id="checkbox${contactIndex}">
                <label for="checkbox${contactIndex}"></label>
             </div>
    `;
}

function categorysDropdownTemplate(categorys, categorysIndex) {
    return `
    <div onclick="selectCategory(${categorysIndex})" class="singleCategory">
        <span id="category${categorysIndex}">${categorys}</span>
    </div>
    `;
}

function subtasksTemplate(subtask, subtasksIndex) {
    return `
    <div class="singleSubtask" id="singleSubtask${subtasksIndex}">
        <div class="dot"></div>
        <span>${subtask}</span>
    </div>
    `;
}