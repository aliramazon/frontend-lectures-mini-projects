import React from "react";
import "./App.css";

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 0,
        };
    }
    increment = () => {
        this.setState((state) => ({
            counter: state.counter + 1,
        }));
    };

    decrement = () => {
        this.setState((state) => ({
            counter: state.counter - 1,
        }));
    };

    render() {
        return (
            <main>
                <button onClick={this.decrement}>-</button>
                <span>Counter: {this.state.counter}</span>
                <button onClick={this.increment}>+</button>
            </main>
        );
    }
}

export default App;
