import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TbSquareRoundedPlus2 } from "react-icons/tb";

// Profile Images
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

const Stories = () => {
  const [stories, setStories] = useState([
    { id: 1, name: "John Doe", profilePic: profile1, isNew: false },
    { id: 2, name: "Jane Smith", profilePic: profile2, isNew: false },
    { id: 3, name: "Emily Johnson", profilePic: profile3, isNew: false },
    { id: 4, name: "Bob Brown", profilePic: profile4, isNew: false },
    { id: 5, name: "Emily Davis", profilePic: profile5, isNew: false },
    { id: 6, name: "Michael Wilson", profilePic: profile6, isNew: false },
    { id: 7, name: "Sarah Thompson", profilePic: profile7, isNew: false },
    { id: 8, name: "David Clark", profilePic: profile8, isNew: false },
    { id: 9, name: "Linda Martinez", profilePic: profile9, isNew: false },
    { id: 10, name: "Kevin Lee", profilePic: profile10, isNew: false },
    { id: 11, name: "Jessica Hall", profilePic: profile11, isNew: false },
    { id: 12, name: "Richard Taylor", profilePic: profile12, isNew: false },
  ]);

  const [selectedStoryId, setSelectedStoryId] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newStory = {
          id: stories.length + 1,
          name: "New Story",
          profilePic: reader.result,
          isNew: true,
        };
        setStories([newStory, ...stories]);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    // Handle story status update
    if (selectedStoryId) {
      setStories(
        stories.map((story) =>
          story.id === selectedStoryId ? { ...story, isNew: false } : story
        )
      );
    }
  }, [selectedStoryId]);

  return (
    <div className="flex flex-col w-[360px] h-[700px] py-4 px-6 overflow-y-auto border-r border-blue-200 bg-gray-50">
      <div className="flex flex-col items-center sm:flex-row sm:items-start justify-between w-full">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700 mt-3">
            Stories
          </h1>
        </div>
        <label
          htmlFor="fileInput"
          className="w-6 h-6 mt-3 sm:mt-4 sm:mr-2 flex items-center justify-center rounded-full text-gray-600 hover:text-blue-400 cursor-pointer"
        >
          <TbSquareRoundedPlus2 size={22} />
        </label>
        <input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-8">
        {stories.map((story) => (
          <Link
            to={`/story/${story.id}`}
            state={{ story }}
            key={story.id}
            className={`relative flex flex-col items-center justify-center w-full h-40 cursor-pointer transition-transform duration-300 ease-in-out rounded-lg border border-gray-300 shadow-lg ${
              selectedStoryId === story.id
                ? "bg-slate-200 scale-105"
                : "bg-gray-50 hover:bg-slate-100"
            }`}
            onClick={() => setSelectedStoryId(story.id)}
          >
            <div className="relative w-24 h-24 mb-2">
              <img
                src={story.profilePic}
                alt={story.name}
                className={`w-full h-full rounded-full object-cover border-4 shadow-md ${
                  story.isNew ? "border-teal-200" : ""
                }`}
              />
              <div
                className={`absolute inset-0 rounded-full border-2 border-transparent transition-opacity duration-300 ${
                  selectedStoryId === story.id
                    ? "opacity-100 border-sky-500"
                    : "opacity-0 border-transparent"
                }`}
              />
            </div>
            <p className="text-center text-sm font-semibold text-gray-600 truncate">
              {story.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Stories;
