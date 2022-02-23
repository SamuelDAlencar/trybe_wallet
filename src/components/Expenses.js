import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense, editMode as editModeAction } from '../actions';

class Expenses extends Component {
  deleteButton = ({ target }) => {
    const { deleteExpenseProp, editModeProp } = this.props;
    const { parentNode: { parentNode: { id } } } = target;
    deleteExpenseProp(id);
    editModeProp(false);
  }

  render() {
    const { expenses, editMode, id } = this.props;
    return (
      expenses.map((expense) => (
        <tr
          key={ expense.id }
          id={ expense.id }
          className={
            (editMode && expense.id === id) ? 'wallet__edit-expense' : 'wallet__expense'
          }
        >
          <td
            className="wallet__expense__td"
          >
            {expense.description ? expense.description : '-'}
          </td>
          <td className="wallet__expense__td">{expense.tag}</td>
          <td className="wallet__expense__td">{expense.method}</td>
          <td className="wallet__expense__td">{Number(expense.value).toFixed(2)}</td>
          <td
            className="wallet__expense__td"
          >
            {expense.exchangeRates[expense.currency].name}
          </td>
          <td className="wallet__expense__td">
            {
              Number(expense.exchangeRates[expense.currency].ask)
                .toFixed(2)
            }
          </td>
          <td className="wallet__expense__td">
            {
              (Number(expense.value)
              * Number(expense.exchangeRates[expense.currency].ask))
                .toFixed(2)
            }
          </td>
          <td className="wallet__expense__td">Real</td>
          <td className="wallet__expense__td">
            <button
              type="button"
              onClick={ (e) => editMode(e) }
              data-testid="edit-btn"
              className="wallet__button"
            >
              Edit
            </button>
            <button
              type="button"
              onClick={ (e) => this.deleteButton(e) }
              data-testid="delete-btn"
              className="wallet__delete-button"
            >
              Delete
            </button>
          </td>
        </tr>
      ))
    );
  }
}

Expenses.propTypes = {
  expense: propTypes.array,
  deleteExpenseProp: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  deleteExpenseProp: (id) => dispatch(deleteExpense(id)),
  editModeProp: (bool) => dispatch(editModeAction(bool)),
});

export default connect(null, mapDispatchToProps)(Expenses);
