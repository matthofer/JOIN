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
