const checkbox = document.getElementById("customCheckbox");
const uncheckedIcon = document.querySelector(".unchecked");
const checkedIcon = document.querySelector(".checked");

checkbox.addEventListener("change", () => {
  if (checkbox.checked) {
    uncheckedIcon.style.display = "none";
    checkedIcon.style.display = "inline-block";
  } else {
    checkedIcon.style.display = "none";
    uncheckedIcon.style.display = "inline-block";
  }
});
