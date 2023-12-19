class TodoAPI {
    constructor() {
        this.endpoint = process.env.REACT_APP_API;
    }
    async create(text) {
        try {
            const response = await fetch(`${this.endpoint}/tasks`, {
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
            const response = await fetch(`${this.endpoint}/tasks`);
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
            const response = await fetch(`${this.endpoint}/tasks/${id}`, {
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
            const response = await fetch(`${this.endpoint}/tasks/${id}`, {
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

export const todoApi = new TodoAPI();
