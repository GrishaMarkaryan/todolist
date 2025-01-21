import { useEffect, useState } from 'react';
import deleteIcon from './delete.png'
import './App.css'

interface Task {
  text: string;
  isChecked: boolean;
}
type Filter = 'all' | 'completed' | 'incomplete'

function App() {
  const [inputValue, setInputValue] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (inputValue === '') {
      alert('Write something')
    } else {
      const newTask: Task = { text: inputValue, isChecked: false }
      setTasks([...tasks, newTask])
      setInputValue('');
    }
  }

  const deleteTask = (index: number) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTask = (index: number) => {
    const newTasks = tasks.map((task, i) => {
      if (i === index) {
        return { ...task, isChecked: !task.isChecked };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') {
      return task.isChecked
    } else if (filter === 'incomplete') {
      return !task.isChecked
    }
    return true
  })

  return (
    <>
      <div className="background">
        <div className="container">
          <h1> todos </h1>
          <div className="input-button">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              id='inp'
              type="text"
              placeholder="Напишите задачу"
              maxLength={20} />
            <button id='btn' onClick={addTask}>
              Add
            </button>
          </div>
          <div className='advice'>*Нажмите на задачу, чтобы отметить как "Выполненное"</div>
          <ul className="list">
            {/*<li className='checked'> Task 1 </li> */}
            {filteredTasks.map((task, i) => {
              return <li
                key={i}
                className={task.isChecked ? `checked` : 'x'}
                onClick={() => toggleTask(i)}
              >
                {task.text}
                <img
                  src={deleteIcon}
                  alt="Delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteTask(i)
                  }}
                />
              </li>
            })}
          </ul>
          <div className='footer'>
            <div onClick={() => setFilter('all')}> All </div>
            <div onClick={() => setFilter('incomplete')}> Active </div>
            <div onClick={() => setFilter('completed')}> Completed </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default App
