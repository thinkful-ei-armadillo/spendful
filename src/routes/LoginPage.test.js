import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';

import LoginPage from './LoginPage';


describe('Login Page component', () => {
     const testEmail = 'test@spendful.com';
     const testPass = 'Endgame';

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <LoginPage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);
      });

    // context ('Given invalid credentials')  

    it('display error if no username is provided', () => {
        

    });
    
    it('displays error if no password is provided', () => {

    });

    it('display error if user provides an email that does exist in db', () => {

    });
    
    it('display error if user provides an incorrect password', () => {

    });
    
});
