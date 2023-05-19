import React from "react";
import { useState, useEffect } from "react";
import styles from "./App.module.css";
import TextArea from "./components/TextArea";
import InfoBlock from "./components/InfoBlock";
import Result from "./components/Result";

const ignoreButtons = new Set([
  "Backspace",
  "CapsLock",
  "Enter",
  "Control",
  "Shift",
  "Alt",
]);

function App() {
  const [text] = useState(
    "Мама мыла раму. Интересный текст. Тестовый текст. Мама мыла раму. Мама мыла раму. Интересный текст. Тестовый текст. Мама мыла раму.  Мама мыла раму. Интересный текст. Тестовый текст. Мама мыла раму."
  );
  const [input, setInput] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setInorrect] = useState(0);
  const [color, setColor] = useState("green");
  const [accuracy, setAccuracy] = useState(100);
  const [isActive, setIsActive] = useState("nonActive");
  const [wpm, setWpm] = useState(0);


  const inputHandler = ({ key }) => {
    if (correct + incorrect !== 0) {
      setAccuracy(Math.round((correct / (correct + incorrect)) * 100));
    }

    if (key === text[currentIndex]) {
      setInput(`${input}${key}`);
      setCurrentIndex(currentIndex + 1);
      setCorrect(correct + 1);
      setColor("green");
      setIsActive("active");
    }

    if (correct === text.length - 1) {
      setIsActive("endTyping");
    }

    if (key !== text[currentIndex] && !ignoreButtons.has(key)) {
      setInorrect(incorrect + 1);
      setColor("red");
      setIsActive("active");
    }
  };

  useEffect(() => {
    if (isActive === "nonActive" || isActive === "active") {
      document.addEventListener("keydown", inputHandler);
    }
    return () => document.removeEventListener("keydown", inputHandler);
  });

  // Контекст JS(this)
  // Жизненный цикл компонента

  return (
    <div className={styles.container}>
      <div className={styles.testName}>
        <h3>Typing test</h3>
        <h3>Correct: {correct}</h3>
        <h3>Incorrect: {incorrect}</h3>
        <h3>Accuracy: {accuracy}%</h3>
        <h3>WPM: {wpm}</h3>
        <InfoBlock
          input={input}
          correct={correct}
          incorrect={incorrect}
          accuracy={accuracy}
          isActive={isActive}
          setWpm={setWpm}
        />
      </div>
      <TextArea
        currentIndex={currentIndex}
        text={text}
        color={color}
      ></TextArea>
      <Result
      accuracy={accuracy}
      wpm={wpm}
      >
      </Result>
    </div>
  );
}

export default App;

//1. Таймер (итог + restart)
//2. Косметический момент со сдвигом текста
//3. Текст с API (случайный) с выбором языка
//4. ANTD - ИТОГ
