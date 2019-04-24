import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/UserContext'
import { AppProvider } from './components/AppContext';
import App from './components/App';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <AppProvider>
        <App />
      </AppProvider>
      </UserProvider>
  </BrowserRouter>
  , document.getElementById('root')
);
