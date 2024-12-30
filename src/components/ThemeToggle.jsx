import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
  onClick={toggleTheme}
  className="fixed top-4 right-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 
    hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 z-50"
  aria-label="Toggle theme"
>
  {theme === 'light' ? (
    <Moon size={20} className="text-gray-800" />
  ) : (
    <Sun size={20} className="text-yellow-300" />
  )}
</button>

  );
}