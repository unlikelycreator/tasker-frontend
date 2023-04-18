import axios from 'axios'

const baseurl = "http://localhost:5000/tasks"
const baseurlac = "http://localhost:5000/activities"
const baseurlta = "http://localhost:5000/ta"

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

const getAllTA = (setTA) => {
    axios
    .get(baseurlta)
    .then(({data}) =>{
        console.log('data -->', data);
        setTA(data)
    })
}


const addTask = (text, setText, setTask) =>{
    axios
    .post(`${baseurl}/save`,{text})
    .then((data) =>{
        console.log(data);
        setText("")
        getAllTask(setTask)
    }).catch((err) => console.log(err))
}

const addActivity = (text, setText, setActivity) =>{
    axios
    .post(`${baseurlac}/save`,{text})
    .then((data) =>{
        console.log(data);
        setText("")
        getAllActivity(setActivity)
    }).catch((err) => console.log(err))
}


const updateTask = (taskId, text, setTask, setText, setIsUpdating) =>{
    axios
    .post(`${baseurl}/update`,{_id: taskId, text})
    .then((data) =>{
        setText("")
        setIsUpdating(false)
        getAllTask(setTask)
    })
    .catch((err) => console.log(err))
}

const updateActivity = (ActivityID, text, setActivity, setText, setIsUpdating) =>{
    axios
    .post(`${baseurlac}/update`,{_id: ActivityID, text})
    .then((data) =>{
        setText("")
        setIsUpdating(false)
        getAllActivity(setActivity)
    })
    .catch((err) => console.log(err))
}

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

export {getAllTask, addTask, updateTask, deleteTask, getAllActivity, addActivity, updateActivity, deleteActivity, getAllTA}