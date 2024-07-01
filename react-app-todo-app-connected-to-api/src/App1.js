import { todoApi } from "./api/todo";
import { useEffect, useState, useReducer } from "react";
import { Form } from "./Form";
import { Todos } from "./Todos";
import { todoReducer } from "./todoReducer";
import "./App.css";

const App = () => {
    const [todoInputValue, setTodoInputValue] = useState("");
    const [todos, dispatch] = useReducer(todoReducer, []);

    useEffect(() => {
        todoApi
            .getAll()
            .then((response) => {
                dispatch({
                    type: "INIT",
                    payload: {
                        data: response.data,
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleTodoInputChange = (value) => {
        setTodoInputValue(value);
    };

    const createTodo = (e) => {
        e.preventDefault();
        if (todoInputValue.length < 3) {
            return;
        }

        todoApi
            .create(todoInputValue)
            .then((response) => {
                setTodoInputValue("");
                dispatch({
                    type: "ADD_TODO",
                    payload: { data: response.data },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const updateStatus = (id, status) => {
        todoApi
            .updateStatus(id, status)
            .then((_) => {
                dispatch({
                    type: "UPDATE_TODO",
                    payload: {
                        data: {
                            id: id,
                            status: status,
                        },
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const deleteTodo = (id) => {
        todoApi
            .deleteOne(id)
            .then(() => {
                dispatch({
                    type: "DELETE_TODO",
                    payload: {
                        data: {
                            id: id,
                        },
                    },
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const isSubmitButtonDisabled = !todoInputValue.length;

    return (
        <main>
            <h1>Todo App</h1>

            <Form
                isSubmitButtonDisabled={isSubmitButtonDisabled}
                todoValue={todoInputValue}
                handleTodoValue={handleTodoInputChange}
                createTodo={createTodo}
            />

            <Todos
                todos={todos}
                updateStatus={updateStatus}
                deleteTodo={deleteTodo}
            />
        </main>
    );
};
export default App;
