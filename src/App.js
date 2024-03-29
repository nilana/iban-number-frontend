import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Iban from './components/Iban';
import IbanList from './components/IbanList';

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
            <Route
                path="/iban"
                element={ <Iban /> }
            />
            <Route
                path="/iban-list"
                element={ <IbanList /> }
            />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

