import React from 'react';
import { withRouter } from 'react-router-dom';
import * as IncomesService from '../../services/incomes-service';
import EditIncomeForm from '../EditIncomeForm/EditIncomeForm';

class EditIncomePage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      income: null,
      errors: [],
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  onSuccess (updates) {
    this.props.history.push('/incomes');
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

        <EditIncomeForm
          incomeId={this.props.incomeId}
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      </main>
    )
  }
}

export default withRouter(EditIncomePage);
