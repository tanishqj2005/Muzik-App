import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userName: null,
  userPhoto: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userName: action.userName,
        userPhoto: action.userPhoto,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
