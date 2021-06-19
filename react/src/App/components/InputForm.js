import React, { createRef, useContext, useEffect, useState } from "react";
import Context from "./Context";
import TaskItem from "./TaskItem";

function InputForm() {
  const [taskText, setTaskText] = useState("");
  const { todoData, setTodoData } = useContext(Context);

  const addNewTask = function (event) {
    let count = todoData.countActiveTasks + 1;
    let id = Math.random();
    let newTask = (
      <TaskItem taskText={taskText} complete={false} key={id} id={id} />
    );

    setTodoData({
      taskList: [...todoData.taskList, newTask],
      renderingTasks: [...todoData.taskList, newTask],
      countActiveTasks: count,
    });

    event.preventDefault();
  };

  const completeAndUncompleteAllTasks = function () {
    let tasks = todoData.taskList;
    let count = todoData.countActiveTasks;

    let completedTasks = tasks.map((task) => {
      if (todoData.countActiveTasks != 0) {
        count = 0;
        return React.cloneElement(task, {
          complete: true,
          key: Math.random(),
        });
      } else {
        count = todoData.taskList.length;
        return React.cloneElement(task, {
          complete: false,
          key: Math.random(),
        });
      }
    });

    setTodoData({
      taskList: completedTasks,
      renderingTasks: completedTasks,
      countActiveTasks: count,
    });
  };

  const getInputValue = function (event) {
    setTaskText(event.target.value);
  };

  const buttonFormStyles = function () {
    if (todoData.taskList.length != 0) return "todo-btn";
    else return "todo-btn hide";
  };

  return (
    <form className="todo-list" id="todo-form" onSubmit={addNewTask}>
      <label
        id="todo-btn-check"
        className={buttonFormStyles()}
        onClick={completeAndUncompleteAllTasks}
      ></label>
      <input
        className="todo-input"
        type="text"
        placeholder="What needs to be done?"
        onChange={getInputValue}
      ></input>
    </form>
  );
}

export default InputForm;
