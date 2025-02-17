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

async function getAmountofTask(id , type) {
    let html = document.getElementById(id);
    let count = 0;

    try {
        let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
        let taskResponseAsJson = await taskResponse.json();
        let allTasks = Object.values(taskResponseAsJson);
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            if (task.type === type ) {
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
    let count = 0;

    try {
        let taskResponse = await fetch(FB_URL + "/tasks" + ".json");
        let taskResponseAsJson = await taskResponse.json();
        let allTasks = Object.values(taskResponseAsJson);
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            if (task.prio === "urgent" ) {
                count++;
            }
        }
        html.innerHTML = count;

    } catch (error) {
        console.error("Ups, u need to exercise for this stuff bra!", error);
    }
}