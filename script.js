// MyCutePlanner - script with localStorage, edit, delete, reminders
}


function deleteTask(btn) {
const li = btn.closest('li');
const text = li.querySelector('.task-text').innerText;
li.remove();
let tasks = JSON.parse(localStorage.getItem('cuteTasks')) || [];
tasks = tasks.filter(t => t.text !== text);
localStorage.setItem('cuteTasks', JSON.stringify(tasks));
}


function toggleDone(span) {
const li = span.closest('li');
li.classList.toggle('done');
const text = span.innerText;
let tasks = JSON.parse(localStorage.getItem('cuteTasks')) || [];
tasks = tasks.map(t => { if (t.text === text) t.done = !t.done; return t; });
localStorage.setItem('cuteTasks', JSON.stringify(tasks));
}


function editTask(btn) {
const li = btn.closest('li');
const span = li.querySelector('.task-text');
const oldText = span.innerText;
const newText = prompt('Edit your cute task 💕', oldText);
if (newText && newText.trim() !== '') {
span.innerText = newText.trim();
let tasks = JSON.parse(localStorage.getItem('cuteTasks')) || [];
tasks = tasks.map(t => { if (t.text === oldText) t.text = newText.trim(); return t; });
localStorage.setItem('cuteTasks', JSON.stringify(tasks));
}
}


function setReminder(taskText, reminderValue) {
const reminderDate = new Date(reminderValue);
const now = new Date();
const ms = reminderDate.getTime() - now.getTime();
if (ms > 0) {
setTimeout(() => {
const sound = document.getElementById('reminderSound');
if (sound) sound.play();
alert(`Reminder: ${taskText} 💕`);
}, ms);
}
}


function scheduleExistingReminders() {
const tasks = JSON.parse(localStorage.getItem('cuteTasks')) || [];
tasks.forEach(t => { if (t.reminder) setReminder(t.text, t.reminder); });
}


function escapeHtml(text) {
return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
