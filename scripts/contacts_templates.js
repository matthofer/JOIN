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

function getRandomColor() {
  let randIndex = Math.floor(Math.random() * intialColors.length - 1);
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
  return ` <div class="singleContactContainer"> 
              <div class="singleContact" tabindex="0">
                    <div id="initial${i}" class="initials">${intials}</div>
                    <div class="nameAndMail">
                      <p class="name">${contacts[i].name}</p>
                      <p class="email">${contacts[i].email}</p>
                  </div>
              </div>
            </div>`;
}
