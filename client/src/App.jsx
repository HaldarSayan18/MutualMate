import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Footer from './components/Footer';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
