import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';





import DashboardPage from './DashboardPage';

import Chart from '../Chart/Chart';

Enzyme.configure({ adapter: new Adapter() });

describe('DashboardPage component', () => {

    let wrapper;

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <DashboardPage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it('renders the chart component', () => {
        wrapper = shallow(<Chart />);

        expect(wrapper.find(Chart));
    })  
})