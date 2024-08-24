import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  MdDateRange,
  MdLocationOn,
  MdEmail,
  MdPhone,
  MdLanguage,
  MdPerson,
} from "react-icons/md"; // Import required icons

// Import profile images
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

// Import gallery images
import img1 from "../assets/pic1.jpg";
import img2 from "../assets/pic2.jpg";
import img3 from "../assets/pic3.jpg";
import img4 from "../assets/pic4.jpg";
import img5 from "../assets/pic5.jpg";
import img6 from "../assets/pic6.jpg";
import img7 from "../assets/pic7.jpg";
import img8 from "../assets/pic8.jpg";
import img9 from "../assets/pic9.jpg";
import img10 from "../assets/pic10.jpg";
import img11 from "../assets/pic11.jpg";
import img12 from "../assets/pic12.jpg";

// Import stories videos
import Video1 from "../assets/Videos.mp4";
import Video2 from "../assets/video1.mp4";

const UserDetail = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [activeOption, setActiveOption] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // If no user is passed through location state, display a message
  if (!user) {
    return <div>No user selected</div>;
  }

  // Initialize user data with imported images and videos
  user.gallery = [
    img1,
    img2,
    img3,
    img4,
    img5,
    img6,
    img7,
    img8,
    img9,
    img10,
    img11,
    img12,
  ];

  user.stories = [
    { id: 1, media: Video1 },
    { id: 2, media: Video2 },
    { id: 1, media: Video1 },
    { id: 2, media: Video2 },
    { id: 1, media: Video1 },
    { id: 2, media: Video2 },
    { id: 1, media: Video1 },
    { id: 2, media: Video2 },
    { id: 1, media: Video1 },
    { id: 2, media: Video2 },
    { id: 1, media: Video1 },
    { id: 2, media: Video2 },
  ];

  user.mutualContacts = [
    { name: "Jane Smith", username: "@jane_smith", profilePic: profile12 },
    { name: "Mike Johnson", username: "@mike_johnson", profilePic: profile2 },
    { name: "Alice Johnson", username: "@alice_johnson", profilePic: profile3 },
    { name: "Bob Brown", username: "@bob_brown", profilePic: profile4 },
    { name: "Emily Davis", username: "@emily_davis", profilePic: profile11 },
    {
      name: "Michael Wilson",
      username: "@michael_wilson",
      profilePic: profile6,
    },
    {
      name: "Sarah Thompson",
      username: "@sarah_thompson",
      profilePic: profile7,
    },
    { name: "David Clark", username: "@david_clark", profilePic: profile8 },
    {
      name: "Linda Martinez",
      username: "@linda_martinez",
      profilePic: profile9,
    },
    { name: "Kevin Lee", username: "@kevin_lee", profilePic: profile10 },
  ];

  // Auto-play stories when 'stories' option is active
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeOption === "stories" && !isPaused) {
        setCurrentStoryIndex((prevIndex) =>
          prevIndex < user.stories.length - 1 ? prevIndex + 1 : 0
        );
      }
    }, 5000); // Change the interval time as needed (e.g., every 5 seconds)

    return () => clearInterval(interval);
  }, [activeOption, isPaused, user.stories.length]);

  // Handle click on navigation option buttons
  const handleOptionClick = (option) => {
    setActiveOption(option);
    setSelectedImage(null); // Reset selectedImage when opening a new option
    setCurrentStoryIndex(0); // Reset story index when opening stories
    setIsPaused(false); // Ensure autoplay starts when stories are opened
  };

  // Close the user detail card
  const closeCard = () => {
    setActiveOption(null);
    setSelectedImage(null);
    setIsPaused(false); // Reset autoplay state when closing the card
  };

  // Open a selected image in an enlarged view
  const openImage = (image) => {
    setSelectedImage(image);
  };

  // Close the enlarged image view
  const closeImage = () => {
    setSelectedImage(null);
  };

  // Toggle pause/play for story videos
  const togglePause = () => {
    setIsPaused((prevPaused) => !prevPaused);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-[700px] bg-blue-100 overflow-y-auto relative">
      {/* Background Image Container */}
      <div
        className={`flex items-center justify-center w-full h-[500px] rounded-t-md relative mt-9 ${
          activeOption ? "filter blur-lg brightness-75" : ""
        }`}
        style={{
          backgroundImage: `url(${user.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          maxWidth: "95%",
        }}
      >
        {/* Profile Picture and User Info Container */}
        <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-start pl-16 mt-[280px] mr-20">
          <div className="flex items-center space-x-4">
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-32 h-32 rounded-md border-2"
            />
            <div className="flex flex-col items-start">
              <h2 className="text-lg font-semibold text-gray-500 mt-4">
                {user.name}
              </h2>
              <p className="text-sm text-gray-400">{user.username}</p>
            </div>
          </div>
        </div>
      </div>

      {/* White Box Below */}
      <div
        className="w-full bg-gray-50 rounded-b-md mb-4"
        style={{
          height: "125px",
          maxWidth: "95%",
        }}
      ></div>

      {/* Navigation Buttons */}
      <div className="space-x-4 mr-[880px] mt-2 font-semibold text-sm text-gray-500 mb-4">
        <button
          className={`hover:text-blue-500 ${
            activeOption === "about" ? "text-blue-500" : ""
          }`}
          onClick={() => handleOptionClick("about")}
        >
          About
        </button>
        <button
          className={`hover:text-blue-500 ${
            activeOption === "mutual" ? "text-blue-500" : ""
          }`}
          onClick={() => handleOptionClick("mutual")}
        >
          Mutual contacts
        </button>
        <button
          className={`hover:text-blue-500 ${
            activeOption === "gallery" ? "text-blue-500" : ""
          }`}
          onClick={() => handleOptionClick("gallery")}
        >
          Gallery
        </button>
        <button
          className={`hover:text-blue-500 ${
            activeOption === "stories" ? "text-blue-500" : ""
          }`}
          onClick={() => handleOptionClick("stories")}
        >
          Stories
        </button>
      </div>

      {/* Render Content based on activeOption */}
      {activeOption && (
        <div className="absolute top-[300px] left-[50%] w-[800px] transform -translate-x-1/2 -translate-y-1/2 bg-gray-50 p-8 rounded-md shadow-lg overflow-hidden">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">
              {activeOption === "about" && (
                <div className="overflow-auto max-w-full rounded-lg ">
                  <h3 className="text-xl text-gray-700 font-bold mb-4">
                    About {user.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-4">
                    {user.description}
                  </p>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="flex items-center text-sm">
                      <MdDateRange className="text-xl text-gray-700 mt-4" />
                      <p className="ml-2 mt-4 text-gray-500">{user.birthday}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <MdLocationOn className="text-xl text-gray-700 mt-4" />
                      <p className="ml-2 mt-4 text-gray-500">
                        {user.city}, {user.country}
                      </p>
                    </div>
                    <div className="flex items-center text-sm">
                      <MdEmail className="text-xl text-gray-700 mt-4" />
                      <p className="ml-2 mt-4 text-gray-500">{user.email}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <MdPhone className="text-xl text-gray-700 mt-4" />
                      <p className="ml-2 mt-4 text-gray-500">{user.phone}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <MdLanguage className="text-xl text-gray-700 mt-4" />
                      <p className="ml-2 mt-4 text-gray-500">{user.language}</p>
                    </div>
                    <div className="flex items-center text-sm">
                      <MdPerson className="text-xl text-gray-700 mt-4" />
                      <p className="ml-2 mt-4 text-gray-500">{user.gender}</p>
                    </div>
                    {/* Add more details as needed */}
                  </div>
                </div>
              )}

              {/* Mutual contacts */}
              {activeOption === "mutual" && (
                <div>
                  <h3 className="text-xl text-gray-700 font-bold mb-4">
                    Mutual Contacts
                  </h3>
                  <div className="grid grid-cols-5 gap-4">
                    {user.mutualContacts.map((contact, index) => (
                      <div
                        key={index}
                        className="flex flex-col items-center cursor-pointer p-2 rounded-md hover:bg-gray-200"
                      >
                        <img
                          src={contact.profilePic}
                          alt={contact.name}
                          className="w-24 h-24 rounded-md mb-2"
                        />
                        <div className="text-center">
                          <p className="text-gray-700 text-sm font-semibold">
                            {contact.name}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {contact.username}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeOption === "gallery" && "Gallery"}
              {activeOption === "stories" && "Stories"}
            </h2>
            <button
              onClick={closeCard}
              className="absolute top-9  right-6 text-gray-500 font-semibold hover:text-blue-500"
            >
              Close
            </button>
          </div>
          <div
            className="grid grid-cols-1 gap-4"
            style={{ maxHeight: "50vh", overflowY: "auto" }} // Limit card height and enable scrolling
          >
            {/* Render Gallery if activeOption is gallery */}

            {activeOption === "gallery" && (
              <div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {user.gallery.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`Gallery ${index}`}
                      className="w-full h-32 object-cover rounded-md border-2 cursor-pointer hover:scale-90 transition-transform"
                      onClick={() => openImage(image)}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Render Stories if activeOption is stories */}
            {activeOption === "stories" && (
              <div className="grid grid-cols-2 gap-4">
                {/* Sidebar with small previews of all stories */}
                <div className="h-full overflow-y-auto">
                  {user.stories.map((story, index) => (
                    <div
                      key={index}
                      className={`flex items-center p-2 cursor-pointer rounded-md duration-300 hover:scale-75 ${
                        index === currentStoryIndex
                          ? "bg-blue-200"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => setCurrentStoryIndex(index)}
                    >
                      <video
                        src={story.media}
                        autoPlay={index === currentStoryIndex && !isPaused}
                        muted
                        loop
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="ml-2">
                        <h3 className="text-sm font-semibold">{`Story ${
                          index + 1
                        }`}</h3>
                        <p className="text-xs text-gray-500">
                          Short description
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Main story display */}
                <div className="relative">
                  <div className="w-full h-96 relative">
                    <video
                      src={user.stories[currentStoryIndex].media}
                      autoPlay={!isPaused}
                      muted
                      loop
                      className="w-full h-full object-cover rounded-md"
                      onClick={togglePause}
                    />
                    <div className="absolute bottom-2 left-2 text-white">
                      <h3 className="text-lg font-semibold">
                        {`Story ${currentStoryIndex + 1}`}
                      </h3>
                      <p>Description of the current story</p>
                    </div>
                  </div>
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <button
                      onClick={() =>
                        setCurrentStoryIndex((prevIndex) =>
                          prevIndex > 0
                            ? prevIndex - 1
                            : user.stories.length - 1
                        )
                      }
                      className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 cursor-pointer"
                    >
                      {"<"}
                    </button>
                    <button
                      onClick={() =>
                        setCurrentStoryIndex((prevIndex) =>
                          prevIndex < user.stories.length - 1
                            ? prevIndex + 1
                            : 0
                        )
                      }
                      className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 text-white rounded-full p-2 cursor-pointer"
                    >
                      {">"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Enlarged Image */}
      {selectedImage && (
        <div
          className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-75"
          onClick={closeImage}
        >
          <img src={selectedImage} alt="Enlarged Gallery" className="" />
        </div>
      )}
    </div>
  );
};

export default UserDetail;
