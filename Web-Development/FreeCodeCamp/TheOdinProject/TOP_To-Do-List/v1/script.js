class NewProject {
    constructor (projectTitle, projectDescription){
        this.projectTitle = projectTitle;
        this.projectDescription = projectDescription;
    }

}


// Global Variables
let mainContainer = document.getElementById("tasksDiv");
const createDiv = document.createElement("div");
const createH3 = document.createElement("h3");
const createP = document.createElement("p");
const createButton = document.createElement("button");



// Add new Project to localStorage
const addBtn = document.getElementById("AddBtn");
addBtn.addEventListener("click", () => {
let counter = localStorage.length;   
let newPjTitle = document.getElementById("newProjectTitle").value;
let newPjDes = document.getElementById("newProjectDescription").value;
//let newDate = document.getElementById("newDate").value;
//let newPrio = document.getElementById("newPrio").textContent;
let newProject = new NewProject(newPjTitle, newPjDes);
localStorage.setItem(`Project ${counter}`, JSON.stringify(newProject));
getProjects();
})


//let isHide = false;

getCounter = 0;
function getProjects() {
    // Holen der Objekte vom localStorage
    let newProjects = JSON.parse(localStorage.getItem(`Project ${getCounter}`));
    if (newProjects != null){

    // Assign values to correct elements, oush it to DOM and show it
    // Create new elements for projects
    let newDiv = document.createElement("div");
    newDiv.setAttribute("id", "newProject");
    mainContainer.appendChild(newDiv);
    let pjTitle = document.createElement("h4");
    pjTitle.textContent = newProjects.projectTitle;
            // Set specific id to find the reference of the project with this id again. For example tha add new task needs it to finde the riht project in the localStorage
            pjTitle.setAttribute("id", `Project ${getCounter}`);
    let pjDescribt = document.createElement("p");
    pjDescribt.textContent =  newProjects.projectDescription;
    let removerDiv = document.createElement("div");
    removerDiv.setAttribute("id", "removerDiv");
    let newTaskHeader = document.createElement("p");
    newTaskHeader.textContent = "Add new tasks here!";
    let newTaskTitle = document.createElement("input");
    newTaskTitle.type = "text";
    newTaskTitle.maxLength = "15";
    newTaskTitle.placeholder = "New Task";
    let newTaskDescription = document.createElement("textarea");
    newTaskDescription.placeholder = "New task description here!";
    let timerDiv = document.createElement("div");
    let timeText = document.createElement("label");
    timeText.textContent = "Due: ";
    let newTaskDueTime = document.createElement("input");
    newTaskDueTime.type = "dateTime-local";
    let newTaskPriorityText = document.createElement("label");
    newTaskPriorityText.textContent = "Priority: ";
    let newTaskPriority = document.createElement("input");
    newTaskPriority.type = "number";
    newTaskPriority.min = "1";
    newTaskPriority.max = "5";
    let newTaskAddBtn = document.createElement("button");
    newTaskAddBtn.textContent = "Add new Task";
    
    // Append new Elements to DOM
        // Project information elements
        newDiv.appendChild(pjTitle);
        newDiv.appendChild(pjDescribt);
        newDiv.appendChild(removerDiv);
        // Add new task elements
        removerDiv.appendChild(newTaskHeader);
        removerDiv.appendChild(newTaskTitle);
        removerDiv.appendChild(newTaskDescription);
        removerDiv.appendChild(timerDiv);
        removerDiv.appendChild(timeText);
        removerDiv.appendChild(newTaskDueTime);
        removerDiv.appendChild(newTaskPriorityText);
        removerDiv.appendChild(newTaskPriority);
        removerDiv.appendChild(newTaskAddBtn);
       
        function showTasks() {
    // Show saved Tasks   
    let key = pjTitle.getAttribute("id");
    let project = JSON.parse(localStorage.getItem(key));
    //Delete Project title and description whih is saved in the Projects localStorage but dont need in task view section
    delete project["projectTitle"];
    delete project["projectDescription"];
    let taskViewCounting = 1;
    for (let el in project){
        let showTasks = document.createElement("div");
        showTasks.innerHTML = project[el];
        removerDiv.appendChild(showTasks);
        if (taskViewCounting %4 == 0){
            let taskDelBtn = document.createElement("button");
            taskDelBtn.textContent = "Remove this task";
            removerDiv.appendChild(taskDelBtn);
            taskDelBtn.addEventListener();
        }
        taskViewCounting++;
        }
        }
        showTasks();

        let taskCounter = 0;
        // Function for adding new tasks to the right project, push it to DOM and store it in localStorage
    newTaskAddBtn.onclick = function (){
       
        // Getting values from the DOM
        let pushTitle = newTaskTitle.value;
        let pushDescription = newTaskDescription.value;
        let pushTime = newTaskDueTime.value;
        let pushPrio = newTaskPriority.value;
        console.log(pushTitle);
        console.log(pushDescription);
        console.log(pushTime);
        console.log(pushPrio);

        // Create new elements
        let pushTitleDom = document.createElement("p");
        let pushDescriptionDom = document.createElement("p");
        let pushTimeDom = document.createElement("p");
        let pushPrioDom = document.createElement("p");

        // Assign values to elements
        pushTitleDom.innerText = newTaskTitle.value;
        pushDescriptionDom.innerText = newTaskDescription.value;
        pushTimeDom.innerText = newTaskDueTime.value;
        pushPrioDom.innerText = newTaskPriority.value;

        // Push it to DOM
        removerDiv.appendChild(pushTitleDom);
        removerDiv.appendChild(pushDescriptionDom);
        removerDiv.appendChild(pushTimeDom);
        removerDiv.appendChild(pushPrioDom);

                let key = pjTitle.getAttribute("id");
                 // Get tasks counted
                 let t = JSON.parse(localStorage.getItem(key));
                 let taskedCounter = Object.keys(t).length + 2;
                 let taskingC = taskedCounter -4;
                // Store it to localStorage
                // Getting right Object variable numbers for pushing in localStorage and not override if Website refresh
                let keyvarTitle = `tasktitle` + taskingC;
                let keyvarDescription = `taskDescription` + taskingC;
                let keyvarDueTime = `taskTime` + taskingC;
                let keyvarPriority = `taskPriority` + taskingC;
               
                // Create new Object with the new task values
                let obj = {
                [keyvarTitle]: pushTitle,
                [keyvarDescription]: pushDescription,
                [keyvarDueTime]: pushTime,
                [keyvarPriority]: pushPrio
                }
            
                // Finding the right project with the id "from above"
                let project = JSON.parse(localStorage.getItem(key));
                // Bring old localStorage Values and new together. JSON Stringify it to get reade for push
                console.log(project);
                Object.assign(project, obj);
                let pushingObj = JSON.stringify(project);               
                // Push Project with new tasks to localStorage
                localStorage.setItem(key, pushingObj);
        
    // Increase counter to get ready for the next tasks
    taskCounter++;
    }

    



    // As long as there is at least 1 object in localStorage, get it, push it to DOM and invoke getProjects again
if (newProjects  && getCounter < localStorage.length){
    getCounter++;
    getProjects();
}
}
}

//Invoke getProjects to initialize the application flow
getProjects();






// Show and Hide function
    //pjTitle.onclick = toggleDisplay();
/*
function toggleDisplay(){
let j  = document.querySelectorAll("h4");
    for (let el in j){
    j[el].addEventListener('click', () =>{
    
        if (j[el].firstChild.setAttribute("style", "display: none")){
            j[el].firstChild.setAttribute("style", "display: flex")
        } else {
            j[el].firstChild.setAttribute("style", "display: none")
        }
    
    
    })}
}
*/




/*
document.getElementById("btn1").addEventListener("click", function(){
    let neues = new ToDo("tit", "desc", "due", "11");
    localStorage.setItem("test1", JSON.stringify(neues));
    // JSON Parsen ergibt ein Objekt das mit test1.title den value retourned
    let test1 = JSON.parse(localStorage.getItem("test1"));
})
*/