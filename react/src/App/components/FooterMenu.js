import React, { useContext } from "react";
import "../styles/todo.css";
import Context from "./Context";

function FooterMenu() {
  const { todoData, setTodoData } = useContext(Context);
  let tasks = todoData.taskList;

  const clearCompletedTasks = function () {
    let activeTasks = tasks.filter((task) => {
      let taskCheckbox = document.getElementById(task.props.id);
      let isCompleted = taskCheckbox.dataset.completed;

      if (isCompleted === "true") return false;
      else return true;
    });

    setTodoData({
      ...todoData,
      taskList: activeTasks,
      renderingTasks: activeTasks,
    });
  };

  return (
    <div className="footer-menu">
      <span className="counter-tasks">
        {todoData.countActiveTasks} active tasks
      </span>
      <button className="clear-btn" onClick={clearCompletedTasks}>
        Clear completed
      </button>
    </div>
  );
}

export default FooterMenu;
