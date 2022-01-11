const addBtn = document.querySelector(".add-button");
const inputValue = document.querySelector(".text");
const tasks = document.querySelector(".tasks");
let deleteBtn = document.querySelectorAll(".delete-btn");

/* Yeni bir veri eklendigi zaman onu element  olarak oluşturup
 tasks class'ına sahib element'in içinde ekler */

const createTodo = (todo) => {

    const task = document.createElement("div");
    task.classList.add("task");

    const leftSide = document.createElement("div");
    leftSide.classList.add("left-side");

    const checkBox = document.createElement("input");
    checkBox.classList.add("check-btn");
    checkBox.checked = todo.isCompleted;
    checkBox.type = "checkbox";

    const span = document.createElement("span");
    span.classList.add("task-name");
    span.innerHTML = todo.text;

    const rightSide = document.createElement("div");
    rightSide.classList.add("right-side");

    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-btn");

    const trash = document.createElement("i");
    trash.classList.add("fas")
    trash.classList.add("fa-trash-alt");


    leftSide.appendChild(checkBox);
    leftSide.appendChild(span);

    deleteButton.appendChild(trash);
    rightSide.appendChild(deleteButton)

    task.appendChild(leftSide)
    task.appendChild(rightSide)

    tasks.appendChild(task);
    deleteButton.addEventListener("click", deleteTodo)
    checkBox.addEventListener("click", checkTodo)

}

/* Sayfa açıldıgı zaman localstorage'de  kayıtlı olan
verileri alınır  element  olarak  oluştrur ve  sayfaya eklenir  */
const startTodo = () => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    if (!todos) {
        localStorage.setItem("todos", JSON.stringify([]))
    }
    else {
        todos.forEach(todo => {
            createTodo(todo);
        });
    }
}

/* Butona tıklandıgı zaman input'un içindeki value'yi alır ve 
yeni element'in text'ine  yazar ve ekleme işlemini yapar */
const addTodo = (e) => {

    e.preventDefault();
    let textValue = inputValue.value;
    let result = textValue.trim();

    if (result == "") {
        let alertt = document.querySelector(".alert")
        alertt.style.display = "block"

        setInterval(() => {
            alertt.style.display = "none"

        }, 2000);
    }
    else {
        const todo = {
            text: result,
            isCompleted: false
        }
        let todos = JSON.parse(localStorage.getItem("todos"));
        todos.push(todo);
        localStorage.setItem("todos", JSON.stringify(todos));

        let success = document.querySelector(".success");
        success.style.display = "block"

        setInterval(() => {
            success.style.display = "none"
        }, 2000);

        createTodo(todo);
    }
    inputValue.value = "";
}

/* Çöp kutusuna tıklayınca parent elementlerine gider ve 
text verisini  alıp localstorage'ta kontrol eder eşleşen  veriyi localstorage'dan siler */
const deleteTodo = (e) => {
    let todo = e.target.parentElement.parentElement.parentElement;
    let text = todo.firstElementChild.children[1].textContent;

    let todos = JSON.parse(localStorage.getItem("todos"));
    todos = todos.filter(td => td.text != text)
    localStorage.setItem("todos", JSON.stringify(todos));

    todo.remove();
}

const checkTodo = (e) => {
    const todo = e.target.parentElement;
    const text = todo.children[1].textContent;

    let todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo => {
        if (todo.text === text) todo.isCompleted = !todo.isCompleted;
    })
    localStorage.setItem("todos", JSON.stringify(todos));

    console.log(text);
}

startTodo();

addBtn.addEventListener("click", addTodo);
deleteBtn.forEach(item => {
    item.addEventListener("click", deleteTodo)
})
