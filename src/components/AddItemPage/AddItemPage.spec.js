import React from 'react';
import ReactDOM from 'react-dom';
// import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Enzyme from 'enzyme'
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Adapter from 'enzyme-adapter-react-16';





import AddItemPage from './AddItemPage';



import AddItemForm from '../AddItemForm/AddItemForm';

Enzyme.configure({ adapter: new Adapter() });

describe('AddItemPage component', () => {

    // let wrapper;

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <AddItemPage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);
      });

    
})