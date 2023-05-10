import axios from 'axios'

const baseurl = "https://tasker-backend.onrender.com/tasks"
const baseurlac = "https://tasker-backend.onrender.com/activities"
const baseurlItem = "https://tasker-backend.onrender.com/item"
const baseurlcust= "https://tasker-backend.onrender.com/customer"
const baseurlinvoice= "https://tasker-backend.onrender.com/invoice"
/*https://tasker-backend.onrender.com*/
/*https://localhost:5000*/

/*Get*/
const getAllTask = (setTask) => {
    axios
    .get(baseurl)
    .then(({data}) =>{
        console.log('data -->', data);
        setTask(data)
    })
}

const getAllActivity = (setActivity) => {
    axios
    .get(baseurlac)
    .then(({data}) =>{
        console.log('data -->', data);
        setActivity(data)
    })
}

const getAllItems = (setItems) => {
  axios
  .get(baseurlItem)
  .then(({data}) =>{
      console.log('data -->', data);
      setItems(data)
  })
}

const getAllCustomers = (setCustomers) => {
    axios
    .get(baseurlcust)
    .then(({data}) =>{
        console.log('data -->', data);
        setCustomers(data)
    })
  }

const getAllInvoices = (setInvoice) =>{
    axios
    .get(baseurlinvoice)
    .then(({data}) =>{
        console.log('data -->', data);
        setInvoice(data)
    })
}

/*Add*/
const addTask = (text, setText, setTask) =>{
    axios
    .post(`${baseurl}/save`,{text})
    .then((data) =>{
        console.log(data);
        setText("")
        getAllTask(setTask)
    }).catch((err) => console.log(err))
}


const addActivity = (acttext, setacttext, setActivity) =>{
    axios
    .post(`${baseurlac}/save`,{text: acttext})
    .then((data) =>{
        console.log(data);
        setacttext("")
        getAllActivity(setActivity)
    }).catch((err) => console.log(err))
}

const addItem = (itemName, itemDescription, itemPrice, setItems, setitemName, setitemDescription, setitemPrice) =>{
  axios
  .post(`${baseurlItem}/save`,{itemName: itemName, itemDescription: itemDescription, itemPrice: itemPrice})
  .then((data) =>{
      console.log(data);
      getAllItems(setItems)
      setitemName("")
      setitemDescription("")
      setitemPrice([])
  }).catch((err) => console.log(err))
}

const addCustomer = (customerName, customerAddress, setcustomerName, setcustomeAddress, setCustomers) =>{
    axios
    .post(`${baseurlcust}/save`,{name: customerName, address: customerAddress})
    .then((data) =>{
        console.log(data);
        getAllCustomers(setCustomers)
        setcustomerName("")
        setcustomeAddress("")
    }).catch((err) => console.log(err))
}

const addInvoice = (name, invoiceNo, date, rows, totalAmount, setName, setinvoiceNo, setRows, setTotalAmount, setInvoices) =>{
axios
.post(`${baseurlinvoice}/save`,{name, invoiceNo, date, invoiceItems: rows, totalAmount})
.then((data) =>{
    console.log(data);
    getAllInvoices(setInvoices)
    setName([])
    setinvoiceNo([])
    setRows([])
    setTotalAmount([])
}).catch((err) => console.log(err))
}

/*Update*/
const updateTask = (taskId, text, setTask, setText, setIsUpdating, selectedItems) =>{
    axios
    .post(`${baseurl}/update`,{_id: taskId, text, selectedItems})
    .then((data) =>{
        setText("")
        setIsUpdating(false)
        getAllTask(setTask)
        console.log(selectedItems)
    })
    .catch((err) => console.log(err))
}

const updateActivity = (ActivityID, acttext, setActivity, setText, setIsUpdating) =>{
    axios
    .post(`${baseurlac}/update`,{_id: ActivityID, text: acttext})
    .then((data) =>{
        setText("")
        setIsUpdating(false)
        getAllActivity(setActivity)
    })
    .catch((err) => console.log(err))
}

const updateItem = (itemId, itemName, itemDescription, itemPrice, setItem, setitemName, setitemDescription, setitemPrice, setIsUpdating) =>{
  axios
  .post(`${baseurlItem}/update`,{_id: itemId, itemName: itemName, itemDescription: itemDescription, itemPrice: itemPrice})
  .then((data) =>{
        console.log(data)
        setitemName("")
        setitemDescription("")
        setitemPrice([])
        setIsUpdating(false)
        getAllItems(setItem)
  })
  .catch((err) => console.log(err))
}

const updateCustomer = (customerId, customerName, customerAddress, setCustomers, setcustomerName, setcustomeAddress, setIsUpdating) =>{
    axios
    .post(`${baseurlcust}/update`,{_id: customerId, name: customerName, address: customerAddress})
    .then((data) =>{
          console.log(data)
          setcustomerName("")
          setcustomeAddress("")
          setIsUpdating(false)
          getAllCustomers(setCustomers)
    })
    .catch((err) => console.log(err))
  }

  const updateInvoice = (itemId, name, invoiceNo, date, rows, totalAmount,setItemId, setName, setinvoiceNo, setRows, setTotalAmount, setInvoices) =>{
    axios
    .post(`${baseurlinvoice}/update`,{_id: itemId, name: name, invoiceNo: invoiceNo, date, rows, totalAmount})
    .then((data) =>{
          console.log(data)
          getAllInvoices(setInvoices)
          setName([])
          setinvoiceNo([])
          setRows([])
          setTotalAmount([])
          setItemId([])
    })
    .catch((err) => console.log(err))
  }


/*Delete*/

const deleteTask = (_id, setTask) =>{
    axios
    .post(`${baseurl}/delete`,{_id: _id})
    .then((data) =>{
        console.log(data)
        getAllTask(setTask)
    })
    .catch((err) => console.log(err))
}

const deleteActivity = (_id, setActivity) =>{
    axios
    .post(`${baseurlac}/delete`,{_id: _id})
    .then((data) =>{
        console.log(data)
        getAllActivity(setActivity)
    })
    .catch((err) => console.log(err))
}

const deleteItem = (_id, setItems) =>{
  axios
  .post(`${baseurlItem}/delete`,{_id: _id})
  .then((data) =>{
      console.log(data)
      getAllItems(setItems)
      console.log("Item deleted successfully")
  })
  .catch((err) => console.log(err))
}

const deleteCustomer = (_id, setCustomers) =>{
    axios
    .post(`${baseurlcust}/delete`,{_id: _id})
    .then((data) =>{
        console.log(data)
        getAllCustomers(setCustomers)
        console.log("Customer deleted successfully")
    })
    .catch((err) => console.log(err))
  }

const deleteInvoice = (_id, setInvoices) =>{
axios
.post(`${baseurlinvoice}/delete`,{_id: _id})
.then((data) =>{
    console.log(data)
    getAllInvoices(setInvoices)
    console.log("Customer deleted successfully")
})
.catch((err) => console.log(err))
}

export {getAllTask, addTask, updateTask, deleteTask,
    getAllActivity, addActivity, updateActivity, deleteActivity, 
    getAllItems, addItem, updateItem, deleteItem,
     getAllCustomers,addCustomer, updateCustomer, deleteCustomer,
    getAllInvoices, addInvoice,updateInvoice, deleteInvoice}