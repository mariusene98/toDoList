const form = document.querySelector(".form");
const input = document.querySelector(".input");
const doitBtn = document.querySelector(".doit-btn");
const listContainer = document.querySelector(".list-container");
const list = document.querySelector(".list");
const finishBtn = document.querySelector(".finish-btn");
const waterBtns = document.querySelectorAll(".water-btn");
const container = document.querySelector('.container');
const endBtn = document.querySelector('.end');
const finish = document.querySelector('.finish');
const endList = document.querySelector('.end-list');
const faceBtns = document.querySelectorAll('.face-btn');
const updatedDate = document.querySelector('.date')
let count = 0;
 
// Event listeners
form.addEventListener("submit", addTask);
waterBtns.forEach((btn) => {
    btn.addEventListener('click', color)
});
faceBtns.forEach((btn) => {
    btn.addEventListener('click', color)
});
endBtn.addEventListener("click", end);


//  Set the date
let today = new Date();
let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
updatedDate.innerHTML = `${date}`


// Load functions
window.addEventListener("DOMContentLoaded", setUpItems);


// Functions
function addTask(e) {
    e.preventDefault();      
    const task = input.value;
    const id = new Date().getTime().toString(); 
    if (task) {
        createTask(task, id);
        addToLocalStorage(task, id);
        input.value = '';
    }
};


function createTask(task, id) {                 
    const element = document.createElement('div'); 
    element.classList.add("list-item"); 
    const attr = document.createAttribute("data-id");
    attr.value = id;
    element.setAttributeNode(attr);
    element.innerHTML =`
    <p class="title">${task}</p> 
    <button class="mark-btn mark-btn-${id}"><i class="fas fa-check"></i></button>     
    <button class=" delete-btn delete-btn-${id}"><i class="fas fa-trash"></i></button>`;
    list.appendChild(element);
    const markBtn = document.querySelector(`.mark-btn-${id}`);
    const deleteBtn = document.querySelector(`.delete-btn-${id}`);
    markBtn.addEventListener('click', markItem);
    deleteBtn.addEventListener('click', deleteItem);
};


function markItem(e){
    const button = e.currentTarget;
    const title = button.previousElementSibling;
    title.classList.add('done');
    button.classList.add('doneBtn');
    button.disabled = true;
    count++;
};


function deleteItem(e) {
    const item = e.currentTarget.parentElement;
    const prevItem = e.currentTarget.previousElementSibling.textContent;
    let idp = item.getAttribute('data-id');
    deleteFromLocalStorage(idp);
    list.removeChild(item);
    if (count > 0 & prevItem !== 'mark as done') {
        count--;
    };
};


function color(e) {
    e.currentTarget.classList.toggle("color");
};


function end(e) {
    let allTasks = getLocalStorage().length;
    const waterBtns = e.currentTarget.parentElement.previousElementSibling.previousElementSibling.children;
    waterCups = 0;
    for (i=0; i<waterBtns.length; i++) {
        if (waterBtns[i].classList[1] === 'color') {
            waterCups++
        }
    };
    const facesBtns = e.currentTarget.parentElement.previousElementSibling.children;
    let type;
    let a = 0;
    let face = '';
    for (i=0; i<faceBtns.length; i++) {
        if (faceBtns[i].classList[1] === 'color') {
            face = facesBtns[i]
        } else {
            a++;
        }
    };
    if (a === 4) {
        type = face.children[0].classList[1];
    } else {
        console.log("nu");
    };
    if(allTasks > 1 & type !== undefined) {
        container.classList.add('hidden');
        finish.classList.remove('hidden')
        finish.classList.add('lastDiv');
        endList.innerHTML =`
            <ul class="rez-item">You completed ${count} tasks out of ${allTasks}. </ul>
            <ul class="rez-item">You drinked ${waterCups} cups out of 5. </ul>
            <ul class="rez-item">Your condition:<i class="far ${type} fa-lg"></i></ul>`
        localStorage.clear();
    }
};


// LOCAL STORAGE SETUP //
function addToLocalStorage(task, id) {
    const item = { task, id }
    let items = getLocalStorage();
    items.push(item);
    localStorage.setItem("list", JSON.stringify(items));
}

function getLocalStorage() {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
}

function deleteFromLocalStorage(idp) {
    let items = getLocalStorage();
    items = items.filter((item) => {
        if(item.id !== idp) {
            return item;
        }
    })
    localStorage.setItem("list", JSON.stringify(items));
}


// SETUP ITEMS //
function setUpItems() {
    let items = getLocalStorage();
    items.forEach((item) => {
        createTask(item.task, item.id);
    })
};



