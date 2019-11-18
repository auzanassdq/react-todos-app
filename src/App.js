import React, { useState } from "react";
import "./App.css";

import ListItem from "./ListItem";

function App() {
  const [state, setState] = useState({
    editing: false,
    editingIndex: null,
    newTodo: "",
    todos: [
      { id: 1, name: "belajar react" },
      { id: 2, name: "Bikin modul" }
    ]
  });

  const handleChange = event => {
    setState({
      ...state,
      newTodo: event.target.value
    });
  };

  const addTodo = () => {
    const id = state.todos.length + 1;
    const newTodoInput = {
      id,
      name: state.newTodo
    };
  
    const todos = state.todos;
    todos.push(newTodoInput);
  
    setState({
      ...state,
      newTodo: "",
      todos
    });
  
    // console.log(state.todos)
  };
  
  const deleteTodo = index => {
    const todos = state.todos;
    todos.splice(index, 1);
  
    setState({ ...state, todos });
    // console.log(state.todos)
    // console.log(state.todos.length)
  };
  
  const editTodo = index => {
    const todo = state.todos[index];
    setState({
      ...state,
      editing: true,
      editingIndex: index,
      newTodo: todo.name
    });
  };

  const updateTodo = () => {
    const index = state.editingIndex;
    const todo = state.todos[index];
  
    todo.name = state.newTodo;
  
    const todos = state.todos;
    todos[index] = todo;
  
    setState({
      
      editing: false,
      editingIndex: null,
      newTodo: "",
      todos
    });
  
    // console.log(state.todos)
  };

  return (
    <div className="container">
      <h2 className="text-center p-4">Todos App</h2>
      <input
        type="text"
        name="input-todo"
        className="form-control my-4"
        placeholder="Add new todo"
        onChange={handleChange}
        value={state.newTodo}
      />
      <button
        className="btn-success form-control mb-3"
        onClick={state.editing ? updateTodo : addTodo}
      >
        {state.editing ? "Update" : "Add"}
      </button>
      <ul className="list-group">
        {Array.isArray(state.todos) && state.todos.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              item={item}
              deleteTodo={() => {
                deleteTodo(index);
              }}
              editTodo={() => {
                editTodo(index);
              }}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default App;
