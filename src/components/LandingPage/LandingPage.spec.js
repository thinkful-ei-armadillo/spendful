import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';


import LandingPage from './LandingPage';

import RegistrationForm from '../ResgistrationForm/RegistrationForm';

Enzyme.configure({ adapter: new Adapter() });


describe ('LandingPage component', () => {

  let wrapper;
     

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <LandingPage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it('renders an `landing-header`', () => {
      wrapper = shallow(<LandingPage />);

      expect(wrapper.contains('header'));


    });

    it('renders a Registration Form component', () => {

      wrapper = shallow(<RegistrationForm />)

      expect(wrapper.find(RegistrationForm));

    })   

    
   
    
});