import { LOG_IN } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case LOG_IN:
    return { email: payload };
  default:
    return state;
  }
};

export default userReducer;
