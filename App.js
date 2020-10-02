import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import MuzikNavigator from "./navigation/Navigator";
import ReduxThunk from "redux-thunk";

import AuthReducer from "./store/reducers/auth";
import PlaylistReducer from "./store/reducers/playlist";

const rootReducer = combineReducers({
  auth: AuthReducer,
  playlist: PlaylistReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MuzikNavigator />
    </Provider>
  );
}
