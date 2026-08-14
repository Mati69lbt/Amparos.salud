import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Hero from './components/Hero'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors">
      <Toaster position="top-center" />
      <Header />
      <Hero />
    </div>
  )
}

export default App
