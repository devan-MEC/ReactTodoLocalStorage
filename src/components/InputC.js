import {React,useEffect} from "react";

export const InputC = (props) => {
  const { editedTask, makeEditedTask } = props;
  useEffect(()=>{
      
  })
  return (
    <input
      // id="inputid"

      value={editedTask}
      onChange={(event) => makeEditedTask(event.target.value)}
      className="p-2 rounded-lg"
    />
  );
};
