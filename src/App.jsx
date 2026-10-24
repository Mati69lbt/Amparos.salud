import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'
import ClientesPage from './pages/ClientesPage'
import PrivacidadPage from './pages/PrivacidadPage'

const App = () => {
  if (window.location.pathname === '/clientes') {
    return (
      <>
        <Toaster position="top-center" />
        <ClientesPage />
      </>
    )
  }

  if (window.location.pathname === '/privacidad') {
    return (
      <>
        <Toaster position="top-center" />
        <PrivacidadPage />
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Toaster position="top-center" />
      <Header />
      <Hero />
      <footer className="px-6 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <a href="/privacidad" className="hover:underline">
          Política de privacidad
        </a>
      </footer>
    </div>
  )
}

export default App
