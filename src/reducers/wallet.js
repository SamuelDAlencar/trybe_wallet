import {
  REQUEST_CURRENCIES, SAVE_EXPENSE, DELETE_EXPENSE, EDIT_MODE, EDIT_EXPENSE,
} from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editMode: false,
};

const walletReducer = (state = INITIAL_STATE, { type, payload, id, editedExpense }) => {
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
  case EDIT_MODE:
    return {
      ...state,
      editMode: payload,
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses
          .filter((expense) => Number(expense.id) !== Number(id)),
        editedExpense,
      ].sort((a, b) => a.id - b.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
