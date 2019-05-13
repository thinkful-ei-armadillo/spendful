import React, { Component } from 'react'
import AddItemForm from '../AddItemForm/AddItemForm'
import { withRouter } from 'react-router-dom'
import DataContext from '../../contexts/DataContext';

class AddItemPage extends Component {
  static contextType = DataContext;

  onSuccess = (itemType) => {
    const { history } = this.props;
    history.push(itemType)
  }

  onFailure = (errors) => {
    window.scrollTo(0, 0)
    this.context.setError(errors);
  }

  render(){
    return( 
      <main className="flex-main">
        {this.context.errors.length > 0 && <div className="alert-error">{this.context.errors}</div>}
        
        <div className="w-100"></div>

        <div className="flex-form-container">
          <AddItemForm 
            itemType={this.props.itemType}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            />
        </div>
      </main>
    )
  }
}

export default withRouter(AddItemPage)