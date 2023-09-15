import React, { useState, useEffect } from 'react';
import './index.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateTodo from './components/CreateTodo';
import TodoList from './components/TodoList';
import FilterList from './components/FilterList';
import {
  saveTodosToLocalStorage,
  getTodosFromLocalStorage,
  saveThemeToLocalStorage,
  getThemeFromLocalStorage,
  saveFilterTypeToLocalStorage,
  getFilterTypeFromLocalStorage,
} from './utils/storage';
import { applyFilter } from './utils/helpers';

const App = () => {
  const [appState, setAppState] = useState({
    todos: getTodosFromLocalStorage(),
    newTodo: '',
    theme: getThemeFromLocalStorage(),
    filteredTodos: [],
    filterType: getFilterTypeFromLocalStorage(),
  });

  const { todos, newTodo, theme, filteredTodos, filterType } = appState;

  useEffect(() => {
    document.body.classList.toggle('dark-theme', theme === 'dark');
    saveThemeToLocalStorage(theme);
  }, [theme]);

  useEffect(() => {
    saveTodosToLocalStorage(todos);
  }, [todos]);

  useEffect(() => {
    setAppState((prevState) => ({
      ...prevState,
      filteredTodos: applyFilter(filterType, todos),
    }));
    saveFilterTypeToLocalStorage(filterType);
  }, [filterType, todos]);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setAppState((prevState) => ({ ...prevState, theme: newTheme }));
  };

  const showAlert = (message) => {
    toast.warn(message, { autoClose: 3000 });
  };

  const addTodo = () => {
    const text = newTodo.trim();
    const letterCount = text.length;

    if (letterCount < 3) {
      showAlert('Debe ingresar al menos 3 letras.');
      return;
    }

    if (letterCount > 70) {
      showAlert('Ha alcanzado el límite de 70 letras.');
      setAppState((prevState) => ({ ...prevState, newTodo: text.slice(0, 70) }));
      return;
    }

    setAppState((prevState) => ({
      ...prevState,
      todos: [...prevState.todos, { text: newTodo, completed: false }],
      newTodo: '',
    }));
  };

  const updateTodos = (updatedTodos) => {
    setAppState((prevState) => ({ ...prevState, todos: updatedTodos }));
  };

  const deleteTodo = (todoIndex) => {
    const updatedTodos = todos.filter((_, index) => index !== todoIndex);
    updateTodos(updatedTodos);
  };

  const toggleTodoCompletion = (todoIndex) => {
    const updatedTodos = todos.map((todo, index) =>
      index === todoIndex ? { ...todo, completed: !todo.completed } : todo
    );
    updateTodos(updatedTodos);
  };

  const countActiveTodos = () => {
    return todos.reduce((count, todo) => (todo.completed ? count : count + 1), 0);
  };

  const clearCompleted = () => {
    const updatedTodos = todos.filter((todo) => !todo.completed);
    updateTodos(updatedTodos);
  };

  const themeIcon = theme === 'light' ? '☾' : '☀';

  return (
    <main className="main-app__container">
      <div className="todo__container">
        <nav>
          <h1>TODO</h1>
          <span id="switch-icon" onClick={switchTheme}>
            {themeIcon}
          </span>
        </nav>

        <div className="create-todo__container">
          <CreateTodo
            addTodo={addTodo}
            newTodo={newTodo}
            setNewTodo={(newTodo) =>
              setAppState((prevState) => ({ ...prevState, newTodo }))
            }
          />
        </div>

        <div className="items__container">
          <TodoList
            todos={filteredTodos}
            toggleTodoCompletion={toggleTodoCompletion}
            deleteTodo={deleteTodo}
          />
        </div>

        <div className="info__container">
          <span id="contador" data-count={countActiveTodos()}>
            {countActiveTodos()} item{countActiveTodos() !== 1 ? 's' : ''} left
          </span>
          <div onClick={clearCompleted}>Clear Completed</div>
        </div>

        <div className="control__container">
          <FilterList
            activeFilter={filterType}
            handleFilter={(filterType) =>
              setAppState((prevState) => ({ ...prevState, filterType }))
            }
          />
        </div>
      </div>
      <ToastContainer />
    </main>
  );
};

export default App;
