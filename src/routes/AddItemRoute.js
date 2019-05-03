import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AddItemPage from '../components/AddItemPage/AddItemPage';

class AddItemRoute extends Component {
  render() {
    const hash = this.props.location.hash.substr(1);
    return (
      <AddItemPage itemType={hash} />
    );
  }
}

export default withRouter(AddItemRoute);