import React from "react";

const TodoList = ({ todos, toggleTodoCompletion, deleteTodo }) => {
  return (
    <ul id="todoList">
      {todos.map((todo, index) => (
        <li
          key={index}
          className={`todo-item ${todo.completed ? "completed" : ""}`}
        >
          <div className="todo-item">
            <div className="conteiner_1">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodoCompletion(index)}
              />
              <label htmlFor={`checkbox-${index}`}>{todo.text}</label>
            </div>
            <button className="delete-button" onClick={() => deleteTodo(index)}>
              X
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
