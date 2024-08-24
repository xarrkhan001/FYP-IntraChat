import React, { useState } from "react";
import {
  AiOutlineSound,
  AiOutlinePicture,
  AiOutlineSetting,
  AiOutlineArrowLeft,
  AiOutlineFile,
  AiOutlineLink,
} from "react-icons/ai";
import { useLocation } from "react-router-dom";
import Image1 from "../assets/pic1.jpg";
import Image2 from "../assets/pic2.jpg";
import Image3 from "../assets/pic3.jpg";
import Image4 from "../assets/pic4.jpg";
import Image5 from "../assets/pic5.jpg";
import Image6 from "../assets/pic6.jpg";
import Image7 from "../assets/pic7.jpg";
import Image8 from "../assets/pic8.jpg";
import Image9 from "../assets/pic9.jpg";
import Image10 from "../assets/pic10.jpg";
import Image11 from "../assets/pic11.jpg";
import Image12 from "../assets/pic12.jpg";
import Video1 from "../assets/Videos.mp4";
import Video2 from "../assets/video1.mp4";

const mediaData = {
  images: [
    { id: 1, src: Image1 },
    { id: 2, src: Image2 },
    { id: 3, src: Image3 },
    { id: 4, src: Image4 },
    { id: 5, src: Image5 },
    { id: 6, src: Image6 },
    { id: 7, src: Image7 },
    { id: 8, src: Image8 },
    { id: 9, src: Image9 },
    { id: 10, src: Image10 },
    { id: 11, src: Image11 },
    { id: 12, src: Image12 },
  ],
  videos: [
    { id: 1, src: Video1 },
    { id: 2, src: Video2 },
  ],
  files: [
    {
      id: 1,
      name: "Document.pdf",
      url: "/path/to/Document.pdf",
      icon: <AiOutlineFile />,
    },
    {
      id: 2,
      name: "Presentation.pptx",
      url: "/path/to/Presentation.pptx",
      icon: <AiOutlineFile />,
    },
    {
      id: 3,
      name: "Document.pdf",
      url: "/path/to/Document.pdf",
      icon: <AiOutlineFile />,
    },
    {
      id: 4,
      name: "Presentation.pptx",
      url: "/path/to/Presentation.pptx",
      icon: <AiOutlineFile />,
    },
    {
      id: 5,
      name: "Document.pdf",
      url: "/path/to/Document.pdf",
      icon: <AiOutlineFile />,
    },
    {
      id: 6,
      name: "Presentation.pptx",
      url: "/path/to/Presentation.pptx",
      icon: <AiOutlineFile />,
    },
    {
      id: 7,
      name: "Document.pdf",
      url: "/path/to/Document.pdf",
      icon: <AiOutlineFile />,
    },
    {
      id: 8,
      name: "Presentation.pptx",
      url: "/path/to/Presentation.pptx",
      icon: <AiOutlineFile />,
    },
  ],
  links: [
    {
      id: 1,
      name: "Google",
      url: "https://www.google.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 2,
      name: "GitHub",
      url: "https://www.github.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 3,
      name: "Google",
      url: "https://www.google.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 4,
      name: "GitHub",
      url: "https://www.github.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 5,
      name: "Google",
      url: "https://www.google.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 6,
      name: "GitHub",
      url: "https://www.github.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 7,
      name: "Google",
      url: "https://www.google.com",
      icon: <AiOutlineLink />,
    },
    {
      id: 8,
      name: "GitHub",
      url: "https://www.github.com",
      icon: <AiOutlineLink />,
    },
  ],
};

