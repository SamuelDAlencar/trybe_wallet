import { REQUEST_CURRENCIES, SAVE_EXPENSE, DELETE_EXPENSE } from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case REQUEST_CURRENCIES:
    return {
      ...state, currencies: payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses
        .filter((expense) => Number(expense.id) !== Number(payload)),
    };
  default:
    return state;
  }
};

export default walletReducer;
