import React from 'react';
import { withRouter } from 'react-router-dom';
import EditExpenseForm from '../EditExpenseForm/EditExpenseForm';

class EditExpensePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      expense: null,
      errors: [],
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onSuccess (updates) {
    this.props.history.push('/expenses');
  }

  onFailure (err) {

    if (err.errors) {
      this.setState({ errors: err.errors })
    } else {
      this.setState({errors: err});
    }

  }

  render () {

    return (
      <main className="flex-main">

        {
          this.state.errors.length > 0
            ? <div className="alert-error">{this.state.errors}</div>
            : ''
        }

        <EditExpenseForm
          expenseId={this.props.expenseId}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </main>
    )
  }
}

export default withRouter(EditExpensePage);
