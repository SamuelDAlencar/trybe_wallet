import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteExpense } from '../actions';

class Expenses extends Component {
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
    const { expenses } = this.props;
    return (
      expenses.map((expense) => (
        <tr key={ expense.id } id={ expense.id } className="wallet__expense">
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
              // onClick={}
              data-testid="edit-btn"
              className="wallet__button"
            >
              Editar
            </button>
            <button
              type="button"
              onClick={ (e) => this.deleteButton(e) }
              data-testid="delete-btn"
              className="wallet__button"
            >
              Excluir
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
});

export default connect(null, mapDispatchToProps)(Expenses);
