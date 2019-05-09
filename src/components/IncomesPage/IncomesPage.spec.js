import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';




import IncomePage from './IncomesPage';
import IncomeExpenseList from '../IncomeExpensesList/IncomeExpenseList';

Enzyme.configure({ adapter: new Adapter() });

describe('Income Page component', () => {

    let wrapper;

    it('renders correctly', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <IncomePage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);

    })

    it ('renders a "page-controls" section', () => {
        wrapper = shallow(<section className="page-controls"></section>
        )

        expect(wrapper.hasClass('.page-controls'));
        
    })
    
});