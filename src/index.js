import add, { remove } from './modules/addremovelist.js';
import deleteItems from './modules/delete-all-list.js';
import './style.css';

const listContainer = document.querySelector('.list');
const input = document.getElementById('input');
const collection = JSON.parse(localStorage.getItem('taskList')) || [];

const renderList = () => {
  let li = '';
  if (collection) {
    collection.forEach((taskList, index) => {
      li += `
    <li class="list-item" draggable="true">
    <div class="cont1">
    <input class="check" id="checkid" type="checkbox" ${taskList.completed ? 'checked' : ''} data-id="${index}" data-com="${taskList.completed}">
    <p contenteditable="true" class="para ${taskList.completed ? 'overlined' : ''}"  data-para="${index}">
      ${taskList.description}
    </p>
    </div>
    <div class="cont2">
    <i class="fa-regular fa-trash-can trash" data-index="${index}"></i>
    <i class="li-list fa-solid fa-ellipsis-vertical dots opt"></i>
    </div>
    </li>
    `;
    });
  }
  listContainer.innerHTML = li;
};

input.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    add();
    window.location.reload();
  }
});

const toDoList = document.getElementsByClassName('list-item');
listContainer.addEventListener('click', (event) => {
  for (let i = 0; i < toDoList.length; i += 1) {
    toDoList[i].classList.remove('active');
    collection.completed = false;
  }
  if (event.target.classList.contains('list-item')) {
    event.target.classList.toggle('active');
    collection.completed = true;
    document.querySelector('.trash').style.transform = 'scale(1)';
  } else if (event.target.classList.contains('para')) {
    event.target.parentElement.classList.toggle('active');
  }
});

listContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('fa-trash-can')) {
    const index = event.target.getAttribute('data-index');
    remove(index);
    window.location.reload();
  }
});

const updateList = () => {
  for (let i = 0; i < collection.length; i += 1) {
    collection[i].index = i + 1;
  }
  localStorage.setItem('taskList', JSON.stringify(collection));
  renderList();
};
updateList();

listContainer.addEventListener('keypress', (e) => {
  if (e.target.classList.contains('para')) {
    if (e.key === 'Enter') {
      if (e.target.textContent === '') {
        return false;
      }
      const paraInd = e.target.getAttribute('data-para');
      collection[paraInd].description = e.target.textContent;
    }
  }
  return localStorage.setItem('taskList', JSON.stringify(collection));
});

const mark = document.querySelectorAll('.check');
mark.forEach((taskList) => {
  taskList.addEventListener('change', (event) => {
    const getData = JSON.parse(localStorage.getItem('taskList'));
    if (event.currentTarget.checked === true) {
      const newIndex = event.currentTarget.getAttribute('data-id');
      getData[newIndex].completed = true;
    } else {
      const newIndex = event.currentTarget.getAttribute('data-id');
      getData[newIndex].completed = false;
    }
    localStorage.setItem('taskList', JSON.stringify(getData));
    window.location.reload();
  });
});

const remBtn = document.querySelector('.btn');
remBtn.addEventListener('click', deleteItems);
