import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './Component/Contexs/btnContex.tsx'
import { SubmissionProvider } from './Component/Contexs/SubmissionContext.tsx'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
<AuthProvider>
  <SubmissionProvider>
    <App />
  </SubmissionProvider>
</AuthProvider>


)
