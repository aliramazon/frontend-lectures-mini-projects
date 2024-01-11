export const Todos = ({ todos, updateStatus, deleteTodo }) => {
    return (
        <ul>
            {todos.map((todo) => {
                return (
                    <li key={todo.id}>
                        <span>{todo.text}</span>
                        <select
                            value={todo.status}
                            onChange={(e) =>
                                updateStatus(todo.id, e.target.value)
                            }
                        >
                            <option value={"TODO"}>Todo</option>
                            <option value={"INPROGRESS"}>In Progress</option>
                            <option value={"DONE"}>Done</option>
                        </select>
                        <button onClick={() => deleteTodo(todo.id)}>
                            Delete
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};
