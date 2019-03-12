const toDoForm = document.querySelector(".js-toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDoList = document.querySelector(".js-toDolist");

const TODOS_LS = 'toDos';

function filterFn(toDo){
    return toDo.id === 1;
}
const toDOs = [];

function deleteToDo(event){
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo){
        return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
}
function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));
}
function paintToDo(text){
    const li = document.createElement("li");
    const delBtn = document.createElement("button");
    const span = document.createElement("span");
    const newId = toDos.length+1;

    delBtn.innerHTML="X";
    delBtn.addEventListener("click",deleteToDo);
    span.innerText= text;
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id=newid;
    toDoList.appendChild(li);
    //Creat Object
    const toDoObj = {
        text: text,
        id: toDos.length+1
    };
    toDos.push(toDoObj);
    saveToDos();
}
function handleSubmit(event){
    event.preventDeafault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function something(toDo){
    console.log(toDo.text); 
}
function loadToDos(){
    const loadToDos = localStorage.getItem(TODOS_LS);
    if(loadToDos !== null){
        const parsedToDos = JSON.parse(loadToDos);
        parsedToDos.foreach(function(toDo){
            paintToDo(toDo.text);
        });
    } 
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init();

