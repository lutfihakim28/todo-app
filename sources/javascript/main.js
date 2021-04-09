// useful variables
var allTodo, activeTodo, completeTodo;
var allList = document.getElementById('allTodo');
var activeList = document.getElementById('activeTodo');
var completeList = document.getElementById('completeTodo')
var menus = ['all', 'active', 'complete'];
// ---------------------------------------------------------------------------- //

// this function is used to switch dark/light theme for element selector
function elementLightSwitcher(element) {
  var el = document.getElementsByTagName(element);
  for (let i = 0; i < el.length; i++) {
    el[i].classList.toggle('light');
  };
}

// this function is used to get all todo from local storage
function getAllTodo() {
  var all = [];
  for (let key in localStorage) {
    if (localStorage.getItem(key) !== null) {
      all.push(JSON.parse(localStorage.getItem(key)));
    }
  }
  allTodo = all.sort((a, b) => {
    return b.id - a.id;
  });
  
  // active todo
  let active = allTodo.filter(todo => todo.checked == false);
  activeTodo = active;
  
  // complete todo
  let complete = allTodo.filter(todo => todo.checked == true);
  completeTodo = complete;
}

// this function is used to print list on ul
function printAllTodo() {
  // remove content from all ul
  allList.innerHTML = '';
  activeList.innerHTML = '';
  completeList.innerHTML = '';

  // print something when no todo
  if (allTodo.length == 0) {
    allList.innerHTML = '<div class="empty">There are nothing Todo...</div>'
  }

  if (activeTodo.length == 0) {
    activeList.innerHTML = '<div class="empty">There are no active Todo...</div>'
  }

  if (completeTodo.length == 0) {
    completeList.innerHTML = "<div class='empty'>There are no completed Todo</div>"
  }

  // print all todo
  allTodo.forEach(todo => {
    if (todo.checked) {
      return allList.innerHTML += `
          <li>
            <div class="round">
              <input type="checkbox" class="checkbox" id="all-${ todo.id + 1 }" onclick="doneTodo(this)" checked></input>
              <label for="all-${ todo.id + 1 }" class="todo-label">${ todo.todo }</label>
            </div>
            <button id="all-${ todo.id }" class="delete" onclick="deleteTodo(this.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
              </svg>
            </button>
          </li>`;
    }
    return allList.innerHTML += `
          <li>
            <div class="round">
              <input type="checkbox" class="checkbox" id="all-${ todo.id + 1 }" onclick="doneTodo(this)"></input>
              <label for="all-${ todo.id + 1 }" class="todo-label">${ todo.todo }</label>
            </div>
            <button id="all-${ todo.id }" class="delete" onclick="deleteTodo(this.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
              </svg>
            </button>
          </li>`;
  });

  // print active todo
  activeTodo.forEach(todo => {
    return activeList.innerHTML += `
          <li>
            <div class="round">
              <input type="checkbox" class="checkbox" id="active-${ todo.id + 1 }" onclick="doneTodo(this)"></input>
              <label for="active-${ todo.id + 1 }" class="todo-label">${ todo.todo }</label>
            </div>
            <button id="active-${ todo.id }" class="delete" onclick="deleteTodo(this.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
              </svg>
            </button>
          </li>`;
  });

  // print complete todo
  completeTodo.forEach(todo => {
    return completeList.innerHTML += `
          <li>
            <div class="round">
              <input type="checkbox" class="checkbox" id="complete-${ todo.id + 1 }" onclick="doneTodo(this)" checked></input>
              <label for="complete-${ todo.id + 1 }" class="todo-label">${ todo.todo }</label>
            </div>
            <button id="complete-${ todo.id }" class="delete" onclick="deleteTodo(this.id)">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18">
                <path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/>
              </svg>
            </button>
          </li>`;
  });
}

// this function is used to count the todo
function countTodo() {
  if (activeTodo.length == 1) {
    document.getElementById('counter').innerHTML = activeTodo.length + ' item';
  }
  document.getElementById('counter').innerHTML = activeTodo.length + ' items';
}

function getPrintCountTodo() {
  getAllTodo();
  printAllTodo();
  countTodo();
}

// ============================================================================ //

window.onload = () => {
  getPrintCountTodo();
}

// dark/light switcher
function switchTheme() {
  document.getElementsByTagName('body')[0].classList.toggle('light');
}

// this function used to handle switching between tab all/active/completed
function changeTab(tabId) {
  // make all element hidden and remove disabled attribute from all button
  menus.forEach(menu => {
    return [
      document.getElementById(menu).removeAttribute('disabled'),
      document.getElementById(menu).className = 'text-only',
      document.getElementById(menu + 'Todo').className = 'display-none'
    ]
  });

  // add active style and disabled attribute on the active button
  document.getElementById(tabId).className = 'text-only active';
  document.getElementById(tabId + 'Todo').className = 'display-block';
  document.getElementById(tabId).setAttribute('disabled', '');

  printAllTodo();
}

// this function will trigger on form submit, and it will store the input value to local storage
function newTodo(formTodo) {
  var input = document.getElementById('inputTodo').value;
  var date = new Date().getTime();
  var data = {
    todo: input,
    checked: false,
    id: date
  }
  localStorage.setItem(JSON.stringify(date), JSON.stringify(data));
  formTodo.reset();

  getPrintCountTodo();
}

// this function will clear all completed todo
function clearCompleted() {
  completeTodo.forEach(todo => localStorage.removeItem(todo.id));

  getPrintCountTodo();
}

// this function will delete single todo
function deleteTodo(todoId) {
  var key = todoId.slice(-13);
  localStorage.removeItem(key);

  getPrintCountTodo();
}

// checkbox handler
function doneTodo(todo) {
  var todoId = todo.id.slice(-13) - 1;
  var done = allTodo.find(el => el.id == todoId);
  done.checked = todo.checked;

  localStorage.setItem(JSON.stringify(todoId), JSON.stringify(done));
  getAllTodo();
  countTodo();
}

// drag and drop reorder list
new Sortable(allList, {
  animation: 150,
});

new Sortable(activeList, {
  animation: 150,
});

new Sortable(completeList, {
  animation: 150,
})
