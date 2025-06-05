import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Component/Contexs/btnContex.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>


  <StrictMode>
    <App />
  </StrictMode>,

  </AuthProvider>
)
