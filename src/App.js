import React, { Component } from "react";
import "./App.css";

import ListItem from './ListItem'

class App extends Component {
  constructor() {
    super()
    this.state = {
      editing: false,
      editingIndex: null,
      newTodo: '',
      todos: [{ id: 1, name: "belajar react" }, { id: 2, name: "Bikin modul" }]
    }
  }

  handleChange = event => {
    this.setState({
      newTodo: event.target.value
    })
  }

  addTodo = () => {
    const id = this.state.todos.length + 1;
    const newTodoInput = {
      id,
      name: this.state.newTodo
    };

    const todos = this.state.todos
    todos.push(newTodoInput)

    this.setState({
      newTodo: '',
      todos
    })

    console.log(this.state.todos)
  };

  deleteTodo = (index) => {
    const todos = this.state.todos
    todos.splice(index, 1)

    this.setState({todos})
    console.log(this.state.todos)
    console.log(this.state.todos.length)
  }

  editTodo = (index) => {
    const todo = this.state.todos[index]
    this.setState({
      editing: true,
      editingIndex: index,
      newTodo: todo.name
    })
  }

  updateTodo = () => {
    const index = this.state.editingIndex
    const todo = this.state.todos[index]

    todo.name = this.state.newTodo

    const todos = this.state.todos
    todos[index] = todo

    this.setState({
      editing: false,
      editingIndex: null,
      newTodo: '',
      todos
    })

    console.log(this.state.todos)
  }

  render() {
    return (
      <div className="container">
        <h2 className="text-center p-4">Todos App</h2>
        <input
          type="text"
          name="input-todo"
          className="form-control my-4"
          placeholder="Add new todo"
          onChange={this.handleChange}
          value={this.state.newTodo}
        />
        <button
          className="btn-success form-control mb-3"
          onClick={this.state.editing ? this.updateTodo : this.addTodo}
        >
          {this.state.editing ? "Update" : "Add"}
        </button>
        <ul className="list-group">
          {this.state.todos.map((item, index) => {
            return (
              <ListItem
                item={item}
                deleteTodo={() => {this.deleteTodo(index)}}
                editTodo={() => {this.editTodo(index)}}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default App;
