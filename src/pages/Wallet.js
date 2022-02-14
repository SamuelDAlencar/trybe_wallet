import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { fetchCurrencies, saveExpense } from '../actions';
import Expenses from '../components/Expenses';
import './Wallet.css';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
    this.handleInput = this.handleInput.bind(this);
    this.saveButton = this.saveButton.bind(this);
  }

  componentDidMount() {
    const { fetchCurrenciesProp } = this.props;
    fetchCurrenciesProp();
  }

  handleInput({ target }) {
    this.setState({
      [target.id]: target.value ? target.value : target.selectedIndex,
    });
  }

  saveButton() {
    const { fetchCurrenciesProp, saveExpenseProp } = this.props;
    fetchCurrenciesProp();

    const { currencies } = this.props;
    this.setState({ exchangeRates: currencies }, () => {
      saveExpenseProp(this.state);
      this.setState((prevState) => ({
        value: '',
        id: prevState.id + 1,
      }));
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value } = this.state;
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

        <form className="wallet-form">
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
            >
              {
                Object.keys(currencies)
                  .map((currency, i) => (
                    currency !== 'USDT'
                      && (
                        <option
                          key={ `${currency}-${i}` }
                          data-testid={ currency }
                        >
                          {currency}
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
            onClick={ () => this.saveButton() }
            disabled={ !value }
            className="wallet__button"
          >
            Adicionar despesa
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
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
