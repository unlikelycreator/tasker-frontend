import React from "react";
import { useState } from "react";
import { getAllTask, getAllActivity, updateTask} from "../utils/HandleApi";
import { useEffect } from "react";
import Multiselect from 'multiselect-react-dropdown';

const Ta = ({ text, selectedoptions}) => {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activity, setActivity] = useState([]);
  const [task, setTask] = useState([])
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [taskId, setTaskId] = useState("");
  const[isUpdating, setIsUpdating] = useState(false)
  const [tex,setText] = useState("")
  
  useEffect(() => {
    getAllTask(setTask)
    getAllActivity(setActivity)
  }, [])


  const handleSelect = (selectedList) => {
    setSelectedOptions(selectedList);
  };

  const handleSelectChange = (event) => {
    const selectedTaskText = event.target.value;
    console.log(selectedTaskText)
    const selectedTask = task.find((task) => task.text === selectedTaskText);
    setSelectedTask({ id: selectedTask._id, text: selectedTask.text });
    setTaskId(selectedTask._id)
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleOptionChange = (optionText) => {
    if (checkedOptions.includes(optionText)) {
      setCheckedOptions(checkedOptions.filter((text) => text !== optionText));
    } else {
      setCheckedOptions([...checkedOptions, optionText]);
    }
  };

  return (
    <div className="ta-task">
      <div className="ta-main">
        <div className="ta-text"><b>{text}</b></div>
        <div className="selectedoptions">
          {selectedoptions.map((option, index) => (
            <div key={index}>
              <input
                type="checkbox"
                value={option.text}
                onChange={() => handleOptionChange(option.text)}
                checked={checkedOptions.includes(option.text)}
              />
              <label>{option.text}</label>
            </div>
          ))}
        </div>
      </div>
      <button onClick={openModal} className="modal-btn">Edit</button>
      {isModalOpen && (
        <div className="modal">
          <form onSubmit={handleSubmit}>
            <label>
              Input Field:
              <input
                type="text"
                value={text}
                onChange={() => handleSelectChange(text)}
                readOnly={true}
              />
            </label>
            <Multiselect
                className="multiselect"
                options={activity} 
                selectedValues={selectedOptions}
                displayValue="text" 
                onSelect={handleSelect}
                />
            <div className="add" onClick={() => updateTask(taskId,text, setTask, setText, setIsUpdating, selectedOptions)}>Add</div>
          </form>
          <p>{taskId},{selectedTask},{tex},{isUpdating}</p>
          <button onClick={closeModal} className="modal-btn">Close</button>
        </div>
      )}
    </div>
  );
};

export default Ta;