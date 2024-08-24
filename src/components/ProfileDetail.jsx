import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import profile1 from "../assets/img1.jpg";
import background1 from "../assets/pic1.jpg";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaBirthdayCake,
  FaGenderless,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const ProfileDetail = () => {
  const [selectedOption, setSelectedOption] = useState("intro");

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for animations
  }, []);

  const user = {
    name: "John Doe",
    username: "@john_doe",
    profilePic: profile1,
    backgroundImage: background1,
    email: "john.doe@example.com",
    phoneNumber: "+1234567890",
    country: "United States",
    birthday: "January 1, 1990",
    gender: "Male",
    socialLinks: {
      facebook: "https://facebook.com/johndoe",
      twitter: "https://twitter.com/johndoe",
      instagram: "https://instagram.com/johndoe",
    },
  };

  const countries = [
    "Pakistan",
    "United States",
    "Canada",
    "United Kingdom",
    "Australia",
  ];

  const renderContent = () => {
    switch (selectedOption) {
      case "intro":
        return (
          <div className="p-6 bg-white shadow-md rounded-lg">
            <div data-aos="fade-up">
              <h4 className="text-2xl font-bold mb-6 text-gray-700">
                About <span className="text-gray-500 text-lg">{user.name}</span>
              </h4>
              <div className="flex space-x-4 mb-6">
                {Object.entries(user.socialLinks).map(([key, url]) => {
                  const iconMap = {
                    facebook: <FaFacebook className="text-blue-600 text-xl" />,
                    twitter: <FaTwitter className="text-blue-400 text-xl" />,
                    instagram: (
                      <FaInstagram className="text-pink-500 text-xl" />
                    ),
                  };
                  return (
                    <a
                      key={key}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-gray-200 rounded-full"
                      aria-label={`Visit ${key}`}
                    >
                      {iconMap[key]}
                    </a>
                  );
                })}
              </div>
              <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-700">
                  Basic Info
                </h4>
                <div className="text-gray-600">
                  {[
                    {
                      icon: (
                        <FaBirthdayCake className="text-gray-500 mr-2 text-lg" />
                      ),
                      label: "Birthday",
                      value: user.birthday,
                    },
                    {
                      icon: (
                        <FaGenderless className="text-gray-500 mr-2 text-lg" />
                      ),
                      label: "Gender",
                      value: user.gender,
                    },
                    {
                      icon: (
                        <FaPhoneAlt className="text-gray-500 mr-2 text-lg" />
                      ),
                      label: "Phone Number",
                      value: user.phoneNumber,
                    },
                    {
                      icon: (
                        <FaEnvelope className="text-gray-500 mr-2 text-lg" />
                      ),
                      label: "Email",
                      value: user.email,
                    },
                  ].map(({ icon, label, value }) => (
                    <div className="flex items-center mb-3" key={label}>
                      {icon}
                      <p className="ml-2">
                        <strong>{label}:</strong> {value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case "editProfile":
        return (
          <div className="p-6 bg-white shadow-md rounded-lg" data-aos="fade-up">
            <h3 className="text-2xl font-semibold mb-4 text-gray-700">
              Edit Profile
            </h3>
            <form>
              <div className="mb-6">
                <h4 className="text-lg font-semibold mb-2">
                  Personal Information
                </h4>
                <div className="flex space-x-4 mb-4">
                  <div className="w-full lg:w-1/2">
                    <label className="block text-gray-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      defaultValue={user.name.split(" ")[0]}
                      className="p-3 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="First Name"
                    />
                  </div>
                  <div className="w-full lg:w-1/2">
                    <label className="block text-gray-700 mb-1">
                      Last Name
                    </label>
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
                  <label className="block text-gray-700 mb-1">
                    Phone Number
                  </label>
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
      case "changePassword":
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
      default:
        return (
          <div className="p-6 bg-white shadow-md rounded-lg">
            Select an option to view content.
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center w-full bg-blue-100">
      {/* Profile Header */}
      <div
        className="relative flex items-center justify-center w-full lg:w-[1200px] h-[500px] rounded-t-md mt-9"
        style={{
          backgroundImage: `url(${user.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute top-1/2 transform -translate-y-1/4 mt-[260px] w-full flex items-start px-4 lg:px-16">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-md border-4 border-white shadow-lg"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-2xl font-semibold text-gray-700">
                {user.name}
              </h2>
              <p className="text-md text-gray-500">{user.username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* White Box Below */}
      <div
        className="w-full lg:w-[1200px] bg-white rounded-b-md mb-4 shadow-md"
        style={{ height: "125px" }}
      />

      {/* Options Section */}
      <div className="w-full lg:w-[1200px] max-w-[95%] mb-4 flex flex-col">
        <div className="flex space-x-4 mb-6">
          {["intro", "editProfile", "changePassword"].map((option) => (
            <button
              key={option}
              className={`p-3 text-md ${
                selectedOption === option
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-700"
              }`}
              onClick={() => setSelectedOption(option)}
              aria-label={option.replace(/([A-Z])/g, " $1").toUpperCase()}
            >
              {option
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())}
            </button>
          ))}
        </div>

        {/* Content Display */}
        <div className="flex flex-col space-y-6">{renderContent()}</div>
      </div>
    </div>
  );
};

export default ProfileDetail;
