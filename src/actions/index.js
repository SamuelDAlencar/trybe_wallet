import fetchAPI from '../helpers/fetchAPI';

export const LOG_IN = 'LOG_IN';
export const REQUEST_CURRENCIES = 'WALLET';
export const logIn = (payload) => ({ type: LOG_IN, payload });
export const requestCurrencies = (payload) => ({ type: REQUEST_CURRENCIES, payload });

export const dispatchCurrencies = () => async (dispatch) => {
  try {
    const data = await fetchAPI();
    dispatch(requestCurrencies(data));
  } catch (error) {
    console.error(error.message);
  }
};
