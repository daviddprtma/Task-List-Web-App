function show() {
    let todoList = localStorage.getItem('todoList');
  
    if (todoList == null) {
      todoObj = [];
    } else {
      todoObj = JSON.parse(todoList);
    }
    localStorage.setItem('todoList', JSON.stringify(todoObj));
  
    let html = '';
    todoObj.forEach(function(key, value) {
      html += `
        <li id="todo-${value}" class="todo">
          <div id="todo-text-container-${value}" class="todo-text-container">
            <input
              id="check-todo-btn-${value}"
              class="check-todo-btn"
              onclick="doneTodo(${value})"
              type="checkbox">
            <input
              id="todo-text-${value}"
              class="todo-text"
              readonly
              type="text"
              value="${key}">
          </div>
          <div
            id="btn-container-${value}"
            class="btn-container">
            <button
              id="delete-todo-btn-${value}"
              class="delete-todo-btn"
              onclick="deleteTodo(${value})">
              <svg viewBox="0 0 448 512" width="20" height="20"  title="trash">
    <path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" />
  </svg>
            </button>
          <button
            id="edit-todo-btn-${value}"
            class="edit-todo-btn"
            onclick="editTodo(${value})">
            <svg viewBox="0 0 512 512" width="20" height="20" title="pencil-alt">
    <path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z" />
  </svg>
          </button>
        </li>
      `
    });
  
    let todoElement = document.getElementById('todos-list');
    if (todoObj.length != 0) {
      todoElement.innerHTML = html;
    } else {
      todoElement.innerHTML = "";
    }
  
  }
  show();
  
  function doneTodo(key) {
    let checkTodoButton = document.getElementById(`check-todo-btn-${key}`)
    if (checkTodoButton.checked) {
      let currentTodo = document.getElementById(`todo-text-${key}`);
      currentTodo.setAttribute('disabled','');
    } else {
      let currentTodo = document.getElementById(`todo-text-${key}`);
      currentTodo.removeAttribute('disabled');
    }
  }
  
  const addTodoButton = document.getElementById('add-todo-btn');
  addTodoButton.addEventListener('click', function(){
    
    let todos = localStorage.getItem('todoList');
  
    if (todos == null) {
      todoObj = [];
    } else {
      todoObj = JSON.parse(todos);
    }
    
    let inputTodo = document.getElementById('input-todo');
    todoObj.push(inputTodo.value);
    localStorage.setItem('todoList', JSON.stringify(todoObj));
    inputTodo.value = '';
    show();
  });
  
  function editTodo(value){
  
    let editTodoButton = document.getElementById(`edit-todo-btn-${value}`);
    
    const todoEl = document.getElementById(`todo-text-${value}`);
    todoEl.removeAttribute('readonly')
    const end_text = todoEl.value.length;
    todoEl.setSelectionRange(0, end_text);
    todoEl.focus();
  
    let buttonContainer = document.getElementById(`btn-container-${value}`);
    buttonContainer.removeChild(editTodoButton);
  
    let confirmEdit = document.createElement('button');
    confirmEdit.setAttribute('id', `confirm-edit-btn-${value}`);
    confirmEdit.setAttribute('class', 'confirm-edit-btn');
    confirmEdit.innerHTML = `
      <svg viewBox="0 0 512 512" width="20" height="20" title="check">
    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
  </svg>
    `;
    buttonContainer.appendChild(confirmEdit);
  
    confirmEdit.addEventListener('click', function(){
      let todoList = localStorage.getItem('todoList');
  
      if (todoList == null) {
        todoObj = [];
      } else {
        todoObj = JSON.parse(todoList);
      }
      todoObj[value] = todoEl.value;
      localStorage.setItem('todoList', JSON.stringify(todoObj));
  
      todoEl.setAttribute('readonly','');
      buttonContainer.removeChild(confirmEdit);
      buttonContainer.appendChild(editTodoButton);
      show();
    });
  };
  
  function deleteTodo(key) {
    let todoList = localStorage.getItem('todoList');
  
    if (todoList == null) {
      todoObj = [];
    } else {
      todoObj = JSON.parse(todoList);
    }
    todoObj.splice(key, 1);
    localStorage.setItem('todoList', JSON.stringify(todoObj))
    show();
  };