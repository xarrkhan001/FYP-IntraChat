import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Contact from "./Contact";
import Stories from "./Stories";

const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-50 w-[360px] h-[700px] ">
      {/* This div wraps the Routes to ensure it's not interfering with sidebar layout */}
      <div className="content">
        <Routes>
          {/* Route paths should match the app's routing structure */}
          <Route path="chat/*" element={<Home />} />
          <Route path="user/*" element={<Contact />} />
          <Route path="story/*" element={<Stories />} />
        </Routes>
      </div>
    </div>
  );
};

export default Sidebar;
