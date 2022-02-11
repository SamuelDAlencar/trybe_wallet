import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { dispatchCurrencies, saveExpense, deleteExpense } from '../actions';

class Wallet extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '',
      id: 0,
    };
    this.handleInput = this.handleInput.bind(this);
    this.addExpense = this.addExpense.bind(this);
    this.deleteFunc = this.deleteFunc.bind(this);
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

  deleteFunc({ target }) {
    const { removeExpense } = this.props;
    const { parentNode: { parentNode: { id } } } = target;
    removeExpense(id);
  }

  render() {
    const { email, currencies, expenses } = this.props;
    const { value } = this.state;

    return (
      <>
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h4 data-testid="total-field">
            {(expenses
              .reduce((acc, expense) => acc + (
                expense.value * expense.exchangeRates[expense.currency].ask), 0))
              .toFixed(2)}
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
        <table>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={ expense.id } id={ expense.id }>
                <td>{expense.description}</td>
                <td>{expense.tag}</td>
                <td>{expense.method}</td>
                <td>{Number(expense.value).toFixed(0)}</td>
                <td>{expense.exchangeRates[expense.currency].name}</td>
                <td>
                  {
                    Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                  }
                </td>
                <td>
                  {
                    (Number(expense.value)
                    * Number(expense.exchangeRates[expense.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <button
                    type="button"
                    onClick={ (e) => this.deleteFunc(e) }
                    data-testid="delete-btn"
                  >
                    Deletar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  removeExpense: (id) => dispatch(deleteExpense(id)),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
