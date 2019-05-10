import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';






import Chart from '../Chart/Chart';
import DashboardPage from './DashboardPage';
import MonthPicker from '../MonthPicker/MonthPicker';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('DashboardPage component', () => {

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

    const validMonth = {
        year: new Date.getFullYear(),
        month: new Date.getMonth()
    }


    
    it ('renders the current month and year', () => {
        wrapper = shallow(<MonthPicker />)

        expect(wrapper.find(MonthPicker));

        expect(wrapper.state('month')).to.equal(validMonth);
    })

    it('renders the chart component', () => {
        wrapper = shallow(<Chart />);

        expect(wrapper.find(Chart));
    })
    
    it('renders an income list and expense list', () => {

       
        wrapper = shallow(<IncomeExpenseList type="incomes"/>)

        expect(wrapper.prop('type')).to.equal('incomes');

        wrapper = shallow(<IncomeExpenseList type="expenses" />)

        expect(wrapper.prop('type')).to.equal('expenses');
    })
})