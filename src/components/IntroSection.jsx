// src/components/IntroSection.js
import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaBirthdayCake,
  FaGenderless,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";

const IntroSection = ({ user }) => {
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
              instagram: <FaInstagram className="text-pink-500 text-xl" />,
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
                icon: <FaBirthdayCake className="text-gray-500 mr-2 text-lg" />,
                label: "Birthday",
                value: user.birthday,
              },
              {
                icon: <FaGenderless className="text-gray-500 mr-2 text-lg" />,
                label: "Gender",
                value: user.gender,
              },
              {
                icon: <FaPhoneAlt className="text-gray-500 mr-2 text-lg" />,
                label: "Phone Number",
                value: user.phoneNumber,
              },
              {
                icon: <FaEnvelope className="text-gray-500 mr-2 text-lg" />,
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
};

export default IntroSection;
