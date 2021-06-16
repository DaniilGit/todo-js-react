import React, { useContext } from "react";
import Context from "./Context";

function Tasks() {
  const { todoData } = useContext(Context);

  return todoData.renderingTasks;
}

export default Tasks;
