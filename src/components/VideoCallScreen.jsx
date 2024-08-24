import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import IMG from "../assets/islamia02.png";
import {
  faPhoneSlash,
  faMicrophone,
  faUserPlus,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";

const VideoCallScreen = ({
  user,
  onEndCall,
  onToggleMic,
  onAddUser,
  isIncomingCall,
  onAcceptCall,
}) => {
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [showUserFeed, setShowUserFeed] = useState(false);

  const handleSwitchCamera = () => {
    setIsCameraOn((prev) => !prev);
  };

  const handleAcceptCall = () => {
    setShowUserFeed(true);
    onAcceptCall();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative bg-gray-900 text-white rounded-lg p-6 shadow-lg border border-gray-700 max-w-md w-full">
        {/* User Background Image */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        />

        {/* Video Container */}
        <div className="flex flex-col items-center space-y-2 mb-4">
          {/* User's Video Feed */}
          {showUserFeed && (
            <div className="relative w-full h-36 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
              <p className="text-gray-400">{user.name}'s Video Feed</p>
            </div>
          )}
          {/* Your Video Feed */}
          <div className="relative w-full h-44 bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
            {isCameraOn ? (
              <p className="text-gray-400">Your Video Feed</p>
            ) : (
              <img
                src={IMG}
                alt="Your Background"
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="flex flex-col items-center mb-4">
          <div
            className="w-20 h-20 rounded-full bg-gray-800 border-4 border-white mb-3 flex items-center justify-center"
            style={{
              backgroundImage: `url(${user.profilePic})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="text-center">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-500">
              {isIncomingCall ? "Incoming Call..." : "Calling..."}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-3">
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
            onClick={onToggleMic}
          >
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-green-600 text-white rounded-full hover:bg-green-500 transition"
            onClick={onAddUser}
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-yellow-500 text-white rounded-full hover:bg-yellow-400 transition"
            onClick={handleSwitchCamera}
          >
            <FontAwesomeIcon icon={faCamera} />
          </button>
          <button
            className={`flex items-center justify-center w-10 h-10 rounded-full text-white transition ${
              isIncomingCall
                ? "bg-green-600 hover:bg-green-500"
                : "bg-red-600 hover:bg-red-500"
            }`}
            onClick={isIncomingCall ? handleAcceptCall : onEndCall}
          >
            <FontAwesomeIcon icon={faPhoneSlash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoCallScreen;
