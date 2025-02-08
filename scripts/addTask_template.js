function contactDropdownTemplate(contact, i){
    return`
        <div class="dropDownContact" onclick="markCheckbox(${i})" id="contact${i}">
            <div class="dropDownLeft">
                <div class="initials" style="background-color: ${contact.color};">${getIntialsOfContact(contact.name)}</div>
                <div class="contactName">${contact.name}</div>
            </div>
                <input type="checkbox" name="checkbox" id="checkbox${i}">
             </div>
    `;
}