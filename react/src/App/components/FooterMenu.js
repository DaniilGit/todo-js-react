import React, { useContext } from "react";
import "../styles/todo.css"
import Context from "./Context";

function FooterMenu() {
  const {todoData} = useContext(Context);
  
  return (
    <div className="footer-menu">
      <span className="counter-tasks">{todoData.countActiveTasks} active tasks</span>
      <div className="footer-btns">
        <button className="menu-btn" id="all-btn">All</button>
        <button className="menu-btn" id="active-btn">Active</button>
        <button className="menu-btn" id="completed-btn">Completed</button>
      </div>
      <button className="clear-btn" id="clear-btn">Clear completed</button>
    </div>
  )
}

export default FooterMenu