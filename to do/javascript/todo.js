let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let myDiv = document.querySelector(".tasks");

let dataArray = [] ; 

if (localStorage.getItem("userTasks")) {
    dataArray = JSON.parse(localStorage.getItem("userTasks"));
}

getElementFromLocalStorage ();

submit.onclick = function () {
    if (input.value !== "") {
        getTaskValue(input.value);
        input.value = "";
    }
}

// click event to delete the element 
myDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        deleteFromLocal (e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }

    if (e.target.classList.contains("task")) {
        toggleStatuOfTask (e.target.getAttribute("data-id"));
        e.target.classList.toggle("done");

    }
})

function getTaskValue(taskText) {
    const task = {
        id : Date.now(),
        title : taskText ,
        completed : false ,
    }
    dataArray.push(task);

    showElementToPage(dataArray);

    showDataInLocalStorage(dataArray);
}

function showElementToPage (dataArray) {
    myDiv.innerHTML = "" ;
    dataArray.forEach((task) => {
        let div = document.createElement("div");
        div.className = "task" ; 
        if (task.completed) {
            div.className = "task done "
        }
        div.setAttribute ("data-id", task.id);
        div.appendChild(document.createTextNode(task.title));

        let span = document.createElement("span");
        span.className = "del";
        span.appendChild(document.createTextNode("delete"));
        div.appendChild(span);
        myDiv.appendChild(div);
    })
}

function showDataInLocalStorage () {
    window.localStorage.setItem("userTasks", JSON.stringify(dataArray));
}

function getElementFromLocalStorage () {
   let data = localStorage.getItem("userTasks");
   if (data) {
    let tasks = JSON.parse(data);
    showElementToPage (tasks);
   }
}

 function deleteFromLocal (taskId) {
    dataArray = dataArray.filter((task) => task.id != taskId);
    showDataInLocalStorage (dataArray);
 }

 function toggleStatuOfTask(taskId)  {
    for (let i = 0 ; i < dataArray.length ; i++) {
        if (dataArray[i].id == taskId) {
            dataArray[i].completed == false ? (dataArray[i].completed = true) :( dataArray[i].completed = false);
            showDataInLocalStorage (dataArray);
        }
    }
 }
