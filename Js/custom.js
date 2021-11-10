let input = document.querySelector(".input");
let date = document.querySelector(".date");
let content = document.querySelector(".content")
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let borderBottom = document.querySelector(".border");
let counter = document.querySelector(".counter");
let taskDate = document.querySelector(".date");
let daysSpan = document.querySelector(".days");
let minutesSpan = document.querySelector(".minutes");
let hourseSpan = document.querySelector(".hourse");
let secondsSpan = document.querySelector(".seconds");
// initialize empty array of tasks
let arrayOfTasks = [];






// keep tasks in array 
if (localStorage.getItem("task")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("task"));
}







// get data from local storage function
getDataFromLocalStorage();






//  validations
input.oninput = function () {
  let maxlength = input.getAttribute("maxlength");
  borderBottom.style.width = `${this.value.length * 100 / maxlength}%`;
  if (borderBottom.style.width === "100%") {
    borderBottom.style.backgroundColor = "rgb(74, 199, 95)";

    counter.style.color = "rgb(74, 199, 95)";
  }
  else if (borderBottom.style.width >= "0%" && borderBottom.style.width <= "50%") {
    borderBottom.style.backgroundColor = "#f00";
    counter.style.color = "#f00";
  }
  else if (borderBottom.style.width >= "51%" && borderBottom.style.width <= "75%") {
    borderBottom.style.backgroundColor = "#ff0";
    counter.style.color = "rgb(116, 116, 50)"
  }

  else {
    borderBottom.style.backgroundColor = "rgb(74, 199, 95)";
    counter.style.color = "rgb(74, 199, 95)";
  }

  counter.innerHTML = maxlength - this.value.length;
}
document.onkeyup = function (e) {
  if (e.key === "Enter") {
    if (input.value !== "") {
      AddTaskToArray(input.value, content.value, date.value); // add task content to array
      //empty value of input
      input.value = "";
      date.value = "";
      content.value = "";
    }
  }
}











submit.onclick = function (e) {
  e.preventDefault();
  if (input.value !== "") {
    AddTaskToArray(input.value, content.value, date.value); // add task content to array
    //empty value of input
    input.value = "";
    date.value = "";
    content.value = "";
  }
};



















function AddTaskToArray(taskTitle, taskContent, taskDate) {
  // task Data
  let Task = {
    id: Date.now(),
    taskTitle: taskTitle,
    taskContent: taskContent,
    taskDate: taskDate,
    completed: false
  }
  arrayOfTasks.push(Task);
  // add date to document
  addElementToPageFrom(arrayOfTasks);
  // add tasks to local storage 
  addDataToLocalStorageFrom(arrayOfTasks);
  // console.log(arrayOfTasks);
  // console.log(JSON.stringify(arrayOfTasks));

}

// click on task element
tasksDiv.addEventListener("click", function (e) {
  if (e.target.classList.contains("del")) {
    // remove element from child 
    e.target.parentElement.remove();
    // remove from localstorage
    removeFromLocalStorage(e.target.parentElement.getAttribute("data-id"));
  }

  if (e.target.classList.contains("task")) {
    // Toggle Completed For The Task
    toggleStatusTaskWith(e.target.getAttribute("data-id"));

    // Toggle Done Class
    e.target.classList.toggle("done");
  }
})







function addElementToPageFrom() {
  tasksDiv.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let parentTask = document.createElement("div");
    parentTask.className = "task";
    // Check If Task is Done
    if (task.completed) {
      parentTask.className = "task done";
    }
    parentTask.setAttribute("data-id", task.id)
    let Title = document.createElement("h2");
    Title.className = "task-title";
    Title.appendChild(document.createTextNode(task.taskTitle));
    parentTask.appendChild(Title);
    //  create p for task content
    let content = document.createElement("p");
    content.className = "content";
    content.appendChild(document.createTextNode(task.taskContent))
    parentTask.appendChild(content);
    // create p for expire date 
    let date = document.createElement("p");
    date.className = "expire";
    date.appendChild(document.createTextNode(task.taskDate))
    parentTask.appendChild(date);
    // createdelete button 
    let deleteSpan = document.createElement("span");
    deleteSpan.className = "del";
    deleteSpan.appendChild(document.createTextNode("Delete"));
    parentTask.appendChild(deleteSpan);
    let currentDate = new Date();
    if(Date.parse(task.taskDate) - Date.parse(currentDate) <= 0)
  
   {   parentTask.classList.add("expired");
      console.log("yes")
  }
    else{
      parentTask.classList.remove("expired");
      console.log("No")
    }
    tasksDiv.appendChild(parentTask)
    console.log(parentTask);

  });
}











// add data to local storage
function addDataToLocalStorageFrom(arrayOfTasks) {
  localStorage.setItem("task", JSON.stringify(arrayOfTasks));
}









// get data from local storage
function getDataFromLocalStorage() {
  let data = localStorage.getItem("task");
  if (data) {
    let tasks = JSON.parse(data);
    addElementToPageFrom(tasks)
  }
}



//remove data from local storage
function removeFromLocalStorage(taskid) {
  // return all tasks without clicked task
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskid);
  addDataToLocalStorageFrom(arrayOfTasks);
}




// toggle completed status
function toggleStatusTaskWith(taskId) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id == taskId) {
      arrayOfTasks[i].completed == false ? (arrayOfTasks[i].completed = true) : (arrayOfTasks[i].completed = false);
    }
  }
  addDataToLocalStorageFrom(arrayOfTasks);
}


// delete All 
let deletebtn = document.querySelector(".deleteAll");

deletebtn.onclick = function () {
  tasksDiv.innerHTML = "";
  localStorage.removeItem("task")
}



// count Down 


function setOutTime(el) {
  
  for(let i = 0 ; i < arrayOfTasks.length ; i++){
    
  }
}