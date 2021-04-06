import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState ([])  //setTasks is a function to update the state


useEffect(() => {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }

  getTasks()
}, [])  //[] = Dependency array

//Fetch Tasks from Server
const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()

  return data
}

//Fetch single task
const fetchTask = async (id) => {
  const res = await fetch(`http://localhost:5000/tasks/${id}` )
  const data = await res.json()

  return data
}


// Add Task
const addTask = async (task) => {
  const res = await fetch('http://localhost:5000/tasks',{
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()
  setTasks([...tasks, data])

  //  //console.log(task);
  //  const id = Math.floor( Math.random() * 10000) + 1
  //  const newTask = { id, ...task }
  //  setTasks([...tasks, newTask])    
}

//Delete Task
const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`,{
    method: 'DELETE'
  })

  setTasks(tasks.filter((task) => task.id !== id))
}

// Toggle Reminder
const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)
  const updTask = { ...taskToToggle,
  reminder: !taskToToggle.reminder }

  const res = await fetch (`http://localhost:5000/tasks/${id}`,{
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()


  setTasks(
    tasks.map((task) => 
    task.id === id ? { ...task, reminder: 
      data.reminder } : task)) //Three dots represents rest parameters. we can also write
}                                                  //{text:task.text, reminder: !task.reminder} three dots just mean all the parameters are passing as it is. 

  return (
    <div className='container'>
      <Header onAdd={ () => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} 
      onDelete={deleteTask}
      onToggle={toggleReminder}/> : 'No Tasks'}
    </div>
  );
}

export default App;
