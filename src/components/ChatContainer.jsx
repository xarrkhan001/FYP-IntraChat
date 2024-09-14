// ChatContainer.js
import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import AudioCallScreen from "./AudioCallScreen";
import VideoCallScreen from "./VideoCallScreen";

const ChatContainer = ({
  user,
  userMessages,
  setUserMessages,
  handleSendMessage,
  handleFileInputChange,
  handleEmojiClick,
  handleCloseContextMenu,
  handleDeleteMessage,
  contextMenu,
  setContextMenu,
  startRecording,
  stopRecording,
  isRecording,
  isEmojiPickerOpen,
  setIsEmojiPickerOpen,
  isAudioCall,
  setIsAudioCall,
  isVideoCall,
  setIsVideoCall,
  isChatCardOpen,
  setIsChatCardOpen,
  setUnreadMessagesCount,
}) => {
  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
    if (!isChatCardOpen) {
      setUnreadMessagesCount((prevCount) => prevCount + 1);
    }
  }, [userMessages, isChatCardOpen]);

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
        <ChatHeader
          user={user}
          onAudioCall={() => {
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
          }}
          onVideoCall={() => {
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
          }}
        />

        <ChatMessages
          messages={userMessages[user.id] || []}
          onContextMenu={(e, messageId) => {
            e.preventDefault();
            setContextMenu({ messageId, x: e.clientX, y: e.clientY });
          }}
          contextMenu={contextMenu}
          handleDeleteMessage={handleDeleteMessage}
          handleCloseContextMenu={handleCloseContextMenu}
        />

        <ChatInput
          message={message}
          setMessage={setMessage}
          handleSendMessage={handleSendMessage}
          isEmojiPickerOpen={isEmojiPickerOpen}
          setIsEmojiPickerOpen={setIsEmojiPickerOpen}
          handleEmojiClick={handleEmojiClick}
          handleFileInputChange={handleFileInputChange}
          startRecording={startRecording}
          stopRecording={stopRecording}
          isRecording={isRecording}
        />
      </div>
    </div>
  );
};

export default ChatContainer;
