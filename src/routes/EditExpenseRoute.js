import React from 'react';
import EditExpensePage from '../components/EditExpensePage/EditExpensePage';

class EditExpenseRoute extends React.Component {

  render() {
    return <EditExpensePage expenseId={this.props.match.params.id} />;
  }
}

export default EditExpenseRoute;
