import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';





import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';
import ExpensesPage from './ExpensesPage';

Enzyme.configure({ adapter: new Adapter() });

describe('Expenses Page component', () => {

    let wrapper;

    it('renders correctly', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <ExpensesPage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);

    })

    it ('renders a "page-controls" section', () => {
        wrapper = shallow(<section className="page-controls"></section>
        )

        expect(wrapper.find('.page-controls'));
        
    })
    
});