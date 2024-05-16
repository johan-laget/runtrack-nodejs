const fs = require('fs');

let data = JSON.parse(fs.readFileSync('./data.json', 'utf-8'));

function getAllTasks() {
  return data;
}

function addTask(title, description, completed) {
  const newTask = {
    id: data.length + 1,
    title: title,
    description: description,
    completed: completed || false
  };
  data.push(newTask);
  saveData();
  return newTask;
}

function updateTask(id, title, description, completed) {
  const taskIndex = data.findIndex(task => task.id === parseInt(id));
  if (taskIndex === -1) return null;
  data[taskIndex] = {
    id: parseInt(id),
    title: title || data[taskIndex].title,
    description: description || data[taskIndex].description,
    completed: completed || data[taskIndex].completed
  };
  saveData();
  return data[taskIndex];
}

function deleteTask(id) {
  data = data.filter(task => task.id !== parseInt(id));
  saveData();
}

function saveData() {
  fs.writeFileSync('./data.json', JSON.stringify(data));
}

module.exports = {
  getAllTasks,
  addTask,
  updateTask,
  deleteTask
};
