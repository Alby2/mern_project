import 'bootstrap/dist/css/bootstrap.min.css';
import { Route,BrowserRouter as Router, Routes } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Login from './pages/Login';

function App() {
 
  return (
       <Router>
         <Routes>
           <Route path='/' element={<Accueil />} />
           <Route path='/login/:nom/:isAdmin/:prenom/:mail' element={<Login />} />
         </Routes>
       </Router>
   
  )
}

export default App