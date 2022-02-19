import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  fetchCurrencies, saveExpense, editExpense, editMode as editModeAction,
} from '../actions';
import Expenses from '../components/Expenses';
import './css/Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      expense: {
        id: 0,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
      assistId: 0,
    };
  }

  componentDidMount() {
    const { fetchCurrenciesProp } = this.props;
    fetchCurrenciesProp();
  }

  handleInput = ({ target }) => {
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        [target.id]: target.value ? target.value : target.selectedIndex,
      },
    }));
  }

  saveExpense = () => {
    const { fetchCurrenciesProp, saveExpenseProp } = this.props;
    fetchCurrenciesProp();
    const { currencies } = this.props;

    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        exchangeRates: currencies,
      },
    }), () => {
      const { expense } = this.state;
      saveExpenseProp(expense);
      this.setState((prevState) => ({
        expense: {
          ...prevState.expense,
          value: '',
          description: '',
          id: prevState.expense.id + 1,
        },
      }));
    });
  }

  editToggle = ({ target }) => {
    const { editModeProp, expenses } = this.props;
    editModeProp(true);
    const { parentNode: { parentNode: { id } } } = target;
    this.setState((prevState) => ({
      expense: expenses[id],
      assistId: prevState.expense.id,
    }));
  }

  editExpense = () => {
    const { editExpenseProp, editModeProp } = this.props;
    const { expense, expense: { id }, assistId } = this.state;

    editExpenseProp(id, expense);
    editModeProp(false);
    this.setState((prevState) => ({
      expense: {
        ...prevState.expense,
        value: '',
        description: '',
        id: assistId,
      },
    }));
  }

  render() {
    const { email, currencies, expenses, editMode } = this.props;
    const {
      expense: {
        value, description, method, currency, tag, id,
      },
    } = this.state;

    const ths = [
      'Descrição', 'Tag', 'Método de pagamento', 'Valor', 'Moeda', 'Câmbio utilizado',
      'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
    ];

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

        <form className={ editMode ? 'wallet-edit-form' : 'wallet-form' }>
          <label htmlFor="value">
            Valor:
            <input
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleInput }
              placeholder="0"
              className="wallet-form__label__input-value"
            />
          </label>
          <label htmlFor="description">
            Descrição:
            <input
              data-testid="description-input"
              id="description"
              value={ description }
              onChange={ this.handleInput }
              className="wallet-form__label__input"
            />
          </label>
          <label htmlFor="currency">
            Moeda:
            <select
              data-testid="currency-input"
              id="currency"
              onChange={ this.handleInput }
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
          <label htmlFor="method">
            Método de pagamento:
            <select
              data-testid="method-input"
              id="method"
              onChange={ this.handleInput }
              className="wallet-form__label__select"
              value={ method }
            >
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria:
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.handleInput }
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
            onClick={ editMode ? () => this.editExpense() : () => this.saveExpense() }
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
              editMode={ this.editToggle }
            />
          </tbody>
        </table>
      </>
    );
  }
}

Wallet.propTypes = {
  email: propTypes.string,
  currencies: propTypes.array,
  expenses: propTypes.array,
  fetchCurrenciesProp: propTypes.func,
  saveExpenseProp: propTypes.func,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  fetchCurrenciesProp: () => dispatch(fetchCurrencies()),
  saveExpenseProp: (expense) => dispatch(saveExpense(expense)),
  editModeProp: (bool) => dispatch(editModeAction(bool)),
  editExpenseProp: (id, editedExpense) => dispatch(editExpense(id, editedExpense)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editMode: state.wallet.editMode,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
