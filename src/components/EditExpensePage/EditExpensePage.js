import React from 'react';
import { withRouter } from 'react-router-dom';
import EditExpenseForm from '../EditExpenseForm/EditExpenseForm';
import DataContext from '../../contexts/DataContext';

class EditExpensePage extends React.Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);

    this.state = {
      expense: null,
      errors: [],
    };
  }

  onSuccess = (updates) => {
    this.props.history.push('/expenses');
  }

  onFailure = (err) => {
    if (err.errors) {
      this.context.setError(err.errors)
    } else {
      this.context.setError(['There was an error. Try again.'])
    }
  }

  render() {
    return (
      <main className="flex-main">
        {this.context.errors.length > 0 && <div className="alert-error">{this.context.errors}</div>}

        <div className="w-100"></div>

        <div className="flex-form-container">
          <EditExpenseForm
            expenseId={this.props.expenseId}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
          />
        </div>
      </main>
    )
  }
}

export default withRouter(EditExpensePage);
