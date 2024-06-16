import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { countries } from "country-data";

const FormSub = ({ formType }) => {
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("IN");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Reset form state when formType changes
  useEffect(() => {
    setName("");
    setCountryCode("IN");
    setPhoneNumber("");
  }, [formType]);

  const validateForm = () => {
    const nameRegex = /^[A-Za-z\s]+$/;
    const phoneRegex = /^\d+$/;

    if (!name) {
      toast.error("Name is required.");
      return false;
    }
    if (!nameRegex.test(name)) {
      toast.error("Name must contain only alphabetic characters and spaces.");
      return false;
    }
    if (!countryCode) {
      toast.error("Country code is required.");
      return false;
    }
    if (!phoneNumber) {
      toast.error("Phone number is required.");
      return false;
    }
    if (!phoneRegex.test(phoneNumber)) {
      toast.error("Phone number must be numeric.");
      return false;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Phone number must contain 10 digits.");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/test/submitForm",
        {
          formType,
          name,
          countryCode,
          phoneNumber,
        }
      );
      console.log(response.data);
      toast.success("Form submitted successfully!");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      toast.error("Failed to submit form. Please try again.");
    }
  };

  const countryOptions = countries.all.map((country) => (
    <option key={country.alpha2} value={country.alpha2}>
      {`${country.countryCallingCodes[0]} ${country.name}`}
    </option>
  ));

  return (
    <div className="max-w-md mx-auto mt-4 p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-4">{`Form ${formType}`}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Name:
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Country Code:
            <select
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
            >
              {countryOptions}
            </select>
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phone Number:
            <input
              type="text"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </label>
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSub;
