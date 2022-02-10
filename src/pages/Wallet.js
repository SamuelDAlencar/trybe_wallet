import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { dispatchCurrencies, saveExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      id: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.addExpense = this.addExpense.bind(this);
  }

  componentDidMount() {
    const { dispatchCurrenciesToProp } = this.props;
    dispatchCurrenciesToProp();
  }

  handleInput({ target }) {
    this.setState({
      [target.id]: target.value ? target.value : target.selectedIndex,
    });
  }

  addExpense() {
    const { dispatchCurrenciesToProp } = this.props;
    dispatchCurrenciesToProp();
    const { currencies } = this.props;
    this.setState({ exchangeRates: currencies }, () => {
      const { dispatchExpense } = this.props;
      dispatchExpense(this.state);
      this.setState((prevState) => ({
        value: '',
        id: prevState.id + 1,
      }));
    });
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value } = this.state;
    return (
      <>
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h4 data-testid="total-field">
            {
              expenses
                .reduce((acc, expense) => acc + (
                  expense.value * currencies[expense.currency].ask), 0)
            }
          </h4>
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
                        </option>
                      )
                  ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select data-testid="method-input" id="method" onChange={ this.handleInput }>
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select data-testid="tag-input" id="tag" onChange={ this.handleInput }>
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button
            type="button"
            onClick={ () => this.addExpense() }
          >
            Adicionar despesa
          </button>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  email: propTypes.string,
  currencies: propTypes.array,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrenciesToProp: () => dispatch(dispatchCurrencies()),
  dispatchExpense: (state) => dispatch(saveExpense(state)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
