import { useEffect, useState } from "react";
import Task from "./component/Task"
import Activity from "./component/Activity"
import { addTask, getAllTask, updateTask, deleteTask, addActivity, getAllActivity, updateActivity, deleteActivity } from "./utils/HandleApi";
import Multiselect from 'multiselect-react-dropdown';
function App() {

  const [activeScreen, setActiveScreen] = useState('task');



  const handleMenuClick = (screenName) => {
    setActiveScreen(screenName);
  }


  return (
    <div className="app-container">
      <div className="menu-container">
       <h1>Menu</h1>
        <button className={activeScreen === 'task' ? 'active' : ''} onClick={() => handleMenuClick('task')}>Tasks</button>
        <button className={activeScreen === 'activity' ? 'active' : ''} onClick={() => handleMenuClick('activity')}>Activities</button>
        <button className={activeScreen === 'taskac' ? 'active' : ''} onClick={() => handleMenuClick('taskac')}>Task-Activity</button>
      </div>
      <div className="screen-container">
        {activeScreen === 'task' && <TaskScreen />}
        {activeScreen === 'activity' && <ActivityScreen />}
        {activeScreen === 'taskac' && <TaskAcScreen />}
      </div>
    </div>
  );
}

function TaskScreen() {
  
  const [task, setTask] = useState([])
  const [text,setText] = useState("")
  const[isUpdating, setIsUpdating] = useState(false)
  const[taskId, setTaskId] = useState()
  useEffect(() => {
    getAllTask(setTask)
  }, [])
  const updateMode = (_id, text) =>{
    setIsUpdating(true)
    setText(text)
    setTaskId(_id)
  }
  return (
    <div className="screen">
          <h1>Task Screen</h1>
          <div className="top">
            <input
            className="maininput"
            type="text" 
            placeholder="Add task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
            <div className="add" 
              onClick={ isUpdating ? 
              () => updateTask(taskId, text, setTask, setText, setIsUpdating)
              : () => addTask(text, setText, setTask)}>
                {isUpdating ? "Update": "Add"}
            </div>
          </div>
          <div className="list">
            {task.map((item) => <Task 
            key={item._id} 
            text={item.text} 
            updateMode = {() => updateMode(item._id, item.text)}
            deleteTask={()=> deleteTask(item._id,setTask)} />)}
          </div>
        </div>
  );
}


function ActivityScreen() {
  const [activity, setActivity] = useState([])
  const [text,setText] = useState("")
  const[isUpdating, setIsUpdating] = useState(false)
  const[ActivityID, setActivityID] = useState()
  useEffect(() => {
    getAllActivity(setActivity)
  }, [])
  const updateMode = (_id, text) =>{
    setIsUpdating(true)
    setText(text)
    setActivityID(_id)
  }
  return (
    <div className="screen">
          <h1>Activity Screen</h1>
          <div className="top">
            <input 
            className="maininput"
            type="text" 
            placeholder="Add Activity..."
            value={text}
            onChange={(e) => setText(e.target.value) && console.log(e.target.value)}
            />
            <div className="add" 
              onClick={ isUpdating ? 
              () => updateActivity(ActivityID, text, setActivity, setText, setIsUpdating)
              : () => addActivity(text, setText, setActivity)}>
                {isUpdating ? "Update": "Add"}
            </div>
          </div>
          <div className="list">
            {activity.map((item) => <Activity 
            key={item._id} 
            text={item.text} 
            updateMode = {() => updateMode(item._id, item.text)}
            deleteActivity={()=> deleteActivity(item._id,setActivity)} />)}
          </div>
        </div>
  );
}

function TaskAcScreen() {
  const [task, setTask] = useState([])
  const [activity, setActivity] = useState([])
  const [selectedOptions, setSelectedOptions] = useState([]);
  useEffect(() => {
    getAllTask(setTask)
    getAllActivity(setActivity)
  }, [])
  /*
  const updateMode = (_id, text) =>{
    setIsUpdating(true)
    setText(text)
    setTaskId(_id)
  }*/

  const handleSelect = (selectedList) => {
    setSelectedOptions(selectedList);
  };
  return (
    <div className="screen">
      <h1>Activity Screen</h1>
      <div className="ta-container" >
      <form>
      <select className="droptask">
                {task.map(task => (
                  <option key={task.id} value={task.id}>{task.text}</option>
                ))}
        </select>

        <div>
        <Multiselect
          className="multiselect"
          options={activity} // Options to display in the dropdown
          selectedValues={selectedOptions} // Preselected value to persist in dropdown
          displayValue="text" // Property name to display in the dropdown options
          onSelect={handleSelect}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h1>All selected Items</h1>
      {selectedOptions.map((option) => (
          <p key={option.id}>{option.text}</p>
        ))}
    </div>
    </div>
  );
}
export default App;
