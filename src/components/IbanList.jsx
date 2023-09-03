import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "./Header";

function IbanList() {
  
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState(false)


  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const fetchData = () => {
    // Adjust the URL to your API endpoint.
    const ibnListEndpoint = process.env.REACT_APP_BASE_API + "/all-iban";
    axios
      .get(`${ibnListEndpoint}?page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
      })
      .then((response) => {
        setData(response.data.data.users.data);
        setTotalPages(response.data.data.users.last_page);
      })
      .catch((error) => {
        setError(true)
        console.error("Error fetching data:", error);
      });
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <Header />
      { !error ?
      <div className="container mx-auto mt-5">
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="border px-4 py-2">User</th>
              <th className="border px-4 py-2">IBAN</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.name}</td>
                <td className="border px-4 py-2">{item.iban}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      :<p className="text-red-500 bg-red-100 border border-red-400 py-2 px-4 rounded-md">
        Unauthorized
      </p>}
      
    </>
  );
}

export default IbanList;
