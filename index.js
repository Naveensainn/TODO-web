let todos = [
    {
        id: Date.now() + 1,
        Text: "go to gym",
        isCompleted: false
    },
    {
        id: Date.now() + 2,
        Text: "web dev",
        isCompleted: false
    },
    {
        id: Date.now() + 3,
        Text: "Take class",
        isCompleted: false
    }
]

const todoForm = document.querySelector("#todo-form")
const todoInput = document.querySelector("#todo-input")
const todoList = document.querySelector("#todo-list")
const formBtn = document.querySelector("#form-btn")
const taskCount = document.querySelector("#task-count")
const completeCount = document.querySelector("#complete-count")
const cancelBtn = document.querySelector("#cancel-btn")

// 11111111111111111
// let todos = JSON.parse(localStorage.getItem("todos")) || [];


let editTodoId = null
todoForm.addEventListener('submit', (e) => {
    e.preventDefault()


    const todoValue = todoInput.value.trim();

    if (!todoValue) {
        return
    }

    console.log({ editTodoId, todoValue });

    if (editTodoId) {
        // editing 
        todos = todos.map((todo) => {
            if (todo.id === Number(editTodoId)) {
                return {
                    ...todo,
                    text: todoValue
                }
            }
            return todo
        })

        localStorage.setItem("todos", JSON.stringify(todos))


    } else {
        //adding
        let newTodo = {
            id: Date.now(),
            text: todoValue,
            isCompleted: false
        }


        // let newTodo = {
        //     id: Date.now(),
        //     Text: todoValue,
        //     isCompleted: false
    }
    // addTodo(newTodo)
    // // renderTodo()

})

function renderTodo() {
    todoList.innerHTML = ""
    todos.forEach(function (todo) {
        addTodo(todo)
    })
}

renderTodo()

function addTodo(todo) {
    const li = document.createElement("li")
    // li.textContent = todo.Text
    // < data-id="1" class="flex gap-2 border border-slate-300 p-4 rounded-xl">

    li.dataset.id = todo.id
    li.className = `flex gap-2 border border-slate-300 p-4 rounded-xl`
    li.innerHTML = `
            <input data-id=${todo.id}  ${todo.isCompleted === true ? 'checked' : ""} type="checkbox">
            <p class="flex-1">${todo.Text}</p>
            <div class="flex gap-2" >
            <button data-action="edit" data-id=${todo.id} >Edit</button>
            <button data-action="delete" data-id=${todo.id}>Delete</button>
            </div>
`

    todoList.append(li)
}

todoList.addEventListener('click', (e) => {

    let li = e.target.closest('li')
    let btn = e.target.closest('button')
    let action = btn?.dataset.action;
    let id = li?.dataset?.id
    let checkbox = e.target.closest(`input[type="checkbox"]`)
    // console.log(checkbox);

    if (action === "edit") {
        // edit vala 
        console.log("editing....");

    }

    if (action === "delete") {
        deleteTodo(e, id)

    }

    if (checkbox) {
        todos = todos.map((todo) => {

            if (todo.id === Number(id)) {
                return {
                    ...todo,
                    isCompleted: !todo.isCompleted
                }
            }

            return todo
        })

        console.log(todos);
    }
})

function deleteTodo(e, id) {
    e.target.closest('li').remove()

    todos = todos.filter((todo) => {
        if (todo.id !== Number(id)) {
            return todo
        }
    })
    // console.log(todos);
    // renderTodo()
}