import React, { useState } from 'react';
import styles from '../styles/FrontPage.module.scss';
import { Button, Heading, VStack, HStack, Spacer } from '@chakra-ui/react';

const server_url = process.env.REACT_APP_SERVER_URL;

const FrontPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleTranslateClick = async () => {
    const response = await fetch(`${server_url}/translate`)
      .then(res => res.json())
      .then(data => data)
      .catch(err => {
        console.log(server_url);
        console.log(err.message);
      });
    // Replace this with your translation logic
    setOutputText(response.message);
  };

  return (
    <div className={styles.frontPage}>
      <VStack>
        <Heading fontSize="3.5em" fontFamily="'Noto+Sans+Bamum', sans-serif">
          Emoji Translator
        </Heading>
        <Spacer />
        <input
          className={styles.inputBox}
          type="text"
          name="input"
          placeholder="Input Box"
          value={inputText}
          onChange={event => {
            setInputText(event.target.value);
          }}
        />
        <div className={styles.output}>{outputText}</div>
      </VStack>
      <HStack spacing="25px" className={styles.buttonContainer}>
        <Button
          colorScheme="red"
          onClick={() => {
            setInputText('');
            setOutputText('');
          }}
        >
          Clear
        </Button>
        <Spacer w="120px" />
        <Button colorScheme="green" onClick={handleTranslateClick}>
          Translate
        </Button>
      </HStack>
    </div>
  );
};

export default FrontPage;
