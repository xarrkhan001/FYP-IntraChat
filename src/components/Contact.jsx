import React, { useState } from "react";
import {
  AiOutlineSearch,
  AiOutlineFileText,
  AiOutlineDelete,
  AiOutlineWarning,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { IoIosCall, IoMdVideocam } from "react-icons/io";
import { Link } from "react-router-dom";

// Profile and Background images imports

import profile1 from "../assets/img1.jpg";
import profile2 from "../assets/img2.jpg";
import profile3 from "../assets/img3.jpg";
import profile4 from "../assets/img4.jpg";
import profile5 from "../assets/img5.jfif";
import profile6 from "../assets/img6.jpg";
import profile7 from "../assets/img7.jpg";
import profile8 from "../assets/img8.jpg";
import profile9 from "../assets/img9.jpg";
import profile10 from "../assets/img10.jpg";
import profile11 from "../assets/img12.jpg";
import profile12 from "../assets/img11.jpg";

// background images
import background1 from "../assets/pic1.jpg";
import background2 from "../assets/pic2.jpg";
import background3 from "../assets/pic3.jpg";
import background4 from "../assets/pic4.jpg";
import background5 from "../assets/pic5.jpg";
import background6 from "../assets/pic6.jpg";
import background7 from "../assets/pic7.jpg";
import background8 from "../assets/pic8.jpg";
import background9 from "../assets/pic9.jpg";
import background10 from "../assets/pic10.jpg";
import background11 from "../assets/pic11.jpg";
import background12 from "../assets/pic12.jpg";

import AudioCallScreen from "./AudioCallScreen";
import VideoCallScreen from "./VideoCallScreen";

const Contact = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [activeCall, setActiveCall] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const users = [
    {
      id: 1,
      name: "John Doe",
      username: "@john_doe",
      profilePic: profile1,
      backgroundImage: background1,
      isNew: false,
      isFavourite: true,
      isBlocked: false,
      email: "john.doe@example.com",
      phone: "+1234567890",
      birthday: "1990-01-01",
      description: "Hey there! I'm John Doe, a passionate web developer.",
      gender: "male",
      country: "United States",
      city: "New York",
      language: "English",
    },

    {
      id: 2,
      name: "Jane Smith",
      username: "@jane_smith",
      profilePic: profile2,
      backgroundImage: background2,
      isNew: true,
      isFavourite: false,
      isBlocked: false,
      email: "jane.smith@example.com",
      phone: "+1987654321",
      birthday: "1995-03-15",
      description:
        "Hello! I'm Jane Smith, a passionate designer and nature enthusiast.",
      gender: "female",
      country: "Canada",
      city: "Toronto",
      language: "English, French",
    },
    {
      id: 3,
      name: "Bob Brown",
      username: "@bob_Brown",
      profilePic: profile3,
      backgroundImage: background3,
      isNew: true,
      isFavourite: false,
      isBlocked: true,
      email: "bob.brown@example.com",
      phone: "+1122334455",
      birthday: "1985-12-10",
      description: "Hi there! I'm Bob Brown, an avid traveler and food lover.",
      gender: "male",
      country: "Australia",
      city: "Sydney",
      language: "English",
    },
    {
      id: 4,
      name: "Alice Johnson",
      username: "@alice_Johnson",
      profilePic: profile4,
      backgroundImage: background4,
      isNew: true,
      isFavourite: true,
      isBlocked: false,
      email: "alice.johnson@example.com",
      phone: "+1567890123",
      birthday: "1988-07-22",
      description:
        "Hey, I'm Alice Johnson. I love reading and exploring new places.",
      gender: "female",
      country: "United Kingdom",
      city: "London",
      language: "English",
    },
    {
      id: 5,
      name: "Emily Davis",
      username: "@emily_Davis",
      profilePic: profile5,
      backgroundImage: background5,
      isNew: true,
      isFavourite: false,
      isBlocked: true,
      email: "emily.davis@example.com",
      phone: "+1654321098",
      birthday: "1992-04-30",
      description:
        "Hey, I'm Emily Davis. Passionate about photography and travel.",
      gender: "female",
      country: "United States",
      city: "Los Angeles",
      language: "English",
    },
    {
      id: 6,
      name: "Michael Wilson",
      username: "@michael_Wilson",
      profilePic: profile6,
      backgroundImage: background6,
      isNew: true,
      isFavourite: false,
      isBlocked: true,
      email: "michael.wilson@example.com",
      phone: "+1789456123",
      birthday: "1987-09-18",
      description: "Hi, I'm Michael Wilson. Love sports and technology.",
      gender: "male",
      country: "Canada",
      city: "Vancouver",
      language: "English, French",
    },
    {
      id: 7,
      name: "Sarah Thompson",
      username: "@sarah_Thompson",
      profilePic: profile7,
      backgroundImage: background7,
      email: "sarah.thompson@example.com",
      phone: "+1346798520",
      birthday: "1994-11-05",
      description: "Hello! I'm Sarah Thompson. Music and art are my passions.",
      gender: "female",
      country: "United States",
      city: "Chicago",
      language: "English",
    },
    {
      id: 8,
      name: "David Clark",
      username: "@david_Clark",
      profilePic: profile8,
      backgroundImage: background8,
      email: "david.clark@example.com",
      phone: "+1209876543",
      birthday: "1991-02-14",
      description: "Hey, I'm David Clark. Enjoy coding and gaming.",
      gender: "male",
      country: "United States",
      city: "San Francisco",
      language: "English, Spanish",
    },
    {
      id: 9,
      name: "Emily Davis",
      username: "@emily_Davis",
      profilePic: profile9,
      backgroundImage: background9,
      email: "emily.davis2@example.com",
      phone: "+1765432987",
      birthday: "1993-08-27",
      description: "Hi, I'm Emily Davis. Love hiking and adventure sports.",
      gender: "female",
      country: "Australia",
      city: "Melbourne",
      language: "English",
    },
    {
      id: 10,
      name: "Michael Wilson",
      username: "@michael_Wilson",
      profilePic: profile10,
      backgroundImage: background10,
      email: "michael.wilson2@example.com",
      phone: "+1654321098",
      birthday: "1989-06-12",
      description:
        "Hey, I'm Michael Wilson. Technology enthusiast and coffee lover.",
      gender: "male",
      country: "United States",
      city: "New York",
      language: "English",
    },
    {
      id: 11,
      name: "Sarah Thompson",
      username: "@sarah_Thompson",
      profilePic: profile11,
      backgroundImage: background11,
      email: "sarah.thompson2@example.com",
      phone: "+1987654321",
      birthday: "1986-03-25",
      description: "Hello! I'm Sarah Thompson. Avid reader and movie buff.",
      gender: "female",
      country: "Canada",
      city: "Montreal",
      language: "English, French",
    },
    {
      id: 12,
      name: "David Clark",
      username: "@david_Clark",
      profilePic: profile12,
      backgroundImage: background12,
      email: "david.clark2@example.com",
      phone: "+1122334455",
      birthday: "1990-12-05",
      description: "Hi, I'm David Clark. Outdoor enthusiast and nature lover.",
      gender: "male",
      country: "United States",
      city: "Seattle",
      language: "English",
    },
    // ... more users
  ];
  const handleSearchFocus = () => setSearchFocused(true);
  const handleSearchBlur = () => setSearchFocused(false);
  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleFilterChange = (newFilter) => setFilter(newFilter);

  const filteredUsers = users
    .filter((user) => {
      if (filter === "All") return true;
      if (filter === "New") return user.isNew;
      if (filter === "Archived") return user.isFavourite;
      if (filter === "Blocked") return user.isBlocked;
      return false;
    })
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const toggleDropdown = (userId) => {
    setOpenDropdown(openDropdown === userId ? null : userId);
  };

  const closeDropdown = () => setOpenDropdown(null);

  const startCall = (user, type) => {
    setActiveCall({ user, type });
    closeDropdown();
  };

  const endCall = () => {
    setActiveCall(null);
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(selectedUserId === userId ? null : userId);
  };

  return (
    <div className="flex flex-col w-[360px] h-full  border-r border-blue-200  bg-gray-50">
      <div className="max-w-md mx-auto py-4 px-6 top-0 z-10 bg-gray-50">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-bold text-gray-700 mt-2 ml-1">
            Contacts
          </h1>
          <div className="flex flex-col md:flex-row md:mt-1 text-sm">
            <div className="flex md:flex-nowrap md:space-x-2 mt-4">
              {["All", "New", "Archived", "Blocked"].map((option) => (
                <div
                  key={option}
                  className="relative cursor-pointer"
                  onClick={() => handleFilterChange(option)}
                >
                  <span
                    className={`px-2 py-1 md:px-4 md:py-2 text-sm ${
                      filter === option
                        ? "font-bold text-blue-500 border-b-2 border-blue-500"
                        : "font-semibold text-slate-500"
                    }`}
                  >
                    {option}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="relative mt-6">
          <input
            type="text"
            placeholder="Search contact / chat"
            className={`p-2 pl-12 rounded-full  h-10 w-full bg-${
              searchFocused ? "blue" : "gray"
            }-200 w-[280px] focus:outline-none focus:bg-blue-100 text-gray-700`}
            value={searchTerm}
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
          />
          <div className="absolute left-3 top-2/3 transform -translate-y-2/3">
            <AiOutlineSearch className="text-lg text-gray-500" />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto mb-2 h-[500px]">
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id} className="relative">
                <Link
                  to={`/user/${user.id}`}
                  state={{ user }}
                  className={`flex items-center px-6 py-2 mt-2 cursor-pointer ${
                    selectedUserId === user.id
                      ? "bg-slate-100"
                      : "hover:bg-slate-100"
                  } relative`}
                  onClick={() => handleUserClick(user.id)}
                >
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-12 h-12 rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="text-md font-semibold text-gray-500">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-400">{user.username}</p>
                  </div>
                  <div
                    className="absolute right-0 top-0 mt-2 mr-2 cursor-pointer flex justify-center"
                    onClick={(e) => {
                      e.preventDefault();
                      toggleDropdown(user.id);
                    }}
                  >
                    <BsThreeDots
                      className="hover:text-blue-500 mt-4 opacity-0 hover:opacity-100 transition duration-300"
                      style={{ fontSize: 20, cursor: "pointer" }} // Added cursor style for better UX
                      onClick={() => setOpenDropdown(user.id)} // Assuming you have a function to toggle the dropdown
                    />
                    {openDropdown === user.id && (
                      <div
                        className="absolute right-0 w-48 bg-white mt-2 text-gray-500 rounded-lg shadow-lg py-1 z-10"
                        style={{
                          top: "calc(100% + 1px)", // Adjusted spacing to bring the dropdown closer
                        }}
                      >
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            startCall(user, "audio");
                          }}
                        >
                          <IoIosCall className="mr-2" /> Audio Call
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            startCall(user, "video");
                          }}
                        >
                          <IoMdVideocam className="mr-2" /> Video Call
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Archive clicked for user", user.name);
                            closeDropdown();
                          }}
                        >
                          <AiOutlineFileText className="mr-2" /> Archive
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Delete clicked for user", user.name);
                            closeDropdown();
                          }}
                        >
                          <AiOutlineDelete className="mr-2" /> Delete
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Report clicked for user", user.name);
                            closeDropdown();
                          }}
                        >
                          <AiOutlineWarning className="mr-2" /> Report
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Render the call screens */}
      {activeCall && activeCall.type === "audio" && (
        <AudioCallScreen
          user={activeCall.user}
          onEndCall={endCall}
          onToggleMic={() => console.log("Toggle mic")}
          onAddUser={() => console.log("Add user")}
        />
      )}
      {activeCall && activeCall.type === "video" && (
        <VideoCallScreen
          user={activeCall.user}
          onEndCall={endCall}
          onToggleMic={() => console.log("Toggle mic")}
          onAddUser={() => console.log("Add user")}
        />
      )}
    </div>
  );
};

export default Contact;
