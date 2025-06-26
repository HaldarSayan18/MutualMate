import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Footer from './components/Footer';
import Register from './pages/Register';
import Home from './pages/Home';
import SavedFunds from './pages/SaveFunds';

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/save/:userId' element={<SavedFunds />} />
        <Route path='/' element={<Home />} />
        {/* <Route path='/' element={<ProtectedRoutes>
          <Home />
        </ProtectedRoutes>} /> */}
      </Routes>
      <Footer />
    </>
  );
}

// ProtectedRoutes wrapper
// export function ProtectedRoutes({ children }) {
//   const user = localStorage.getItem("user");
//   return user ? children : <Navigate to="/login" />;
// };

export default App;
