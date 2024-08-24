import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { AiOutlineSelect, AiOutlineCopy } from "react-icons/ai";
import { BsFillChatHeartFill, BsPlusCircle } from "react-icons/bs";
import { FiPhoneCall, FiVideo, FiSend } from "react-icons/fi";
import { MdPhotoLibrary } from "react-icons/md";
import { FaRegSmile, FaMicrophone, FaCheck, FaRegClock } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import AudioCallScreen from "./AudioCallScreen";
import VideoCallScreen from "./VideoCallScreen";

const ChatField = () => {
  const location = useLocation();
  const { user } = location.state;
  const [message, setMessage] = useState("");
  const [userMessages, setUserMessages] = useState({});
  const [contextMenu, setContextMenu] = useState(null);
  const [selectedMessageId, setSelectedMessageId] = useState(null);
  const [isAudioCall, setIsAudioCall] = useState(false);
  const [isVideoCall, setIsVideoCall] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioMessage, setAudioMessage] = useState(null);
  const [isChatCardOpen, setIsChatCardOpen] = useState(false);
  const [unreadMessagesCount, setUnreadMessagesCount] = useState(0);

  const chatAreaRef = useRef(null);
  const chatCardRef = useRef(null);

  useEffect(() => {
    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [user.id]: prevMessages[user.id] || [],
    }));
  }, [user]);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
    if (!isChatCardOpen) {
      setUnreadMessagesCount((prevCount) => prevCount + 1);
    }
  }, [userMessages, isChatCardOpen]);

  const handleSendMessage = () => {
    if (message.trim()) {
      setUserMessages((prevMessages) => ({
        ...prevMessages,
        [user.id]: [
          ...prevMessages[user.id],
          {
            id: Date.now(),
            text: message,
            isSent: true,
            time: new Date().toLocaleTimeString(),
            status: "sent",
          },
        ],
      }));
      setMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleDeleteMessage = (messageId) => {
    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [user.id]: prevMessages[user.id].filter((msg) => msg.id !== messageId),
    }));
    setContextMenu(null);
    setSelectedMessageId(null);
  };

  const handleContextMenu = (event, messageId) => {
    event.preventDefault();
    setSelectedMessageId(messageId);
    setContextMenu({ messageId, x: event.clientX, y: event.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleAudioCall = () => {
    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [user.id]: [
        ...prevMessages[user.id],
        {
          id: Date.now(),
          text: "Audio call initiated",
          isSent: true,
          time: new Date().toLocaleTimeString(),
          isCall: true,
        },
      ],
    }));
    setIsAudioCall(true);
  };

  const handleVideoCall = () => {
    setUserMessages((prevMessages) => ({
      ...prevMessages,
      [user.id]: [
        ...prevMessages[user.id],
        {
          id: Date.now(),
          text: "Video call initiated",
          isSent: true,
          time: new Date().toLocaleTimeString(),
          isCall: true,
        },
      ],
    }));
    setIsVideoCall(true);
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    console.log(files);
  };

  const handleEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
    setIsEmojiPickerOpen(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          const audioBlob = event.data;
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioMessage(audioUrl);
          setUserMessages((prevMessages) => ({
            ...prevMessages,
            [user.id]: [
              ...prevMessages[user.id],
              {
                id: Date.now(),
                text: "",
                audioUrl,
                isSent: true,
                time: new Date().toLocaleTimeString(),
                status: "sent",
              },
            ],
          }));
        }
      };
      recorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  const handleChatCardToggle = () => {
    setIsChatCardOpen((prev) => {
      if (!prev) {
        setUnreadMessagesCount(0);
      }
      return !prev;
    });
  };

  return (
    <div className="relative w-full h-[700px] sm:h-[500px] md:h-[600px] lg:h-[700px] lg:max-w-5xl border-r border-blue-200 bg-gray-50">
      {(isAudioCall || isVideoCall) && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
      )}

      {isAudioCall && (
        <AudioCallScreen user={user} onEndCall={() => setIsAudioCall(false)} />
      )}
      {isVideoCall && (
        <VideoCallScreen user={user} onEndCall={() => setIsVideoCall(false)} />
      )}

      <div
        className={`flex flex-col h-full ${
          isAudioCall || isVideoCall ? "blur-sm" : ""
        }`}
      >
        <div className="p-4 sticky top-0 z-10 flex items-center space-x-4 bg-gray-50 border-b border-gray-200">
          <img
            src={user.profilePic}
            alt={user.name}
            className="w-12 h-12 rounded-md"
          />
          <div className="flex flex-col flex-grow">
            <h1 className="text-lg font-semibold text-gray-500">{user.name}</h1>
            <div className="flex items-center text-xs font-medium text-gray-300 mt-1">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-300 to-teal-200 mr-2"></div>
              Active
            </div>
          </div>
          <div className="flex space-x-2 sm:space-x-4">
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-blue-100"
              onClick={handleAudioCall}
            >
              <FiPhoneCall className="text-lg sm:text-xl text-gray-700" />
            </button>
            <button
              className="p-2 bg-gray-200 rounded-md hover:bg-blue-100"
              onClick={handleVideoCall}
            >
              <FiVideo className="text-lg sm:text-xl text-gray-700" />
            </button>
          </div>
        </div>

        <div
          className="flex-1 bg-blue-100 overflow-y-auto p-4 sm:p-6"
          ref={chatAreaRef}
        >
          <div className="space-y-4">
            {userMessages[user.id]?.map((msg) => (
              <div
                key={msg.id}
                className={`p-2 rounded-md max-w-xs overflow-auto relative ${
                  msg.isCall
                    ? "bg-white shadow-sm text-slate-700 font-medium font-sans"
                    : msg.audioUrl
                    ? ""
                    : "bg-blue-600 shadow-sm text-white text-sm font-medium font-sans"
                }`}
                style={{
                  marginLeft: msg.isSent ? "auto" : "0",
                  marginRight: msg.isSent ? "0" : "auto",
                  textAlign: "left",
                  wordBreak: "break-word",
                }}
                onContextMenu={(e) => handleContextMenu(e, msg.id)}
              >
                {msg.text && <div>{msg.text}</div>}
                {msg.audioUrl && (
                  <audio
                    controls
                    src={msg.audioUrl}
                    className="mt-1 w-full"
                  ></audio>
                )}
                <div className="absolute bottom-0 left-0 p-1"></div>
                <div className="text-xs text-gray-700 mt-1 text-right">
                  {msg.time}
                </div>
                <div className="absolute right-1 bottom-1 flex items-center space-x-1">
                  {msg.isSent ? (
                    <FaCheck className="text-gray-300 text-xs " />
                  ) : (
                    <FaRegClock className="text-gray-300 text-xs" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {contextMenu && (
          <div
            className="fixed z-50 bg-white border border-gray-200 shadow-lg rounded-md"
            style={{ top: contextMenu.y, left: contextMenu.x }}
            onClick={handleCloseContextMenu}
          >
            <ul className="py-1">
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleDeleteMessage(contextMenu.messageId)}
              >
                <RiDeleteBin6Line className="inline-block mr-2" /> Delete
              </li>
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Select clicked")}
              >
                <AiOutlineSelect className="inline-block mr-2" /> Select
              </li>
              <li
                className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => console.log("Copy clicked")}
              >
                <AiOutlineCopy className="inline-block mr-2" /> Copy
              </li>
            </ul>
          </div>
        )}

        <div className="relative flex items-center justify-between p-2 sm:p-4 bg-gray-50 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              className="text-xl sm:text-2xl text-gray-700"
              onClick={() => setIsEmojiPickerOpen(!isEmojiPickerOpen)}
            >
              <FaRegSmile />
            </button>
            {isEmojiPickerOpen && (
              <div className="absolute bottom-12 sm:bottom-14 left-0">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
            <button
              className="text-xl sm:text-2xl text-gray-700 ml-2"
              onClick={() => console.log("Add clicked")}
            >
              <BsPlusCircle />
            </button>
            <input
              type="file"
              className="hidden"
              id="file-input"
              onChange={handleFileInputChange}
            />
            <label htmlFor="file-input" className="ml-2">
              <MdPhotoLibrary className="text-xl sm:text-2xl text-gray-700 cursor-pointer" />
            </label>
          </div>
          <input
            type="text"
            className="flex-1 mx-2 sm:mx-4 py-2 px-3 sm:px-4 bg-gray-200 rounded-md focus:outline-none focus:border-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
          />
          <button
            className="text-xl sm:text-2xl text-blue-500"
            onClick={handleSendMessage}
          >
            <FiSend />
          </button>

          {isRecording ? (
            <button
              className="text-xl sm:text-2xl text-red-600 ml-2"
              onClick={stopRecording}
            >
              <FaMicrophone />
            </button>
          ) : (
            <button
              className="text-xl sm:text-2xl text-gray-700 ml-2"
              onClick={startRecording}
            >
              <FaMicrophone />
            </button>
          )}
        </div>
      </div>

      {/* Floating Message Icon */}
      <div className="fixed bottom-6 right-6 z-50 lg:block hidden">
        <button
          className="relative p-3 sm:p-4 bg-blue-100 border-2 border-white text-blue-500 rounded-full shadow-lg"
          onClick={handleChatCardToggle}
        >
          <BsFillChatHeartFill className="text-2xl sm:text-3xl" />
          {unreadMessagesCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadMessagesCount}
            </div>
          )}
        </button>
      </div>

      {/* Sliding Chat Card */}
      {isChatCardOpen && (
        <div
          ref={chatCardRef}
          className="fixed bottom-0 right-0 w-full sm:w-[360px] border border-t-2 bg-gray-50 rounded-md shadow-lg transform transition-transform duration-300 ease-in-out z-50"
          style={{
            transform: isChatCardOpen ? "translateY(0)" : "translateY(100%)",
          }}
        >
          <div className="p-2 sm:p-4 border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center">
              <img
                src={user.profilePic}
                alt={user.name}
                className="w-8 h-8 rounded-md"
              />
              <div className="ml-2">
                <h2 className="text-xs sm:text-sm text-gray-500 font-semibold">
                  {user.name}
                </h2>
                <div className="text-xs text-gray-500">Active</div>
              </div>
            </div>
            <div className="flex space-x-2 sm:space-x-4 ml-12 sm:ml-16">
              <button
                className="p-2 bg-gray-200 rounded-md hover:bg-blue-100"
                onClick={handleAudioCall}
              >
                <FiPhoneCall className="text-lg sm:text-lg text-gray-700" />
              </button>
              <button
                className="p-2 bg-gray-200 rounded-md hover:bg-blue-100"
                onClick={handleVideoCall}
              >
                <FiVideo className="text-lg sm:text-lg text-gray-700" />
              </button>
            </div>
            <button
              className="text-xl text-gray-700 mb-2"
              onClick={() => setIsChatCardOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="p-2 sm:p-4 h-64 overflow-y-auto">
            <div className="space-y-4">
              {userMessages[user.id]?.map((msg) => (
                <div
                  key={msg.id}
                  className={`p-2 rounded-md max-w-xs overflow-auto relative ${
                    msg.isCall
                      ? "bg-white shadow-sm text-slate-700 font-medium font-sans"
                      : msg.audioUrl
                      ? ""
                      : "bg-blue-600 shadow-sm text-white text-sm font-medium font-sans"
                  }`}
                  style={{
                    marginLeft: msg.isSent ? "auto" : "0",
                    marginRight: msg.isSent ? "0" : "auto",
                    textAlign: "left",
                    wordBreak: "break-word",
                  }}
                >
                  {msg.text && <div>{msg.text}</div>}
                  {msg.audioUrl && (
                    <audio
                      controls
                      src={msg.audioUrl}
                      className="mt-1 w-full"
                    ></audio>
                  )}
                  <div className="absolute bottom-0 left-0 p-1"></div>
                  <div className="text-xs text-gray-700 mt-1 text-right">
                    {msg.time}
                  </div>
                  <div className="absolute right-1 bottom-1 flex items-center space-x-1">
                    {msg.isSent ? (
                      <FaCheck className="text-gray-300 text-xs" />
                    ) : (
                      <FaRegClock className="text-gray-300 text-xs" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2 sm:p-4 border-t border-gray-200 flex items-center">
            <input
              type="text"
              className="flex-1 py-2 px-3 sm:py-2 sm:px-4 bg-gray-200 rounded-md focus:outline-none focus:border-blue-500"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
            />
            <button
              className="text-xl sm:text-2xl text-blue-500 ml-2"
              onClick={handleSendMessage}
            >
              <FiSend />
            </button>

            {isRecording ? (
              <button
                className="text-xl sm:text-2xl text-red-600 ml-2"
                onClick={stopRecording}
              >
                <FaMicrophone />
              </button>
            ) : (
              <button
                className="text-xl sm:text-2xl text-gray-700 ml-2"
                onClick={startRecording}
              >
                <FaMicrophone />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatField;
