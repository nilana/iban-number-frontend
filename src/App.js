import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

function App() {

  return(
  <>
    <BrowserRouter>
        <Routes>
            <Route
                path="/"
                element={ <Home /> }
            />
            <Route
                path="/register"
                element={ <Register /> }
            />
            <Route
                path="/login"
                element={ <Login /> }
            />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

