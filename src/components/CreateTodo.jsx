
import React from 'react';

const CreateTodo = ({ addTodo, newTodo, setNewTodo }) => {
  return (
    <div className="create-todo__container">
      <input
        type="checkbox"
        id="checkbox"
        onClick={addTodo}
      />
      <input
        type="text"
        className="create-items__container"
        placeholder="Crear una nueva tarea..."
        id="newTodoInput"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && addTodo()}
      />
    </div>
  );
};

export default CreateTodo;



