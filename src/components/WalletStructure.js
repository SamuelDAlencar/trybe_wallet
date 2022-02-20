import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Expenses from './Expenses';

export default class WalletStructure extends Component {
  render() {
    const {
      email,
      expenses,
      editMode,
      value,
      handleInput,
      description,
      currency,
      currencies,
      method,
      tag,
      editExpense,
      saveExpense,
      ths,
      id,
      editToggle,
    } = this.props;

    return (
      <>
        <header className="wallet-header">
          <h4 data-testid="email-field" className="wallet-header__email">
            {
              email || <Link to="/" className="login__h4-email">Login</Link>
            }
          </h4>
          <h3 data-testid="total-field">
            Total expense:
            {' '}
            {
              expenses
                .reduce((acc, expense) => acc + (
                  expense.value * expense.exchangeRates[expense.currency].ask), 0)
                .toFixed(2)
            }
            R$
          </h3>
          <h4 data-testid="header-currency-field">Currency: BRL</h4>
        </header>

        <form
          autoComplete="off"
          className={ editMode ? 'wallet-edit-form' : 'wallet-form' }
        >
          <label htmlFor="value" className="wallet-form__label">
            Valor:
            <input
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ handleInput }
              placeholder="0"
              className="wallet-form__label__input-value"
            />
          </label>
          <label htmlFor="description" className="wallet-form__label">
            Descrição:
            <input
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ handleInput }
              className="wallet-form__label__input"
            />
          </label>
          <label htmlFor="currency" className="wallet-form__label">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              onChange={ handleInput }
              className="wallet-form__label__select"
              value={ currency }
            >
              {
                Object.keys(currencies)
                  .map((currCurrency, i) => (
                    currCurrency !== 'USDT'
                      && (
                        <option
                          key={ `${currCurrency}-${i}` }
                          data-testid={ currCurrency }
                        >
                          {currCurrency}
                        </option>)
                  ))
              }
            </select>
          </label>
          <label htmlFor="method" className="wallet-form__label">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="method"
              onChange={ handleInput }
              className="wallet-form__label__select"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag" className="wallet-form__label">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ handleInput }
              className="wallet-form__label__select"
              value={ tag }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ editMode ? () => editExpense() : () => saveExpense() }
            disabled={ !value }
            className="wallet__button"
          >
            { editMode ? 'Editar despesa' : 'Adicionar despesa' }
          </button>
        </form>
        <table className="wallet-table">
          <thead className="wallet-table__thead">
            <tr className="wallet-table__thead__tr">
              {ths.map((th, i) => (
                <th
                  className="wallet-table__thead__tr__th"
                  key={ `${th}-${i}` }
                >
                  { th }
                </th>))}
            </tr>
          </thead>
          <tbody className="wallet-table__tbody">
            <Expenses
              expenses={ expenses }
              id={ id }
              editMode={ editToggle }
            />
          </tbody>
        </table>
      </>
    );
  }
}

WalletStructure.propTypes = {
  email: propTypes.string,
  expenses: propTypes.array,
  editMode: propTypes.bool,
  value: propTypes.number,
  handleInput: propTypes.func,
  description: propTypes.string,
  currency: propTypes.string,
  currencies: propTypes.array,
  method: propTypes.string,
  tag: propTypes.string,
  editExpense: propTypes.func,
  saveExpense: propTypes.func,
  ths: propTypes.array,
  id: propTypes.number,
  editToggle: propTypes.bool,
}.isRequired;
