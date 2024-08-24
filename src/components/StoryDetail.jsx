import React, { useState, useEffect, useRef } from "react";
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

const storyContent = {
  1: [
    { type: "image", src: Image1, duration: 5000 },
    { type: "image", src: Image2, duration: 5000 },
    { type: "video", src: Video1, duration: 10000 },
  ],
  2: [
    { type: "image", src: Image3, duration: 5000 },
    { type: "image", src: Image4, duration: 5000 },
    { type: "video", src: Video2, duration: 10000 },
  ],
  3: [
    { type: "image", src: Image5, duration: 5000 },
    { type: "image", src: Image6, duration: 5000 },
  ],
  4: [
    { type: "image", src: Image7, duration: 5000 },
    { type: "image", src: Image8, duration: 5000 },
  ],
  5: [
    { type: "image", src: Image9, duration: 5000 },
    { type: "video", src: Video1, duration: 10000 },
  ],
  6: [
    { type: "image", src: Image10, duration: 5000 },
    { type: "video", src: Video2, duration: 10000 },
  ],
  7: [
    { type: "image", src: Image11, duration: 5000 },
    { type: "image", src: Image12, duration: 5000 },
  ],
  8: [
    { type: "image", src: Image1, duration: 5000 },
    { type: "video", src: Video1, duration: 10000 },
  ],
  9: [
    { type: "image", src: Image2, duration: 5000 },
    { type: "video", src: Video2, duration: 10000 },
  ],
  10: [
    { type: "image", src: Image3, duration: 5000 },
    { type: "image", src: Image4, duration: 5000 },
    { type: "video", src: Video1, duration: 10000 },
  ],
  11: [
    { type: "image", src: Image5, duration: 5000 },
    { type: "image", src: Image6, duration: 5000 },
  ],
  12: [
    { type: "image", src: Image7, duration: 5000 },
    { type: "image", src: Image8, duration: 5000 },
    { type: "video", src: Video2, duration: 10000 },
  ],
};

const StoryDetail = () => {
  const { state } = useLocation();
  const { story } = state || {};

  if (!story) return <p>No story selected.</p>;

  const stories = storyContent[story.id] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const storyRef = useRef(null);

  useEffect(() => {
    if (stories.length === 0) return;

    const handleNextStory = () => {
      setCurrentIndex((prev) => (prev + 1) % stories.length);
    };

    const currentStory = stories[currentIndex];
    const duration = currentStory.duration;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 100 / (duration / 100);
        if (newProgress >= 100) {
          clearInterval(interval);
          handleNextStory();
          return 0;
        }
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [currentIndex, stories]);

  useEffect(() => {
    if (storyRef.current) {
      storyRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  const currentStory = stories[currentIndex] || {};

  return (
    <div className="w-full h-[700px] bg-blue-50 flex flex-col relative">
      {/* User Profile Section */}
      <div className="absolute top-4 left-4 flex items-center space-x-3 ">
        <img
          src={story.profilePic}
          alt={story.name}
          className="w-12 h-12 mt-4 ml-4 rounded-full object-cover border-2 border-gray-300 shadow"
        />
        <div>
          <h2 className="text-sm mt-3 font-semibold text-gray-500">
            {story.name}
          </h2>
        </div>
      </div>

      {/* Story Content Section */}
      <main className="flex-1 flex justify-center items-center p-4 mt-4">
        <div className="relative w-[540px] h-full bg-white border border-gray-300 rounded-2xl shadow-lg overflow-hidden">
          {/* Progress Bar Overlay */}
          <div
            className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 to-teal-600"
            style={{ width: `${progress}%`, zIndex: 10 }}
          />

          <div className="relative w-full h-full">
            {currentStory.type === "image" ? (
              <img
                src={currentStory.src}
                alt="Story content"
                className="w-full h-full object-cover rounded-2xl"
                ref={storyRef}
              />
            ) : (
              <video
                src={currentStory.src}
                autoPlay
                muted
                controls
                className="w-full h-full object-cover rounded-2xl"
                ref={storyRef}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StoryDetail;
