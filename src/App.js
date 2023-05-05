import { useEffect, useState } from "react";
import Task from "./component/Task"
import Activity from "./component/Activity"
import Ta from './component/taskActivity'
import { addTask, getAllTask, updateTask, deleteTask, addActivity, getAllActivity, updateActivity, deleteActivity} from "./utils/HandleApi";
import { getAllItems, addItem, updateItem, deleteItem } from "./utils/HandleApi";
import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } from "./utils/HandleApi";
import { AiFillProject } from 'react-icons/ai';
import { AiFillCheckCircle } from 'react-icons/ai';
import { AiFillSchedule } from 'react-icons/ai'
import { AiFillCreditCard } from 'react-icons/ai'
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"




import "./css/Item.css"
function App() {
  const [activeScreen, setActiveScreen] = useState('task');

  const handleMenuClick = (screenName) => {
    setActiveScreen(screenName);
  }

  return (
    <div className="app-container">
      <div className="menu-container">
       <h1>Tasker</h1>
       <div className="menu-buttons">
          <button className={activeScreen === 'task' ? 'active' : ''} onClick={() => handleMenuClick('task')}> <AiFillSchedule size={20}/> &nbsp; Tasks </button>
          <button className={activeScreen === 'activity' ? 'active' : ''} onClick={() => handleMenuClick('activity')}> <AiFillCheckCircle size={20}/>&nbsp; Activities </button>
          <button className={activeScreen === 'taskac' ? 'active' : ''} onClick={() => handleMenuClick('taskac')}><AiFillProject size={20}/>&nbsp;Task-Activity</button>
          <button className={activeScreen === 'items' ? 'active' : ''} onClick={() => handleMenuClick('items')}><AiFillCreditCard size={20}/>&nbsp; Items</button>
          <button className={activeScreen === 'customer' ? 'active' : ''} onClick={() => handleMenuClick('customer')}><AiFillCreditCard size={20}/>&nbsp; Customers</button>
        </div>
      </div>
      <div className="screen-container">
        {activeScreen === 'task' && <TaskScreen />}
        {activeScreen === 'activity' && <ActivityScreen />}
        {activeScreen === 'taskac' && <TaskAcScreen />}
        {activeScreen === 'items' && <ItemsScreen />}
        {activeScreen === 'customer' && <CustomerScreen />}
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
  const [Activity, setActivity] = useState([])
  
  useEffect(() => {
    getAllTask(setTask)
    getAllActivity(setActivity)
  }, [])



  return (
    <div className="screen">
      <div className="container" >

      <h1>All Task & Activities</h1>
      <div className="list">
      {task && task.length > 0 ? (
        task.map((task, index) => (
          <Ta
          key={index} 
          text={task.text}
          selectedoptions={task.selectedOptions}
          activities={Activity}
          />
        ))
      ) : (
        <p>No data found</p>
      )}
      </div>
    </div>
    </div>
  );
}

function ItemsScreen() {
    const [items, setItems] = useState([]);
   // const [totalAmount, setTotalAmount] = useState(0);
    const [itemName, setitemName] = useState("")
    const [itemDescription, setitemDescription] = useState("")
    const [itemPrice, setitemPrice] = useState([])
    const[isUpdating, setIsUpdating] = useState(false)
    const[itemId, setitemId] = useState([])
    useEffect(() => {
      getAllItems(setItems);
    }, [])

    /*
    function handleQuantityChange(e, itemId) {
      const updatedItems = items.map((item) => {
        if (item._id === itemId) {
          return {
            ...item,
            quantity: e.target.value,
            total: e.target.value * item.itemPrice,
          };
        } else {
          return item;
        }
      });
    
      setItems(updatedItems);
    
      const newTotalAmount = updatedItems.reduce((total, item) => {
        return total + item.total;
      }, 0);
    
      setTotalAmount(newTotalAmount);
    }

    const handleItemUpdate = (e, itemId, name, desc, price) =>{
        e.preventDefault();
        console.log(itemId)
        setitemName(name)
        console.log(name, desc, price)
        setitemDescription(desc)
        setitemPrice(price)
    }*/

    const handleItemdelete = (e, _id) =>{
      e.preventDefault();
      deleteItem(_id, setItems)
    }

    const updateMode = (itemId, name, desc, price) =>{
      setIsUpdating(true)
      setitemId(itemId)
      setitemName(name)
      setitemDescription(desc)
      setitemPrice(price)
    }
    
    return (
      <div className="screen">
        <div className="item-container" >
          <h1>Items</h1>
          <div className="item-input">
            <div className="item-input">
              <input className="input-box" type="text" value={itemName} placeholder="Item Name" onChange={(e) => setitemName(e.target.value)} />
              <input className="input-box" type="text" value={itemDescription} placeholder="Item Description" onChange={(e) => setitemDescription(e.target.value)} />
              <input className="input-box" type="text" value={itemPrice} placeholder="Item Price" onChange={(e) => setitemPrice(e.target.value)} />
          </div>
              <button className="item-save-button" onClick={ isUpdating ? 
              () => updateItem(itemId, itemName, itemDescription, itemPrice, setItems, setitemName, setitemDescription, setitemPrice, setIsUpdating)
              : () => addItem(itemName, itemDescription, itemPrice, setItems, setitemName, setitemDescription, setitemPrice, setItems)}>
                {isUpdating ? "Update": "Add"}</button>
          </div>
          <table>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Item Description</th>
                  <th>Item Price</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemName}</td>
                  <td>{item.itemDescription}</td>
                  <td>{item.itemPrice}</td>
                  <td>
                  <BiEdit className='icon' onClick={() => updateMode(item._id, item.itemName, item.itemDescription, item.itemPrice)}/>
                  </td>
                  <td><AiFillDelete className='icon' onClick={(e) => handleItemdelete(e,item._id )} /></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

function CustomerScreen() {
  const [customers, setCustomers] = useState([]);
 // const [totalAmount, setTotalAmount] = useState(0);
  const [customerName, setcustomerName] = useState("")
  const [customerAddress, setcustomeAddress] = useState("")
  const[isUpdating, setIsUpdating] = useState(false)
  const[customerId, setcustomerId] = useState([])

  useEffect(() => {
    getAllCustomers(setCustomers);
  }, [])

  const handleCustomerdelete = (e, _id) =>{
    e.preventDefault();
    deleteCustomer(_id, setCustomers)
  }

  const updateMode = (customerId, name, address) =>{
    setIsUpdating(true)
    setcustomerId(customerId)
    setcustomerName(name)
    setcustomeAddress(address)
  }
  
  return (
      <div className="screen">
        <div className="item-container" >
          <h1>Customers</h1>
          <div className="item-input">
            <div className="item-input">
              <input className="input-box" type="text" value={customerName} placeholder="Name" onChange={(e) => setcustomerName(e.target.value)} />
              <input className="input-box" type="text" value={customerAddress} placeholder="Address" onChange={(e) => setcustomeAddress(e.target.value)} />
          </div>
              <button className="item-save-button" onClick={ isUpdating ? 
              () => updateCustomer(customerId, customerName, customerAddress, setCustomers, setcustomerName, setcustomeAddress, setIsUpdating)
              : () => addCustomer(customerName, customerAddress, setcustomerName, setcustomeAddress, setCustomers)}>
                {isUpdating ? "Update": "Add"}</button>
          </div>
          <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Address</th>
                  <th>Edit</th>
                  <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.address}</td>
                  <td>
                  <BiEdit className='icon' onClick={() => updateMode(item._id, item.name, item.address)}/>
                  </td>
                  <td><AiFillDelete className='icon' onClick={(e) => handleCustomerdelete(e,item._id )} /></td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}

export default App;
