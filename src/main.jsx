 
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import './styles/global.css'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './context/AuthContext';
 
createRoot(document.getElementById('root')).render(
   <AuthProvider>
      <BrowserRouter>
         <AppRoutes />
      </BrowserRouter>
   </AuthProvider>
)
 
 