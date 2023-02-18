import React, { useState } from "react";
import styles from '../styles/FrontPage.module.scss';

function FrontPage() {
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    function handleTranslateClick() {
        // Replace this with your translation logic
        setOutputText("Translated: " + inputText);
    }

    function handleClearClick() {
        setInputText("");
        setOutputText("");
    }

    return (
    <div className={styles.frontPage}>
        <h1>Emoji Translator</h1>
        <input
            className={styles.inputBox}
            type="text"
            name="input"
            placeholder="Input Box"
            value={inputText}
            onChange={(event) => {setInputText(event.target.value)}}
        />
        <div className={styles.output}>{outputText}</div>
        <div className={styles.buttonContainer}>
            <button className={styles.clearButton} onClick={handleClearClick}>
                Clear
            </button>
            
            <button className={styles.translateButton} onClick={handleTranslateClick}>
                Translate
            </button>
        </div>
    </div>
    );
}

export default FrontPage;
