class Todo {
  constructor() {
    this.todoList = [];
    this.todoForm = document.getElementById("todo-form");
    this.todoInput = document.getElementById("todo-input");
    this.todoBtnCheckAll = document.getElementById("todo-btn-check");

    this.todoForm.onsubmit = () => {
      this.addNewTask();
      return false;
    };
  }

  addNewTask() {
    let textTask = this.todoInput.value;
    const task = new TodoTask(textTask);
    this.todoList.push(task)
    this.todoForm.append(task.task);

    console.log(this.todoList);
  }

  clearCompletedTask() {}
}

class TodoTask {
  constructor(text) {
    this.taskText = text;
    this.isCompleted = false;
    this.task = document.createElement("div");

    this.task.classList.add("todo-task");
    this.task.innerHTML = `
      <input class="task-check" type="checkbox"></input>
      <div class="task-text">${this.taskText}</div>
      <button class="task-btn-delete">X</button>
    `;
  }

  completeTask() {}
  deleteTask() {}
}

const todo = new Todo();
