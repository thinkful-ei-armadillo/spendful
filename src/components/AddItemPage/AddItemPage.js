import React, { Component } from 'react'
import AddItemForm from '../AddItemForm/AddItemForm'
import { withRouter } from 'react-router-dom'


class AddItemPage extends Component {

  state = {
    errors: []
  }
  
  onSuccess = (itemType) => {
    const { history } = this.props;
    history.push(itemType)
  }

  onFailure = (errors) => {
    this.setState({
      errors: this.context.errors 
    })
  }

  render(){
    return( 
      <main className="flex-add-item">
        {this.state.errors.length > 0 
        ? <div className="alert-error">{this.state.errors}</div>
        : ''}
          <AddItemForm 
            itemType={this.props.itemType}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
            />
      </main>
    )
  }
}

export default withRouter(AddItemPage)