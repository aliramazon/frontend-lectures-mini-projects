import { useState } from "react";
import _ from "lodash";

export const todoReducer = (state, action) => {
    const copy = _.cloneDeep(state);
    if (action.type === "INIT") {
        return action.payload.data;
    } else if (action.type === "ADD_TODO") {
        copy.push(action.payload.data);
        return copy;
    } else if (action.type === "UPDATE_TODO") {
        const {
            payload: {
                data: { id, status },
            },
        } = action;

        // const id = action.payload.data.id;
        // const status = action.payload.data.status;
        // const updatedTodos = state.map((todo) => {
        //     if (todo.id === id) {
        //         const copy = { ...todo };
        //         copy.status = status;
        //         return copy;
        //     }
        //     return todo;
        // });
        // return updatedTodos;

        for (let i = 0; i < copy.length; i++) {
            const todo = copy[i];
            if (todo.id === id) {
                todo.status = status;
                break;
            }
        }
        return copy;
    } else if (action.type === "DELETE_TODO") {
        return copy.filter((todo) => todo.id !== action.payload.data.id);
    }
};

const useMyReducer = (reducer, initialState) => {
    const [state, setState] = useState(initialState);

    const dispatch = (action) => {
        const newState = reducer(state, action);
        setState(newState);
    };

    return [state, dispatch];
};
