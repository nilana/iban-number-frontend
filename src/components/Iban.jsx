import React, { useState } from "react";
import Header from "./Header";
import axios from "axios";

function Iban() {
  //console.log('isUserLogged: '+ sessionStorage.getItem("isUserLogged"));
  //console.log('token: '+ sessionStorage.getItem("token"));

  const [formData, setFormData] = useState({
    iban: "",
  });
  const [errorMessaage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ibanEndpoint = process.env.REACT_APP_BASE_API+'/iban';

    //console.log(formData);
    let response = await axios.post(ibanEndpoint, formData, {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ sessionStorage.getItem("token")
    }
    });
      
    //console.log(response);
    if(response.data.success === false){
        setSuccess(false);
        setErrorMessage(response.data.message);
    }else{
        //redirect to iban
        setErrorMessage('');
        setSuccess(true);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Enter IBAN</h2>
        { errorMessaage && (
            <p className="text-red-500 bg-red-100 border border-red-400 py-2 px-4 rounded-md">
                {errorMessaage}
            </p>
            )
        }
        { success && (
            <p className="text-green-500 bg-green-100 border border-green-400 py-2 px-4 rounded-md">
                IBAN saved successfully
            </p>
            )
        }
        { sessionStorage.getItem("isUserLogged")  ?
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              IBAN
            </label>
            <input
              type="text"
              name="iban"
              value={formData.iban}
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
              Save
            </button>
          </div>
        </form>
        :<p className="text-red-500 bg-red-100 border border-red-400 py-2 px-4 rounded-md">
        Please login to the system to enter IBAN
        </p>}
      </div>
    </>
  );
}

export default Iban;
