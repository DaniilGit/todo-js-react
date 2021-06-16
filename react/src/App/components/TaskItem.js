import React, { forwardRef, useContext, useEffect, useState } from "react";
import Context from "./Context";
import "../styles/todo-task.css";

function TaskItem(props) {
  const { todoData, setTodoData } = useContext(Context);
  const [isCompleted, setCompleteTask] = useState(props.isCompleted);

  // Change status checkbox if task completed
  useEffect(() => { 
    const checkbox = document.getElementById(props.id);
    checkbox.checked = isCompleted;
  });

  const changeCountActiveTasks = function () {
    let count = 0;
    if (isCompleted) count = todoData.countActiveTasks + 1;
    else count = todoData.countActiveTasks - 1;

    setTodoData({ ...todoData, countActiveTasks: count });
  };

  const completeTaskStyle = function () {
    if (isCompleted) return "task-text completed";
    else return "task-text";
  };

  const deleleTask = function () {
    let taskList = todoData.taskList;
    let newTaskList = taskList.filter((task) => task.props.id != props.id);
    let count = todoData.countActiveTasks;

    if (!isCompleted) count--;

    setTodoData({
      taskList: newTaskList,
      renderingTasks: newTaskList,
      countActiveTasks: count,
    });
  };

  return (
    <div className="todo-task">
      <div>
        <input
          id={props.id}
          className="task-checkbox-hide"
          type="checkbox"
          onClick={() => {
            setCompleteTask(!isCompleted);
            changeCountActiveTasks();
          }}
        ></input>
        <label className="task-checkbox" htmlFor={props.id}></label>
      </div>
      <div className={completeTaskStyle()}>{props.taskText}</div>
      <button className="task-btn-delete" onClick={deleleTask}>
        &#10006;
      </button>
    </div>
  );
}

export default TaskItem;
