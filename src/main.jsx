import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { TaskProvider } from './context/TaskContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { Statusprovider } from './context/StatusContext.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
     <TaskProvider>
      <AuthProvider>
      <Statusprovider>
         <App />
      </Statusprovider>
      </AuthProvider>
    </TaskProvider>
  </BrowserRouter>
  </StrictMode>
);
