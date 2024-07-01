export const Form = ({
    isSubmitButtonDisabled,
    todoValue,
    handleTodoValue,
    createTodo,
}) => {
    return (
        <form onSubmit={createTodo}>
            <input
                placeholder="What is in your mind?"
                value={todoValue}
                onChange={(e) => handleTodoValue(e.target.value)}
            />
            <input
                value="Add Todo"
                type="submit"
                disabled={isSubmitButtonDisabled}
            />
        </form>
    );
};
