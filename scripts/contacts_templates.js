/**
 * This function returns the header element in the contact list with the letter inside
 * @param {string} firstLetter - firstletter of a contact
 */
function getContactHeaderTemplate(firstLetter) {
  return `  <div class="contactGroup">
                  <div class="firstLetterContainer">
                    <h3>${firstLetter}</h3>
                  </div>
                  <div class="dividerContainer">
                  <div class="dividerContactGroups"></div>
                  </div>
                  <div id="${firstLetter.toLowerCase()}"></div>
              </div>`;
}

/**
 * This function returns html template for a contact list element
 * @param {number} i - index of the element in contact array
 * @param {string} initials - intials of the contact
 */
function getSingleContactTemplate(i, intials) {
  return ` <div id="singleContact${i}" onclick="openDetails(${i}, 'singleContact${i}')" class="singleContactContainer"> 
              <div class="singleContact" tabindex="0">
                    <div id="initial${i}" class="initials">${intials}</div>
                    <div class="nameAndMail">
                      <p class="name">${contacts[i].name}</p>
                      <p class="email">${contacts[i].email}</p>
                  </div>
              </div>
            </div>`;
}

/**
 * This function returns html template for a contact info view
 *
 * @param {number} i - index of the element in contact array
 * @param {string} initials - intials of the contact
 */
function getContactInfoTemplateDesktop(i, initials) {
  return `<div class="general">
                  <div id="bigInitial${i}" class="intialBig">${initials}</div>
                  <div class="nameAndButtons">
                    <h2>${contacts[i].name}</h2>
                    <div class="editDeleteBtnContainer">
                      <div onclick="openEditContactOverlay(${i})" class="editDeleteBtn">
                        <img
                          class="svg"
                          src="./assets/icons/edit_contact.svg"
                        />
                        <p>Edit</p>
                      </div>
                      <div onclick="deleteContact(${i})" class="editDeleteBtn">
                        <img
                          class="svg"
                          src="./assets/icons/delete_contact.svg"
                        />
                        <p>Delete</p>
                      </div>
                    </div>
                  </div>
                </div>
                <h3>Contact Information</h3>
                <div class="contactDetails">
                  <p class="detailheader">Email</p>
                  <a href="mailto:${contacts[i].email}" class="detailEmail">${contacts[i].email}</a>
                  <p class="detailheader">Phone</p>
                  <p>${contacts[i].phone}</p>
                </div>`;
}

/**
 * This function returns html template for a contact info view in mobile
 *
 * @param {number} i - index of the element in contact array
 * @param {string} initials - intials of the contact
 */
function getContactInfoTemplateMobile(i, initials) {
  return `<div class="respDetailHeader">
              <div class="respDetailHeadText">
                <h1>Contacts</h1>
                <h3>Better with a team</h3>
                <div class="respDivider"></div>
              </div>
              <img
                onclick="closeMobileInfo()"
                class="backFromDetail"
                src="./assets/icons/arrow-left-line.svg"
              />
            </div>
            <div class="respInfo">
              <div class="general">
                <div id="mobileInitial${i}" class="intialMobile">${initials}</div>
                <h2>${contacts[i].name}</h2>
              </div>
              <h3>Contact Information</h3>
              <div class="contactDetails">
                <p class="detailheader">Email</p>
                <a href="mailto:${contacts[i].email}" class="detailEmail">${contacts[i].email}</a>
                <p class="detailheader">Phone</p>
                <p>${contacts[i].phone}</p>
              </div>
            </div>
            <div id="mobileEditButton" class="respContactBtnContainer respBtnclosed">
              <div onclick="openEditContactOverlay(${i})" class="editDeleteBtn">
                <img class="svg" src="./assets/icons/edit_contact.svg" />
                <p>Edit</p>
              </div>
              <div onclick="deleteContactInMobileInfo(${i}, event)" class="editDeleteBtn">
                <img class="svg" src="./assets/icons/delete_contact.svg" />
                <p>Delete</p>
              </div>
            </div>
            <div onclick="openMobileEditButton()" class="respEditButton">
              <img src="./assets/icons/more_vert.svg" />
            </div>`;
}

/**
 * This function returns html template for the buttons in contact info view
 *
 * @param {number} i - index of the element in contact array
 *
 */
function getEditButtonsTemplate(i) {
  return `  <div onclick="deleteContactInMobileEditMode(${i}, event)" class="overLayButton delete">
                <p>Delete</p>
            </div>
            <div onclick="editContact(${i})" class="overLayButton save">
                <p>Save</p>
                <img src="./assets/icons/check.svg" />
            </div>`;
}

/**
 * This function returns html template for the intials of a contact
 *
 * @param {number} i - index of the element in contact array
 * @param {string} initials - intials of the contact
 */
function getIntialsTemplate(i, initials) {
  return `<div id="editInitial${i}" class="intialBig">${initials}</div>`;
}
