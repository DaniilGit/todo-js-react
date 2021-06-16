import React, { useState } from "react";
import InputForm from "./InputForm";
import Tasks from "./Tasks";
import FooterMenu from "./FooterMenu";
import Context from "./Context";
import "../styles/todo.css";

function Todo() {
  const [todoData, setTodoData] = useState({
    taskList: [],
    renderingTasks: [],
    countActiveTasks: 0,
  });

  return (
    <Context.Provider value={{ todoData, setTodoData }}>
      <div className="todo">
        <h1 className="title">todos</h1>
        <InputForm />
        <Tasks />
        {todoData.taskList.length != 0 && <FooterMenu />}
      </div>
    </Context.Provider>
  );
}

export default Todo;
