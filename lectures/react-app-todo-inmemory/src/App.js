import React from "react";
import { v4 as uuid } from "uuid";
import Dialog from "@mui/material/Dialog";
import { DialogTitle } from "@mui/material";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            todos: [],
            inputValue: "",
            inputError: false,
            showEditModal: false,
            inputEditValue: "",
            editingTodoId: "",
        };
    }

    addTodo = (e) => {
        e.preventDefault();

        if (this.state.inputValue.length <= 1) {
            this.setState({
                inputError: true,
            });

            return;
        }
        const newTodo = {
            id: uuid(),
            text: this.state.inputValue,
            isDone: false,
        };

        this.setState((prevState) => {
            const copyTodos = [...prevState.todos, newTodo];
            return {
                todos: copyTodos,
                inputValue: "",
            };
        });
    };

    updateTodo = (isDone, todoId) => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if (todo.id === todoId) {
                    const copy = { ...todo, isDone: isDone };
                    return copy;
                }
                return todo;
            });

            return {
                todos: updatedTodos,
            };
        });
    };

    handleOnChange = (e) => {
        const { value } = e.target;
        this.setState({
            inputValue: value,
        });

        if (value.length <= 1) {
            this.setState({
                inputError: true,
            });
        } else {
            this.setState({
                inputError: false,
            });
        }
    };

    deleteTodo = (todoId) => {
        this.setState((prevState) => {
            const keptTodos = prevState.todos.filter(
                (todo) => todo.id !== todoId
            );
            return {
                todos: keptTodos,
            };
        });
    };

    editTodo = (todoId) => {
        this.setState({
            showEditModal: true,
        });
        let todoText = "";
        for (const todo of this.state.todos) {
            if (todo.id === todoId) {
                todoText = todo.text;
                break;
            }
        }

        this.setState({
            inputEditValue: todoText,
            editingTodoId: todoId,
        });
    };

    handleInputEdit = (e) => {
        this.setState({
            inputEditValue: e.target.value,
        });
    };

    submitEdit = () => {
        this.setState((prevState) => {
            const updatedTodos = prevState.todos.map((todo) => {
                if (todo.id === this.state.editingTodoId) {
                    const copy = { ...todo, text: this.state.inputEditValue };
                    return copy;
                }
                return todo;
            });

            return {
                todos: updatedTodos,
                showEditModal: false,
            };
        });
    };

    closeModal = () => {
        this.setState({ showEditModal: false });
    };

    render() {
        return (
            <main>
                <form onSubmit={this.addTodo}>
                    <div className="form-control">
                        <input
                            onChange={this.handleOnChange}
                            value={this.state.inputValue}
                            type="text"
                            placeholder="What is your mind"
                        />
                        {this.state.inputError && <span>Invalid Todo</span>}
                    </div>

                    <input type="submit" value="Add Todo" />
                </form>
                <ul>
                    {this.state.todos.length >= 1 &&
                        this.state.todos.map((todo) => {
                            return (
                                <li key={todo.id} className="todo">
                                    <span
                                        className={
                                            todo.isDone
                                                ? "todo__text--done"
                                                : ""
                                        }
                                    >
                                        {todo.text}
                                    </span>

                                    <input
                                        type="checkbox"
                                        defaultChecked={todo.isDone}
                                        onChange={(e) => {
                                            this.updateTodo(
                                                e.target.checked,
                                                todo.id
                                            );
                                        }}
                                    />
                                    <button
                                        onClick={() => this.deleteTodo(todo.id)}
                                    >
                                        X
                                    </button>
                                    <button
                                        onClick={() => this.editTodo(todo.id)}
                                    >
                                        Edit
                                    </button>
                                </li>
                            );
                        })}
                </ul>

                <Dialog
                    open={this.state.showEditModal}
                    onClose={this.closeModal}
                >
                    <div className="edit-form">
                        <DialogTitle id="alert-dialog-title">
                            Edit Todo
                        </DialogTitle>
                        <input
                            value={this.state.inputEditValue}
                            onChange={this.handleInputEdit}
                        />
                        <button onClick={this.closeModal}>Cancel</button>
                        <button onClick={this.submitEdit}> Update Todo</button>
                    </div>
                </Dialog>
            </main>
        );
    }
}

export default App;
