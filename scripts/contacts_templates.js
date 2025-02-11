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
                <div id="mobileInitial${i}" class="intialMobile">${initials}</div>
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

function getEditButtonsTemplate(i) {
  return `  <div onclick="deleteContactInMobileEditMode(${i}, event)" class="overLayButton delete">
                <p>Delete</p>
            </div>
            <div onclick="editContact(${i})" class="overLayButton save">
                <p>Save</p>
                <img src="./assets/icons/check.svg" />
            </div>`;
}

function getIntialsTemplate(i, initials) {
  return `<div id="editInitial${i}" class="intialBig">${initials}</div>`;
}
