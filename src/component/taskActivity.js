import React from "react";
import { useState } from "react";
import { getAllTask, getAllActivity, updateTask} from "../utils/HandleApi";
import { useEffect } from "react";
//import Multiselect from 'multiselect-react-dropdown';

const Ta = ({ text}) => {
  const [checkedOptions, setCheckedOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isactModalOpen, setIsactModalOpen] = useState(false);
  const [activity, setActivity] = useState([]);
  const [task, setTask] = useState([])
  const [selectedItems, setSelectedItems] = useState([]);
  const [taskId, setTaskId] = useState("");
  const[isUpdating, setIsUpdating] = useState(false)
  const [tex,setText] = useState("")
  
  useEffect(() => {
    getAllTask(setTask)
    getAllActivity(setActivity)
  }, [])



  const openModal = (event) => {
    setIsModalOpen(true);
    const searchText = text;
    const matchingTask = task.find((task) => task.text === searchText);
    if (matchingTask) {
      console.log(`Match found for "${searchText}": ${matchingTask._id}`);
      setTaskId(matchingTask._id)
      setCheckedOptions(matchingTask.selectedItems);
      console.log(checkedOptions)
    } else {
      console.log(`No match found for "${searchText}"`);
    }
  };

  const openModalact = (e) => {
    e.preventDefault();
    setIsactModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const closeactModal = (e) => {
    e.preventDefault();
    setIsactModalOpen(false);
  };

    const handleCheckboxChange = (itemText, isChecked) => {
      if (isChecked) {
        setSelectedItems(prevSelectedItems => [...prevSelectedItems, { text: itemText }]);
        console.log(selectedItems)
      } else {
        setSelectedItems(prevSelectedItems => prevSelectedItems.filter(item => item.text === itemText));
        console.log(selectedItems)
      }
      

      updateTask(taskId, text, setTask, setText, setIsUpdating, selectedItems);
      console.log(taskId)
      console.log(text)
      console.log(selectedItems)
    };





  return (
    <div className="task">
      <div className="main">
        <div className="text"><b>{text}</b></div>
      </div>
      <button onClick={openModal} className="modal-btn">Edit</button>


      {isModalOpen && (
        <div className="modal">
          <form>
            <label>
              Your task:
              <input type="text" value={text} readOnly={true} />
            </label>
            <div className="modal-body">
              <div className="modal-top">
                <h2>Items</h2>
                <button onClick={openModalact} className="modal-btn2">+</button>
              </div>

                        {isactModalOpen && (
                          <div className="inner-modal">
                            <form>
                              <div>
                                <h1>Items</h1>
                                <form>
                                  {activity.map((item) => (
                                    <label key={item.id}>
                                      <input
                                        type="checkbox"
                                        value={item.id}
                                        checked={checkedOptions.includes(item.text)}
                                        onChange={(e) => handleCheckboxChange(item.text, e.target.checked)}
                                      />
                                      {item.text}
                                    </label>
                                  ))}
                                </form>
                              </div>
                          </form>
          <button onClick={closeactModal} className="modal-btn">Close</button>
        </div>
      )}




              <form>
                {checkedOptions.map((item) => (
                  <label key={item.id}>
                    <input
                      type="checkbox"
                      value={item.id}
                    />
                    {item.text}
                  </label>
                ))}
              </form>
              {selectedItems.map((item, index) => (
                  <p key={index}>{item.text}</p>
                ))}
            </div>
    </form>
       
          <button onClick={closeModal} className="modal-btn">Close</button>
          
          {tex}{isUpdating}
        </div>
      )}
    </div>
  );
};

export default Ta;