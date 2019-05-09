import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
// import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

import LoginPage from './LoginPage';
import LoginForm from '../LoginForm/LoginForm';

Enzyme.configure({ adapter: new Adapter() });


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

    

    it('renders a <LoginForm /> component', () => {

      let wrapper = shallow(<LoginForm />);

      expect(wrapper.find(LoginForm))
        

    });
    
    it('displays a email and password field for login', () => {

      let wrapper = shallow(<LoginForm />);

      expect(wrapper.find(`input[type="text"]`).simulate('change', {target: {name: 'email_address', value: testEmail}}));
      expect(wrapper.find(`input[type="text"]`).text()).toEqual('');

      //.simulate('change', {target: {name: 'email_address', value: testEmail}}));
      //expect(wrapper.state('email_address')).toEqual(testEmail);

      expect(wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: testPass}}));
      expect(wrapper.find(`input[type="password"]`).text()).toEqual('');

      expect(wrapper.find('button[type="submit"]').text()).toEqual('Log In');

      //.simulate('change', {target: {name: 'password', value: testPass}});
      //expect(wrapper.state('password')).toEqual(testPass);

      expect(wrapper).toMatchSnapshot();

    });

    it('renders successful login with right data', () => {

      let wrapper = shallow(<LoginForm />);

      wrapper.find(`input[type="text"]`).simulate('change', {target: {name: 'email_address', value: testEmail}});

      wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: testPass}});

      wrapper.find('button').simulate('click');

      wrapper = shallow(<div className="alert-error"></div>);

      expect(wrapper.find('.alert-error')).contains('');

      

      



    })

    it('displays error if no password is provided', () => {

      let wrapper = shallow(<LoginForm />);

      wrapper.find(`input[type="text"]`).simulate('change', {target: {name: 'email_address', value: testEmail}});

      wrapper.find('input[type="password"]').simulate('change', {target: {name: 'password', value: ''}});

      wrapper.find('button').simulate('click');

      wrapper = shallow(<div className="alert-error"></div>);

      expect(wrapper.find('.alert-error')).contains('Incorrect Email or Password');

    });

    it('display error if user provides an email that does exist in db', () => {

    });
    
    it('display error if user provides an incorrect password', () => {

    });
    
});
