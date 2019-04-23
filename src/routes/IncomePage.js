import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './IncomeExpensePages.css';

export default class IncomePage extends Component {
  render() {
    return (
      <main>
        <section className="page-controls">
          <select>
            <option>April 2019</option>
          </select>

          <Link to="/income/add">Add income</Link>
        </section>
        <section className="page-content">
          <p>stuff goes here</p>
        </section>
      </main>
    );
  }
}