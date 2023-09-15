export const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  
  export const getTodosFromLocalStorage = () => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    return savedTodos;
  };
  
  export const saveThemeToLocalStorage = (theme) => {
    localStorage.setItem('theme', theme);
  };
  
  export const getThemeFromLocalStorage = () => {
    return localStorage.getItem('theme') || 'light';
  };
  
  export const saveFilterTypeToLocalStorage = (filterType) => {
    localStorage.setItem('filterType', filterType);
  };
  
  export const getFilterTypeFromLocalStorage = () => {
    return localStorage.getItem('filterType') || 'all';
  };
  