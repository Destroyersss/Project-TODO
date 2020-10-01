//Selectors 
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);




//Functions

function addTodo(event) {
	//Prevent form from sumbitting
	event.preventDefault();
	//ToDo DIV 
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');
	//Create LI 
	const newToDo = document.createElement('li');
	newToDo.innerText = todoInput.value;
	newToDo.classList.add('todo-item');
	todoDiv.appendChild(newToDo);
	//ADD TODO TO LOCALSTORAGE
	saveLocalTodos(todoInput.value);
	//CHECK MARK BUTTON
	const completedButton = document.createElement('button');
	completedButton.innerHTML = '<i class="fas fa-check"></i>';
	completedButton.classList.add('complete-btn');
	todoDiv.appendChild(completedButton);
	//CHECK MARK BUTTON
	const trashButton = document.createElement('button');
	trashButton.innerHTML = '<i class="fas fa-trash"></i>';
	trashButton.classList.add('trash-btn');
	todoDiv.appendChild(trashButton);
	//APPEND TO LIST 
	todoList.appendChild(todoDiv);
	//Clear Todo Value 
	todoInput.value = '';
}

function deleteCheck(e) {
	const item = e.target;
	//DELETE TODO 
	if (item.classList[0] === 'trash-btn') {
		const todo = item.parentElement;
		todo.remove();
	}


	//CHECK MARK 
	if (item.classList[0] === 'complete-btn') {
		const todo = item.parentElement;
		todo.classList.toggle('completed');
	}
}

function filterTodo(e) {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (e.target.value) {
			case "all":
				todo.style.display = 'flex';
				break;
			case "completed":
				if (todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
			case "uncompleted":
				if (!todo.classList.contains('completed')) {
					todo.style.display = 'flex';
				} else {
					todo.style.display = 'none';
				}
				break;
		}
	});
}

function saveLocalTodos(todo) {
	//CHECK
	let todos;
	if (localStorage.getItem('todos') === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem('todos'));
	}
	todos.push(todo);
	localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
	//CHECK
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function(todo){
		//ToDo DIV 
		const todoDiv = document.createElement('div');
		todoDiv.classList.add('todo');
		//Create LI 
		const newToDo = document.createElement('li');
		newToDo.innerText = todo;
		newToDo.classList.add('todo-item');
		todoDiv.appendChild(newToDo);
		//CHECK MARK BUTTON
		const completedButton = document.createElement('button');
		completedButton.innerHTML = '<i class="fas fa-check"></i>';
		completedButton.classList.add('complete-btn');
		todoDiv.appendChild(completedButton);
		//CHECK MARK BUTTON
		const trashButton = document.createElement('button');
		trashButton.innerHTML = '<i class="fas fa-trash"></i>';
		trashButton.classList.add('trash-btn');
		todoDiv.appendChild(trashButton);
		//APPEND TO LIST 
		todoList.appendChild(todoDiv);
	});
}