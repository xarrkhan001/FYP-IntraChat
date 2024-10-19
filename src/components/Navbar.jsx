import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsFillChatTextFill } from "react-icons/bs";
import { RiDropdownList } from "react-icons/ri";
import { MdWebStories } from "react-icons/md";
import { PiNotificationBold } from "react-icons/pi";
import { SiGooglechat } from "react-icons/si";
import {
  FaUserFriends,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

// Import profile images
import profile1 from "../assets/img1.jpg";
import profile2 from "../assets/img2.jpg";
import profile3 from "../assets/img3.jpg";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  // Define the navigation items
  const navItems = [
    { icon: <BsFillChatTextFill />, text: "Messages", route: "/chat" },
    { icon: <FaUserFriends />, text: "Contacts", route: "/user" },
    { icon: <MdWebStories />, text: "Stories", route: "/story" },
  ];

  // Define dropdown items
  const dropdownItems = [
    {
      icon: <RiDropdownList className="text-gray-800 hover:text-blue-400" />,
      name: "dropdown1",
      links: navItems,
    },
    {
      icon: (
        <PiNotificationBold className="text-gray-800 hover:text-blue-400" />
      ),
      name: "dropdown2",
      links: [
        { text: "Notification", route: "/notifications", isHeader: true },
        { text: "Unread" },
        { text: "All" },
      ],
    },
    {
      icon: (
        <img src={profile1} alt="John Doe" className="w-6 h-6 rounded-full" />
      ),
      name: "dropdown3",
      links: [
        {
          icon: <FaUserCircle className="text-gray-600" />,
          text: "Profile",
          route: "/profile",
        },

        {
          icon: <FaSignOutAlt className="text-red-600" />,
          text: "Logout",
          route: "/",
        },
      ],
    },
  ];

  useEffect(() => {
    // Reset dropdown state if the route changes
    const currentPath = location.pathname;
    const foundIndex = navItems.findIndex((item) =>
      currentPath.startsWith(item.route)
    );
    setActiveIndex(foundIndex);

    // Close any dropdown if the route is not in the dropdown
    const foundDropdown = dropdownItems.find((dropdown) =>
      dropdown.links.some((link) => currentPath.startsWith(link.route))
    );
    if (!foundDropdown) {
      setActiveDropdown(null);
    }
  }, [location.pathname]);

  const handleIconClick = (index) => {
    setActiveIndex(index);
    setActiveDropdown(null); // Close any open dropdown
  };

  const toggleDropdown = useCallback((dropdown) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdown ? null : dropdown
    );
  }, []);

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <nav className="bg-gray-50 p-2 sm:p-3 border-t w-[1600px] border-b border-blue-200">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
          <div className="text-blue-400 text-xl sm:text-2xl md:text-3xl lg:text-4xl">
            <SiGooglechat />
          </div>
          <ul className="flex space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
            {navItems.map((item, index) => (
              <li
                key={index}
                className={`rounded-full ml-8 p-1 sm:p-2 md:p-3 text-xs sm:text-sm md:text-base lg:text-xl ${
                  activeIndex === index
                    ? "bg-blue-100"
                    : "bg-gray-200 hover:bg-blue-100"
                }`}
              >
                <Link
                  to={item.route}
                  className={`flex items-center justify-center w-full h-full ${
                    activeIndex === index ? "text-blue-400" : "text-gray-800"
                  }`}
                  onClick={() => handleIconClick(index)}
                >
                  {item.icon}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative flex items-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
          {dropdownItems.map((dropdown, index) => (
            <div key={index} className="relative">
              <button
                className={`text-black text-xs sm:text-sm md:text-base lg:text-xl relative rounded-full p-1 sm:p-2 md:p-3 ${
                  activeDropdown === dropdown.name
                    ? "bg-blue-100"
                    : "bg-gray-200 hover:bg-blue-100"
                }`}
                onClick={() => toggleDropdown(dropdown.name)}
              >
                {dropdown.icon}
              </button>
              {activeDropdown === dropdown.name && (
                <ul
                  className={`absolute right-0 mt-2 ${
                    dropdown.name === "dropdown1"
                      ? "w-32 sm:w-40 md:w-48 lg:w-56"
                      : dropdown.name === "dropdown2"
                      ? "w-48 sm:w-56 md:w-64 lg:w-72"
                      : dropdown.name === "dropdown3"
                      ? "w-48 sm:w-56 md:w-64 lg:w-80"
                      : "w-32"
                  } bg-gray-50 rounded-lg shadow-lg z-50 overflow-y-auto max-h-80`}
                >
                  {dropdown.name === "dropdown2" ? (
                    <div className="flex flex-col">
                      <div className="flex justify-between px-2 sm:px-4 py-1 sm:py-2 text-gray-800 font-semibold border-b border-gray-200">
                        <span className="text-xs sm:text-sm">Notification</span>
                        <div className="flex space-x-1 sm:space-x-2">
                          <div className="text-blue-500 hover:bg-blue-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                            Unread
                          </div>
                          <div className="text-blue-500 hover:bg-blue-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                            All
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-200">
                          <img
                            src={profile1}
                            alt="John Doe"
                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3"
                          />
                          <div className="flex-grow">
                            <p className="font-semibold text-xs sm:text-sm">
                              John Doe
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              wants to connect
                            </p>
                          </div>
                          <button className="text-blue-500 hover:bg-blue-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                            Call Back
                          </button>
                        </div>
                        <div className="flex items-center px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-200">
                          <img
                            src={profile2}
                            alt="Jane Smith"
                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3"
                          />
                          <div className="flex-grow">
                            <p className="font-semibold text-xs sm:text-sm">
                              Jane Smith
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              wants to add you
                            </p>
                          </div>
                          <div className="flex space-x-1 sm:space-x-2">
                            <button className="text-green-500 hover:bg-green-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                              Accept
                            </button>
                            <button className="text-red-500 hover:bg-red-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                              Reject
                            </button>
                          </div>
                        </div>
                        <div className="flex items-center px-2 sm:px-4 py-1 sm:py-2">
                          <img
                            src={profile3}
                            alt="Emily Johnson"
                            className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3"
                          />
                          <div className="flex-grow">
                            <p className="font-semibold text-xs sm:text-sm">
                              Emily Johnson
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600">
                              sent you a message
                            </p>
                          </div>
                          <button className="text-blue-500 hover:bg-blue-100 px-1 sm:px-2 py-0.5 sm:py-1 rounded text-xs sm:text-sm">
                            Call Back
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : dropdown.name === "dropdown3" ? (
                    <div className="flex flex-col">
                      <div className="flex items-center px-2 sm:px-4 py-1 sm:py-2 border-b border-gray-200">
                        <img
                          src={profile1}
                          alt="John Doe"
                          className="w-8 sm:w-10 h-8 sm:h-10 rounded-full mr-2 sm:mr-3"
                        />
                        <div className="flex flex-col">
                          <p className="font-semibold text-xs sm:text-sm">
                            John Doe
                          </p>
                          <p className="text-xs sm:text-sm text-gray-600">
                            @john_doe
                          </p>
                        </div>
                      </div>
                      {dropdown.links.map((link, linkIndex) => (
                        <li
                          key={linkIndex}
                          className={`flex items-center px-2 sm:px-4 py-1 sm:py-2 ${
                            link.isHeader
                              ? "text-gray-800 font-semibold border-b border-gray-200"
                              : "hover:bg-blue-100"
                          }`}
                        >
                          <Link
                            to={link.route}
                            className="flex items-center w-full text-gray-800"
                            onClick={() => {
                              if (link.text === "Logout") {
                                handleLogout();
                              } else {
                                setActiveDropdown(null);
                              }
                            }}
                          >
                            <span className="text-xs sm:text-sm mr-1 sm:mr-2">
                              {link.icon}
                            </span>
                            <span className="text-xs sm:text-sm">
                              {link.text}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </div>
                  ) : dropdown.name === "dropdown1" ? (
                    <div className="flex flex-col">
                      {dropdown.links.map((link, linkIndex) => (
                        <li
                          key={linkIndex}
                          className={`flex items-center px-2 sm:px-4 py-1 sm:py-2 ${
                            link.route === location.pathname
                              ? "bg-blue-100 text-blue-500"
                              : "hover:bg-blue-100"
                          }`}
                        >
                          <Link
                            to={link.route}
                            className="flex items-center w-full text-gray-800"
                            onClick={() => setActiveDropdown(null)}
                          >
                            <span className="text-xs sm:text-sm mr-1 sm:mr-2">
                              {link.icon}
                            </span>
                            <span className="text-xs sm:text-sm">
                              {link.text}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </div>
                  ) : null}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
