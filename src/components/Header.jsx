import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex items-center justify-between">
        <div className="text-white text-2xl font-semibold">IBAN Numbers</div>
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
      </nav>
    </header>
  );
}

export default Header;
