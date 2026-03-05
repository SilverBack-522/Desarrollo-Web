const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("taskCount");

let tareas = 0;

function actualizarContador(){
    counter.textContent = tareas;
}

form.addEventListener("submit", function(event){

    event.preventDefault();

    const texto = input.value.trim();

    if(texto === ""){
        return;
    }

    const li = document.createElement("li");
    li.textContent = texto;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function(){

        list.removeChild(li);
        tareas--;
        actualizarContador();

    });

    li.appendChild(deleteBtn);

    list.appendChild(li);

    tareas++;
    actualizarContador();

    input.value = "";
});