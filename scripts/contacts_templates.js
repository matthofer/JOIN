let intialColors = [
  "#9327FF",
  "#6E52FF",
  "#FC71FF",
  "#FFBB2B",
  "#1FD7C1",
  "#FF7A00",
  "#462F8A",
  "#00BEE8",
];

function getRandomIntialColor() {
  let randIndex = Math.floor(Math.random() * intialColors.length);
  let randomColor = intialColors[randIndex];
  return randomColor;
}

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
                  <p class="detailEmail">${contacts[i].email}</p>
                  <p class="detailheader">Phone</p>
                  <p>${contacts[i].phone}</p>
                </div>`;
}

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
                <div id="mobileInitial${i}" class="intialBig">${initials}</div>
                <h2>${contacts[i].name}</h2>
              </div>
              <h3>Contact Information</h3>
              <div class="contactDetails">
                <p class="detailheader">Email</p>
                <p class="detailEmail">${contacts[i].email}</p>
                <p class="detailheader">Phone</p>
                <p>${contacts[i].phone}</p>
              </div>
            </div>
            <div id="mobileEditButton" class="respContactBtnContainer respBtnclosed">
              <div class="editDeleteBtn">
                <img class="svg" src="./assets/icons/edit_contact.svg" />
                <p>Edit</p>
              </div>
              <div class="editDeleteBtn">
                <img class="svg" src="./assets/icons/delete_contact.svg" />
                <p>Delete</p>
              </div>
            </div>
            <div onclick="openMobileEditButton()" class="respEditButton">
              <img src="./assets/icons/more_vert.svg" />
            </div>`;
}

function getAddContactDesktopContent() {
  return `<div class="overlayContent">
          <div class="overlayLeftHalf">
            <div class="overlaytext">
              <img src="./assets/icons/logo.svg" />
              <h2>Add contact</h2>
              <h3>Tasks are better with a team!</h3>
              <div class="respDivider"></div>
            </div>
          </div>
          <div class="overlayRightHalf">
            <div class="overlayHead">
              <img onclick="closeOverlay()" src="./assets/icons/close.svg" />
            </div>
            <div class="inputWrapper">
              <div class="personIcon">
                <img src="./assets/icons/person_white.svg" />
              </div>
              <div class="inputAndButtons">
                <div class="inputContainer">
                  <input id="contactName" type="text" placeholder="Name" />
                  <img src="./assets/icons/person.svg" class="icon">
                </div>
                <div class="inputContainer">
                  <input id="contactMail" type="text" placeholder="Email" />
                  <img src="./assets/icons/mail.svg" class="icon">
                </div>
                <div class="inputContainer">
                  <input id="contactPhone" type="text" placeholder="Phone" />
                  <img src="./assets/icons/call.svg" class="icon">
                </div>
                <div class="overLayButtonWrapper">
                  <div onclick="closeOverlay()" class="overLayButton cancel">
                    <p>Cancel</p>
                    <img src="./assets/icons/close.svg" alt="" />
                  </div>
                  <div onclick="createNewContact()" class="overLayButton create">
                    <p>Create contact</p>
                    <img src="./assets/icons/check.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div id="validationErrorMessage"></div>
          </div>
        </div>`;
}

function getEditContactDesktopContent(i, initials) {
  return `<div class="overlayContent">
          <div class="overlayLeftHalf">
            <div class="overlaytext">
              <img src="./assets/icons/logo.svg" />
              <h2>Edit contact</h2>
              <div class="respDivider"></div>
            </div>
          </div>
          <div class="overlayRightHalf">
            <div class="overlayHead">
              <img onclick="closeOverlay()" src="./assets/icons/close.svg" />
            </div>
            <div class="inputWrapper">
              <div class="personIcon">
                <div id="editInitial${i}" class="intialBig">${initials}</div>
              </div>
              <div class="inputAndButtons">
                <div class="inputContainer">
                  <input id="contactName" type="text" placeholder="Name" />
                  <img src="./assets/icons/person.svg" class="icon">
                </div>
                <div class="inputContainer">
                  <input id="contactMail" type="text" placeholder="Email" />
                  <img src="./assets/icons/mail.svg" class="icon">
                </div>
                <div class="inputContainer">
                  <input id="contactPhone" type="text" placeholder="Phone" />
                  <img src="./assets/icons/call.svg" class="icon">
                </div>
                <div class="overLayButtonWrapper">
                  <div onclick="deleteContactInEditMode(${i})" class="overLayButton cancel">
                    <p>Delete</p>
                    <img src="./assets/icons/close.svg" alt="" />
                  </div>
                  <div onclick="editContact(${i})" class="overLayButton create">
                    <p>Save</p>
                    <img src="./assets/icons/check.svg" />
                  </div>
                </div>
              </div>
            </div>
            <div id="validationErrorMessage"></div>
          </div>
        </div>`;
}

function getAddContactMobileContent() {
  return `<div class="overlayContent">
          <div class="topHalf">
          <div onclick="closeOverlay()" class="closeButton">
              <img src="./assets/icons/close_white.svg" />
          </div>
            <div class="overlaytext">
              <h2>Add contact</h2>
              <h3>Tasks are better with a team!</h3>
              <div class="respDivider"></div>
            </div>
          </div>
          <div class="bottomHalf">
            <div class="inputAndButtons">
              <div class="inputContainer">
                <input id="contactName" type="text" placeholder="Name" />
                <img src="./assets/icons/person.svg" class="icon" />
              </div>
              <div class="inputContainer">
                <input id="contactMail" type="text" placeholder="Email" />
                <img src="./assets/icons/mail.svg" class="icon" />
              </div>
              <div class="inputContainer">
                <input id="contactPhone" type="text" placeholder="Phone" />
                <img src="./assets/icons/call.svg" class="icon" />
              </div>
              <div class="overLayButtonWrapper">
                <div onclick="createNewContact()" class="overLayButton create">
                  <p>Create contact</p>
                  <img src="./assets/icons/check.svg" />
                </div>
              </div>
              <div id="validationErrorMessage"></div>
            </div>
          </div>
          <div class="personIcon">
            <img src="./assets/icons/person_white.svg" />
          </div>
        </div>`;
}
