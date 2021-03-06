import fetchAPI from '../helpers/fetchAPI';

export const LOG_IN = 'LOG_IN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const GET_EXPENSES = 'GET_EXPENSES';
export const SAVE_EXPENSE = 'SAVE_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_MODE = 'EDIT_MODE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

export const logIn = (payload) => ({ type: LOG_IN, payload });
export const requestCurrencies = (payload) => ({ type: REQUEST_CURRENCIES, payload });
export const getExpenses = (payload) => ({ type: GET_EXPENSES, payload });
export const saveExpense = (payload) => ({ type: SAVE_EXPENSE, payload });
export const deleteExpense = (payload) => ({ type: DELETE_EXPENSE, payload });
export const editMode = (payload) => ({ type: EDIT_MODE, payload });
export const editExpense = (id, editedExpense) => ({
  type: EDIT_EXPENSE, id, editedExpense,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    const data = await fetchAPI();
    dispatch(requestCurrencies(data));
  } catch (error) {
    console.error(error.message);
  }
};
