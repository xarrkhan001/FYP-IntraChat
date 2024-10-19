import React from "react";
import { UserGroupIcon } from "@heroicons/react/24/solid";
import backgroundImg from "../assets/AG1.jpg";

// Define CSS styles for the smooth bounce animation
const styles = {
  bounce: {
    display: "inline-block",
    animation: "bounce 4s cubic-bezier(0.25, 0.1, 0.25, 1) infinite", // Slower duration and smooth cubic-bezier easing
  },
  "@keyframes bounce": {
    "0%": { transform: "translateY(0)" },
    "50%": { transform: "translateY(-20px)" }, // Bounce height
    "100%": { transform: "translateY(0)" },
  },
};

const WelcomeContacts = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`, // Use the imported image
        backgroundSize: "cover", // Ensure the image covers the entire background
        backgroundPosition: "center", // Center the image
        backgroundAttachment: "fixed", // Fix the background
        backgroundRepeat: "no-repeat", // Prevent repeating the image
      }}
      className="flex flex-col items-center justify-center w-[1250px] h-[700px] p-6"
    >
      <UserGroupIcon
        style={styles.bounce} // Apply bounce animation
        className="w-20 h-20 text-blue-300 mb-1"
      />
      <h1 className="text-4xl font-bold text-center">
        <span className="text-black">Contact</span>{" "}
        <span className="block mt-2 text-xl text-gray-700">
          <span className="font-semibold">Section</span>
        </span>
      </h1>
    </div>
  );
};

export default WelcomeContacts;
