import { useTheme } from "../context/ThemeProvider"; 
import { Sun, Moon } from "lucide-react";

const DarkModeToggle = () => {
  const { isDark, toggleDark } = useTheme();

  return (
    <button
      onClick={toggleDark}
      className="relative w-12 h-6 flex items-center bg-gray-600 dark:bg-gray-700 rounded-full p-1 transition-colors duration-300"
    >
      <div
        className={`absolute left-1 w-4 h-4 rounded-full bg-yellow-100 text-black dark:bg-gray-300 dark:text-white flex items-center justify-center transition-transform duration-300 transform ${
          isDark ? "translate-x-6" : ""
        }`}
      >
        {isDark ? <Sun size={16} /> : <Moon size={16} />}
      </div>
    </button>
  );
};

export default DarkModeToggle;
