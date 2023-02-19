import { ColorModeScript } from '@chakra-ui/react';
import React, { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import FrontPage from './components/FrontPage';
import { ChakraProvider } from '@chakra-ui/react';
// import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <StrictMode>
    <ChakraProvider>
      <ColorModeScript />
      <FrontPage />
    </ChakraProvider>
  </StrictMode>
);
