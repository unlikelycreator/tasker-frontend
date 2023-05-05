import axios from 'axios'

const baseurl = "https://tasker-backend.onrender.com/tasks"
const baseurlac = "https://tasker-backend.onrender.com/activities"
const baseurlItem = "https://tasker-backend.onrender.com/item"
/*https://tasker-backend.onrender.com*/

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

const addItem = (itemName, itemDescription, itemPrice, setItems) =>{
  axios
  .post(`${baseurlItem}/save`,{itemName: itemName, itemDescription: itemDescription, itemPrice: itemPrice, setItems})
  .then((data) =>{
      console.log(data);
      getAllItems(setItems)
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


export {getAllTask, addTask, updateTask, deleteTask, getAllActivity, addActivity, updateActivity, deleteActivity, getAllItems, addItem, updateItem, deleteItem}
