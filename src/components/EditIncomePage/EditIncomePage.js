import React from 'react';
import { withRouter } from 'react-router-dom';
import EditIncomeForm from '../EditIncomeForm/EditIncomeForm';
import DataContext from '../../contexts/DataContext';

class EditIncomePage extends React.Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);

    this.state = {
      income: null,
      errors: [],
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailure = this.onFailure.bind(this);
  }

  componentDidUpdate(prev){
    if(this.context.errors.length > 0){
      window.scrollTo(0, 0)
    }
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
        {this.context.errors.length > 0 && <div className="alert-error">{this.context.errors}</div>}

        <div className="w-100"></div>
        
        <div className="flex-form-container">
          <EditIncomeForm
            incomeId={this.props.incomeId}
            onSuccess={this.onSuccess}
            onFailure={this.onFailure}
          />
        </div>
      </main>
    )
  }
}

export default withRouter(EditIncomePage);
