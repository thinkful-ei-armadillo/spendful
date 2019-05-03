import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { UserContextProvider } from './contexts/UserContext'
import { DataProvider } from './contexts/DataContext';
import App from './components/App/App';

ReactDOM.render(
  <BrowserRouter>
    <UserContextProvider>
      <DataProvider>
        <App />
      </DataProvider>
    </UserContextProvider>
  </BrowserRouter>
  , document.getElementById('root')
);
