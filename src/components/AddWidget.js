import React, { useState, useEffect } from "react";
import { ListItem } from "./ListItem";

export const AddWidget = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // const [edit, makeEdit] = useState("false");
  const [saveVal, changeSaveVal] = useState("");

  useEffect(() => {
    if (localStorage.getItem("localTasks")) {
      const storedList = JSON.parse(localStorage.getItem("localTasks"));
      setTasks(storedList);
    }
  }, []);

  const addTask = (e) => {
    if (task) {
      const newTask = { id: new Date().getTime().toString(), title: task };
      setTasks([...tasks, newTask]);
      localStorage.setItem("localTasks", JSON.stringify([...tasks, newTask]));
      setTask("");
    }
  };

  const handleDelete = (taskId) => {
    console.log("this is called");
    const deleted = tasks.filter((t) => t.id !== taskId);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const handleSave = (taskId) => {
    console.log("this is called (handleSave in parent)");
    const deleted = tasks.filter((t) => t.id !== taskId);
    setTasks(deleted);
    localStorage.setItem("localTasks", JSON.stringify(deleted));
  };

  const handleEdit = (taskId, taskTitle) => {
    console.log("handleEdit is called");
    const edited = tasks.filter((t) => {
      if (t.id == taskId) {
        t.title = taskTitle;
      }
      return true;
    });
    setTasks(edited);
    localStorage.setItem("localTasks", JSON.stringify(edited));
  };

  const editTask = (task) => {
    const edited = tasks.filter((t) => {
      if (t.id === task.id) {
        t.title = "LMFAO BRO";
      }
      return true;
    });
    setTasks(edited);
    localStorage.setItem("localTasks", JSON.stringify(edited));
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  return (
    <div className="self-center flex flex-col">
      <div className="flex flex-col items-center bg-gray-100 p-2 rounded-md mt-3 shadow-lg">
        <div className="flex flex-row mt-4  p-5 ">
          <input
            className="px-2 py-1 mx-3 rounded-md  border-gray-300 border-2 focus:border-blue-300 focus:border-4"
            type="text"
            value={task}
            placeholder="Enter task"
            onChange={(event) => setTask(event.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />

          <button
            type="submit"
            onClick={addTask}
            className="bg-blue-400 w-10 h-10 rounded-md text-white hover:bg-blue-300"
          >
            +
          </button>
        </div>
        <div className="bg-yellow-300    p-2 rounded-lg ">
          <p>
            You have
            {!tasks.length
              ? " no tasks"
              : tasks.length === 1
              ? " 1 task"
              : tasks.length > 1
              ? ` ${tasks.length} tasks`
              : null}
          </p>
        </div>
      </div>
      {tasks.map((task) => (
        // <React.Fragment key={task.id}>
        //   <div className="bg-gray-100 rounded-lg p-4 mt-4 flex flex-row items-center justify-between">
        //     {edit !== "true" ? (
        //       <div className="font-bold">{task.title}</div>
        //     ) : (
        //       <>
        //         <input value={saveVal} type="text" />
        //         <button
        //           className="ml-3 bg-green-600 p-2 rounded-md text-white"
        //           onClick={() => handleSave(task)}
        //         >
        //           save
        //         </button>
        //       </>
        //     )}
        //     <div className="ml-8">
        //       <button
        //         className="bg-green-600 p-2 text-white rounded-md m-2"
        //         onClick={() => editTask(task)}
        //       >
        //         edit
        //       </button>
        //       <button
        //         className="bg-red-600 p-2 text-white rounded-md m-2"
        //         onClick={() => handleDelete(task)}
        //       >
        //         delete
        //       </button>
        //     </div>
        //   </div>
        // </React.Fragment>
        <React.Fragment key={task.id}>
          <ListItem
            tasktitle={task.title}
            taskid={task.id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            // handleEdit={handleEdit}
            // edit={edit }
          />
        </React.Fragment>
      ))}
      {!tasks.length ? null : (
        <div className="self-center">
          <button
            className="bg-blue-400 p-2 text-white rounded-md m-2"
            onClick={() => handleClear()}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
