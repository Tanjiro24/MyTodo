export const isDuplicateTodo = (todos, newText) => {
    return todos.some(todo => todo.text.toLowerCase().trim() === newText.toLowerCase().trim());
  };