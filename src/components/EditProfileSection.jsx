// src/components/EditProfileSection.js
import React from "react";

const EditProfileSection = ({ user, countries }) => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg" data-aos="fade-up">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Edit Profile
      </h3>
      <form>
        <div className="mb-6">
          <h4 className="text-lg font-semibold mb-2">Personal Information</h4>
          <div className="flex space-x-4 mb-4">
            <div className="w-full lg:w-1/2">
              <label className="block text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                defaultValue={user.name.split(" ")[0]}
                className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="First Name"
              />
            </div>
            <div className="w-full lg:w-1/2">
              <label className="block text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                defaultValue={user.name.split(" ")[1] || ""}
                className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Last Name"
              />
            </div>
          </div>
          <div className="mb-4" data-aos="fade-up">
            <label className="block text-gray-700 mb-1">Main Email</label>
            <div className="flex items-center">
              <input
                type="email"
                defaultValue={user.email}
                className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Main Email"
              />
              <span className="text-green-500 text-sm ml-2">
                Verified Email
              </span>
            </div>
          </div>
          <div className="mb-4" data-aos="fade-up">
            <label className="block text-gray-700 mb-1">Phone Number</label>
            <input
              type="text"
              defaultValue={user.phoneNumber}
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Phone Number"
            />
          </div>
          <div className="mb-4" data-aos="fade-up">
            <label className="block text-gray-700 mb-1">Country</label>
            <select
              defaultValue={user.country}
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Country"
            >
              {countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-blue-400 text-white px-6 py-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Save Changes"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfileSection;
