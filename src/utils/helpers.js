export const applyFilter = (filterType, todos) => {
    switch (filterType) {
      case 'all':
        return todos;
      case 'active':
        return todos.filter((todo) => !todo.completed);
      case 'complete':
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };
  

  