import { SAVE_USER_INFOS } from '../actions/saveUserInfos';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_USER_INFOS: return {
    ...state,
    email: action.email,
  };
  default: return state;
  }
};

export default userReducer;
