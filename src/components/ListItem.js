import { React, useState, useEffect, useRef } from "react";
import { InputC } from "./InputC";

export const ListItem = (props) => {
  const { tasktitle, taskid, handleDelete, handleEdit } = props;
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [edit, makeEdit] = useState("false");
  const [editedTask, makeEditedTask] = useState(tasktitle);
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

  //   const handleDelete = (taskid) => {
  //     props.taskarr = props.taskarr.filter((t) => t.id !== taskid);
  //     setTasks(props.taskarr);
  //     localStorage.setItem("localTasks", JSON.stringify(props.taskarr));
  //   };

  // const handleEdit = (taskId) => {
  //   console.log("hellloooooooo");
  //   makeEdit("true");
  //   console.log("handleEdit is called");
  //   const edited = tasks.filter((t) => {
  //     if (t.id == taskId) {
  //       t.title = "edited";
  //     }
  //     return true;
  //   });
  //   setTasks(edited);
  //   localStorage.setItem("localTasks", JSON.stringify(edited));
  // };

  const handleSave = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  const handleClear = () => {
    setTasks([]);
    localStorage.removeItem("localTasks");
  };

  //function to preselect stuff in input along with other stuff

  const handleEdit2 = () => {
    makeEdit("true");
    // const x = document.getElementById("inputid");
    // x.focus();
    // x.select();
    // console.log(inputRef);

    // inputRef.current.focus();
    // inputRef.current.select();

    // e.target.select();
  };

  const foo = () => {
    makeEdit("false");
    handleEdit(taskid, editedTask);
  };
  const inputRef = useRef(null);
  useEffect(() => {
    // if (inputRef) {
    //   console.log("input ref is", inputRef.current);
    //   inputRef.current.focus();
    //   // inputRef.current.select();
    // } else {
    //   console.log("not called yet");
    // }
  });

  return (
    <div>
      {/* title is in title, id is in taskid, handleEdit and handleDelete */}
      {edit === "false" ? (
        <div className="flex flex-row bg-gray-100 mt-4 rounded-md p-4 justify-between shadow-lg ">
          <div className="self-center w-auto">{props.tasktitle}</div>
          <div className="ml-4">
            <button
              className="bg-blue-400 rounded-md p-2 text-white"
              onClick={() => handleEdit2()}
            >
              EDIT
            </button>
            <button
              className=" ml-4 bg-red-400 text-white rounded-md p-2"
              onClick={() => handleDelete(taskid)}
            >
              DELETE
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-row bg-gray-100 mt-4 rounded-xl p-4 justify-between ">
          <InputC editedTask={editedTask} makeEditedTask={makeEditedTask} />

          <div className="ml-4">
            <button
              className="bg-green-400 rounded-md p-2 text-white"
              onClick={() => foo(taskid)}
            >
              SAVE
            </button>
            <button
              className=" ml-4 bg-red-400 text-white rounded-md p-2"
              onClick={() => handleDelete(taskid)}
            >
              DELETE
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
