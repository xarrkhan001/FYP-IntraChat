// src/components/ChangePasswordSection.js
import React from "react";

const ChangePasswordSection = () => {
  return (
    <div className="p-6 bg-white shadow-md rounded-lg" data-aos="fade-up">
      <h3 className="text-2xl font-semibold mb-4 text-gray-700">
        Change Password
      </h3>
      <form>
        {[
          { label: "Current Password", type: "password" },
          { label: "New Password", type: "password" },
          { label: "Confirm New Password", type: "password" },
        ].map(({ label, type }) => (
          <div className="mb-4" key={label} data-aos="fade-up">
            <label className="block text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label={label}
            />
          </div>
        ))}
        <div className="flex justify-start">
          <button
            type="submit"
            className="bg-blue-400 text-white px-6 py-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Change Password"
          >
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordSection;
