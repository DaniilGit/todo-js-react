class Todo {
  constructor() {
    this.todoList = [];
    this.counterActiveTasks = 0;
    this.tasks = document.getElementById("tasks");
    this.todoForm = document.getElementById("todo-form");
    this.todoInput = document.getElementById("todo-input");
    this.btnCompleteAllTasks = document.getElementById("todo-btn-check");
    this.btnClearCompletedTask = document.getElementById("clear-btn");

    this.subsribeEvents();
  }

  subsribeEvents() {
    this.todoForm.onsubmit = () => {
      this.addNewTask();
      this.checkNumberTasks();
      return false;
    };

    this.tasks.onchange = () => {
      this.checkCompletedTasks();
    };

    this.tasks.onclick = () => {
      this.clearDeletedTasks();
      this.checkNumberTasks();
    };

    this.btnCompleteAllTasks.onclick = () => {
      this.checkedAllTasks();
      this.checkCompletedTasks();
    };

    this.btnClearCompletedTask.onclick = () => {
      this.clearCompletedTask();
      this.checkNumberTasks();
    }
  }

  addNewTask() {
    let textTask = this.todoInput.value;
    const task = new TodoTask(textTask);

    this.counterActiveTasks++;
    this.todoList.push(task);
    this.todoInput.value = "";

    this.renderTasks();
  }

  renderTasks() {
    this.todoList.forEach((task) => {
      this.tasks.append(task.taskHtml)
    })
  }

  checkNumberTasks() {
    this.toggleVisibleButtonAndMenu();

    if (this.todoList.length) {
    } else {
    }
  }

  checkedAllTasks() {
    if (this.counterActiveTasks == 0) this.completeOrUncompleteAllTasks(false);
    else this.completeOrUncompleteAllTasks(true);
  }

  completeOrUncompleteAllTasks(flagCompletedTask) {
    this.todoList.forEach((task) => {
      let checkboxTask = task.taskHtml.children[0].children[0];
      checkboxTask.checked = flagCompletedTask;
      task.completeTask(checkboxTask);
    });
  }

  checkCompletedTasks() {
    this.counterActiveTasks = 0;
    this.todoList.forEach((task) => {
      let blockTaskText = task.taskHtml.children[1];
      if (task.isCompleted) blockTaskText.classList.add("completed");
      else {
        this.counterActiveTasks++;
        blockTaskText.classList.remove("completed");
      }
    });
  }

  clearCompletedTask() {
    let bufferList = [];
    this.counterActiveTasks = 0;

    this.todoList.forEach((task) => {
      if (!task.isCompleted) {
        bufferList.push(task)
        this.counterActiveTasks++;
      }
    });

    this.todoList = bufferList;
    this.tasks.innerHTML = ''
    this.renderTasks();
  }

  clearDeletedTasks() {
    let bufferList = [];

    this.todoList.forEach((task) => {
      if (!task.isDeleted) {
        bufferList.push(task)
        if (!task.isCompleted) this.counterActiveTasks--;
      }
    });

    this.todoList = bufferList;
    this.tasks.innerHTML = ''
    this.renderTasks();
  }

  toggleVisibleButtonAndMenu() {
    const [todoBtnCheck, footerMenu] = [
      document.getElementById("todo-btn-check"),
      document.getElementById("footer-menu"),
    ];

    if (this.todoList.length) {
      todoBtnCheck.classList.remove("hide");
      footerMenu.classList.remove("hide");
    } else {
      todoBtnCheck.classList.add("hide");
      footerMenu.classList.add("hide");
    }
  }
}

class TodoTask {
  constructor(text) {
    this.taskText = text;
    this.isCompleted = false;
    this.isDeleted = false;

    this.taskHtml = document.createElement("div");
    this.taskHtml.classList.add("todo-task");
    this.taskHtml.innerHTML = this.setHtmlPattern();

    this.subsribeEvents();
  }

  subsribeEvents() {
    this.taskHtml.addEventListener("click", (event) => {
      let targetTask = event.target;

      if (targetTask.classList.contains("task-checkbox-hide")) {
        this.completeTask(targetTask);
      }
      if (targetTask.classList.contains("task-btn-delete")) {
        this.deleteTask();
      }
    });
  }

  completeTask(targetTask) {
    if (targetTask.checked) this.isCompleted = true;
    else this.isCompleted = false;
  }

  deleteTask() {
    this.isDeleted = true
  }

  setHtmlPattern() {
    let id = this.taskText + Math.random();
    return `
      <div>
        <input id="${id}" class="task-checkbox-hide" type="checkbox"></input>
        <label class="task-checkbox" for="${id}"></label>
      </div>
      <div class="task-text">${this.taskText}</div>
      <button class="task-btn-delete">&#10006;</button>
    `;
  }
}

const todo = new Todo();
