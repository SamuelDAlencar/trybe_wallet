import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { dispatchCurrencies } from '../actions';

class Wallet extends React.Component {
  componentDidMount() {
    const { dispatchCurrenciesProp } = this.props;
    dispatchCurrenciesProp();
  }

  render() {
    const { email, total, currencies } = this.props;
    return (
      <>
        <header>
          <h4 data-testid="email-field">{email}</h4>
          <h4 data-testid="total-field">{total.length > 0 ? total : 0}</h4>
          <h4 data-testid="header-currency-field">BRL</h4>
        </header>

        <form>
          <label htmlFor="value">
            Valor
            <input data-testid="value-input" id="value" />
          </label>
          <label htmlFor="description">
            Descrição
            <input data-testid="description-input" id="description" />
          </label>
          <label htmlFor="currency">
            Moeda
            <select data-testid="currency-input" id="currency">
              {
                Object.keys(currencies).map((currency, i) => (
                  currency !== 'USDT'
                  && <option key={ `${currency}-${i}` }>{currency}</option>
                ))
              }
            </select>
          </label>
          <label htmlFor="method">
            Método de pagamento
            <select data-testid="method-input" id="method">
              <option>Dinheiro</option>
              <option>Cartão de débito</option>
              <option>Cartão de crédito</option>
            </select>
          </label>
          <label htmlFor="tag">
            Categoria
            <select data-testid="tag-input" id="tag">
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>
          <button type="button">Adicionar despesa</button>
        </form>
      </>
    );
  }
}

Wallet.propTypes = {
  email: propTypes.string,
  total: propTypes.number,
  currencies: propTypes.array,
}.isRequired;

const mapDispatchToProps = (dispatch) => ({
  dispatchCurrenciesProp: () => dispatch(dispatchCurrencies()),
});

const mapStateToProps = (state) => ({
  email: state.user.email,
  total: state.wallet.expenses,
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
