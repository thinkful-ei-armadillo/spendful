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
import CategorySelect from '../CategorySelect/CategorySelect';

Enzyme.configure({ adapter: new Adapter() });

describe('AddItemPage component', () => {

    let wrapper;

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(
         <BrowserRouter>
           <AddItemPage />
         </BrowserRouter>,
          
          div);
        ReactDOM.unmountComponentAtNode(div);
      });

    it('renders a "flex add item"', () => {
        wrapper = shallow(
            <main className="flex-add-item"></main>
        )

        expect(wrapper.find('.flex-add-item'));

        
    }) 
    
    it('renders an add item form', () => {
        wrapper = shallow(<AddItemForm />);

        expect(wrapper.find(AddItemForm));
        
    })

    it('renders a select category component', () => {
        wrapper = shallow(<CategorySelect />)

        expect(wrapper.find(CategorySelect));
    })

    
})