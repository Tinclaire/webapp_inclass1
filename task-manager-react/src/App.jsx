import { useState } from 'react'
import './App.css'

let nextId = 1

function App() {
  const [tasks, setTasks] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [hint, setHint] = useState('')

  function addTask() {
    const text = inputValue.trim()

    if (!text) {
      setHint('請輸入任務名稱')
      return
    }

    setHint('')
    setTasks([...tasks, { id: nextId++, text, completed: false }])
    setInputValue('')
  }

  function toggleTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id))
  }

  function handleKeyDown(event) {
    if (event.key === 'Enter') {
      addTask()
    }
  }

  const total = tasks.length
  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="app-main">
      <header className="app-header">
        <h1>My Task Manager（React 版）</h1>
      </header>

      <section className="task-input-section">
        <h2>新增任務</h2>
        <label htmlFor="task-input">任務名稱：</label>
        <input
          id="task-input"
          type="text"
          placeholder="輸入任務名稱..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button type="button" onClick={addTask}>新增</button>
        <p className="hint">{hint}</p>
      </section>

      <section className="task-list-section">
        <h2>任務清單</h2>
        <ul id="task-list">
          {tasks.map(task => (
            <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
              />
              <span className="task-text">{task.text}</span>
              <button type="button" className="delete-btn" onClick={() => deleteTask(task.id)}>
                刪除
              </button>
            </li>
          ))}
        </ul>
      </section>

      <footer className="app-footer">
        <p>共 {total} 項　未完成 {activeCount} 項　已完成 {completedCount} 項</p>
      </footer>
    </div>
  )
}

export default App
