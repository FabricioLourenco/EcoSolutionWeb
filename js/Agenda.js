function openTask(title, time) {
    document.getElementById('taskTitle').value = title;
    document.getElementById('taskTime').value = time;
}

function saveTask() {
    const title = document.getElementById('taskTitle').value;
    const time = document.getElementById('taskTime').value;
    alert(`Tarefa '${title}' salva para o horário ${time}!`);
}

function deleteTask() {
    const title = document.getElementById('taskTitle').value;
    alert(`Tarefa '${title}' excluída!`);
}
