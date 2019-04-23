import React, { Component } from 'react';

const AppContext = React.createContext({
  test: 0,
});

export default AppContext;

export class AppProvider extends Component {
  state = {
    test: 0,
  }

  render() {
    const value = {
      test: this.state.test,
    };

    return (
      <AppContext.Provider value={value}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}