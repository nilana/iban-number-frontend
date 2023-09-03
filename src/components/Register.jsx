import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const [errorMessaage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registerEndpoint = process.env.REACT_APP_BASE_API+'/register';

      const response = await axios.post(registerEndpoint, formData);
      
      if(response.data.success === false){
            setErrorMessage(response.data.message);
      }else{
        setErrorMessage('');
        setSuccess(true);
      }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">User Registration</h2>
        { errorMessaage && (
            <p className="text-red-500 bg-red-100 border border-red-400 py-2 px-4 rounded-md">
                {errorMessaage}
            </p>
            )
        }
        { success && (
            <p className="text-green-500 bg-green-100 border border-green-400 py-2 px-4 rounded-md">
                Registration successful, go to the <Link to="/login" className="underline">Login</Link> page and log into the system
            </p>
            )
        }

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.username}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              autoComplete="new-password"
              value={formData.password}
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="password_confirmation"
              id="password_confirmation"
              value={formData.password_confirmation}
              autoComplete="off"
              onChange={handleChange}
              className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Register;
