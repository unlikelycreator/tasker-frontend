import axios from 'axios'

const baseurl = "http://localhost:5000/tasks"
const baseurlac = "http://localhost:5000/activities"

/*https://tasker-backend.onrender.com*/
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

const updateTaskta = (taskId,setTask, selectedOptions) =>{
  axios
    .post(`${baseurl}/update`,{_id: taskId, selectedOptions: selectedOptions})
    .then((data) =>{
      getAllTask(setTask)
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

/*
const addTA = (selectedTask, selectedOptions, setAllData) => {
      axios
        .post(`${baseurlta}/save`,{ task: selectedTask, selectedOptions })
        .then(data => {
          console.log(data);
          getAllTA(setAllData);
        })
        .catch(err => console.log(err));
    }


const updateTA = (selectedTask, selectedOptions, setAllData, taID) => {
    axios
    .post(`${baseurlta}/update`,{_id: taID,task: selectedTask,selectedOptions: selectedOptions.every(
        (option, index) => option.text === selectedOptions[index].text
      )})
    .then((data) =>{
        console.log(data)
        getAllTA(setAllData)
    })
    .catch((err) => console.log(err))
};*/

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
/*
const getAllTA = (setAllData) => {
    axios
    .get(baseurlta)
    .then(({data}) =>{
        console.log('data -->', data);
        setAllData(data)
    })
}
const addTA = (selectedTask, selectedOptions, setAllData, allData) => {
    // check if selectedTask and selectedOptions already exist in allData state
    const taskExists = allData.some(
      task =>
        task.task === selectedTask &&
        task.selectedOptions.length === selectedOptions.length &&
        task.selectedOptions.every(
          (option, index) => option.text === selectedOptions[index].text
        )
    );
    if (taskExists) {
      const existingTask = allData.find(
        task =>
          task.task === selectedTask &&
          task.selectedOptions.length === selectedOptions.length &&
          task.selectedOptions.every(
            (option, index) => option.text === selectedOptions[index].text
          )
      );
      axios
        .put(`${baseurlta}/update/${existingTask._id}`, {
          selectedOptions,
        })
        .then(data => {
          console.log(data);
          getAllTA(setAllData);
        })
        .catch(err => console.log(err));
    } else {
      axios
        .post(`${baseurlta}/save`, { task: selectedTask, selectedOptions })
        .then(data => {
          console.log(data);
          getAllTA(setAllData);
        })
        .catch(err => console.log(err));
    }
  };
const deleteTA = (_id, setAllData) =>{
    axios
    .post(`${baseurlta}/delete`,{_id: _id})
    .then((data) =>{
        console.log(data)
        getAllTA(setAllData)
    })
    .catch((err) => console.log(err))
}

*/

export {getAllTask, addTask, updateTask, updateTaskta, deleteTask, getAllActivity, addActivity, updateActivity, deleteActivity}