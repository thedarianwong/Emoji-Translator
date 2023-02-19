import React, { useState } from 'react';
import styles from '../styles/FrontPage.module.scss';
import {
  Button,
  Heading,
  VStack,
  HStack,
  Spacer,
  Input,
  Textarea,
} from '@chakra-ui/react';
import handleTranslateClickHelper from '../helpAPI/translate';

const FrontPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');

  const handleTranslateClick = async () => {
    const translation = await handleTranslateClickHelper(inputText);
    setOutputText(translation);
  };

  return (
    <div className={styles.frontPage}>
      <VStack maxW="70%" minW="70%" minH="100px">
        <Heading fontSize="3.5em" fontFamily="'Noto+Sans+Bamum', sans-serif">
          Emoji Translator
        </Heading>
        <Spacer />
        <Input
          className={styles.inputBox}
          type="text"
          name="input"
          placeholder="Input Box"
          value={inputText}
          onChange={event => {
            setInputText(event.target.value);
          }}
        />
        <Textarea
          className={styles.output}
          value={outputText}
          onChange={event => {
            setOutputText(event.target.value);
          }}
        />
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
