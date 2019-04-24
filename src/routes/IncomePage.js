import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import IncomeExpenseList from '../components/IncomeExpenseList';

export default class IncomePage extends Component {
  render() {
    return (
      <main>
        <section className="page-controls">
          <select>
            <option>April 2019</option>
          </select>

          <Link to="/additem#income">Add income</Link>
        </section>
        
        <section className="page-content">
          <IncomeExpenseList type="income" />
        </section>
      </main>
    );
  }
}