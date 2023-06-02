import React, { useEffect } from "react";

function Timer({ isRoomLoaded, seconds, setSeconds }) {
  useEffect(() => {
    if (isRoomLoaded) {
      const interval = setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRoomLoaded, setSeconds]);

  const getFormattedTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div
      className="timer-text"
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        fontSize: "2em",
        fontWeight: "bold",
        color: "black",
        zIndex: 9999, // make sure the timer is always on top
      }}
    >
      {getFormattedTime(seconds)}
    </div>
  );
}

export default Timer;

