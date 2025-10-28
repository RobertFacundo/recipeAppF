import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { NavigationProvider } from './contexts/NavigationContext.jsx'
import { RecipesProvider } from './contexts/RecipesContext.jsx'
import { AuthProvider } from './contexts/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavigationProvider>
      <AuthProvider>
        <RecipesProvider>
          <App />
        </RecipesProvider>
      </AuthProvider>
    </NavigationProvider>
  </StrictMode>,
)
