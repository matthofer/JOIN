let selectedContacts = [
  {
    firebaseid: "-OIjeNx3DpdsJCvfd96h",
    name: "Annika Wiegand",
    email: "annika.wiegand@web.de",
    phone: "+49123456789",
    color: "#FC71FF",
  },
  {
    firebaseid: "-OIb9lItgaRVmtaF5vmI",
    name: "Bernd Hagermann",
    email: "bernd.hagermann@yahoo.de",
    phone: "+491747572123",
    color: "#1FD7C1",
  },
  {
    firebaseid: "-OIbDGQ03PAmcond47y9",
    name: "Carolin Baumann",
    email: "carolin.baumann@gmail.com",
    phone: "+491728899347",
    color: "#462F8A",
  },
];

function getContactsForFB() {
  let contacts = {};
  for (let i = 0; i < selectedContacts.length; i++) {
    contacts[`${selectedContacts[i].firebaseid}`] = {
      name: selectedContacts[i].name,
      email: selectedContacts[i].email,
      phone: selectedContacts[i].phone,
      color: selectedContacts[i].color,
    };
  }
  return contacts;
}
