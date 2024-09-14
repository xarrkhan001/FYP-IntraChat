// src/components/ProfileDetail.js
import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Outlet } from "react-router-dom";
import { FaCamera } from "react-icons/fa"; // Import an icon for changing images
import profile1 from "../assets/img1.jpg";
import background1 from "../assets/pic1.jpg";
import IntroSection from "./IntroSection";
import EditProfileSection from "./EditProfileSection";
import ChangePasswordSection from "./ChangePasswordSection";

const ProfileDetail = () => {
  const [selectedOption, setSelectedOption] = useState("intro");
  const [profilePic, setProfilePic] = useState(profile1);
  const [backgroundImage, setBackgroundImage] = useState(background1);

  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS for animations
  }, []);

  const handleImageChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "profile") {
          setProfilePic(reader.result);
        } else if (type === "background") {
          setBackgroundImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const user = {
    name: "John Doe",
    username: "@john_doe",
    profilePic: profilePic,
    backgroundImage: backgroundImage,
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
        return <IntroSection user={user} />;
      case "editProfile":
        return <EditProfileSection user={user} countries={countries} />;
      case "changePassword":
        return <ChangePasswordSection />;
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
        <label
          className="absolute top-4 right-4 cursor-pointer"
          title="Change Background"
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, "background")}
          />
          <FaCamera className="text-white text-3xl bg-gray-700 p-2 rounded-full" />
        </label>

        <div className="absolute top-1/2 transform -translate-y-1/4 mt-[260px] w-full flex items-start px-4 lg:px-16">
          <div className="relative flex items-center space-x-4">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-md border-4 border-white shadow-lg"
            />
            <label
              className="absolute top-0 right-0 cursor-pointer"
              title="Change Profile Picture"
            >
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageChange(e, "profile")}
              />
              <FaCamera className="text-white text-2xl bg-gray-700 p-1 rounded-full absolute top-[100px] right-[115px]" />
            </label>
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
      <Outlet />
    </div>
  );
};

export default ProfileDetail;
