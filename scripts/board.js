let tasks = [
  {
    category: "user story",
    title: "Kochwelt Page & Recipe Recommender",
    dscr: "Build start page with recipe recommendation...",
    subtasks: [
      { id: 1, dscr: "build", done: true },
      { id: 2, dscr: "test", done: false },
      { id: 3, dscr: "deploy", done: false },
    ],
    contacts: [
      { name: "Max Meyer", firebaseID: "12345" },
      { name: "Tom Taler", firebaseID: "678910" },
      { name: "Susi Seger", firebaseID: "101113" },
    ],
    prio: "medium",
  },
  {
    category: "Technical Task",
    title: "CSS Architecture Planning",
    dscr: "Define CSS naming conventions and structure...",
    subtasks: [
      { id: 1, dscr: "build", done: true },
      { id: 2, dscr: "test", done: false },
    ],
    contacts: [
      { name: "Bernd Bürger", firebaseID: "12345" },
      { name: "Nils Fischer", firebaseID: "678910" },
    ],
    prio: "low",
  },
];

function openAddTaskOverlay() {
  document.getElementById("overlayAddTask").classList.remove("overlayClosed");
}

function closeAddTaskOverlay() {
  document.getElementById("overlayAddTask").classList.add("overlayClosed");
}

async function initBoard() {
  await initAddTask();
}
