import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import {
  fetchCurrencies, saveExpense, editExpense, editMode as editModeAction,
} from '../actions';
import WalletStructure from '../components/WalletStructure';
import './css/Wallet.css';

class Wallet extends Component {
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
      expense: expenses.find((expense) => expense.id === Number(id)),
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
      <WalletStructure
        email={ email }
        expenses={ expenses }
        editMode={ editMode }
        value={ value }
        handleInput={ this.handleInput }
        description={ description }
        currency={ currency }
        currencies={ currencies }
        method={ method }
        tag={ tag }
        editExpense={ this.editExpense }
        saveExpense={ this.saveExpense }
        ths={ ths }
        id={ id }
        editToggle={ this.editToggle }
      />
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
