import React, { useState } from "react";
import styles from '../styles/FrontPage.module.scss';
import { Button, Heading, VStack, HStack, Spacer } from "@chakra-ui/react";

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
        <VStack>
        <Heading fontSize ="3.5em" fontFamily = "'Noto+Sans+Bamum', sans-serif">Emoji Translator</Heading>
        <Spacer />
        <input
            className={styles.inputBox}
            type="text"
            name="input"
            placeholder="Input Box"
            value={inputText}
            onChange={(event) => {setInputText(event.target.value)}}
        />
        <div className={styles.output}>{outputText}</div>
        </VStack>
        <HStack spacing = "25px" className={styles.buttonContainer}>
            <Button colorScheme="red" onClick={handleClearClick}>
                Clear
            </Button>
            <Spacer w="120px"/>
            <Button colorScheme="green" onClick={handleTranslateClick}>
                Translate
            </Button>
        </HStack>
    </div>
    );
}

export default FrontPage;
