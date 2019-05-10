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
import UserContext from '../../contexts/UserContext';

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

    

    // it('renders an header component', () => {
    //   wrapper = shallow(<header>
    //     <div className="landing-header">
    //       <div className="landing-header-left">
    //         <h2>Spendful is the newest way to prevent yourself from becoming broke.</h2>          
    //       </div>

    //       <div className="landing-header-right">
           
    //       </div>
    //     </div>
    //   </header>
    //   );

    //   expect(wrapper.find('h2')).text('Spendful is the newest way to prevent yourself from becoming broke.')


    // });

    it('renders a Registration Form component', () => {

      wrapper = shallow(<RegistrationForm />)

      expect(wrapper.find(RegistrationForm));

    })   

    
   
    
});