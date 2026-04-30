
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.css"
import  './styles/global.css'
import AppRoutes from './routes/AppRoutes'

createRoot(document.getElementById('root')).render(
 <BrowserRouter>
    <AppRoutes />
   </BrowserRouter>
)
