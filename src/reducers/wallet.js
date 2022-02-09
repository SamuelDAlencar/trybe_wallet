import { REQUEST_CURRENCIES } from '../actions/index';

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
  default:
    return state;
  }
};

export default walletReducer;
