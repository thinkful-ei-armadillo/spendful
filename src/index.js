import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './components/UserContext'
import { AppProvider } from './components/AppContext';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <AppProvider>
        <App />
      </AppProvider>
      </UserContextProvider>
  </BrowserRouter>
  , document.getElementById('root')
);
