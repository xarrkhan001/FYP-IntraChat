import React from "react";
import { useLocation } from "react-router-dom";
import ChatField from "./ChatField";
import RightSidebar from "./RightSidebar";

const ChatareaAndSidebar = () => {
  const location = useLocation();
  return (
    <div className="flex min-w-[1250px] h-full">
      {/* ChatField is shown on all screen sizes */}
      <div className="flex-1">
        <ChatField />
      </div>
      {/* RightSidebar is shown only on large and extra-large screens */}
      <div className={`hidden lg:block lg:w-[360px]`}>
        <RightSidebar />
      </div>
    </div>
  );
};

export default ChatareaAndSidebar;
