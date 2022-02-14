import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchCurrencies, saveExpense } from '../actions';
import Expense from '../components/Expense';
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
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h3 data-testid="total-field">
            {
              expenses
                .reduce((acc, expense) => acc + (
                  expense.value * expense.exchangeRates[expense.currency].ask), 0)
                .toFixed(2)
            }
          </h3>
          <h4 data-testid="header-currency-field">BRL</h4>
        </header>

        <form>
          <label htmlFor="value">
            Valor
            <input
              data-testid="value-input"
              id="value"
              value={ value }
              onChange={ this.handleInput }
              placeholder="0"
            />
          </label>
          <label htmlFor="description">
            Descrição
            <input
              data-testid="description-input"
              id="description"
              onChange={ this.handleInput }
            />
          </label>
          <label htmlFor="currency">
            Moeda
            <select
              data-testid="currency-input"
              id="currency"
              onChange={ this.handleInput }
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
            Método de pagamento
            <select
              data-testid="method-input"
              id="method"
              onChange={ this.handleInput }
            >
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select
              data-testid="tag-input"
              id="tag"
              onChange={ this.handleInput }
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
          >
            Adicionar despesa
          </button>
        </form>
        <table>
          <thead>
            <tr>
              {ths.map((th, i) => <th key={ `${th}-${i}` }>{ th }</th>)}
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <Expense
                key={ i }
                expense={ expense }
              />))}
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
