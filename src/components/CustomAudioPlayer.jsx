import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

const CustomAudioPlayer = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("ended", () => {
        setIsPlaying(false);
      });
    }
  }, []);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const containerStyle = {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(to right, #4fd1c5, #63b3ed)",
    padding: "8px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    position: "relative",
    width: "300px",
  };

  const playButtonStyle = {
    color: "white",
    fontSize: "24px",
    position: "relative",
    zIndex: 10,
  };

  const waveformContainerStyle = {
    flexGrow: 1,
    height: "30px",
    position: "relative",
    marginLeft: "8px",
    display: "flex",
    alignItems: "center",
    overflow: "hidden",
  };

  const waveformSvgStyle = {
    width: "100%",
    height: "100%",
  };

  const waveformPathStyle = {
    fill: "none",
    stroke: "white",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    animation: isPlaying ? "waveform-animation 1.5s linear infinite" : "none",
  };

  return (
    <div style={containerStyle}>
      <button onClick={togglePlayPause} style={playButtonStyle}>
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <div style={waveformContainerStyle}>
        <svg viewBox="0 0 100 20" style={waveformSvgStyle}>
          <path
            style={waveformPathStyle}
            d="M0,10 L10,5 L20,15 L30,5 L40,15 L50,5 L60,15 L70,5 L80,15 L90,5 L100,10"
          />
        </svg>
      </div>
      <audio ref={audioRef} src={src} />
      <style>
        {`
          @keyframes waveform-animation {
            0% {
              d: path("M0,10 L10,5 L20,15 L30,5 L40,15 L50,5 L60,15 L70,5 L80,15 L90,5 L100,10");
            }
            50% {
              d: path("M0,10 L10,8 L20,12 L30,8 L40,12 L50,8 L60,12 L70,8 L80,12 L90,8 L100,10");
            }
            100% {
              d: path("M0,10 L10,5 L20,15 L30,5 L40,15 L50,5 L60,15 L70,5 L80,15 L90,5 L100,10");
            }
          }
        `}
      </style>
    </div>
  );
};

export default CustomAudioPlayer;
