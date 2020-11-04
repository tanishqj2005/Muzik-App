import { INITIALIZE, LIKEASONG } from "../actions/playlist";

const initialState = {
  playlist: [],
  sounds: [],
  likedSongs: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE:
      return {
        ...state,
        playlist: action.playlist,
        sounds: action.sounds,
      };
    case LIKEASONG:
      return {
        ...state,
        likedSongs: [...state.likedSongs, action.song],
      };
    default:
      return state;
  }
};
