import { useState } from 'react';
import { PlusCircle, CheckCircle } from 'lucide-react';
import { Clock } from './components/Clock';
import { TodoItem } from './components/TodoItem';
import { ThemeToggle } from './components/themeToggle';
import { useLocalStorage } from './hooks/useLocalStorage';
import { isDuplicateTodo } from './utils/todoUtils';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { theme } = useTheme();
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [newTodo, setNewTodo] = useState('');
  const [error, setError] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmedText = newTodo.trim();
    
    if (trimmedText) {
      if (isDuplicateTodo(todos, trimmedText)) {
        setError('This task already exists!');
        return;
      }

      const todo = {
        id: crypto.randomUUID(),
        text: trimmedText,
        completed: false,
        createdAt: new Date().toISOString(),
      };
      setTodos([todo, ...todos]);
      setNewTodo('');
      setError('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    if (isDuplicateTodo(todos.filter(todo => todo.id !== id), newText)) {
      return false;
    }
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ));
    return true;
  };

  const completedCount = todos.filter(todo => todo.completed).length;

  return (
    <div className={theme}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8 transition-colors duration-200">
        <ThemeToggle />
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <Clock />
            <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Todo List
            </h1>
            <div className="text-gray-600 dark:text-gray-300">
              {completedCount} of {todos.length} tasks completed
            </div>
          </div>

          <form onSubmit={handleAddTodo} className="mb-8">
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => {
                    setNewTodo(e.target.value);
                    setError('');
                  }}
                  placeholder="Add a new task..."
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    dark:bg-gray-700 dark:text-white focus:outline-none focus:ring-2 
                    focus:ring-blue-500 dark:focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 
                    transition-colors duration-200 flex items-center gap-2"
                >
                  <PlusCircle size={20} />
                  Add Task
                </button>
              </div>
              {error && (
                <div className="text-red-500 dark:text-red-400 text-sm animate-fade-in">
                  {error}
                </div>
              )}
            </div>
          </form>

          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400 flex flex-col items-center gap-4">
                <CheckCircle size={48} />
                <p>No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              todos.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                  onEdit={editTodo}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;