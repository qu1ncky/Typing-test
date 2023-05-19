import React from "react";
import styles from "./Result.module.css";

const Result = ({accuracy,wpm})=> {
    return (
        <div className={styles.wrapper}>
            <div className={styles.results}>
                <div>Congratz!</div>
                <div>WPM: {wpm}</div>
                <div>Accuracy: {accuracy}%</div>
            </div>
        </div>
    )

}

export default Result;