import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  token: null,
  userName: null,
  userPhoto: null,
  userId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userName: action.userName,
        userPhoto: action.userPhoto,
        userId: action.userId,
      };
    case LOGOUT:
      return initialState;  
    default:
      return state;
  }
};
