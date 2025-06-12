document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Charger les tâches existantes depuis le stockage local
    loadTasks();

    // Fonction pour ajouter une tâche (avec option de sauvegarde)
    function addTask(taskText, save = true) {
        // Valider l'entrée utilisateur si la fonction est appelée sans paramètre
        if (!taskText) {
            taskText = taskInput.value.trim();
            if (taskText === '') {
                alert('Please enter a task.');
                return;
            }
        }

        // Créer un élément li
        const li = document.createElement('li');
        li.textContent = taskText;

        // Créer le bouton de suppression
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Événement de suppression
        removeBtn.addEventListener('click', function () {
            taskList.removeChild(li);
            removeTaskFromStorage(taskText);
        });

        // Ajouter le bouton au li, et le li à la liste
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Sauvegarder dans Local Storage si nécessaire
        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        // Réinitialiser le champ de saisie
        taskInput.value = '';
    }

    // Charger les tâches depuis le Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false));
    }

    // Supprimer une tâche du Local Storage
    function removeTaskFromStorage(taskText) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const updatedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    }

    // Écouteur sur le bouton d'ajout
    addButton.addEventListener('click', function () {
        addTask();
    });

    // Écouteur pour la touche "Entrée"
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});

