import { useEffect, useState } from "react";
import Task from "./component/Task"
import Activity from "./component/Activity"
import Ta from './component/taskActivity'
import { addTask, getAllTask, updateTask, deleteTask, addActivity, getAllActivity, updateActivity, deleteActivity, getAllTA, addTA, deleteTA} from "./utils/HandleApi";
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
            onChange={(e) => setText(e.target.value)}
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
  const [allData, setAllData] = useState([]);
  const [activity, setActivity] = useState([]);
  const [selectedTask, setSelectedTask] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const[taID, setTaID] = useState()
  
  useEffect(() => {
    getAllTask(setTask)
    getAllActivity(setActivity)
    getAllTA(setAllData)
  }, [])

  const updateMode = (_id) =>{
    setTaID(_id)
  }


  const handleSelect = (selectedList) => {
    setSelectedOptions(selectedList);
  };
  const handleSelectChange = (event) => {
    setSelectedTask(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    addTA(selectedTask, selectedOptions, setAllData, allData, taID);
  };


  return (
    <div className="screen">
      <h1>Activity Screen</h1>
      <div className="ta-container" >
        <div className="form-group">
      <form className="ta-form">
      <select className="droptask" value={selectedTask} onChange={handleSelectChange} >
      {task && task.length > 0 ? (
                task.map(task => (
                  <option key={task.id} value={task.id}>{task.text}</option>
                ))
      ):(<p>NO data</p>)}
        </select>

        <div>
        <Multiselect
          className="multiselect"
          options={activity} 
          selectedValues={selectedOptions} 
          displayValue="text" 
          onSelect={handleSelect}
          />
        </div>
      </form>
      <button className="sub-btn" onClick={handleSubmit}>Submit</button>
      </div>           
      

      <h1>All Task & Activities</h1>
      <div className="Alldata">
      {allData && allData.length > 0 ? (
        allData.map((task, index) => (
          <Ta 
          key={index} 
          text={task.task} 
          selectedoptions={task.selectedOptions}
          updateMode = {() => updateMode(task._id)}
          deleteTA={()=> deleteTA(task._id,setAllData)}/>
        ))
      ) : (
        <p>No data found</p>
      )}
      </div>
    </div>
    </div>
  );
}
export default App;
