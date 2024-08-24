import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneSlash,
  faMicrophone,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const AudioCallScreen = ({
  user,
  onEndCall,
  onToggleMic,
  onAddUser,
  isIncomingCall,
  onAcceptCall,
}) => {
  const [callStatus, setCallStatus] = useState(
    isIncomingCall ? "incoming" : "ongoing"
  );

  const handleCallAction = () => {
    if (callStatus === "incoming") {
      setCallStatus("ongoing");
      onAcceptCall();
    } else {
      onEndCall();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div className="relative bg-gray-900 text-white rounded-md p-6 shadow-lg border border-gray-700 max-w-lg w-96">
        {/* User Background Image */}
        <div
          className="absolute inset-0 rounded-md"
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: -1,
          }}
        />

        <div className="flex flex-col items-center justify-center">
          {/* Profile Picture */}
          <div
            className="w-28 h-28 rounded-full bg-gray-700 border-4 border-white mb-4 mt-3"
            style={{
              backgroundImage: `url(${user.profilePic})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          <h2 className="text-xl font-bold mb-4 mt-2">{user.name}</h2>

          <div className="flex justify-center space-x-4">
            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
              onClick={onToggleMic}
            >
              <FontAwesomeIcon icon={faMicrophone} />
            </button>
            <button
              className="flex items-center justify-center w-12 h-12 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
              onClick={onAddUser}
            >
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
            <button
              className={`flex items-center justify-center w-12 h-12 rounded-full text-white transition ${
                callStatus === "incoming"
                  ? "bg-green-600 hover:bg-green-500"
                  : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={handleCallAction}
            >
              <FontAwesomeIcon icon={faPhoneSlash} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCallScreen;
