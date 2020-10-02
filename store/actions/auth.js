export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";

import AsyncStorage from "@react-native-community/async-storage";

export const authenticate = (token, userName, userPhoto) => {
  return async (dispatch) => {
    await AsyncStorage.setItem(
      "userDataMuzikApp",
      JSON.stringify({
        token: token,
        userName: userName,
        userPhoto: userPhoto,
      })
    );
    dispatch({
      type: AUTHENTICATE,
      userName,
      token,
      userPhoto,
    });
  };
};

export const logout = () => {
  return async (dispatch) => {
    await AsyncStorage.removeItem("userDataMuzikApp");
    dispatch({
      type: LOGOUT,
    });
  };
};
