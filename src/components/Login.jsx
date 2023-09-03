import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessaage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginEndpoint = process.env.REACT_APP_BASE_API+'/login';

        //console.log(formData);
    let response = await axios.post(loginEndpoint, formData, {
    headers: {
        'Content-Type': 'application/json',
    }
    });
      
    //console.log(response);
    if(response.data.success === false){
        setErrorMessage(response.data.message);
    }else{
    //redirect to iban
   // console.log(response.data.data.token)

        const userEndpoint = process.env.REACT_APP_BASE_API+'/user';
        const token = response.data.data.token;
        //console.log(token);
        response = await axios.get(userEndpoint, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ token
            }
            });
        //console.log(response.data.name);
        const isAdmin = response.data.is_admin;
        sessionStorage.setItem("isUserLogged", true);
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("username", response.data.name);
        sessionStorage.setItem("isAdmin", response.data.is_admin);
        if(isAdmin){
          navigate('/iban-list');
        }else{
          navigate('/iban');
        }

    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Login to the system</h2>
        { errorMessaage && (
            <p className="text-red-500 bg-red-100 border border-red-400 py-2 px-4 rounded-md">
                {errorMessaage}
            </p>
            )
        }
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
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
              value={formData.password}
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
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
