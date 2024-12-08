const fs = require('fs');
const filename = "./tasks.json";

const loadTask = () => {
    try {
        const data = fs.readFileSync(filename);
        const dataJSON = data.toString();
        return JSON.parse(dataJSON);
    } catch (error) {
        return [];
    }
}

const saveTask = (tasks) => {
    fs.writeFileSync(filename, JSON.stringify(tasks, null, 2));
}

const addTask = (argument) => {
    const tasks = loadTask();
    tasks.push({ argument });
    saveTask(tasks);
    console.log("Task added: " + argument);
}

const listTask = () => {
    const tasks = loadTask();
    tasks.forEach((task, index) => console.log(`${index + 1}: ${task.argument}`));
}

const removeTask = (index) => {
    const tasks = loadTask();
    const taskIndex = Number(index) - 1;

    if (taskIndex >= 0 && taskIndex < tasks.length) {
        tasks.splice(taskIndex, 1);
        saveTask(tasks);
        console.log(`Task ${index} removed.`);
    } else {
        console.log("Invalid task index.");
    }
}

const command = process.argv[2];
const argument = process.argv[3];

if (command === "add") {
    addTask(argument);
} else if (command === "list") {
    listTask();
} else if (command === "remove") {
    removeTask(argument);
} else {
    console.log("Unknown command");
}
