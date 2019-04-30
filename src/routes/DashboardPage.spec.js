import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { shallow } from 'enzyme'
import { Doughnut } from 'react-chartjs-2'; 


import Dashboard from './DashboardPage';


describe('Dashboard component', () => {
     

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <Dashboard />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it('should render the chart', () => {
        const chart = shallow(<Doughnut />)
        expect(chart).toExist()

    });  

    // q
    // context ('Given invalid credentials')  

   
    
});