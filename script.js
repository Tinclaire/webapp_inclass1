
// { id: 唯一值, text: 任務文字, completed: true/false }
let tasks = [];

// 目前的篩選狀態：'all' | 'active' | 'completed'
let currentFilter = 'all';

// 產生不重複的任務 id
let nextId = 1;


// DOM 參照
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const inputHint = document.getElementById('input-hint');
const taskListEl = document.getElementById('task-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const statsEl = document.getElementById('task-stats');


// Checkpoint 3-1：新增任務
function addTask() {
  let input = taskInput.value.trim()

  if (!input) {
    inputHint.textContent = "請輸入任務名稱"
    return
  }

  inputHint.textContent = ""
  let newTask = {
    id: nextId++,
    text: input,
    completed: false
  }

  tasks.push(newTask)
  taskInput.value = ""

  renderTasks()
}


// Checkpoint 3-2：切換完成狀態
function toggleTask(id) {
  let task = tasks.find(t => t.id === id)
  task.completed = !task.completed
  renderTasks()
}


// Checkpoint 3-3：刪除任務
function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id)
  renderTasks()
}


// Checkpoint 3-4：依目前篩選狀態，回傳要顯示的任務陣列
function getFilteredTasks() {
  if (currentFilter === 'all') {
    return tasks
  }
  if (currentFilter === "active") {
    return tasks.filter(t => t.completed === false)
  }
  if (currentFilter === "completed") {
    return tasks.filter(t => t.completed === true)
  }
}


// Checkpoint 3-5：更新統計資訊
function updateStats() {
  let total = tasks.length
  let active = tasks.filter(t => t.completed === false).length
  let completed = tasks.filter(t => t.completed === true).length

  statsEl.textContent = `共 ${total} 項 未完成 ${active} 項 已完成 ${completed} 項`
}


// 畫面渲染
function renderTasks() {
  let displayTasks = getFilteredTasks()
  taskListEl.innerHTML = '' // 清空 taskListEl 現有內容
  displayTasks.forEach(task => {
    let li = document.createElement('li')
    li.classList.add("task-item")

    if (task.completed) {
      li.classList.add("completed")
    }

    let checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = task.completed
    checkbox.addEventListener('change', () => {
      toggleTask(task.id)
    })
    li.appendChild(checkbox)

    let span = document.createElement('span')
    span.className = "task-text"
    span.textContent = task.text
    li.appendChild(span)

    let button = document.createElement('button')
    button.className = "delete-btn"
    button.textContent = "刪除"
    button.addEventListener('click', () => {
      deleteTask(task.id)
    })
    li.appendChild(button)

    taskListEl.appendChild(li)
  });

  updateStats()
}


// 事件綁定
// 點擊「新增」按鈕
addTaskBtn.addEventListener('click', () => {
  addTask()
});

// 在輸入框按下 Enter 鍵也要能新增任務
taskInput.addEventListener('keydown', (event) => {
  if (event.key === "Enter") {
    addTask()
  }
});

// 三個篩選按鈕（全部／未完成／已完成）
filterBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    currentFilter = btn.dataset.filter
    filterBtns.forEach((b) => b.classList.remove("is-active"))
    btn.classList.add("is-active")
    renderTasks()
  });
});


// 頁面載入時先渲染一次
renderTasks();
