let FB_URL = "https://join-427-default-rtdb.europe-west1.firebasedatabase.app/";


async function init() {
    initLoad();
    await getAmountofAllTasks();
    getAmountofUrgent();
    await getAmountofTask('toDo', 'todo');
    await getAmountofTask('amountProgress', 'inProgress');
    await getAmountofTask('feedback', 'awaitFeedback');
    await getAmountofTask('done', 'done');

}

async function getAmountofAllTasks() {
    let tasks = document.getElementById('totalTasks')
    try {
        let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
        let taskResponseAsJson = await taskResponse.json();
        let allTasks = Object.entries(taskResponseAsJson);
        tasks.innerHTML = allTasks.length;
    } catch (error) {
        console.error("Ups, u need to exercise for this stuff bra!", error);
    }
}

async function getAmountofTask(id, type) {
    let html = document.getElementById(id);
    let count = 0;

    try {
        let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
        let taskResponseAsJson = await taskResponse.json();
        let allTasks = Object.values(taskResponseAsJson);
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            if (task.type === type) {
                count++;
            }
        }
        html.innerHTML = count;

    } catch (error) {
        console.error("Ups, u need to exercise for this stuff bra!", error);
    }
}

async function getAmountofUrgent() {
    let html = document.getElementById('urgent');
    let date = document.getElementById('deadline');
    let earliestUrgentDate = null;
    let count = 0;
    try {
        let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
        let taskResponseAsJson = await taskResponse.json();
        let allTasks = Object.values(taskResponseAsJson);
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            if (task.prio === "urgent") {
                count++;
                let currentTaskDate = new Date(task.date);
                let today = new Date();
                if (currentTaskDate >= today) {
                    if (!earliestUrgentDate || new Date(task.date) < new Date(earliestUrgentDate)) {
                        earliestUrgentDate = task.date;
                    }
                }
            }
        }
        html.innerHTML = count;
        if (earliestUrgentDate) {
            date.innerHTML = formatDate(earliestUrgentDate);
        }
    } catch (error) {
        console.error("Ups, u need to exercise for this stuff bra!", error);
    }
}


function formatDate(dateString) {
    const date = new Date(dateString);
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    // z.B. "March 4, 2025"
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}