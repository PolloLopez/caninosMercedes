//src>main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> {/* Ahora la app tiene acceso al contexto de autenticación */}
      <App />
    </AuthProvider>
  </StrictMode>,
)
