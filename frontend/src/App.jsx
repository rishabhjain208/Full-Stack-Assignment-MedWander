import React, { useState } from "react";
import "./App.css";
import FormSub from "./components/FormSub";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function App() {
  const [currentForm, setCurrentForm] = useState("");
  const [allForms, setAllForms] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const handleFormClick = (formType) => {
    if (currentForm !== formType) {
      toast.info(`Switched to Form ${formType}`);
      setCurrentForm(formType);
    }
  };

  const handleRefreshClick = async () => {
    try {
      setRefreshing(true);
      const response = await axios.get(
        "http://localhost:3000/api/v1/test/refreshExcel"
      );
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error refreshing Excel sheet:", error);
      toast.error("Failed to refresh Excel sheet. Please try again.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleGetAllFormsClick = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/test/getAllForms"
      );
      setAllForms(response.data);
      toast.success("Fetched all forms successfully!");
    } catch (error) {
      console.error("Error fetching all forms:", error);
      toast.error("Failed to fetch forms. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
      <ToastContainer />
      <header className="bg-white shadow-sm py-4 px-2 sm:px-4 lg:px-8 mb-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-lg font-semibold text-gray-900">
            Dynamic Forms Demo
          </h1>
        </div>
      </header>
      <div className="max-w-md w-full px-4">
        <div className="flex flex-wrap gap-4 justify-center mb-4">
          <button
            onClick={() => handleFormClick("A")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Form A
          </button>
          <button
            onClick={() => handleFormClick("B")}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Form B
          </button>
          <button
            onClick={handleRefreshClick}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 ${
              refreshing ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={refreshing}
          >
            {refreshing ? "Refreshing..." : "Refresh Excel"}
          </button>
          <button
            onClick={handleGetAllFormsClick}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            Get All Forms
          </button>
        </div>
        {currentForm && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <FormSub formType={currentForm} />
          </div>
        )}
        {allForms.length > 0 && (
          <div className="w-full mt-6">
            <h2 className="text-lg font-semibold text-gray-900 text-center mb-4">
              All Forms
            </h2>
            <div className="w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Form Type
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Country Code
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Phone Number
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {allForms.map((form) => (
                    <tr key={form._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.formType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.countryCode}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {form.phoneNumber}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
