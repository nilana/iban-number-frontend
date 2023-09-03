import React from "react";
import { Link } from "react-router-dom";

function Header() {
  function clearSession(){
    sessionStorage.removeItem('isUserLogged');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('isAdmin');
  }

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">IBAN Number</div>
        { sessionStorage.getItem("isUserLogged")  ?
        <ul className="flex space-x-4">
          <li className="text-white hover:text-gray-200">Welcome {sessionStorage.getItem("username")} </li>
          <li className="text-white hover:text-gray-200">|</li>
          <li className="text-white hover:text-gray-200"><Link to="/login" onClick={clearSession}> Logout </Link></li>
        </ul> :
        <ul className="flex space-x-4">
          
          <li>
            <Link to="/register" className="text-white hover:text-gray-200">
              Register
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:text-gray-200">
              login
            </Link>
          </li>
          
        </ul>
        
      }
      </nav>
    </header>
  );
}

export default Header;
