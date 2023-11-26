// let todos = [
//     {
//         text: "Breakfast",
//         status: "todo", // done
//         id: "3ea21f49-47d4-4e5b-b8ca-1376940c381d",
//     },
//     {
//         text: "Dinner",
//         status: "todo", // done
//         id: "3ea21f49-47d4-4e5b-b8ca-1376940c381c",
//     },
// ];

// const changeTodoStatus = (id, status) => {
//     for (const todo of todos) {
//         if (todo.id === id) {
//             todo.status = status;
//         }
//     }
//     console.log(todos);
// };

// const deleteTodo = (id) => {
//     todos = todos.filter((todo) => todo.id !== id);
// };
// const ul = document.querySelector(".todos");

// const renderTodo = ({ text, id, status }) => {
//     const li = document.createElement("li");
//     li.innerText = text;

//     const checkbox = document.createElement("input");
//     checkbox.setAttribute("type", "checkbox");
//     if (status === "done") {
//         li.style.textDecoration = "line-through";
//         checkbox.checked = true;
//     }

//     const closeIcon = document.createElement("span");
//     closeIcon.innerHTML = "&times;";
//     closeIcon.style.cursor = "pointer";

//     closeIcon.addEventListener("click", (e) => {
//         deleteTodo(id);
//         renderTodos();
//     });

//     checkbox.addEventListener("change", (e) => {
//         if (checkbox.checked) {
//             li.style.textDecoration = "line-through";
//             changeTodoStatus(id, "done");
//         } else {
//             li.style.textDecoration = "none";
//             changeTodoStatus(id, "todo");
//         }
//     });

//     li.appendChild(checkbox);
//     li.appendChild(closeIcon);
//     ul.appendChild(li);
// };
// const renderTodos = () => {
//     ul.innerHTML = "";
//     for (const todo of todos) {
//         renderTodo(todo);
//     }
// };

// renderTodos();

// const form = document.querySelector("form");
// form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const input = document.querySelector(".todo-input");
//     const textValue = input.value;
//     const id = crypto.randomUUID();
//     const todo = {
//         text: textValue,
//         status: "todo",
//         id: id,
//     };
//     todos.push(todo);
//     input.value = "";

//     renderTodos();
// });

class TodoApp {
    static ul = document.querySelector(".todos");
    constructor() {
        this.todos = [
            {
                text: "Breakfast",
                status: "todo", // done
                id: "3ea21f49-47d4-4e5b-b8ca-1376940c381d",
            },
            {
                text: "Dinner",
                status: "todo", // done
                id: "3ea21f49-47d4-4e5b-b8ca-1376940c381c",
            },
        ];
    }
    changeTodoStatus = (id, status) => {
        for (const todo of this.todos) {
            if (todo.id === id) {
                todo.status = status;
            }
        }
    };
    deleteTodo = (id) => {
        this.todos = this.todos.filter((todo) => todo.id !== id);
    };

    renderTodo = ({ text, id, status }) => {
        const li = document.createElement("li");
        li.innerText = text;

        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        if (status === "done") {
            li.style.textDecoration = "line-through";
            checkbox.checked = true;
        }

        const closeIcon = document.createElement("span");
        closeIcon.innerHTML = "&times;";
        closeIcon.style.cursor = "pointer";

        closeIcon.addEventListener("click", (e) => {
            this.deleteTodo(id);
            this.renderTodos();
        });

        checkbox.addEventListener("change", (e) => {
            if (checkbox.checked) {
                li.style.textDecoration = "line-through";
                this.changeTodoStatus(id, "done");
            } else {
                li.style.textDecoration = "none";
                this.changeTodoStatus(id, "todo");
            }
        });

        li.appendChild(checkbox);
        li.appendChild(closeIcon);
        TodoApp.ul.appendChild(li);
    };

    renderTodos = () => {
        TodoApp.ul.innerHTML = "";
        for (const todo of this.todos) {
            this.renderTodo(todo);
        }
    };

    submit = () => {
        const form = document.querySelector("form");

        form.addEventListener("submit", (event) => {
            event.preventDefault();
            const input = document.querySelector(".todo-input");
            const textValue = input.value;
            const id = crypto.randomUUID();
            const todo = {
                text: textValue,
                status: "todo",
                id: id,
            };
            this.todos.push(todo);
            input.value = "";

            this.renderTodos();
            console.log(this.todos);
        });
    };

    init = () => {
        this.renderTodos();
        this.submit();
    };
}

const app = new TodoApp();
app.init();
