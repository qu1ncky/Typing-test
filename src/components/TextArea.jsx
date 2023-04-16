import React from "react";
import styles from "./TextArea.module.css";

const TextArea = ({ text, currentIndex, color }) => {
  return (
    <span className={styles.textContainer}>
      <span className={styles.writtenText}>{text.slice(0, currentIndex)}</span>

      <span style={{ backgroundColor: color }} className={styles.currentIndex}>
        {text[currentIndex] !== " " ? (
          text[currentIndex]
        ) : (
          <span
            style={{ backgroundColor: color }}
            className={styles.spaceBorder}
          >
            &nbsp;
          </span>
        )}
      </span>

      <span>{text.slice(currentIndex + 1, text.length)}</span>
    </span>
  );
};

export default TextArea;
