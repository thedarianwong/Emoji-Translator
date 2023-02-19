import React, { useState } from 'react';
import styles from '../styles/FrontPage.module.scss';
import {
  Button,
  Heading,
  VStack,
  HStack,
  Spacer,
  Textarea,
  Text,
  Box,
} from '@chakra-ui/react';

const server_url = process.env.REACT_APP_SERVER_URL;

const FrontPage = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isOutputCopied, setIsOutputCopied] = useState(false);

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
    setIsOutputCopied(false);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(outputText);
    setIsOutputCopied(true);
  };

  return (
    <div className={styles.frontPage}>
      <VStack maxW="70%" minW="70%" minH="100px">
        <Heading fontSize="3.5em" fontFamily="'Noto+Sans+Bamum', sans-serif">
          Emoji Translator
        </Heading>
        <Spacer />
        <Textarea
          className={styles.inputBox}
          type="text"
          name="input"
          placeholder="Input Box"
          value={inputText}
          onChange={event => {
            setInputText(event.target.value);
          }}
          minH="110px"
        />
        <Box position="relative">
          <Textarea
            className={styles.output}
            placeholder="output area"
            value={outputText}
            onChange={event => {
              setOutputText(event.target.value);
            }}
            minH="177px"
            minW="70%"
            maxW="70%"
            readOnly={true}
            onClick={handleCopyClick}
            _hover={{ cursor: 'pointer' }}
          />
          <Text
            position="absolute"
            top={0}
            right={0}
            mr={2}
            mt={2}
            fontWeight="bold"
            fontSize="sm"
            color="gray.500"
            _hover={{ cursor: 'pointer', transform: 'rotate(-5deg)' }}
            onClick={handleCopyClick}
          >
            {isOutputCopied ? 'Copied' : 'Copy'}
          </Text>
        </Box>
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
