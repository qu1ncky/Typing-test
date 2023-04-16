import React, { useEffect, useState } from "react";
import styles from "./InfoBlock.module.css";

const InfoBlock = ({ input, correct, incorrect, accuracy, isActive }) => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [wpm, setWpm] = useState(0);

  useEffect(() => {
    let timer;
    if (isActive === "active") {
      timer = setInterval(() => {
        setSeconds((seconds) => {
          if (seconds === 59) {
            setMinutes((minutes) => minutes + 1);
            return 0;
          }
          return seconds + 1;
        });
      }, 1000);
    }
    if (isActive === "endTyping") {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  useEffect(() => {
    if (isActive === "active" && seconds !== 0) {
      const time = minutes / 60 + seconds;
      const spm = (input.length / time) * 60;
      setWpm(Math.round(spm / 5));
    }
  }, [input, seconds]);

  return (
    <div>
      <h3>
        Time: {minutes < 10 ? "0" + minutes : minutes}:
        {seconds < 10 ? "0" + seconds : seconds}{" "}
      </h3>
      <h3>WPM: {wpm} </h3>
    </div>
  );
};

export default InfoBlock;