const RightSidebar = () => {
  const location = useLocation();
  const { user } = location.state;

  const [isMuted, setIsMuted] = useState(false);
  const [showMuteModal, setShowMuteModal] = useState(false);
  const [mediaType, setMediaType] = useState("images");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showOptionsModal, setShowOptionsModal] = useState(false);

  const toggleMute = () => setShowMuteModal(true);

  const handleMuteDuration = (duration) => {
    console.log(`Muted for: ${duration}`);
    setIsMuted(true);
    setShowMuteModal(false);
  };

  const handleMediaClick = (type) => setMediaType(type);

  const handleMediaSelect = (media) => {
    setSelectedMedia(media);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMedia(null);
  };

  const toggleOptionsModal = () => setShowOptionsModal(!showOptionsModal);

  const handleBlockUser = () => {
    console.log("User blocked");
    setShowOptionsModal(false);
  };

  const handleReportUser = () => {
    console.log("User reported");
    setShowOptionsModal(false);
  };

  return (
    <div className="flex flex-col w-[360px] h-[700px] overflow-hidden shadow-sm bg-gray-50 p-4 rounded-md">
      <div
        className="relative h-44 w-full bg-cover bg-center rounded-md p-2"
        style={{ backgroundImage: `url(${user.backgroundImage})` }}
      >
        <img
          src={user.profilePic}
          alt={user.name}
          className="absolute w-16 h-16 rounded-md shadow border-2 border-white bottom-[-30px] left-1/2 transform -translate-x-1/2"
        />
      </div>

      <div className="flex flex-col mt-8 items-center p-4">
        <h1 className="text-lg text-gray-700 font-semibold">{user.name}</h1>
        <p className="text-sm text-gray-500">{user.status}</p>
        <div className="flex items-center mt-2">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-teal-200 mr-2"></div>
          <span className="text-xs text-gray-400 font-medium">Active</span>
        </div>
      </div>

      <div className="flex flex-row justify-center space-x-4 p-2 mt-1">
        <button
          className={`flex flex-col items-center justify-center h-20 w-24 rounded-md ${
            isMuted ? "bg-red-500" : "bg-gray-300"
          } text-white transition duration-300`}
          onClick={toggleMute}
        >
          <AiOutlineSound className="text-2xl mb-1 text-gray-600" />
          <span className="text-xs text-gray-600">Mute</span>
        </button>
        <button
          className="flex flex-col items-center justify-center h-20 w-24 rounded-md bg-gray-300 text-white transition duration-300"
          onClick={() => handleMediaClick("images")}
        >
          <AiOutlinePicture className="text-2xl mb-1 text-gray-600" />
          <span className="text-xs text-gray-600">Media</span>
        </button>
        <button
          className="flex flex-col items-center justify-center h-20 w-24 rounded-md bg-gray-300 text-white transition duration-300"
          onClick={toggleOptionsModal}
        >
          <AiOutlineSetting className="text-2xl mb-1 text-gray-600" />
          <span className="text-xs text-gray-600">Options</span>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        <div className="flex text-sm font-semibold space-x-12 mt-2 mb-4 ml-1">
          {["images", "videos", "files", "links"].map((type) => (
            <button
              key={type}
              className={`relative ${
                mediaType === type
                  ? "text-blue-500 font-semibold"
                  : "text-gray-500 hover:text-blue-500"
              } transition-colors duration-300`}
              onClick={() => handleMediaClick(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
              {mediaType === type && (
                <span className="absolute inset-x-0 bottom-[-4px] h-[2px] bg-blue-500 rounded-md transition-transform duration-300"></span>
              )}
            </button>
          ))}
        </div>

        {mediaType === "images" && (
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            {mediaData.images.map(({ id, src }) => (
              <img
                key={id}
                src={src}
                alt={`Image ${id}`}
                className="w-40 h-20 object-cover rounded-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
                onClick={() => handleMediaSelect(src)}
              />
            ))}
          </div>
        )}

        {mediaType === "videos" && (
          <div className="grid grid-cols-2 gap-x-4 gap-y-4">
            {mediaData.videos.map(({ id, src }) => (
              <video
                key={id}
                src={src}
                controls
                className="w-full h-auto object-cover rounded-md cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg"
              />
            ))}
          </div>
        )}

        {mediaType === "files" && (
          <div className="space-y-2">
            {mediaData.files.map(({ id, name, url, icon }) => (
              <a
                key={id}
                href={url}
                className="flex items-center space-x-2 bg-blue-100 p-4 text-sm font-semibold rounded-md text-gray-500 hover:bg-blue-200 hover:scale-105 hover:underline"
              >
                <span className="text-xl">{icon}</span>
                <span>{name}</span>
              </a>
            ))}
          </div>
        )}

        {mediaType === "links" && (
          <div className="space-y-2">
            {mediaData.links.map(({ id, name, url, icon }) => (
              <a
                key={id}
                href={url}
                className="flex items-center space-x-2 bg-blue-100 p-4 text-sm font-semibold rounded-md text-gray-500 hover:bg-blue-200 hover:scale-105 hover:underline"
              >
                <span className="text-xl">{icon}</span>
                <span>{name}</span>
              </a>
            ))}
          </div>
        )}
      </div>

      {showMuteModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Select Mute Duration</h2>
            {["Until Unmuted", "1 Day", "3 Days", "5 Days"].map((duration) => (
              <button
                key={duration}
                onClick={() => handleMuteDuration(duration)}
                className="block text-blue-500 mb-2"
              >
                {duration}
              </button>
            ))}
            <button
              onClick={() => {
                setIsMuted(false);
                setShowMuteModal(false);
              }}
              className="mt-4 bg-red-500 text-white rounded px-4 py-2"
            >
              Unmute
            </button>
          </div>
        </div>
      )}

      {showOptionsModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Manage Options</h2>
            <button
              onClick={handleBlockUser}
              className="block text-red-500 mb-2"
            >
              Block User
            </button>
            <button
              onClick={handleReportUser}
              className="block text-red-500 mb-2"
            >
              Report User
            </button>
            <button
              onClick={() => setShowOptionsModal(false)}
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
          <div className="relative bg-white rounded-lg p-6 shadow-lg">
            <button
              onClick={closeModal}
              className="absolute top-2 left-2 text-gray-700 hover:text-gray-900"
            >
              <AiOutlineArrowLeft className="text-2xl" />
            </button>
            <h2 className="text-lg font-semibold mb-4">Media Selected</h2>
            {selectedMedia.endsWith(".mp4") ? (
              <video src={selectedMedia} controls className="w-full h-auto" />
            ) : (
              <img
                src={selectedMedia}
                alt="Selected"
                className="w-full h-auto"
              />
            )}
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;
