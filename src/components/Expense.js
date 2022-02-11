import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Expense extends Component {
  constructor() {
    super();

    this.deleteButton = this.deleteButton.bind(this);
  }

  deleteButton({ target }) {
    const { deleteExpenseProp } = this.props;
    const { parentNode: { parentNode: { id } } } = target;
    deleteExpenseProp(id);
  }

  render() {
    const { expense } = this.props;
    return (
      <tr id={ expense.id }>
        <td>{expense.description}</td>
        <td>{expense.tag}</td>
        <td>{expense.method}</td>
        <td>{Number(expense.value).toFixed(2)}</td>
        <td>{expense.exchangeRates[expense.currency].name}</td>
        <td>
          {
            Number(expense.exchangeRates[expense.currency].ask)
              .toFixed(2)
          }
        </td>
        <td>
          {
            (Number(expense.value)
              * Number(expense.exchangeRates[expense.currency].ask))
              .toFixed(2)
          }
        </td>
        <td>Real</td>
        <td>
          <button
            type="button"
            onClick={ (e) => this.deleteButton(e) }
            data-testid="delete-btn"
          >
            Deletar
          </button>
        </td>
      </tr>
    );
  }
}

Expense.propTypes = {
  expense: propTypes.array,
  deleteExpenseProp: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProp: (id) => dispatch(deleteExpense(id)),
});

export default connect(null, mapDispatchToProps)(Expense);
