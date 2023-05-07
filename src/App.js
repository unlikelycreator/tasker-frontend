import { useEffect, useState } from "react";
//Components import
import Task from "./component/Task"
import Activity from "./component/Activity"
import Ta from './component/taskActivity'

//Call Functions Import
import { addTask, getAllTask, updateTask, deleteTask, addActivity, getAllActivity, updateActivity, deleteActivity} from "./utils/HandleApi";
import { getAllItems, addItem, updateItem, deleteItem } from "./utils/HandleApi";
import { getAllCustomers, addCustomer, updateCustomer, deleteCustomer } from "./utils/HandleApi";
import { getAllInvoices, addInvoice, deleteInvoice} from "./utils/HandleApi";


//Icons Import
import { AiFillSchedule, AiOutlineClose, AiOutlineShoppingCart , AiFillCheckCircle, AiFillProject, AiFillDelete } from 'react-icons/ai'
import { HiOutlineMenu } from 'react-icons/hi'
import {BiEdit} from "react-icons/bi"
import { BsFillPersonFill } from 'react-icons/bs';

//CSS import
import "./css/Item.css"
import "./css/Menu.css"
import "./css/Invoice.css"



function App() {
  const [activeScreen, setActiveScreen] = useState('task');
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuClick(screen) {
    setActiveScreen(screen);
    setMenuOpen(false);
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }
  /*
  const handleMenuClick = (screenName) => {
    setActiveScreen(screenName);
  }
*/ 
  return (
    <div className="app-container">
      <button className="menu-toggle" onClick={toggleMenu}><span>{menuOpen ? <AiOutlineClose size={20} /> : <HiOutlineMenu  size={20} />}</span></button>
      <div className={`menu-container ${menuOpen ? 'open' : ''}`}>
       <h1>Tasker</h1>
       <div className="menu-buttons">
          <button className={activeScreen === 'task' ? 'active' : ''} onClick={() => handleMenuClick('task')}> <AiFillSchedule size={20}/> &nbsp; Tasks </button>
          <button className={activeScreen === 'activity' ? 'active' : ''} onClick={() => handleMenuClick('activity')}> <AiFillCheckCircle size={20}/>&nbsp; Activities </button>
          <button className={activeScreen === 'taskac' ? 'active' : ''} onClick={() => handleMenuClick('taskac')}><AiFillProject size={20}/>&nbsp;Task-Activity</button>
          <button className={activeScreen === 'items' ? 'active' : ''} onClick={() => handleMenuClick('items')}><AiOutlineShoppingCart size={20}/>&nbsp; Items</button>
          <button className={activeScreen === 'customer' ? 'active' : ''} onClick={() => handleMenuClick('customer')}><BsFillPersonFill size={20}/>&nbsp; Customers</button>
          <button className={activeScreen === 'invoice' ? 'active' : ''} onClick={() => handleMenuClick('invoice')}><BsFillPersonFill size={20}/>&nbsp; Invoice</button>
        </div>
      </div>
      <div className="screen-container">
        {activeScreen === 'task' && <TaskScreen />}
        {activeScreen === 'activity' && <ActivityScreen />}
        {activeScreen === 'taskac' && <TaskAcScreen />}
        {activeScreen === 'items' && <ItemsScreen />}
        {activeScreen === 'customer' && <CustomerScreen />}
        {activeScreen === 'invoice' && <InvoiceScreen />}
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
              <input className="input-box" type="text" value={customerName} placeholder="Item Name" onChange={(e) => setcustomerName(e.target.value)} />
              <input className="input-box" type="text" value={customerAddress} placeholder="Item Description" onChange={(e) => setcustomeAddress(e.target.value)} />
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


function InvoiceScreen() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const[items, setItems] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([])
  const [name, setName] = useState([])
  const [invoiceNo, setinvoiceNo] = useState([])
  const [date, setDate] = useState();
  const [totalAmount, setTotalAmount] = useState(0);
  const [rows, setRows] = useState([{ itemName: '', quantity: 0, price: 0, amount: 0 }]);
  //const[isUpdating, setIsUpdating] = useState(false)
  //const[customerId, setcustomerId] = useState([])
  
  //const [selectedItem, setSelectedItem] = useState(null);
  //const [quantity, setQuantity] = useState(0);
  

  useEffect(() => {
    getAllCustomers(setCustomers);
    getAllItems(setItems)
    getAllInvoices(setInvoices)
  }, [])

  useEffect(() =>{
    if (isModalOpen){
      const randomNumber = Math.floor(10000000 + Math.random() * 90000000);
      setinvoiceNo(randomNumber.toString());
      setDate(new Date().toISOString().slice(0, 10))
    }
  },[isModalOpen])


  function getItemPrice(itemName, items) {
    const selectedItem = items.find(item => item.itemName === itemName);
    return selectedItem ? selectedItem.itemPrice : 0;
  }

  function handleItemSelect(e, index) {
    const selectedValue = e.target.value;
    const selectedPrice = getItemPrice(selectedValue, items);
    setRows((rows) =>
    rows.map((row, i) => {
      if (i === index) {
        return { ...row, itemName: selectedValue, price: selectedPrice };
      } else {
        return row;
      }
    })
  );
  }

  function handleQuantityChange(e, index) {
    const { value } = e.target;
    const newRows = [...rows];
    newRows[index].quantity = parseInt(value, 10);
    newRows[index].amount = newRows[index].quantity * newRows[index].price;
    setRows(newRows);
  }

  function addRow() {
    const newRows = [...rows, { itemName: '', quantity: 0, price: 0, amount: 0 }];
    setRows(newRows);
    console.log(rows)
  }

  function handleDeleteRow(index) {
    setRows((rows) => rows.filter((row, i) => i !== index));
  }
/*
  const handleInvoiceDelete = (e, _id) =>{
    e.preventDefault();
    deleteCustomer(_id, setCustomers)
  }

  const updateMode = (customerId, name, address) =>{
    setIsUpdating(true)
  }*/
  const openModal = (event) => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const tableRows = rows.map((row, index) => (
    <tr key={index}>
      <td className="invoice-table-cell">{index + 1}</td>
      <td className="invoice-table-cell">
        <select
          className="invoice-select item-select"
          value={row.item}
          onChange={(e) => handleItemSelect(e, index)}
        >
          <option value="">Select an item</option>
          {items.map((item) => (
            <option key={item.itemName} value={item.itemName}>
              {item.itemName}
            </option>
          ))}
        </select>
      </td>
      <td className="invoice-table-cell">
        <input
          type="number"
          className="invoice-input quantity-input"
          value={row.quantity}
          onChange={(e) => handleQuantityChange(e, index)}
        />
      </td>
      <td className="invoice-table-cell">
        <input
          type="number"
          className="invoice-input price-input"
          value={row.price}
          readOnly={true}
        />
      </td>
      <td className="invoice-table-cell amount-cell">
          <input
              type="number"
              className="invoice-input price-input"
              value={row.amount}
              readOnly={true}
            /></td>
      <td className="invoice-table-cell">
        <button onClick={() => handleDeleteRow(index)}>Delete</button>
      </td>
    </tr>
  ));
  
  
  useEffect(() => {
    const newTotalAmount = rows.reduce((acc, rows) => acc + rows.amount, 0);
    setTotalAmount(newTotalAmount);
  }, [rows]);


  const handleSaveInvoice = (e) => {
    e.preventDefault();
    addInvoice(name, invoiceNo, date, rows, totalAmount, setName, setinvoiceNo, setRows, setTotalAmount, setInvoices)
    console.log(name, invoiceNo, date, rows, totalAmount)
  }

  const handleInvoiceDelete = (e, _id) =>{
    e.preventDefault();
    deleteInvoice(_id, setInvoices)
  }

  return (
      <div className="screen">
          <h1>Invoice Screen</h1>
          <div className="invoice-screen">
              <div className="invoice-table">
                <table>
                  <thead>
                      <tr>
                        <th>Name</th>
                        <th>InvoiceNo</th>
                        <th>Date</th>
                        <th>Total Amount</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.invoiceNo}</td>
                        <td>{new Date(item.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                        <td>{item.totalAmount}</td>
                        <td>
                        <BiEdit className='icon' /*onClick={() => updateMode(item._id, item.name, item.address)}*//>
                        </td>
                        <td><AiFillDelete className='icon'  onClick={(e) => handleInvoiceDelete(e, item._id)}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {isModalOpen && (
              <div className="invoice-modal">
                <h1 className="invoice-header">Invoice</h1>
                <div className="invoice-form-container">
                  <div className="form-row">
                    <label className="invoice-label" htmlFor="customer-select">Customer Name:</label>
                    <select className="invoice-select" id="customer-select" onChange={(e) => setName(e.target.value)}>
                      <option value="">Select an item</option>
                      {customers.map(item => (
                        <option value={item.name}>{item.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-row">
                    <label className="invoice-label" htmlFor="item-input">Invoice Number:</label>
                    <input
                        type="text"
                        className="invoice-input"
                        id="invoice-input"
                        value={invoiceNo}
                        readOnly
                      />
                  </div>
                  <div className="form-row">
                    <label className="invoice-label" htmlFor="date-input">Date:</label>
                    <input type="date" className="invoice-input" id="date-input" value={date} readOnly/>
                  </div>
                </div>
                <div className="invoice-table-container">
                <table className="invoice-table">
                  <thead>
                    <tr>
                      <th className="invoice-table-header">Sr. No</th>
                      <th className="invoice-table-header">Item</th>
                      <th className="invoice-table-header">Quantity</th>
                      <th className="invoice-table-header">Price</th>
                      <th className="invoice-table-header">Amount</th>
                      <th className="invoice-table-header">Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tableRows}
                    <tr>
                      <td colSpan="4" className="invoice-table-footer">Total Amount:</td>
                      <td className="invoice-table-footer amount-cell">{totalAmount}</td>
                    </tr>
                    <tr>
                      <td colSpan="5">
                        <button onClick={addRow} className="add-row">
                          +
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            <button className="invoice-btn" onClick={handleSaveInvoice}>Submit</button>
            <button onClick={closeModal} className="invoice-close-btn"><AiOutlineClose /></button>
              </div>
            )}
          <button className="add-invoice-btn" onClick={openModal}>+</button>
        </div>
      </div>
  );
}
export default App;
