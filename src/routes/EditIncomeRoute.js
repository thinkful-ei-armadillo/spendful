import React from 'react';
import EditIncomePage from '../components/EditIncomePage/EditIncomePage';

class EditIncomeRoute extends React.Component {

  render() {
    return <EditIncomePage incomeId={this.props.match.params.id} />;
  }
}

export default EditIncomeRoute;
