class TodoAPI {
    async create(text) {
        try {
            const response = await fetch("http://localhost:4000/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    text: text,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            return await response.json();
        } catch (error) {
            console.log(error.message);
        }
    }
    async getAll() {
        try {
            const response = await fetch("http://localhost:4000/tasks");
            if (!response.ok) {
                throw new Error(response.error);
            }

            return await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    async deleteOne(id) {
        try {
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async updateStatus(id, status) {
        try {
            const response = await fetch(`http://localhost:4000/tasks/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    status: status,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}

const todoAPI = new TodoAPI();

class TodoUI {
    static tasksUl = document.querySelector("ul");
    async renderAll() {
        try {
            const response = await todoAPI.getAll();
            TodoUI.tasksUl.innerHTML = "";
            response.data.forEach((task) => {
                this.renderOne(task);
            });
        } catch (error) {}
    }

    createElement(elementName) {
        return document.createElement(elementName);
    }

    renderOne(task) {
        const { id, text, status } = task;
        const li = this.createElement("li");

        const span = this.createElement("span");
        span.innerText = text;

        const select = this.createElement("select");
        ["TODO", "INPROGRESS", "DONE"].forEach((item) => {
            const option = this.createElement("option");
            option.value = item;
            option.innerText = item;
            if (status === item) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener("change", async (e) => {
            e.preventDefault();
            try {
                const value = select.value;
                await todoAPI.updateStatus(id, value);
            } catch (err) {
                console.log(err);
            }
        });

        const deleteButton = this.createElement("button");
        deleteButton.innerText = "Delete";

        deleteButton.addEventListener("click", async (e) => {
            e.preventDefault();

            try {
                await todoAPI.deleteOne(id);
                TodoUI.tasksUl.removeChild(li);
            } catch (error) {
                console.log(error);
            }
        });

        li.appendChild(span);
        li.appendChild(select);
        li.appendChild(deleteButton);

        TodoUI.tasksUl.appendChild(li);
    }

    initForm() {
        const textarea = document.getElementById("task-input");
        const form = document.querySelector("form");

        form.addEventListener("submit", async (e) => {
            e.preventDefault();
            const { value } = textarea;

            if (value.length < 3) {
                throw new Error("Invalid input");
            }

            try {
                const { data } = await todoAPI.create(value);
                textarea.value = "";
                this.renderOne(data);
            } catch (error) {
                console.log(error.message);
            }
        });
    }

    init() {
        this.initForm();
        this.renderAll();
    }
}

const todoUI = new TodoUI();

todoUI.init();
