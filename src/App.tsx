import { useState } from 'react'
import './index.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'dashboard'>('home')
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [animatingIcon, setAnimatingIcon] = useState<{
    src: string
    fromX: number
    fromY: number
    toX: number
    toY: number
  } | null>(null)

  const handleIconClick = (section: string, iconSrc: string, fromX: number, fromY: number, toX: number, toY: number) => {
    setSelectedSection(section)
    setAnimatingIcon({ src: iconSrc, fromX, fromY, toX, toY })
    
    // Transition to dashboard after a brief delay
    setTimeout(() => {
      setCurrentPage('dashboard')
      // Clear animation after it completes
      setTimeout(() => {
        setAnimatingIcon(null)
      }, 1000)
    }, 100)
  }

  if (currentPage === 'home') {
    return (
      <Home 
        onIconClick={handleIconClick}
        selectedSection={selectedSection}
      />
    )
  }

  return (
    <Dashboard 
      selectedSection={selectedSection}
      animatingIcon={animatingIcon}
    />
  )
}

export default App


