class Todo {
  constructor() {
    this.todoList = [];
    this.countActiveTasks = 0;
    this.tasks = document.getElementById("tasks");
    this.todoForm = document.getElementById("todo-form");
    this.todoInput = document.getElementById("todo-input");
    this.btnCompleteAllTasks = document.getElementById("todo-btn-check");
    this.btnClearCompletedTask = document.getElementById("clear-btn");

    this.btnAllTasks = document.getElementById("all-btn");
    this.btnOnlyActiveTasks = document.getElementById("active-btn");
    this.btnOnlyCompletedTasks = document.getElementById("completed-btn");

    this.subsribeEvents();
  }

  subsribeEvents() {
    this.todoForm.onsubmit = () => {
      this.addNewTask();
      this.toggleVisibleButtonAndMenu();
      this.showCounterActiveTasks();
      return false;
    };

    this.tasks.onchange = () => {
      this.checkCompletedTasks();
      this.showCounterActiveTasks();
    };

    this.tasks.onclick = (event) => {
      let target = event.target;
      if (target.nodeName == "BUTTON") {
        this.clearDeletedTask();
        this.toggleVisibleButtonAndMenu();
        this.showCounterActiveTasks();
      }
    };

    this.btnCompleteAllTasks.onclick = () => {
      this.checkAllTasks();
      this.checkCompletedTasks();
      this.showCounterActiveTasks();
    };

    this.btnClearCompletedTask.onclick = () => {
      this.clearCompletedTask();
      this.toggleVisibleButtonAndMenu();
    };

    this.btnAllTasks.onclick = () => {
      this.showAllTasks();
    };

    this.btnOnlyActiveTasks.onclick = () => {
      this.showOnlyActiveTasks();
    };

    this.btnOnlyCompletedTasks.onclick = () => {
      this.showOnlyCompletedTasks();
    };
  }

  addNewTask() {
    let textTask = this.todoInput.value;
    const task = new TodoTask(textTask);

    this.countActiveTasks++;
    this.todoList.push(task);
    this.todoInput.value = "";

    this.renderTasks(this.todoList);
  }

  renderTasks(tasksList) {
    this.tasks.innerHTML = "";
    tasksList.forEach((task) => {
      this.tasks.append(task.taskHtml);
    });
  }

  checkAllTasks() {
    if (this.countActiveTasks == 0) this.completeOrUncompleteAllTasks(false);
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
    this.countActiveTasks = 0;
    this.todoList.forEach((task) => {
      let blockTaskText = task.taskHtml.children[1];
      if (task.isCompleted) blockTaskText.classList.add("completed");
      else {
        this.countActiveTasks++;
        blockTaskText.classList.remove("completed");
      }
    });
  }

  clearCompletedTask() {
    let bufferList = [];

    this.todoList.forEach((task) => {
      if (!task.isCompleted) bufferList.push(task);
    });

    this.todoList = bufferList;
    this.renderTasks(this.todoList);
  }

  clearDeletedTask() {
    let bufferList = [];

    this.todoList.forEach((task) => {
      if (!task.isDeleted) bufferList.push(task);
      else if (!task.isCompleted) this.countActiveTasks--;
    });

    this.todoList = bufferList;
    this.renderTasks(this.todoList);
  }

  showAllTasks() {
    this.renderTasks(this.todoList);
  }

  showOnlyActiveTasks() {
    let bufferList = [];

    this.todoList.forEach((task) => {
      if (!task.isCompleted) bufferList.push(task);
    });

    this.renderTasks(bufferList);
  }

  showOnlyCompletedTasks() {
    let bufferList = [];

    this.todoList.forEach((task) => {
      if (task.isCompleted) bufferList.push(task);
    });

    this.renderTasks(bufferList);
  }

  showCounterActiveTasks() {
    const counter = document.getElementById("counter-tasks");
    counter.innerHTML = `${this.countActiveTasks} active tasks`;
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

      if (targetTask.classList.contains("task-checkbox-hide"))
        this.completeTask(targetTask);
      if (targetTask.classList.contains("task-btn-delete")) this.deleteTask();
    });
  }

  completeTask(targetTask) {
    if (targetTask.checked) this.isCompleted = true;
    else this.isCompleted = false;
  }

  deleteTask() {
    this.isDeleted = true;
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
