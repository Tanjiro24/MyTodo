import { useState } from 'react';
import { Trash2, Edit, Check, X } from 'lucide-react';

export function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (editText.trim()) {
      if (onEdit(todo.id, editText.trim())) {
        setIsEditing(false);
        setError('');
      } else {
        setError('This task already exists!');
      }
    }
  };

  return (
    <div className="group flex flex-col bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md mb-3 
      transform transition-all duration-200 hover:scale-[1.02] animate-fade-in">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-5 h-5 rounded border-gray-300 dark:border-gray-600 
            text-blue-600 focus:ring-blue-500 dark:focus:ring-blue-400"
        />
        
        {isEditing ? (
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={editText}
              onChange={(e) => {
                setEditText(e.target.value);
                setError('');
              }}
              className="flex-1 px-2 py-1 border rounded dark:bg-gray-700 dark:border-gray-600 
                dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                dark:focus:ring-blue-400"
              autoFocus
            />
            <button
              onClick={handleSubmit}
              className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 
                dark:hover:text-green-300"
            >
              <Check size={20} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setEditText(todo.text);
                setError('');
              }}
              className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 
                dark:hover:text-red-300"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <>
            <span className={`flex-1 dark:text-white ${
              todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
            }`}>
              {todo.text}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(todo.createdAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}
            </span>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 
                  dark:hover:text-blue-300"
              >
                <Edit size={20} />
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 
                  dark:hover:text-red-300"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </>
        )}
      </div>
      {error && (
        <div className="text-red-500 dark:text-red-400 text-sm mt-2 animate-fade-in">
          {error}
        </div>
      )}
    </div>
  );
}