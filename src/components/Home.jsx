import React, { useState, useEffect } from "react";
import {
  AiOutlineSearch,
  AiOutlineEye,
  AiOutlineFileText,
  AiOutlineDelete,
  AiOutlineWarning,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
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

// Background Images (sample)
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

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isHomeVisible, setIsHomeVisible] = useState(true);

  const navigate = useNavigate();

  const users = [
    {
      id: 1,
      name: "John Doe",
      profilePic: profile1,
      backgroundImage: background1,
      message: "Hey there! How are you?",
      isArchived: false,
      isNew: true,
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: profile2,
      backgroundImage: background2,
      message: "Did you get my email?",
      isArchived: true,
      isNew: false,
    },
    {
      id: 3,
      name: "Emily Johnson",
      profilePic: profile3,
      backgroundImage: background3,
      message: "Let's catch up soon!",
      isArchived: false,
      isNew: false,
    },

    {
      id: 4,
      name: "Bob Brown",
      profilePic: profile4,
      backgroundImage: background4,
      message: "Let's catch up later today.",
    },
    {
      id: 5,
      name: "Emily Davis",
      profilePic: profile5,
      backgroundImage: background5,
      message: "How was your weekend?",
    },
    {
      id: 6,
      name: "Michael Wilson",
      profilePic: profile6,
      backgroundImage: background6,
      message: "Ready for the presentation?",
    },
    {
      id: 7,
      name: "Sarah Thompson",
      profilePic: profile7,
      backgroundImage: background7,
      message: "Thanks for the update!",
    },
    {
      id: 8,
      name: "David Clark",
      profilePic: profile8,
      backgroundImage: background8,
      message: "Could you send me the file?",
    },
    {
      id: 9,
      name: "Linda Martinez",
      profilePic: profile9,
      backgroundImage: background9,
      message: "I'll be out of office tomorrow.",
    },
    {
      id: 10,
      name: "Kevin Lee",
      profilePic: profile10,
      backgroundImage: background10,
      message: "Let's discuss the new project.",
    },
    {
      id: 11,
      name: "Jessica Hall",
      profilePic: profile11,
      backgroundImage: background11,
      message: "How are things going?",
    },
    {
      id: 12,
      name: "Richard Taylor",
      profilePic: profile12,
      backgroundImage: background12,
      message: "Looking forward to the event!",
    },
  ];

  const filteredUsers = users
    .filter((user) => {
      switch (filter) {
        case "All":
          return true;
        case "New":
          return user.isNew;
        case "Archived":
          return user.isArchived;
        default:
          return true;
      }
    })
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setSearchFocused(false);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const toggleDropdown = (userId) => {
    if (openDropdown === userId) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(userId);
    }
  };

  const handleUserClick = (userId) => {
    setSelectedUserId(userId);
    setIsHomeVisible(false);
    navigate(`/chat/${userId}`);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`flex flex-col w-[360px] h-full bg-gray-50 border-r border-blue-200 ${
        !isHomeVisible ? "hidden" : "block"
      } md:block`}
    >
      <div>
        <div className="max-w-md mx-auto py-4 px-6 top-0 z-10">
          <div className="flex flex-col md:flex-row items-center md:justify-between">
            <h1 className="text-2xl font-bold text-gray-700 mt-2 ml-1">
              Chats
            </h1>
            <div className="flex flex-wrap md:flex-nowrap mt-4">
              {["All", "New", "Archived"].map((option) => (
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
          <div className="relative mt-6">
            <input
              type="text"
              placeholder="Search contact / chat"
              className={`p-2 pl-12 rounded-full w-full h-10 bg-${
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
      </div>

      <div className="flex-1 overflow-y-auto h-[560px]">
        <div className="max-w-md mx-auto mb-2">
          <ul>
            {filteredUsers.map((user) => (
              <li key={user.id} className="relative">
                <Link
                  to={`/chat/${user.id}`}
                  state={{ user }}
                  className={`flex items-center px-4 py-2 md:px-6 md:py-2 mt-2 cursor-pointer ${
                    selectedUserId === user.id
                      ? "bg-slate-100"
                      : "hover:bg-slate-100"
                  } relative`}
                  onClick={() => handleUserClick(user.id)}
                >
                  <img
                    src={user.profilePic}
                    alt="Profile"
                    className="w-10 h-10 md:w-12 md:h-12 rounded-md mr-4"
                  />
                  <div className="flex flex-col">
                    <p className="text-sm md:text-md font-semibold text-gray-500">
                      {user.name}
                    </p>
                    <p className="text-xs md:text-sm text-gray-400">
                      {user.message}
                    </p>
                  </div>
                  <div
                    className="absolute right-0 top-0 mt-2 mr-2 cursor-pointer flex justify-center dropdown"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      toggleDropdown(user.id);
                    }}
                  >
                    <BsThreeDots
                      className="hover:text-blue-500 mt-4 opacity-0 hover:opacity-100 transition duration-300"
                      style={{ fontSize: 20 }}
                    />
                    {openDropdown === user.id && (
                      <div className="absolute right-0 w-48 bg-white mt-11 text-gray-500 rounded-lg shadow-lg py-1 z-10">
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(
                              "Marked as Read clicked for user",
                              user.name
                            );
                            setOpenDropdown(null);
                          }}
                        >
                          <AiOutlineEye className="mr-2" /> Marked as Read
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log(
                              "View Profile clicked for user",
                              user.name
                            );
                            navigate(`/user/${user.id}`, { state: { user } });
                            setOpenDropdown(null);
                          }}
                        >
                          <AiOutlineFileText className="mr-2" /> View Profile
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Archive clicked for user", user.name);
                            setOpenDropdown(null);
                          }}
                        >
                          <AiOutlineFileText className="mr-2" /> Archive
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Delete clicked for user", user.name);
                            setOpenDropdown(null);
                          }}
                        >
                          <AiOutlineDelete className="mr-2" /> Delete
                        </div>
                        <div
                          className="flex items-center px-4 py-2 hover:text-blue-500 cursor-pointer"
                          onClick={(e) => {
                            e.preventDefault();
                            console.log("Report clicked for user", user.name);
                            setOpenDropdown(null);
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
    </div>
  );
};

export default Home;
