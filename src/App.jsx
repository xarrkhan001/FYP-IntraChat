import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import SignUpLogin from "./components/SignUpLogin";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ChatareaAndSidebar from "./components/ChatareaAndSidebar";
import UserDetail from "./components/UserDetail";
import StoryDetail from "./components/StoryDetail";
import ProfileDetail from "./components/ProfileDetail";
import WelcomePage from "./components/WelcomePage"; // Import the WelcomePage component
import WelcomeContacts from "./components/WelcomeContacts";
import WelcomeStories from "./components/WelcomeStories";

const App = () => {
  const location = useLocation();

  // Define routes that should display the Navbar and Sidebar
  const shouldDisplayNavbar = !["/"].includes(location.pathname);
  const shouldDisplaySidebar = !["/", "/profile"].includes(location.pathname);

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Conditionally render Navbar */}
      {shouldDisplayNavbar && <Navbar />}

      <div className="flex flex-1">
        {/* Conditionally render Sidebar */}
        {shouldDisplaySidebar && <Sidebar />}

        <div className={`flex-1`}>
          <Routes>
            <Route path="/" element={<SignUpLogin />} />
            <Route path="/chat" element={<WelcomePage />} />
            <Route
              path="/chat/:id"
              element={
                <div className="flex flex-1">
                  <ChatareaAndSidebar />
                </div>
              }
            />

            <Route path="/user" element={<WelcomeContacts />} />
            <Route
              path="/user/:id"
              element={
                <div className="flex flex-1">
                  <UserDetail />
                </div>
              }
            />

            <Route path="/story" element={<WelcomeStories />} />
            <Route
              path="/story/:id"
              element={
                <div className="flex flex-1">
                  <StoryDetail />
                </div>
              }
            />

            <Route path="/profile" element={<ProfileDetail />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
