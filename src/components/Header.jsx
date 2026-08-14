import { Moon, ShieldPlus, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

const Header = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
      <span className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
        <ShieldPlus className="text-blue-600 dark:text-blue-400" size={24} />
        Amparo Salud
      </span>

      <button
        type="button"
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'}
        className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  )
}

export default Header
